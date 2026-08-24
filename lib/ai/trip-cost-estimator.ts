import "server-only";

import { generateStructured } from "@/lib/ai/service";
import { TRIP_COST_ESTIMATOR_SYSTEM } from "@/lib/ai/prompts/trip-cost-estimator";
import {
  tripCostEstimatorInputSchema,
  tripCostEstimatorModelSchema,
  type TripCostEstimatorInput,
  type TripCostEstimatorModelResult,
  type TripCostEstimatorResult,
} from "@/lib/ai/schemas/trip-cost-estimator";
import { AiError, toAiFailure, type AiResult } from "@/lib/ai/errors";
import { clipText } from "@/lib/ai/utils";
import {
  destinations,
  getDestinationBySlug,
} from "@/lib/tools/destinations";
import {
  costScenarioIds,
  defaultMileageKmpl,
  durationNightsDays,
} from "@/lib/tools/trip-cost-estimate";
import {
  durationLabels,
  originLabels,
  transportLabels,
} from "@/lib/tools/weekend-engine";
import type { TravelStyle } from "@/lib/ai/schemas/weekend-planner";
import type { Destination, Transport } from "@/types/destination";

const travelStyleLabels: Record<TravelStyle, string> = {
  budget: "Budget",
  relaxed: "Relaxed",
  adventure: "Adventure",
  comfort: "Comfort",
  luxury: "Luxury",
};

function compactDestination(destination: Destination) {
  return {
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
    hoursFromDelhi: destination.approxTravelHoursFromDelhi,
    typicalDuration: destination.tripDuration,
    budgetBands: destination.budgetRange,
    typicalRoundTripKmHint: destination.approxTravelHoursFromDelhi * 50 * 2,
    transport: destination.transport,
    highlights: destination.highlights.slice(0, 3),
  };
}

function resolveDestination(
  slug: string,
  name: string,
): Destination | undefined {
  const bySlug = getDestinationBySlug(slug);
  if (bySlug) {
    return bySlug;
  }

  const needle = name.trim().toLowerCase();
  const exact = destinations.find(
    (item) => item.name.toLowerCase() === needle,
  );
  if (exact) {
    return exact;
  }

  return destinations.find((item) => {
    const itemName = item.name.toLowerCase();
    return (
      needle.includes(itemName) ||
      itemName.includes(needle) ||
      needle.replace(/\s+/g, "-") === item.slug
    );
  });
}

function orderScenarios(
  result: TripCostEstimatorModelResult,
): TripCostEstimatorModelResult["scenarios"] | null {
  const map = new Map(result.scenarios.map((item) => [item.id, item]));
  if (map.size !== costScenarioIds.length) {
    return null;
  }
  const ordered = costScenarioIds.map((id) => map.get(id));
  if (ordered.some((item) => !item)) {
    return null;
  }
  return ordered as TripCostEstimatorModelResult["scenarios"];
}

function clampMileage(transport: Transport, mileageKmpl: number): number {
  const fallback = defaultMileageKmpl(transport);
  if (transport === "bike" && mileageKmpl < 20) {
    return fallback;
  }
  if (transport === "car" && mileageKmpl > 35) {
    return fallback;
  }
  return mileageKmpl;
}

function hintsJson(input: TripCostEstimatorInput) {
  return {
    origin: input.origin ? originLabels[input.origin] : undefined,
    destinationSlug: input.destinationSlug,
    duration: input.duration ? durationLabels[input.duration] : undefined,
    travellerCount: input.travellerCount,
    transport: input.transport ? transportLabels[input.transport] : undefined,
    tripStyle: input.tripStyle ? travelStyleLabels[input.tripStyle] : undefined,
  };
}

export async function estimateTripCost(
  rawInput: unknown,
  rateLimitKey = "trip-cost-estimator",
): Promise<AiResult<TripCostEstimatorResult>> {
  const parsed = tripCostEstimatorInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const input = parsed.data;
  const preferred = input.destinationSlug
    ? getDestinationBySlug(input.destinationSlug)
    : undefined;
  if (input.destinationSlug && !preferred) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const catalogue = preferred
    ? [compactDestination(preferred)]
    : destinations.map(compactDestination);

  const userPrompt = [
    "Traveller request:",
    clipText(input.query, 1_500),
    "",
    "Optional structured hints (use when present):",
    JSON.stringify(hintsJson(input)),
    "",
    "HarshOnRoads destinations (use only these):",
    JSON.stringify(catalogue),
    "",
    "Return one JSON object with extracted trip fields and three scenario sketches. Figures are estimates, not current prices.",
  ].join("\n");

  const generated = await generateStructured(tripCostEstimatorModelSchema, {
    schemaName: "TripCostEstimator",
    userPrompt,
    extraSystem: TRIP_COST_ESTIMATOR_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 4_096,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const destination = resolveDestination(
    generated.data.destinationSlug,
    generated.data.destinationName,
  );
  if (!destination) {
    return toAiFailure(new AiError("invalid_response"));
  }
  if (preferred && destination.slug !== preferred.slug) {
    return toAiFailure(new AiError("invalid_response"));
  }

  const scenarios = orderScenarios(generated.data);
  if (!scenarios) {
    return toAiFailure(new AiError("invalid_response"));
  }

  const transport = input.transport ?? generated.data.transport;
  const duration = input.duration ?? generated.data.duration;
  const { nights, days } = durationNightsDays(duration);
  const kmHint = destination.approxTravelHoursFromDelhi * 50 * 2;
  const roundTripKm = Math.min(
    3_000,
    Math.max(40, generated.data.estimatedRoundTripKm || kmHint),
  );

  return {
    ok: true,
    data: {
      ...generated.data,
      origin: input.origin ?? generated.data.origin,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      destinationRegion: destination.region,
      duration,
      travellerCount: input.travellerCount ?? generated.data.travellerCount,
      transport,
      tripStyle: input.tripStyle ?? generated.data.tripStyle,
      nights,
      days,
      estimatedRoundTripKm: roundTripKm,
      typicalMileageKmpl: clampMileage(
        transport,
        generated.data.typicalMileageKmpl,
      ),
      typicalFuelPricePerLitre: generated.data.typicalFuelPricePerLitre,
      scenarios,
    },
  };
}

import "server-only";

import { generateStructured } from "@/lib/ai/service";
import {
  ITINERARY_DAY_SYSTEM,
  ITINERARY_GENERATOR_SYSTEM,
} from "@/lib/ai/prompts/itinerary-generator";
import {
  itineraryDaySchema,
  itineraryGeneratorInputSchema,
  itineraryGeneratorResultSchema,
  type ItineraryDay,
  type ItineraryGeneratorInput,
  type ItineraryGeneratorResult,
} from "@/lib/ai/schemas/itinerary";
import { AiError, toAiFailure, type AiResult } from "@/lib/ai/errors";
import { clipText } from "@/lib/ai/utils";
import { getDestinationBySlug } from "@/lib/tools/destinations";
import {
  budgetLabels,
  interestLabels,
  originLabels,
  transportLabels,
  travelTimeLabels,
} from "@/lib/tools/weekend-engine";
import type { TravelStyle } from "@/lib/ai/schemas/weekend-planner";
import type { Destination } from "@/types/destination";

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
    description: destination.description,
    typicalDuration: destination.tripDuration,
    budgetBands: destination.budgetRange,
    typicalHoursFromDelhi: destination.approxTravelHoursFromDelhi,
    travelTimeCategory: destination.travelTimeCategory,
    bestFor: destination.bestFor,
    interests: destination.interests,
    transport: destination.transport,
    season: destination.season,
    highlights: destination.highlights,
  };
}

function isRoadTransport(transport: ItineraryGeneratorInput["transport"]) {
  return transport === "bike" || transport === "car";
}

function answersJson(input: ItineraryGeneratorInput, destination: Destination) {
  return {
    origin: originLabels[input.origin],
    destinationSlug: destination.slug,
    destinationName: destination.name,
    dayCount: input.dayCount,
    startDate: input.startDate,
    travellerCount: input.travellerCount,
    budgetPerPerson: budgetLabels[input.budget],
    transport: transportLabels[input.transport],
    travelStyle: travelStyleLabels[input.travelStyle],
    interests: input.interests.map((item) => interestLabels[item]),
    typicalTravelCategory: travelTimeLabels[destination.travelTimeCategory],
  };
}

function hydrateResult(
  result: ItineraryGeneratorResult,
  destination: Destination,
  input: ItineraryGeneratorInput,
): ItineraryGeneratorResult | null {
  if (result.days.length !== input.dayCount) {
    return null;
  }
  const numbers = result.days.map((day) => day.dayNumber);
  if (new Set(numbers).size !== input.dayCount) {
    return null;
  }
  const ordered = [...result.days].sort((a, b) => a.dayNumber - b.dayNumber);
  if (ordered.some((day, index) => day.dayNumber !== index + 1)) {
    return null;
  }

  const roadGuidance = isRoadTransport(input.transport)
    ? {
        suggestedDepartureTime:
          result.roadGuidance?.suggestedDepartureTime ??
          "Typically leave by 6:30–7:30am from Delhi NCR, depending on distance.",
        travelDurationCategory: travelTimeLabels[destination.travelTimeCategory],
        suggestedBreaks: result.roadGuidance?.suggestedBreaks?.length
          ? result.roadGuidance.suggestedBreaks
          : [
              "Plan a short stretch stop about halfway, typically at a known highway dhaba.",
              "Keep a fuel stop in mind before the last hill or forest stretch.",
            ],
        fuelPlanningNote:
          result.roadGuidance?.fuelPlanningNote ??
          "Estimate litres from distance and mileage before you leave. Pump prices and tolls change — verify on the day.",
      }
    : null;

  return {
    ...result,
    destinationSlug: destination.slug,
    destinationName: destination.name,
    region: destination.region,
    days: ordered,
    roadGuidance,
  };
}

export async function generateItinerary(
  rawInput: unknown,
  rateLimitKey = "itinerary-generator",
): Promise<AiResult<ItineraryGeneratorResult>> {
  const parsed = itineraryGeneratorInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const input = parsed.data;
  const destination = getDestinationBySlug(input.destinationSlug);
  if (!destination) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const userPrompt = [
    "Traveller answers:",
    JSON.stringify(answersJson(input, destination)),
    "",
    "HarshOnRoads destination (use this only):",
    JSON.stringify(compactDestination(destination)),
    "",
    `Return a ${input.dayCount}-day itinerary. Every dayNumber must run 1 through ${input.dayCount}.`,
    isRoadTransport(input.transport)
      ? "Transport is a road trip (bike or car). Include roadGuidance."
      : "Transport is bus or train. Set roadGuidance to null.",
  ].join("\n");

  const generated = await generateStructured(itineraryGeneratorResultSchema, {
    schemaName: "ItineraryGeneratorResult",
    userPrompt,
    extraSystem: ITINERARY_GENERATOR_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 8_192,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const hydrated = hydrateResult(generated.data, destination, input);
  if (!hydrated) {
    return toAiFailure(new AiError("invalid_response"));
  }

  return { ok: true, data: hydrated };
}

export async function regenerateItineraryDay(
  rawInput: unknown,
  rateLimitKey = "itinerary-generator-day",
): Promise<AiResult<ItineraryGeneratorResult>> {
  const envelope = itineraryGeneratorInputSchema
    .extend({
      dayNumber: itineraryDaySchema.shape.dayNumber,
      itinerary: itineraryGeneratorResultSchema,
    })
    .safeParse(rawInput);

  if (!envelope.success) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const { dayNumber, itinerary, ...input } = envelope.data;
  if (dayNumber > input.dayCount || dayNumber > itinerary.days.length) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const destination = getDestinationBySlug(input.destinationSlug);
  if (!destination || destination.slug !== itinerary.destinationSlug) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const otherDays = itinerary.days
    .filter((day) => day.dayNumber !== dayNumber)
    .map((day) => ({
      dayNumber: day.dayNumber,
      title: day.title,
      summary: clipText(day.summary, 160),
    }));

  const userPrompt = [
    "Traveller answers:",
    JSON.stringify(answersJson(input, destination)),
    "",
    "HarshOnRoads destination (use this only):",
    JSON.stringify(compactDestination(destination)),
    "",
    "Other days already in the itinerary (do not repeat them):",
    JSON.stringify(otherDays),
    "",
    `Rewrite only day ${dayNumber}. Return a single day object with dayNumber ${dayNumber}.`,
  ].join("\n");

  const generated = await generateStructured(itineraryDaySchema, {
    schemaName: "ItineraryDay",
    userPrompt,
    extraSystem: ITINERARY_DAY_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 2_048,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const nextDay: ItineraryDay = {
    ...generated.data,
    dayNumber,
  };

  const days = itinerary.days.map((day) =>
    day.dayNumber === dayNumber ? nextDay : day,
  );

  const hydrated = hydrateResult(
    { ...itinerary, days },
    destination,
    input,
  );
  if (!hydrated) {
    return toAiFailure(new AiError("invalid_response"));
  }

  return { ok: true, data: hydrated };
}

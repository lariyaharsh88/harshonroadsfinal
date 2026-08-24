import "server-only";

import { generateStructured } from "@/lib/ai/service";
import { TRIP_FINDER_SYSTEM } from "@/lib/ai/prompts/trip-finder";
import {
  tripFinderInputSchema,
  tripFinderResultSchema,
  type TripFinderDestination,
  type TripFinderInput,
  type TripFinderModelDestination,
  type TripFinderModelResult,
  type TripFinderResult,
} from "@/lib/ai/schemas/trip-recommendation";
import { AiError, toAiFailure, type AiResult } from "@/lib/ai/errors";
import { clipText } from "@/lib/ai/utils";
import { destinations } from "@/lib/tools/destinations";
import {
  budgetLabels,
  durationLabels,
  groupLabels,
  interestLabels,
  originLabels,
  recommendWeekends,
  transportLabels,
  travelTimeLabels,
} from "@/lib/tools/weekend-engine";
import type {
  BudgetRange,
  Destination,
  MaxTravelTime,
  WeekendPreferences,
  WeekendRecommendation,
} from "@/types/destination";

function scoringPreferences(input: TripFinderInput): {
  preferences: WeekendPreferences;
  usedDefaultFilters: boolean;
} {
  const usedDefaultFilters = !(
    Boolean(input.origin) &&
    Boolean(input.duration) &&
    Boolean(input.budget) &&
    Boolean(input.group) &&
    Boolean(input.transport) &&
    Boolean(input.interests?.length)
  );

  const duration = input.duration ?? "1n2d";
  const maxTravelTime: MaxTravelTime =
    duration === "day-trip"
      ? "4h"
      : duration === "1n2d"
        ? "6h"
        : duration === "2n3d"
          ? "8h"
          : "10h-plus";

  return {
    usedDefaultFilters,
    preferences: {
      origin: input.origin ?? "delhi",
      duration,
      budget: input.budget ?? "5000-10000",
      group: input.group ?? "friends",
      transport: input.transport ?? "car",
      interests: input.interests?.length ? input.interests : [],
      maxTravelTime,
    },
  };
}

function compactDestination(destination: Destination) {
  return {
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
    hoursFromDelhi: destination.approxTravelHoursFromDelhi,
    typicalDuration: destination.tripDuration,
    budgetBands: destination.budgetRange,
    travelTimeCategory: destination.travelTimeCategory,
    bestFor: destination.bestFor,
    interests: destination.interests,
    highlights: destination.highlights.slice(0, 3),
  };
}

function slimDestination(destination: Destination) {
  return {
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
  };
}

function pickBudgetLabel(destination: Destination, budget?: BudgetRange) {
  if (budget && destination.budgetRange.includes(budget)) {
    return budgetLabels[budget];
  }
  return budgetLabels[destination.budgetRange[0]];
}

function alternativeFor(
  destination: Destination,
  allowed: Map<string, Destination>,
  used: Set<string>,
  proposed?: { slug: string; name: string; why: string },
): TripFinderDestination["alternative"] {
  if (proposed) {
    const alt = allowed.get(proposed.slug);
    if (alt && alt.slug !== destination.slug) {
      return { slug: alt.slug, name: alt.name, why: proposed.why };
    }
  }

  const fallback =
    [...allowed.values()].find(
      (item) => item.slug !== destination.slug && !used.has(item.slug),
    ) ?? [...allowed.values()].find((item) => item.slug !== destination.slug);

  if (!fallback) {
    return {
      slug: destination.slug,
      name: destination.name,
      why: "Stay on this HarshOnRoads option if you need a shorter list.",
    };
  }

  return {
    slug: fallback.slug,
    name: fallback.name,
    why: "Another listed option if the first pick does not fit.",
  };
}

function hydrateItem(
  item: TripFinderModelDestination,
  destination: Destination,
  ranked: WeekendRecommendation | undefined,
  allowed: Map<string, Destination>,
  used: Set<string>,
  input: TripFinderInput,
): TripFinderDestination {
  return {
    ...item,
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
    matchPercent: ranked?.matchPercent ?? 0,
    travelDurationLabel: travelTimeLabels[destination.travelTimeCategory],
    budgetCategoryLabel: pickBudgetLabel(destination, input.budget),
    bestForLabels: destination.bestFor.map((group) => groupLabels[group]),
    suggestedDuration: item.suggestedDuration,
    alternative: alternativeFor(destination, allowed, used, item.alternative),
  };
}

function fromRanked(
  ranked: WeekendRecommendation,
  allowed: Map<string, Destination>,
  used: Set<string>,
  input: TripFinderInput,
): TripFinderDestination {
  const destination = ranked.destination;
  const why = ranked.whySummary
    ? `${ranked.whySummary}. Typical notes from the HarshOnRoads list — verify stay and roads before you go.`
    : "This destination is on the HarshOnRoads weekend list and is a reasonable fallback if the first picks do not fit.";

  const experiences = (
    destination.highlights.length >= 3
      ? destination.highlights
      : [
          ...destination.highlights,
          "Typical hill or heritage time on the HarshOnRoads list",
          "A quieter pace than a Delhi NCR work week",
          "Verify local timings before you leave",
        ]
  ).slice(0, 6);

  return hydrateItem(
    {
      slug: destination.slug,
      name: destination.name,
      region: destination.region,
      whyItMatches: why.slice(0, 500),
      bestExperiences: experiences,
      bestForNote: `Typically a fit for ${destination.bestFor
        .map((group) => groupLabels[group])
        .join(", ")}.`,
      suggestedDuration: durationLabels[ranked.recommendedDuration],
      alternative: alternativeFor(destination, allowed, used),
    },
    destination,
    ranked,
    allowed,
    used,
    input,
  );
}

function hydrateFromCatalogue(
  result: TripFinderModelResult,
  allowed: Map<string, Destination>,
  ranked: WeekendRecommendation[],
  input: TripFinderInput,
  usedDefaultFilters: boolean,
): TripFinderResult | null {
  const scoreBySlug = new Map(
    ranked.map((item) => [item.destination.slug, item]),
  );
  const used = new Set<string>();
  const destinationsOut: TripFinderDestination[] = [];

  for (const item of result.destinations) {
    const match = allowed.get(item.slug);
    if (!match || used.has(match.slug)) {
      continue;
    }
    used.add(match.slug);
    destinationsOut.push(
      hydrateItem(item, match, scoreBySlug.get(match.slug), allowed, used, input),
    );
    if (destinationsOut.length === 5) {
      break;
    }
  }

  for (const rec of ranked) {
    if (destinationsOut.length === 5) {
      break;
    }
    if (used.has(rec.destination.slug)) {
      continue;
    }
    used.add(rec.destination.slug);
    destinationsOut.push(fromRanked(rec, allowed, used, input));
  }

  if (destinationsOut.length !== 5) {
    return null;
  }

  return {
    querySummary: result.querySummary,
    destinations: destinationsOut,
    verificationNotes: result.verificationNotes,
    disclaimer: result.disclaimer,
    usedDefaultFilters,
  };
}

export async function findTrips(
  rawInput: unknown,
  rateLimitKey = "trip-finder",
): Promise<AiResult<TripFinderResult>> {
  const parsed = tripFinderInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const input = parsed.data;
  const { preferences, usedDefaultFilters } = scoringPreferences(input);
  const ranked = recommendWeekends(preferences, 8);
  const rankedSlugs = new Set(ranked.map((item) => item.destination.slug));
  const rest = destinations.filter((item) => !rankedSlugs.has(item.slug));
  const allowed = new Map(destinations.map((item) => [item.slug, item]));
  const allRanked = recommendWeekends(preferences, destinations.length);

  const structured = {
    origin: input.origin ? originLabels[input.origin] : "not specified",
    availableDays: input.duration
      ? durationLabels[input.duration]
      : "not specified",
    budgetPerPerson: input.budget ? budgetLabels[input.budget] : "not specified",
    group: input.group ? groupLabels[input.group] : "not specified",
    transport: input.transport
      ? transportLabels[input.transport]
      : "not specified",
    interests: input.interests?.length
      ? input.interests.map((item) => interestLabels[item])
      : "not specified",
  };

  const userPrompt = [
    "Traveller request (natural language):",
    clipText(input.query, 1_200),
    "",
    "Optional structured filters (may be unset):",
    JSON.stringify(structured),
    "",
    "Preferred HarshOnRoads destinations (use these first when they fit):",
    JSON.stringify(ranked.map((item) => compactDestination(item.destination))),
    "",
    "Other destinations on the HarshOnRoads list:",
    JSON.stringify(rest.map(slimDestination)),
    "",
    "Return exactly 5 ranked destinations. Every slug must come from the lists above. Alternatives must also use listed slugs.",
  ].join("\n");

  const generated = await generateStructured(tripFinderResultSchema, {
    schemaName: "TripFinderResult",
    userPrompt,
    extraSystem: TRIP_FINDER_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 6_144,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const hydrated = hydrateFromCatalogue(
    generated.data,
    allowed,
    allRanked,
    input,
    usedDefaultFilters,
  );
  if (!hydrated) {
    return toAiFailure(new AiError("invalid_response"));
  }

  return { ok: true, data: hydrated };
}

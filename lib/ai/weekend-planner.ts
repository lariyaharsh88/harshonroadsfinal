import "server-only";

import { generateStructured } from "@/lib/ai/service";
import { WEEKEND_PLANNER_SYSTEM } from "@/lib/ai/prompts/weekend-planner";
import {
  weekendPlannerInputSchema,
  weekendPlannerResultSchema,
  type WeekendPlannerInput,
  type WeekendPlannerResult,
} from "@/lib/ai/schemas/weekend-planner";
import { AiError, toAiFailure, type AiResult } from "@/lib/ai/errors";
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
import type { Destination } from "@/types/destination";

const travelStyleLabels: Record<WeekendPlannerInput["travelStyle"], string> = {
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
    bestFor: destination.bestFor,
    interests: destination.interests,
    transport: destination.transport,
    season: destination.season,
    highlights: destination.highlights,
  };
}

function slimDestination(destination: Destination) {
  return {
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
  };
}

function hydrateFromCatalogue(
  result: WeekendPlannerResult,
  allowed: Map<string, Destination>,
): WeekendPlannerResult | null {
  const next = result.destinations.map((item) => {
    const match = allowed.get(item.slug);
    if (!match) {
      return null;
    }
    const alternatives = item.alternatives.flatMap((alt) => {
      const altMatch = allowed.get(alt.slug);
      if (!altMatch) {
        return [];
      }
      return [{ ...alt, slug: altMatch.slug, name: altMatch.name }];
    });
    if (alternatives.length === 0) {
      const fallback = [...allowed.values()].find(
        (dest) => dest.slug !== match.slug,
      );
      if (!fallback) {
        return null;
      }
      alternatives.push({
        slug: fallback.slug,
        name: fallback.name,
        why: "Another listed option if the first pick does not fit.",
      });
    }
    return {
      ...item,
      slug: match.slug,
      name: match.name,
      region: match.region,
      alternatives,
    };
  });

  if (next.some((item) => item === null)) {
    return null;
  }

  const unique = new Set(next.map((item) => item?.slug));
  if (unique.size !== 3) {
    return null;
  }

  return {
    ...result,
    destinations: next as WeekendPlannerResult["destinations"],
  };
}

export async function planWeekendTrip(
  rawInput: unknown,
  rateLimitKey = "weekend-planner",
): Promise<AiResult<WeekendPlannerResult>> {
  const parsed = weekendPlannerInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const input = parsed.data;
  const ranked = recommendWeekends(
    {
      origin: input.origin,
      duration: input.duration,
      budget: input.budget,
      group: input.group,
      transport: input.transport,
      interests: input.interests,
      maxTravelTime: input.maxTravelTime,
    },
    8,
  );

  const rankedSlugs = new Set(ranked.map((item) => item.destination.slug));
  const rest = destinations.filter((item) => !rankedSlugs.has(item.slug));
  const allowed = new Map(destinations.map((item) => [item.slug, item]));

  const userPrompt = [
    "Traveller answers:",
    JSON.stringify({
      origin: originLabels[input.origin],
      duration: durationLabels[input.duration],
      budgetPerPerson: budgetLabels[input.budget],
      group: groupLabels[input.group],
      peopleCount: input.peopleCount,
      transport: transportLabels[input.transport],
      interests: input.interests.map((item) => interestLabels[item]),
      travelStyle: travelStyleLabels[input.travelStyle],
      maxTravelTime: travelTimeLabels[input.maxTravelTime],
    }),
    "",
    "Preferred HarshOnRoads destinations (use these first):",
    JSON.stringify(ranked.map((item) => compactDestination(item.destination))),
    "",
    "Other destinations on the HarshOnRoads list (alternatives only):",
    JSON.stringify(rest.map(slimDestination)),
    "",
    "Return exactly 3 ranked weekend plans. Every slug must come from the lists above.",
  ].join("\n");

  const generated = await generateStructured(weekendPlannerResultSchema, {
    schemaName: "WeekendPlannerResult",
    userPrompt,
    extraSystem: WEEKEND_PLANNER_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 8192,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const hydrated = hydrateFromCatalogue(generated.data, allowed);
  if (!hydrated) {
    return toAiFailure(new AiError("invalid_response"));
  }

  return { ok: true, data: hydrated };
}

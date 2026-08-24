import "server-only";

import { generateStructured } from "@/lib/ai/service";
import { AI_PACKING_LIST_SYSTEM } from "@/lib/ai/prompts/ai-packing-list";
import {
  aiPackingListInputSchema,
  aiPackingListModelSchema,
  packingDurationLabels,
  packingSeasonLabels,
  packingTripTypeLabels,
  type AiPackingListInput,
  type AiPackingListItem,
  type AiPackingListResult,
} from "@/lib/ai/schemas/ai-packing-list";
import { AiError, toAiFailure, type AiResult } from "@/lib/ai/errors";
import { getDestinationBySlug } from "@/lib/tools/destinations";
import {
  interestLabels,
  transportLabels,
} from "@/lib/tools/weekend-engine";
import type { Destination } from "@/types/destination";

function compactDestination(destination: Destination) {
  return {
    slug: destination.slug,
    name: destination.name,
    region: destination.region,
    description: destination.description,
    typicalDuration: destination.tripDuration,
    typicalHoursFromDelhi: destination.approxTravelHoursFromDelhi,
    seasonNote: destination.season,
    interests: destination.interests,
    transport: destination.transport,
    highlights: destination.highlights.slice(0, 4),
  };
}

function answersJson(input: AiPackingListInput, destination: Destination) {
  return {
    destinationSlug: destination.slug,
    destinationName: destination.name,
    duration: packingDurationLabels[input.duration],
    season: packingSeasonLabels[input.season],
    transport: transportLabels[input.transport],
    tripType: packingTripTypeLabels[input.tripType],
    activities: input.activities.map((item) => interestLabels[item]),
    travellerCount: input.travellerCount,
  };
}

function slugPart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function hydrateItems(
  input: AiPackingListInput,
  rawItems: {
    name: string;
    category: AiPackingListItem["category"];
    priority: AiPackingListItem["priority"];
    note?: string;
  }[],
): AiPackingListItem[] {
  const seen = new Set<string>();
  const next: AiPackingListItem[] = [];

  for (const item of rawItems) {
    if (item.category === "riding-gear" && input.transport !== "bike") {
      continue;
    }
    const base = `${item.priority}-${item.category}-${slugPart(item.name)}`;
    let id = base;
    let n = 2;
    while (seen.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    seen.add(id);
    next.push({
      id,
      name: item.name,
      category: item.category,
      priority: item.priority,
      note: item.note,
      custom: false,
      packed: false,
    });
  }

  return next;
}

export async function generateAiPackingList(
  rawInput: unknown,
  rateLimitKey = "ai-packing-list",
): Promise<AiResult<AiPackingListResult>> {
  const parsed = aiPackingListInputSchema.safeParse(rawInput);
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
    input.transport === "bike"
      ? "Transport is a motorcycle. Include riding-gear."
      : "Transport is not a motorcycle. Do not include riding-gear items.",
    "Return a packing list with essential, recommended and optional items.",
  ].join("\n");

  const generated = await generateStructured(aiPackingListModelSchema, {
    schemaName: "AiPackingList",
    userPrompt,
    extraSystem: AI_PACKING_LIST_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 4_096,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const items = hydrateItems(input, generated.data.items);
  if (items.length < 12) {
    return toAiFailure(new AiError("invalid_response"));
  }

  return {
    ok: true,
    data: {
      ...generated.data,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      destinationRegion: destination.region,
      duration: input.duration,
      season: input.season,
      transport: input.transport,
      tripType: input.tripType,
      activities: input.activities,
      travellerCount: input.travellerCount,
      items,
    },
  };
}

import "server-only";

import { generateStructured } from "@/lib/ai/service";
import { AI_TRAVEL_CONTENT_CREATOR_SYSTEM } from "@/lib/ai/prompts/ai-travel-content-creator";
import {
  contentCreatorAudienceLabels,
  contentCreatorPlatformLabels,
  contentCreatorToneLabels,
  travelContentCreatorInputSchema,
  travelContentCreatorModelSchema,
  type TravelContentCreatorInput,
  type TravelContentCreatorResult,
} from "@/lib/ai/schemas/ai-travel-content-creator";
import { AiError, toAiFailure, type AiResult } from "@/lib/ai/errors";
import { getDestinationBySlug } from "@/lib/tools/destinations";
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

function answersJson(
  input: TravelContentCreatorInput,
  destination: Destination,
) {
  return {
    destinationSlug: destination.slug,
    destinationName: destination.name,
    tripDescription: input.tripDescription,
    audience: contentCreatorAudienceLabels[input.audience],
    tone: contentCreatorToneLabels[input.tone],
    platform: contentCreatorPlatformLabels[input.platform],
    hasVisited: input.hasVisited,
  };
}

function payloadPresent(
  input: TravelContentCreatorInput,
  model: TravelContentCreatorResult,
): boolean {
  switch (input.platform) {
    case "youtube":
      return Boolean(model.youtube);
    case "youtube-shorts":
    case "instagram-reels":
      return Boolean(model.shortsReels);
    case "instagram":
      return Boolean(model.instagram);
    case "blog":
      return Boolean(model.blog);
    default:
      return false;
  }
}

export async function generateTravelContent(
  rawInput: unknown,
  rateLimitKey = "ai-travel-content-creator",
): Promise<AiResult<TravelContentCreatorResult>> {
  const parsed = travelContentCreatorInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const input = parsed.data;
  const destination = getDestinationBySlug(input.destinationSlug);
  if (!destination) {
    return toAiFailure(new AiError("input_too_large"));
  }

  const visitRule = input.hasVisited
    ? "The creator says they have visited. First person is allowed only for going there. Do not invent incidents missing from the trip description."
    : "The creator has not confirmed a visit. Do not write as if they went. No first-person travel memories.";

  const userPrompt = [
    "Creator answers:",
    JSON.stringify(answersJson(input, destination)),
    "",
    "HarshOnRoads destination (use this only):",
    JSON.stringify(compactDestination(destination)),
    "",
    visitRule,
    `Fill only the payload for platform ${input.platform}. Set the unused payloads to null.`,
  ].join("\n");

  const generated = await generateStructured(travelContentCreatorModelSchema, {
    schemaName: "TravelContentCreator",
    userPrompt,
    extraSystem: AI_TRAVEL_CONTENT_CREATOR_SYSTEM,
    rateLimitKey,
    maxOutputTokens: 6_144,
    timeoutMs: 40_000,
  });

  if (!generated.ok) {
    return generated;
  }

  const data: TravelContentCreatorResult = {
    ...generated.data,
    destinationSlug: destination.slug,
    destinationName: destination.name,
    destinationRegion: destination.region,
    audience: input.audience,
    tone: input.tone,
    platform: input.platform,
    hasVisited: input.hasVisited,
  };

  if (!payloadPresent(input, data)) {
    return toAiFailure(new AiError("invalid_response"));
  }

  return { ok: true, data };
}

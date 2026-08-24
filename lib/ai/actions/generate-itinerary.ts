"use server";

import { headers } from "next/headers";
import {
  generateItinerary,
  regenerateItineraryDay,
} from "@/lib/ai/itinerary-generator";
import type { AiResult } from "@/lib/ai/errors";
import type { ItineraryGeneratorResult } from "@/lib/ai/schemas/itinerary";

function clientKey(headerList: Headers, suffix: string): string {
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return `itinerary-generator:${suffix}:${ip || headerList.get("x-real-ip") || "anonymous"}`;
}

export async function generateItineraryAction(
  input: unknown,
): Promise<AiResult<ItineraryGeneratorResult>> {
  const headerList = await headers();
  return generateItinerary(input, clientKey(headerList, "full"));
}

export async function regenerateItineraryDayAction(
  input: unknown,
): Promise<AiResult<ItineraryGeneratorResult>> {
  const headerList = await headers();
  return regenerateItineraryDay(input, clientKey(headerList, "day"));
}

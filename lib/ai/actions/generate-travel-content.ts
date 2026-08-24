"use server";

import { headers } from "next/headers";
import { generateTravelContent } from "@/lib/ai/travel-content-creator";
import type { AiResult } from "@/lib/ai/errors";
import type { TravelContentCreatorResult } from "@/lib/ai/schemas/ai-travel-content-creator";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return `ai-travel-content-creator:${ip || headerList.get("x-real-ip") || "anonymous"}`;
}

export async function generateTravelContentAction(
  input: unknown,
): Promise<AiResult<TravelContentCreatorResult>> {
  const headerList = await headers();
  return generateTravelContent(input, clientKey(headerList));
}

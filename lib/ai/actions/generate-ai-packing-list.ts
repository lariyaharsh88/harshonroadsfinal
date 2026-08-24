"use server";

import { headers } from "next/headers";
import { generateAiPackingList } from "@/lib/ai/packing-list";
import type { AiResult } from "@/lib/ai/errors";
import type { AiPackingListResult } from "@/lib/ai/schemas/ai-packing-list";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return `ai-packing-list:${ip || headerList.get("x-real-ip") || "anonymous"}`;
}

export async function generateAiPackingListAction(
  input: unknown,
): Promise<AiResult<AiPackingListResult>> {
  const headerList = await headers();
  return generateAiPackingList(input, clientKey(headerList));
}

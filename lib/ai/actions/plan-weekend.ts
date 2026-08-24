"use server";

import { headers } from "next/headers";
import { planWeekendTrip } from "@/lib/ai/weekend-planner";
import type { AiResult } from "@/lib/ai/errors";
import type { WeekendPlannerResult } from "@/lib/ai/schemas/weekend-planner";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return `weekend-planner:${ip || headerList.get("x-real-ip") || "anonymous"}`;
}

export async function planWeekendAction(
  input: unknown,
): Promise<AiResult<WeekendPlannerResult>> {
  const headerList = await headers();
  return planWeekendTrip(input, clientKey(headerList));
}

"use server";

import { headers } from "next/headers";
import { estimateTripCost } from "@/lib/ai/trip-cost-estimator";
import type { AiResult } from "@/lib/ai/errors";
import type { TripCostEstimatorResult } from "@/lib/ai/schemas/trip-cost-estimator";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return `trip-cost-estimator:${ip || headerList.get("x-real-ip") || "anonymous"}`;
}

export async function estimateTripCostAction(
  input: unknown,
): Promise<AiResult<TripCostEstimatorResult>> {
  const headerList = await headers();
  return estimateTripCost(input, clientKey(headerList));
}

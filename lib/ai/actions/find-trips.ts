"use server";

import { headers } from "next/headers";
import { findTrips } from "@/lib/ai/trip-finder";
import type { AiResult } from "@/lib/ai/errors";
import type { TripFinderResult } from "@/lib/ai/schemas/trip-recommendation";

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return `trip-finder:${ip || headerList.get("x-real-ip") || "anonymous"}`;
}

export async function findTripsAction(
  input: unknown,
): Promise<AiResult<TripFinderResult>> {
  const headerList = await headers();
  return findTrips(input, clientKey(headerList));
}

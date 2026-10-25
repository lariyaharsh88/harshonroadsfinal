import "server-only";

import { CmsStorageError, usesNeonDatabase } from "@/lib/cms/db";
import {
  loadDestinationsFromFilesystem,
  loadItinerariesFromFilesystem,
  saveDestinationsToFilesystem,
  saveItinerariesToFilesystem,
} from "@/lib/cms/filesystem-store";
import {
  loadDestinationsFromNeon,
  loadItinerariesFromNeon,
  saveDestinationsToNeon,
  saveItinerariesToNeon,
  seedNeonIfEmpty,
} from "@/lib/cms/neon-store";
import { seedDestinations, seedItineraries } from "@/lib/cms/seed";
import type { DestinationGuide } from "@/lib/data/destinations/types";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export { CmsStorageError } from "@/lib/cms/db";

export type CmsCollection = "destinations" | "itineraries";

let neonSeedPromise: Promise<void> | null = null;

async function ensureNeonSeeded(): Promise<void> {
  if (!usesNeonDatabase()) {
    return;
  }

  if (!neonSeedPromise) {
    neonSeedPromise = seedNeonIfEmpty(
      loadDestinationsFromFilesystem(seedDestinations),
      loadItinerariesFromFilesystem(seedItineraries),
    );
  }

  await neonSeedPromise;
}

export async function loadCmsDestinations(): Promise<DestinationGuide[]> {
  if (usesNeonDatabase()) {
    await ensureNeonSeeded();
    return loadDestinationsFromNeon();
  }

  return loadDestinationsFromFilesystem(seedDestinations);
}

export async function loadCmsItineraries(): Promise<ItineraryRecord[]> {
  if (usesNeonDatabase()) {
    await ensureNeonSeeded();
    return loadItinerariesFromNeon();
  }

  return loadItinerariesFromFilesystem(seedItineraries);
}

export async function saveCmsDestinations(
  destinations: DestinationGuide[],
): Promise<void> {
  if (usesNeonDatabase()) {
    await saveDestinationsToNeon(destinations);
    return;
  }

  // Serverless hosts (Vercel, Netlify) have no persistent filesystem: a file save would be lost.
  if (process.env.NODE_ENV === "production") {
    throw new CmsStorageError(
      "CMS saves in production require DATABASE_URL (Neon). Set it in your host's environment variables, redeploy, then try again.",
    );
  }

  saveDestinationsToFilesystem(destinations);
}

export async function saveCmsItineraries(
  itineraries: ItineraryRecord[],
): Promise<void> {
  if (usesNeonDatabase()) {
    await saveItinerariesToNeon(itineraries);
    return;
  }

  // Serverless hosts (Vercel, Netlify) have no persistent filesystem: a file save would be lost.
  if (process.env.NODE_ENV === "production") {
    throw new CmsStorageError(
      "CMS saves in production require DATABASE_URL (Neon). Set it in your host's environment variables, redeploy, then try again.",
    );
  }

  saveItinerariesToFilesystem(itineraries);
}

export function getCmsStorageMode(): "neon" | "filesystem" {
  if (usesNeonDatabase()) {
    return "neon";
  }
  return "filesystem";
}

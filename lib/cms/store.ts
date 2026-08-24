import "server-only";

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { seedDestinations, seedItineraries } from "@/lib/cms/seed";
import type { DestinationGuide } from "@/lib/data/destinations/types";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

const CMS_DIR = path.join(process.cwd(), "content", "cms");
const DESTINATIONS_FILE = path.join(CMS_DIR, "destinations.json");
const ITINERARIES_FILE = path.join(CMS_DIR, "itineraries.json");

function ensureCmsDir(): void {
  if (!existsSync(CMS_DIR)) {
    mkdirSync(CMS_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  ensureCmsDir();
  if (!existsSync(filePath)) {
    writeFileSync(filePath, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
    return fallback;
  }

  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  ensureCmsDir();
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function getStoredDestinations(): DestinationGuide[] {
  return readJsonFile(DESTINATIONS_FILE, seedDestinations);
}

export function getStoredItineraries(): ItineraryRecord[] {
  return readJsonFile(ITINERARIES_FILE, seedItineraries);
}

export function saveDestinations(destinations: DestinationGuide[]): void {
  writeJsonFile(DESTINATIONS_FILE, destinations);
}

export function saveItineraries(itineraries: ItineraryRecord[]): void {
  writeJsonFile(ITINERARIES_FILE, itineraries);
}

export function getDestinationBySlug(slug: string): DestinationGuide | undefined {
  return getStoredDestinations().find((guide) => guide.slug === slug);
}

export function getItineraryBySlugFromStore(
  slug: string,
): ItineraryRecord | undefined {
  return getStoredItineraries().find((itinerary) => itinerary.slug === slug);
}

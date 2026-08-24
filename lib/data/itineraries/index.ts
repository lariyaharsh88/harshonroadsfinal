import "server-only";

import { getStoredItineraries } from "@/lib/cms/store";
import {
  toItineraryCardData,
  type ItineraryCardData,
  emptyItineraryFilters,
  getItineraryDestinationOptions,
  matchesItineraryFilters,
} from "@/lib/data/itineraries/catalog";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export type {
  ItineraryCardData,
  ItineraryDirectoryFilters,
} from "@/lib/data/itineraries/catalog";

export {
  emptyItineraryFilters,
  getItineraryDestinationOptions,
  matchesItineraryFilters,
  toItineraryCardData,
};

function itinerariesBySlug(): Map<string, ItineraryRecord> {
  return new Map(
    getStoredItineraries().map((itinerary) => [itinerary.slug, itinerary]),
  );
}

export function getAllItineraries(): ItineraryRecord[] {
  return getStoredItineraries();
}

export function getItineraryBySlug(slug: string): ItineraryRecord | undefined {
  return itinerariesBySlug().get(slug);
}

export function getItinerarySlugs(): string[] {
  return getStoredItineraries().map((itinerary) => itinerary.slug);
}

export function getRelatedItineraries(
  slugs: string[],
  excludeSlug?: string,
): ItineraryRecord[] {
  const lookup = itinerariesBySlug();
  const unique = [...new Set(slugs.filter((slug) => slug !== excludeSlug))];
  return unique.flatMap((slug) => {
    const itinerary = lookup.get(slug);
    return itinerary ? [itinerary] : [];
  });
}

export function getItineraryCards(): ItineraryCardData[] {
  return getStoredItineraries().map(toItineraryCardData);
}

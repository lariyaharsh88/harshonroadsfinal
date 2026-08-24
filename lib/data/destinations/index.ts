import "server-only";

import { getStoredDestinations } from "@/lib/cms/store";
import {
  toDestinationCardData,
  type DestinationCardData,
  emptyDestinationFilters,
  matchesDestinationFilters,
} from "@/lib/data/destinations/catalog";
import type { DestinationGuide } from "@/lib/data/destinations/types";

export type {
  DestinationCardData,
  DestinationDirectoryFilters,
  DestinationTravelTime,
} from "@/lib/data/destinations/catalog";

export {
  emptyDestinationFilters,
  matchesDestinationFilters,
  toDestinationCardData,
};

function guidesBySlug(): Map<string, DestinationGuide> {
  return new Map(getStoredDestinations().map((guide) => [guide.slug, guide]));
}

export function getAllDestinationGuides(): DestinationGuide[] {
  return getStoredDestinations();
}

export function getDestinationGuideBySlug(
  slug: string,
): DestinationGuide | undefined {
  return guidesBySlug().get(slug);
}

export function getDestinationGuideSlugs(): string[] {
  return getStoredDestinations().map((guide) => guide.slug);
}

export function getRelatedDestinationGuides(
  slugs: string[],
): DestinationGuide[] {
  const lookup = guidesBySlug();
  return slugs.flatMap((slug) => {
    const guide = lookup.get(slug);
    return guide ? [guide] : [];
  });
}

export function getDestinationCards(): DestinationCardData[] {
  return getStoredDestinations().map(toDestinationCardData);
}

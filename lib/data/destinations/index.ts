import "server-only";

import { getStoredDestinations } from "@/lib/cms/store";
import {
  toDestinationCardData,
  isDestinationActive,
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
  isDestinationActive,
  matchesDestinationFilters,
  toDestinationCardData,
};

function allGuides(): DestinationGuide[] {
  return getStoredDestinations();
}

function publishedGuides(): DestinationGuide[] {
  return allGuides().filter(isDestinationActive);
}

function guidesBySlug(guides: DestinationGuide[]): Map<string, DestinationGuide> {
  return new Map(guides.map((guide) => [guide.slug, guide]));
}

/** All destinations — including inactive (admin CMS). */
export function getAllDestinationGuides(): DestinationGuide[] {
  return allGuides();
}

/** Active destinations only — public site. */
export function getPublishedDestinationGuides(): DestinationGuide[] {
  return publishedGuides();
}

/** Any destination by slug — admin CMS. */
export function getDestinationGuideBySlug(
  slug: string,
): DestinationGuide | undefined {
  return guidesBySlug(allGuides()).get(slug);
}

/** Active destination by slug — public site. */
export function getPublishedDestinationGuideBySlug(
  slug: string,
): DestinationGuide | undefined {
  const guide = guidesBySlug(allGuides()).get(slug);
  return guide && isDestinationActive(guide) ? guide : undefined;
}

export function getDestinationGuideSlugs(): string[] {
  return publishedGuides().map((guide) => guide.slug);
}

export function getRelatedDestinationGuides(
  slugs: string[],
): DestinationGuide[] {
  const lookup = guidesBySlug(publishedGuides());
  return slugs.flatMap((slug) => {
    const guide = lookup.get(slug);
    return guide ? [guide] : [];
  });
}

export function getDestinationCards(): DestinationCardData[] {
  return publishedGuides().map(toDestinationCardData);
}

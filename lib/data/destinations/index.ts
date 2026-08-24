import { himachalGuides } from "@/lib/data/destinations/himachal";
import { rajasthanGuides } from "@/lib/data/destinations/rajasthan";
import { uttarakhandGuides } from "@/lib/data/destinations/uttarakhand";
import { uttarPradeshGuides } from "@/lib/data/destinations/uttar-pradesh";
import type {
  DestinationGuide,
  DestinationInterest,
  DestinationRegion,
  DestinationDuration,
  DestinationBudget,
  DestinationTransport,
  DestinationTravelStyle,
  DestinationTravelTime,
} from "@/lib/data/destinations/types";

export const destinationGuides: DestinationGuide[] = [
  ...uttarakhandGuides,
  ...himachalGuides,
  ...rajasthanGuides,
  ...uttarPradeshGuides,
];

const guidesBySlug = new Map(
  destinationGuides.map((guide) => [guide.slug, guide]),
);

export function getAllDestinationGuides(): DestinationGuide[] {
  return destinationGuides;
}

export function getDestinationGuideBySlug(
  slug: string,
): DestinationGuide | undefined {
  return guidesBySlug.get(slug);
}

export function getDestinationGuideSlugs(): string[] {
  return destinationGuides.map((guide) => guide.slug);
}

export function getRelatedDestinationGuides(
  slugs: string[],
): DestinationGuide[] {
  return slugs.flatMap((slug) => {
    const guide = getDestinationGuideBySlug(slug);
    return guide ? [guide] : [];
  });
}

export type DestinationDirectoryFilters = {
  region: DestinationRegion | "";
  duration: DestinationDuration | "";
  budget: DestinationBudget | "";
  travelStyle: DestinationTravelStyle | "";
  interest: DestinationInterest | "";
  transport: DestinationTransport | "";
};

export const emptyDestinationFilters: DestinationDirectoryFilters = {
  region: "",
  duration: "",
  budget: "",
  travelStyle: "",
  interest: "",
  transport: "",
};

export function matchesDestinationFilters(
  guide: DestinationCardData,
  filters: DestinationDirectoryFilters,
): boolean {
  if (filters.region && guide.region !== filters.region) {
    return false;
  }
  if (filters.duration && !guide.durationOptions.includes(filters.duration)) {
    return false;
  }
  if (filters.budget && guide.budgetCategory !== filters.budget) {
    return false;
  }
  if (
    filters.travelStyle &&
    !guide.travelStyles.includes(filters.travelStyle)
  ) {
    return false;
  }
  if (filters.interest && !guide.interests.includes(filters.interest)) {
    return false;
  }
  if (
    filters.transport &&
    !guide.transportOptions.includes(filters.transport)
  ) {
    return false;
  }
  return true;
}

export type DestinationCardData = Pick<
  DestinationGuide,
  | "name"
  | "slug"
  | "shortDescription"
  | "region"
  | "state"
  | "tripDuration"
  | "budgetCategory"
  | "travelTimeCategory"
  | "weekendSuitability"
  | "travelStyles"
  | "interests"
  | "transportOptions"
  | "durationOptions"
>;

export function toDestinationCardData(
  guide: DestinationGuide,
): DestinationCardData {
  return {
    name: guide.name,
    slug: guide.slug,
    shortDescription: guide.shortDescription,
    region: guide.region,
    state: guide.state,
    tripDuration: guide.tripDuration,
    budgetCategory: guide.budgetCategory,
    travelTimeCategory: guide.travelTimeCategory,
    weekendSuitability: guide.weekendSuitability,
    travelStyles: guide.travelStyles,
    interests: guide.interests,
    transportOptions: guide.transportOptions,
    durationOptions: guide.durationOptions,
  };
}

export function getDestinationCards(): DestinationCardData[] {
  return destinationGuides.map(toDestinationCardData);
}

export type { DestinationTravelTime };

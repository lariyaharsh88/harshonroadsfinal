import type {
  ItineraryAudience,
  ItineraryBudget,
  ItineraryDuration,
  ItineraryRecord,
  ItineraryTransport,
  ItineraryTravelStyle,
} from "@/lib/data/itineraries/types";

export type ItineraryCardData = {
  slug: string;
  title: string;
  shortDescription: string;
  destinationName: string;
  destinationSlug: string;
  duration: ItineraryDuration;
  budgetCategory: ItineraryBudget;
  travelStyle: ItineraryTravelStyle;
  travelModes: ItineraryTransport[];
  bestFor: ItineraryAudience[];
};

export function toItineraryCardData(
  itinerary: ItineraryRecord,
): ItineraryCardData {
  return {
    slug: itinerary.slug,
    title: itinerary.title,
    shortDescription: itinerary.shortDescription,
    destinationName: itinerary.destinationName,
    destinationSlug: itinerary.destinationSlug,
    duration: itinerary.duration,
    budgetCategory: itinerary.budgetCategory,
    travelStyle: itinerary.travelStyle,
    travelModes: itinerary.travelModes,
    bestFor: itinerary.bestFor,
  };
}

export type ItineraryDirectoryFilters = {
  destinationSlug: string;
  duration: ItineraryDuration | "";
  budget: ItineraryBudget | "";
  travelStyle: ItineraryTravelStyle | "";
  transport: ItineraryTransport | "";
  bestFor: ItineraryAudience | "";
};

export const emptyItineraryFilters: ItineraryDirectoryFilters = {
  destinationSlug: "",
  duration: "",
  budget: "",
  travelStyle: "",
  transport: "",
  bestFor: "",
};

export function getItineraryDestinationOptions(
  cards: ItineraryCardData[],
): { slug: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const card of cards) {
    if (!seen.has(card.destinationSlug)) {
      seen.set(card.destinationSlug, card.destinationName);
    }
  }
  return [...seen.entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function matchesItineraryFilters(
  card: ItineraryCardData,
  filters: ItineraryDirectoryFilters,
): boolean {
  if (
    filters.destinationSlug &&
    card.destinationSlug !== filters.destinationSlug
  ) {
    return false;
  }
  if (filters.duration && card.duration !== filters.duration) {
    return false;
  }
  if (filters.budget && card.budgetCategory !== filters.budget) {
    return false;
  }
  if (filters.travelStyle && card.travelStyle !== filters.travelStyle) {
    return false;
  }
  if (filters.transport && !card.travelModes.includes(filters.transport)) {
    return false;
  }
  if (filters.bestFor && !card.bestFor.includes(filters.bestFor)) {
    return false;
  }
  return true;
}

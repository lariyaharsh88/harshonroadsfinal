import { delhiToJaipur } from "@/lib/data/itineraries/delhi-to-jaipur-2-day";
import { delhiToJimCorbett } from "@/lib/data/itineraries/delhi-to-jim-corbett-2-day";
import { delhiToKasauli } from "@/lib/data/itineraries/delhi-to-kasauli-2-day";
import { delhiToLansdowne } from "@/lib/data/itineraries/delhi-to-lansdowne-2-day";
import { delhiToMussoorie } from "@/lib/data/itineraries/delhi-to-mussoorie-2-day";
import { delhiToNainital } from "@/lib/data/itineraries/delhi-to-nainital-3-day";
import { delhiToNeemrana } from "@/lib/data/itineraries/delhi-to-neemrana-1-day";
import { delhiToRishikesh } from "@/lib/data/itineraries/delhi-to-rishikesh-2-day";
import type {
  ItineraryAudience,
  ItineraryBudget,
  ItineraryDuration,
  ItineraryRecord,
  ItineraryTransport,
  ItineraryTravelStyle,
} from "@/lib/data/itineraries/types";

export const itineraries: ItineraryRecord[] = [
  delhiToRishikesh,
  delhiToMussoorie,
  delhiToLansdowne,
  delhiToJaipur,
  delhiToNainital,
  delhiToJimCorbett,
  delhiToKasauli,
  delhiToNeemrana,
];

const itinerariesBySlug = new Map(
  itineraries.map((itinerary) => [itinerary.slug, itinerary]),
);

export function getAllItineraries(): ItineraryRecord[] {
  return itineraries;
}

export function getItineraryBySlug(
  slug: string,
): ItineraryRecord | undefined {
  return itinerariesBySlug.get(slug);
}

export function getItinerarySlugs(): string[] {
  return itineraries.map((itinerary) => itinerary.slug);
}

export function getRelatedItineraries(
  slugs: string[],
  excludeSlug?: string,
): ItineraryRecord[] {
  const unique = [...new Set(slugs.filter((slug) => slug !== excludeSlug))];
  return unique.flatMap((slug) => {
    const itinerary = getItineraryBySlug(slug);
    return itinerary ? [itinerary] : [];
  });
}

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

export function getItineraryCards(): ItineraryCardData[] {
  return itineraries.map((itinerary) => ({
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
  }));
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

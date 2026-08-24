import { destinations } from "@/lib/tools/destinations";
import type { BudgetRange, GroupType, Interest } from "@/types/destination";

export type WeekendIdea = {
  slug: string;
  label: string;
  blurb: string;
  names: string[];
};

function namesForInterest(interest: Interest): string[] {
  return destinations
    .filter((item) => item.interests.includes(interest))
    .map((item) => item.name);
}

function namesForGroup(group: GroupType): string[] {
  return destinations
    .filter((item) => item.bestFor.includes(group))
    .map((item) => item.name);
}

function namesForBudgets(bands: BudgetRange[]): string[] {
  return destinations
    .filter((item) => item.budgetRange.some((band) => bands.includes(band)))
    .map((item) => item.name);
}

export const weekendTripIdeas: WeekendIdea[] = [
  {
    slug: "mountains",
    label: "Mountains",
    blurb: "Hill towns already in the HarshOnRoads destination list.",
    names: namesForInterest("mountains"),
  },
  {
    slug: "nature",
    label: "Nature",
    blurb: "Places tagged for nature in the same list.",
    names: namesForInterest("nature"),
  },
  {
    slug: "adventure",
    label: "Adventure",
    blurb: "Destinations tagged adventure — still preference tags, not operator bookings.",
    names: namesForInterest("adventure"),
  },
  {
    slug: "romantic",
    label: "Romantic",
    blurb: "Places marked as a fit for a quieter couple weekend.",
    names: namesForInterest("romantic"),
  },
  {
    slug: "family",
    label: "Family",
    blurb: "Destinations the list marks as workable for families.",
    names: namesForGroup("family"),
  },
  {
    slug: "friends",
    label: "Friends",
    blurb: "Places tagged for a friends trip.",
    names: namesForGroup("friends"),
  },
  {
    slug: "solo",
    label: "Solo",
    blurb: "Destinations tagged as a reasonable solo weekend from NCR.",
    names: namesForGroup("solo"),
  },
  {
    slug: "road-trips",
    label: "Road Trips",
    blurb: "Bike, car and scenic drives from Delhi NCR — stories land on the road-trips page when they exist.",
    names: destinations.filter((item) =>
      item.transport.includes("bike") || item.transport.includes("car"),
    ).map((item) => item.name),
  },
  {
    slug: "budget",
    label: "Budget Trips",
    blurb: "Places whose budget bands include under ₹5,000 per person — a category, not a live hotel rate.",
    names: namesForBudgets(["under-3000", "3000-5000"]),
  },
];

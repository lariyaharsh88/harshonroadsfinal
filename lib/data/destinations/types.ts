export const destinationRegions = [
  "uttarakhand",
  "himachal-pradesh",
  "rajasthan",
  "uttar-pradesh",
] as const;

export const destinationDurations = [
  "day-trip",
  "1n2d",
  "2n3d",
  "3n4d",
] as const;

export const destinationBudgets = ["budget", "mid", "high"] as const;

export const destinationTravelTimes = [
  "under-4h",
  "4-6h",
  "6-8h",
  "8h-plus",
] as const;

export const destinationTravelStyles = [
  "peaceful",
  "adventure",
  "heritage",
  "wildlife",
  "hills",
  "spiritual",
  "city-break",
] as const;

export const destinationInterests = [
  "mountains",
  "nature",
  "adventure",
  "peaceful",
  "romantic",
  "heritage",
  "wildlife",
  "food",
  "photography",
  "nightlife",
] as const;

export const destinationTransports = ["bike", "car", "bus", "train"] as const;

export const destinationAudiences = [
  "solo",
  "couples",
  "friends",
  "families",
  "riders",
] as const;

export const weekendSuitabilityLevels = [
  "strong",
  "good",
  "better-long-weekend",
] as const;

export type DestinationRegion = (typeof destinationRegions)[number];
export type DestinationDuration = (typeof destinationDurations)[number];
export type DestinationBudget = (typeof destinationBudgets)[number];
export type DestinationTravelTime = (typeof destinationTravelTimes)[number];
export type DestinationTravelStyle = (typeof destinationTravelStyles)[number];
export type DestinationInterest = (typeof destinationInterests)[number];
export type DestinationTransport = (typeof destinationTransports)[number];
export type DestinationAudience = (typeof destinationAudiences)[number];
export type WeekendSuitability = (typeof weekendSuitabilityLevels)[number];

export type DestinationFaq = {
  question: string;
  answer: string;
};

export type DestinationItinerary = {
  title: string;
  steps: string[];
};

export type DestinationGuide = {
  id: string;
  name: string;
  slug: string;
  /** When false, hidden from the public site. Defaults to true when omitted. */
  active?: boolean;
  shortDescription: string;
  region: DestinationRegion;
  state: string;
  bestFor: DestinationAudience[];
  tripDuration: DestinationDuration;
  durationOptions: DestinationDuration[];
  budgetCategory: DestinationBudget;
  travelTimeCategory: DestinationTravelTime;
  interests: DestinationInterest[];
  transportOptions: DestinationTransport[];
  travelStyles: DestinationTravelStyle[];
  bestTimeToVisit: string;
  highlights: string[];
  weekendSuitability: WeekendSuitability;
  heroImage: string | null;
  seoTitle: string;
  seoDescription: string;
  faq: DestinationFaq[];
  relatedDestinations: string[];
  introduction: string;
  whyVisit: string[];
  whyWeekend: string;
  stayNotes: string[];
  foodNotes: string[];
  howToPlan: string[];
  weekendItineraries: DestinationItinerary[];
  travelTips: string[];
};

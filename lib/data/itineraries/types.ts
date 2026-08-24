export const itineraryOrigins = ["delhi-ncr"] as const;

export const itineraryDurations = ["1-day", "2-days", "3-days"] as const;

export const itineraryBudgets = ["budget", "mid", "high"] as const;

export const itineraryTripTypes = [
  "day-trip",
  "weekend",
  "long-weekend",
] as const;

export const itineraryTravelStyles = [
  "relaxed",
  "adventure",
  "heritage",
  "wildlife",
  "hills",
  "spiritual",
] as const;

export const itineraryTransports = ["car", "bike", "bus", "train"] as const;

export const itineraryAudiences = [
  "solo",
  "couples",
  "friends",
  "families",
] as const;

export type ItineraryOrigin = (typeof itineraryOrigins)[number];
export type ItineraryDuration = (typeof itineraryDurations)[number];
export type ItineraryBudget = (typeof itineraryBudgets)[number];
export type ItineraryTripType = (typeof itineraryTripTypes)[number];
export type ItineraryTravelStyle = (typeof itineraryTravelStyles)[number];
export type ItineraryTransport = (typeof itineraryTransports)[number];
export type ItineraryAudience = (typeof itineraryAudiences)[number];

export type ItineraryFaq = {
  question: string;
  answer: string;
};

export type ItineraryBlock = {
  period: "morning" | "afternoon" | "evening";
  title: string;
  location?: string;
  description: string;
  travelNote?: string;
  foodSuggestion?: string;
};

export type ItineraryDay = {
  dayNumber: number;
  title: string;
  summary: string;
  morning: ItineraryBlock;
  afternoon: ItineraryBlock;
  evening: ItineraryBlock;
  placesToVisit: string[];
  activities: string[];
  foodSuggestions: string[];
  travelNotes: string[];
  stayArea: string;
  estimatedDailyBudget: string;
};

export type HowToReachMode = {
  mode: ItineraryTransport;
  summary: string;
  note: string;
};

export type ItineraryExperience = {
  name: string;
  description: string;
  category: string;
};

export type BudgetLine = {
  category: string;
  estimate: string;
};

export type ItineraryRecord = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  origin: ItineraryOrigin;
  originLabel: string;
  destinationSlug: string;
  destinationName: string;
  days: number;
  nights: number;
  duration: ItineraryDuration;
  tripType: ItineraryTripType;
  travelModes: ItineraryTransport[];
  travelStyle: ItineraryTravelStyle;
  budgetCategory: ItineraryBudget;
  estimatedBudget: string;
  budgetLines: BudgetLine[];
  bestFor: ItineraryAudience[];
  interests: string[];
  bestTimeToVisit: string;
  heroImage: string | null;
  overview: string;
  highlights: string[];
  routeSummary: string;
  travelTimeCategory: string;
  dayPlans: ItineraryDay[];
  howToReach: HowToReachMode[];
  experiences: ItineraryExperience[];
  travelTips: string[];
  packingSuggestions: string[];
  thingsToKnow: string[];
  faq: ItineraryFaq[];
  relatedDestinations: string[];
  relatedItineraries: string[];
  relatedTools: string[];
  seoTitle: string;
  seoDescription: string;
};

export function durationFromDays(days: number): ItineraryDuration {
  if (days <= 1) {
    return "1-day";
  }
  if (days === 2) {
    return "2-days";
  }
  return "3-days";
}

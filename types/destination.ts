export const origins = [
  "delhi",
  "gurgaon",
  "noida",
  "ghaziabad",
  "faridabad",
] as const;

export const tripDurations = [
  "day-trip",
  "1n2d",
  "2n3d",
  "3n4d",
] as const;

export const budgetRanges = [
  "under-3000",
  "3000-5000",
  "5000-10000",
  "10000-15000",
  "15000-plus",
] as const;

export const groups = ["solo", "couple", "friends", "family"] as const;

export const transports = ["bike", "car", "bus", "train"] as const;

export const interests = [
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

export const maxTravelTimes = ["2h", "4h", "6h", "8h", "10h-plus"] as const;

export type Origin = (typeof origins)[number];
export type TripDuration = (typeof tripDurations)[number];
export type BudgetRange = (typeof budgetRanges)[number];
export type GroupType = (typeof groups)[number];
export type Transport = (typeof transports)[number];
export type Interest = (typeof interests)[number];
export type MaxTravelTime = (typeof maxTravelTimes)[number];
export type TravelCorridor = "north-hills" | "west-rajasthan" | "south-up";

export type Destination = {
  id: string;
  name: string;
  slug: string;
  description: string;
  region: string;
  tripDuration: TripDuration[];
  budgetRange: BudgetRange[];
  travelTimeCategory: MaxTravelTime;
  approxTravelHoursFromDelhi: number;
  corridor: TravelCorridor;
  bestFor: GroupType[];
  interests: Interest[];
  transport: Transport[];
  season: string;
  tags: string[];
  highlights: string[];
};

export type WeekendPreferences = {
  origin: Origin;
  duration: TripDuration;
  budget: BudgetRange;
  group: GroupType;
  transport: Transport;
  interests: Interest[];
  maxTravelTime: MaxTravelTime;
};

export type MatchReason = {
  ok: boolean;
  label: string;
};

export type WeekendRecommendation = {
  destination: Destination;
  matchPercent: number;
  reasons: MatchReason[];
  recommendedDuration: TripDuration;
  whySummary: string;
};

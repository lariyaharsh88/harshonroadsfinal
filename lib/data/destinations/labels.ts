import type {
  DestinationAudience,
  DestinationBudget,
  DestinationDuration,
  DestinationInterest,
  DestinationRegion,
  DestinationTransport,
  DestinationTravelStyle,
  DestinationTravelTime,
  WeekendSuitability,
} from "@/lib/data/destinations/types";

export const destinationRegionLabels: Record<DestinationRegion, string> = {
  uttarakhand: "Uttarakhand",
  "himachal-pradesh": "Himachal Pradesh",
  rajasthan: "Rajasthan",
  "uttar-pradesh": "Uttar Pradesh",
};

export const destinationDurationLabels: Record<DestinationDuration, string> = {
  "day-trip": "Day trip",
  "1n2d": "1 night / 2 days",
  "2n3d": "2 nights / 3 days",
  "3n4d": "3 nights / 4 days",
};

export const destinationBudgetLabels: Record<DestinationBudget, string> = {
  budget: "Budget-friendly",
  mid: "Mid-range",
  high: "Higher spend",
};

export const destinationTravelTimeLabels: Record<DestinationTravelTime, string> =
  {
    "under-4h": "Under ~4 hours",
    "4-6h": "About 4–6 hours",
    "6-8h": "About 6–8 hours",
    "8h-plus": "About 8 hours or more",
  };

export const destinationTravelStyleLabels: Record<
  DestinationTravelStyle,
  string
> = {
  peaceful: "Peaceful",
  adventure: "Adventure",
  heritage: "Heritage",
  wildlife: "Wildlife",
  hills: "Hills",
  spiritual: "Spiritual",
  "city-break": "City break",
};

export const destinationInterestLabels: Record<DestinationInterest, string> = {
  mountains: "Mountains",
  nature: "Nature",
  adventure: "Adventure",
  peaceful: "Peaceful",
  romantic: "Romantic",
  heritage: "Heritage",
  wildlife: "Wildlife",
  food: "Food",
  photography: "Photography",
  nightlife: "Nightlife",
};

export const destinationTransportLabels: Record<DestinationTransport, string> =
  {
    bike: "Bike",
    car: "Car",
    bus: "Bus",
    train: "Train",
  };

export const destinationAudienceLabels: Record<DestinationAudience, string> = {
  solo: "Solo",
  couples: "Couples",
  friends: "Friends",
  families: "Families",
  riders: "Riders",
};

export const weekendSuitabilityLabels: Record<WeekendSuitability, string> = {
  strong: "Strong weekend fit from Delhi NCR",
  good: "Workable weekend if you leave early",
  "better-long-weekend": "Better as a long weekend than a rushed Saturday dash",
};

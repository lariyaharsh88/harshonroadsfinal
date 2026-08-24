import type {
  ItineraryAudience,
  ItineraryBudget,
  ItineraryDuration,
  ItineraryTransport,
  ItineraryTravelStyle,
  ItineraryTripType,
} from "@/lib/data/itineraries/types";

export const itineraryDurationLabels: Record<ItineraryDuration, string> = {
  "1-day": "1 day",
  "2-days": "2 days / 1 night",
  "3-days": "3 days / 2 nights",
};

export const itineraryBudgetLabels: Record<ItineraryBudget, string> = {
  budget: "Budget",
  mid: "Mid-range",
  high: "Higher spend",
};

export const itineraryTripTypeLabels: Record<ItineraryTripType, string> = {
  "day-trip": "Day trip",
  weekend: "Weekend",
  "long-weekend": "Long weekend",
};

export const itineraryTravelStyleLabels: Record<ItineraryTravelStyle, string> =
  {
    relaxed: "Relaxed",
    adventure: "Adventure",
    heritage: "Heritage",
    wildlife: "Wildlife",
    hills: "Hills",
    spiritual: "Spiritual",
  };

export const itineraryTransportLabels: Record<ItineraryTransport, string> = {
  car: "Car",
  bike: "Bike",
  bus: "Bus",
  train: "Train",
};

export const itineraryAudienceLabels: Record<ItineraryAudience, string> = {
  solo: "Solo",
  couples: "Couples",
  friends: "Friends",
  families: "Family",
};

export const itineraryPeriodLabels = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
} as const;

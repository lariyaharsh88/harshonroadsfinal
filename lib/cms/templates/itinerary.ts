import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export function createItineraryTemplate(): ItineraryRecord {
  return {
    id: "new-itinerary",
    slug: "delhi-to-new-place-2-day-itinerary",
    title: "Delhi to New Place 2-Day Itinerary",
    shortDescription: "Short description for cards and SEO.",
    origin: "delhi-ncr",
    originLabel: "Delhi NCR",
    destinationSlug: "new-destination",
    destinationName: "New Place",
    days: 2,
    nights: 1,
    duration: "2-days",
    tripType: "weekend",
    travelModes: ["car"],
    travelStyle: "relaxed",
    budgetCategory: "mid",
    estimatedBudget:
      "Typically ₹X–₹Y per person for 2 days. Categories only — not live prices.",
    budgetLines: [
      { category: "Transport", estimate: "Approximate transport band." },
      { category: "Accommodation", estimate: "One night stay band." },
      { category: "Food", estimate: "Meals band." },
      { category: "Activities", estimate: "Optional activities." },
      { category: "Tolls / parking", estimate: "If self-driving." },
      { category: "Miscellaneous", estimate: "Small buffer." },
    ],
    bestFor: ["couples"],
    interests: ["nature"],
    bestTimeToVisit: "General season guidance.",
    heroImage: null,
    overview: "Overview paragraph.",
    highlights: ["Highlight one"],
    routeSummary: "Route summary with approximate travel category.",
    travelTimeCategory: "About X–Y hours each way (approximate).",
    dayPlans: [
      {
        dayNumber: 1,
        title: "Travel and settle",
        summary: "Day one summary.",
        morning: {
          period: "morning",
          title: "Leave Delhi NCR",
          description: "Travel notes.",
        },
        afternoon: {
          period: "afternoon",
          title: "Check in",
          description: "Afternoon notes.",
        },
        evening: {
          period: "evening",
          title: "Evening walk",
          description: "Evening notes.",
        },
        placesToVisit: ["Place one"],
        activities: ["Activity one"],
        foodSuggestions: ["Food suggestion"],
        travelNotes: ["Travel note"],
        stayArea: "Stay area or type — not a specific hotel.",
        estimatedDailyBudget: "Estimated daily spend band.",
      },
      {
        dayNumber: 2,
        title: "Return",
        summary: "Day two summary.",
        morning: {
          period: "morning",
          title: "Morning activity",
          description: "Morning notes.",
        },
        afternoon: {
          period: "afternoon",
          title: "Return journey",
          description: "Return notes.",
        },
        evening: {
          period: "evening",
          title: "Arrive NCR",
          description: "Evening notes.",
        },
        placesToVisit: [],
        activities: ["Return travel"],
        foodSuggestions: ["Breakfast", "Snacks"],
        travelNotes: ["Leave with a buffer."],
        stayArea: "N/A — return day.",
        estimatedDailyBudget: "Mostly transport and meals.",
      },
    ],
    howToReach: [
      {
        mode: "car",
        summary: "Self-drive pattern.",
        note: "Not a live ETA.",
      },
    ],
    experiences: [
      {
        name: "Experience one",
        description: "Short description.",
        category: "Walk",
      },
    ],
    travelTips: ["Tip one"],
    packingSuggestions: ["Packing item one"],
    thingsToKnow: ["Thing to know"],
    faq: [
      {
        question: "How many days do I need?",
        answer: "Honest duration guidance.",
      },
    ],
    relatedDestinations: [],
    relatedItineraries: [],
    relatedTools: [
      "weekend-trip-finder",
      "weekend-trip-budget",
      "weekend-packing-list",
    ],
    seoTitle: "Delhi to New Place 2-Day Itinerary",
    seoDescription:
      "Plan a Delhi to New Place 2-day weekend trip with a practical itinerary and travel tips.",
  };
}

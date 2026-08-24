import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToKasauli: ItineraryRecord = {
  id: "delhi-to-kasauli-2-day",
  slug: "delhi-to-kasauli-2-day-itinerary",
  title: "Delhi to Kasauli 2-Day Itinerary",
  shortDescription:
    "A 2-day, 1-night quiet Himachal cantonment weekend from Delhi NCR: one climb, pine walks, and an early Sunday descent.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "kasauli",
  destinationName: "Kasauli",
  days: 2,
  nights: 1,
  duration: "2-days",
  tripType: "weekend",
  travelModes: ["car", "bike", "bus"],
  travelStyle: "relaxed",
  budgetCategory: "mid",
  estimatedBudget:
    "Typically ₹6,000–₹12,000 per person for 2 days, depending on stay and whether you hire a cab on the hill.",
  budgetLines: [
    { category: "Transport", estimate: "Fuel via Chandigarh / Kalka belt, or bus plus last-mile." },
    { category: "Accommodation", estimate: "One night. Peak weekends fill even in a small town." },
    { category: "Food", estimate: "Fewer cafe options than Mussoorie. Stay meals are common." },
    { category: "Activities", estimate: "Walks are the plan. Paid viewpoints are optional." },
    { category: "Tolls / parking", estimate: "Highway tolls if you self-drive." },
    { category: "Miscellaneous", estimate: "Warm layer, snacks, small buffer." },
  ],
  bestFor: ["couples", "friends", "solo"],
  interests: ["quiet hills", "walking", "cantonment town"],
  bestTimeToVisit:
    "Often pleasant outside peak monsoon. Winters are colder — pack for it. Respect cantonment access rules.",
  heroImage: null,
  overview:
    "Kasauli is a small, walkable hill pocket. Two days is enough. Do not treat it as a Shimla substitute. Follow local access rules on restricted roads.",
  highlights: [
    "Walk-first evening",
    "Quieter than Mall-heavy hill stations",
    "Sensible return buffer",
  ],
  routeSummary:
    "Delhi NCR toward Chandigarh / Kalka then the Kasauli climb. Treat it as a long half-day-plus drive category — often 5–7 hours in ordinary traffic, not a guaranteed clock time.",
  travelTimeCategory: "About 5–7 hours each way by road in ordinary traffic, plus the hill stretch (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Climb and a quiet evening",
      summary: "Travel, check in, and a pine walk — not a shopping circuit.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Kasauli",
        location: "Plains toward Chandigarh / Kalka, then the hill road",
        description: "Leave early. App ETAs are not promises.",
        travelNote: "Fog and rain add time.",
      },
      afternoon: {
        period: "afternoon",
        title: "Check in",
        location: "Town / stay area",
        description: "Drop bags. Walk nearby. Skip a viewpoint checklist on arrival.",
        foodSuggestion: "Lunch at or near the stay.",
      },
      evening: {
        period: "evening",
        title: "Town and ridge walk",
        location: "Public walking routes (local rules apply)",
        description: "Keep to allowed roads. Photography rules exist in places.",
        foodSuggestion: "Early dinner. Nights are quiet.",
      },
      placesToVisit: ["Stay neighbourhood", "Public walks"],
      activities: ["Walking"],
      foodSuggestions: ["Stay meals", "Simple town plates"],
      travelNotes: ["If you ride, finish the climb in daylight when you can."],
      stayArea: "In-town or a nearby hillside stay. No hotel is endorsed.",
      estimatedDailyBudget: "Transport-heavy day.",
    },
    {
      dayNumber: 2,
      title: "Morning walk and return",
      summary: "One ridge pocket, then descent.",
      morning: {
        period: "morning",
        title: "Short walk",
        location: "Nearby public ridge",
        description: "Cloud can hide views. Tea is a valid backup.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Kasauli → Delhi NCR",
        description: "Leave with a buffer. Sunday plains traffic can slow.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description: "Simple meal at home.",
      },
      placesToVisit: ["One morning pocket"],
      activities: ["Walk", "Return travel"],
      foodSuggestions: ["Breakfast", "Packed snacks"],
      travelNotes: ["Fuel before long stretches if you self-drive."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Mostly transport and meals.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Usual self-drive or hired-car pattern via the Chandigarh / Kalka belt.",
      note: "Not a live ETA.",
    },
    {
      mode: "bike",
      summary: "A full riding day plus a climb.",
      note: "Daylight on the hill road matters.",
    },
    {
      mode: "bus",
      summary: "Services toward Chandigarh / Kalka plus last-mile uphill.",
      note: "Verify current services before you travel.",
    },
  ],
  experiences: [
    { name: "Pine walk", description: "The reason to pick Kasauli.", category: "Walk" },
    { name: "Quiet evening", description: "Early dinner, few neon strips.", category: "Relaxed" },
  ],
  travelTips: [
    "Leave NCR early.",
    "Respect cantonment restrictions.",
    "Carry a warm layer.",
    "Check monsoon road updates.",
  ],
  packingSuggestions: [
    "Warm layer, walking shoes, rain shell in monsoon.",
    "Power bank and water bottle.",
  ],
  thingsToKnow: [
    "This is a quiet weekend, not Shimla.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "Two days / one night is enough for a first look.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Often a mid band, commonly spoken of as roughly ₹6,000–₹12,000 per person. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "Yes if you leave early and keep it walk-first.",
    },
    {
      question: "Which transport is best?",
      answer: "Car is the default. Bike for experienced riders. Bus plus last-mile if you do not drive.",
    },
    {
      question: "What should I pack?",
      answer: "Warm layer, walking shoes, rain cover. Use the Weekend Packing List tool.",
    },
    {
      question: "Can this itinerary be customised?",
      answer: "Yes. Add a night or swap walks. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["kasauli"],
  relatedItineraries: [
    "delhi-to-mussoorie-2-day-itinerary",
    "delhi-to-lansdowne-2-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-nainital-3-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Kasauli 2-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Kasauli 2-day weekend with a quiet hill itinerary, budget bands and travel tips. Estimates only.",
};

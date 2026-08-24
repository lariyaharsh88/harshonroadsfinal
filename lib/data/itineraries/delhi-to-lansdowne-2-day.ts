import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToLansdowne: ItineraryRecord = {
  id: "delhi-to-lansdowne-2-day",
  slug: "delhi-to-lansdowne-2-day-itinerary",
  title: "Delhi to Lansdowne 2-Day Itinerary",
  shortDescription:
    "A quieter 2-day, 1-night Garhwal hill weekend from Delhi NCR — walks, pine cover and an unhurried evening rather than a mall circuit.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "lansdowne",
  destinationName: "Lansdowne",
  days: 2,
  nights: 1,
  duration: "2-days",
  tripType: "weekend",
  travelModes: ["car", "bike", "bus"],
  travelStyle: "relaxed",
  budgetCategory: "budget",
  estimatedBudget:
    "Typically ₹5,000–₹10,000 per person for 2 days, depending on stay standard and whether you self-drive.",
  budgetLines: [
    { category: "Transport", estimate: "Fuel is often the large line if you self-drive. Buses exist with last-mile time." },
    { category: "Accommodation", estimate: "One night. Smaller hill stays; peak weekends still fill." },
    { category: "Food", estimate: "Simple hotel and local meals. Fewer cafe options than Mussoorie." },
    { category: "Activities", estimate: "Walks are the main spend-saver. Paid viewpoints are optional." },
    { category: "Tolls / parking", estimate: "Highway tolls if you self-drive." },
    { category: "Miscellaneous", estimate: "Snacks, water, a small buffer." },
  ],
  bestFor: ["couples", "friends", "solo"],
  interests: ["quiet hills", "walking", "pine forest"],
  bestTimeToVisit:
    "Often pleasant outside peak monsoon. Winters are colder than NCR — pack for it and keep daylight on the hill road.",
  heroImage: null,
  overview:
    "Lansdowne rewards people who want a quieter hill pocket, not a shopping street. Two days is enough for a walk and a night. Do not treat it as a substitute for Mussoorie’s cafe density.",
  highlights: [
    "Quieter hill evening than the big mall towns",
    "Walk-first plan",
    "Sensible Sunday return buffer",
  ],
  routeSummary:
    "Delhi NCR toward Kotdwar then the hill road to Lansdowne. Treat it as a long half-day-plus drive category in ordinary traffic — not a guaranteed clock time.",
  travelTimeCategory: "About 5–7 hours each way by road in ordinary traffic, plus the hill stretch (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Arrive and walk",
      summary: "Travel, check in, and a pine-side evening walk.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Lansdowne",
        location: "Plains toward Kotdwar, then the hill road",
        description:
          "Leave early. This is not a two-hour hop. App ETAs are not promises.",
        travelNote: "Fog and rain add time. Stretch stops help.",
      },
      afternoon: {
        period: "afternoon",
        title: "Check in",
        location: "Town / stay area",
        description: "Drop bags. Walk the nearest quiet road instead of a viewpoint checklist.",
        foodSuggestion: "Lunch at or near the stay. Options are thinner than in larger hill stations.",
      },
      evening: {
        period: "evening",
        title: "Pine and cantonment-side walk",
        location: "Town walks (local rules apply)",
        description: "Keep it local. Photography and access rules exist in places — follow them.",
        foodSuggestion: "Early dinner. Nights are quiet.",
      },
      placesToVisit: ["Stay neighbourhood", "Nearby forest / ridge walk"],
      activities: ["Walking"],
      foodSuggestions: ["Stay meals", "Simple local plates"],
      travelNotes: ["If you ride, finish the climb in daylight when you can."],
      stayArea: "In-town or a nearby hillside stay. No specific hotel is endorsed.",
      estimatedDailyBudget: "Transport-heavy day.",
    },
    {
      dayNumber: 2,
      title: "Morning walk and return",
      summary: "One ridge or forest pocket, then descent.",
      morning: {
        period: "morning",
        title: "Short walk or viewpoint",
        location: "Nearby ridge / forest edge",
        description: "Pick one. Cloud can hide views — a tea stop is a valid backup.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Lansdowne → Delhi NCR",
        description: "Leave with a buffer. Sunday plains traffic toward NCR can slow.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description: "Simple meal at home.",
      },
      placesToVisit: ["One morning pocket"],
      activities: ["Walk", "Return travel"],
      foodSuggestions: ["Breakfast at stay", "Packed snacks"],
      travelNotes: ["Fuel before long empty stretches if you self-drive."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Mostly transport and meals.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Usual self-drive or hired-car pattern via the Kotdwar belt.",
      note: "Not a live ETA. Fog and weekend traffic change the clock.",
    },
    {
      mode: "bike",
      summary: "A full riding day plus a climb.",
      note: "Daylight on the hill road matters.",
    },
    {
      mode: "bus",
      summary: "Services toward Kotdwar plus last-mile uphill.",
      note: "Verify current services before you travel.",
    },
  ],
  experiences: [
    { name: "Pine-side walk", description: "The reason to pick Lansdowne over a louder mall town.", category: "Walk" },
    { name: "Quiet evening", description: "Early dinner, fewer neon strips.", category: "Relaxed" },
  ],
  travelTips: [
    "Leave NCR early.",
    "Expect fewer late-night food options.",
    "Carry a warm layer.",
    "Check monsoon road updates.",
  ],
  packingSuggestions: [
    "Warm layer, walking shoes, rain shell in monsoon.",
    "Power bank and water bottle.",
  ],
  thingsToKnow: [
    "This is a quiet weekend, not an adventure park.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "Two days / one night is enough for a first look. Add a night if you want slower mornings.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Often a budget-to-mid band, commonly spoken of as roughly ₹5,000–₹10,000 per person. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "Yes if you leave early and keep the plan walk-first.",
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
      answer: "Yes. Stretch walks or add a night. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["lansdowne"],
  relatedItineraries: [
    "delhi-to-mussoorie-2-day-itinerary",
    "delhi-to-kasauli-2-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-jim-corbett-2-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Lansdowne 2-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Lansdowne 2-day weekend with a quiet hill itinerary, budget bands and travel tips. Estimates only.",
};

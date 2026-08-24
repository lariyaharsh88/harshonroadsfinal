import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToNeemrana: ItineraryRecord = {
  id: "delhi-to-neemrana-1-day",
  slug: "delhi-to-neemrana-1-day-itinerary",
  title: "Delhi to Neemrana 1-Day Itinerary",
  shortDescription:
    "A same-day heritage hop from Delhi NCR: morning drive, a fort-town block, and a return before the worst night traffic.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "neemrana",
  destinationName: "Neemrana",
  days: 1,
  nights: 0,
  duration: "1-day",
  tripType: "day-trip",
  travelModes: ["car", "bike", "bus"],
  travelStyle: "heritage",
  budgetCategory: "budget",
  estimatedBudget:
    "Typically ₹2,000–₹6,000 per person for a day trip, depending on fuel share, meals and whether you enter paid attractions.",
  budgetLines: [
    { category: "Transport", estimate: "Fuel or bus. The large line if you go alone by cab." },
    { category: "Accommodation", estimate: "None unless you choose to stay — this plan is a day trip." },
    { category: "Food", estimate: "Lunch and tea. Highway restaurants vary." },
    { category: "Activities", estimate: "Fort / attraction tickets if you enter. Confirm current access locally." },
    { category: "Tolls / parking", estimate: "Highway tolls if you self-drive." },
    { category: "Miscellaneous", estimate: "Water and a small buffer." },
  ],
  bestFor: ["couples", "friends", "families"],
  interests: ["heritage", "day trip", "highway hop"],
  bestTimeToVisit:
    "Cooler months are kinder for walking. Summer heat makes a midday fort visit harsh. Start early.",
  heroImage: null,
  overview:
    "Neemrana is one of the shorter heritage hops from NCR. It is still a full day if you want time on site — not a two-hour errand. This plan does not assume a hotel stay or a private palace booking.",
  highlights: [
    "Same-day return",
    "One heritage block",
    "Early start and an early-ish return",
  ],
  routeSummary:
    "Delhi NCR toward the Jaipur highway belt / Neemrana. Treat road time as a roughly 2–3.5 hour category each way in ordinary traffic — not a guaranteed clock time.",
  travelTimeCategory: "About 2–3.5 hours each way by road in ordinary traffic (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Day trip there and back",
      summary: "Morning drive, a heritage block, lunch, then a conservative return.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Neemrana",
        location: "Highway toward the Jaipur belt",
        description:
          "Leave early. Weekend highway traffic still clumps. App ETAs are not promises.",
        travelNote: "Fog in winter can add time.",
      },
      afternoon: {
        period: "afternoon",
        title: "Fort-town / heritage block",
        location: "Neemrana heritage area",
        description:
          "Walk and, if open to visitors, enter paid areas after checking current rules. This is not a hotel reservation.",
        foodSuggestion: "Lunch in town or a known highway stop. Carry water in heat.",
        travelNote: "Access and ticket rules change. Confirm on the day.",
      },
      evening: {
        period: "evening",
        title: "Return to NCR",
        location: "Neemrana → Delhi NCR",
        description:
          "Leave before the worst evening bunching if you can. Do not add a second town.",
        foodSuggestion: "Tea on the highway if needed. Dinner at home is the plan.",
      },
      placesToVisit: ["Heritage / fort precinct"],
      activities: ["Walking", "Optional paid entry"],
      foodSuggestions: ["Town or highway lunch"],
      travelNotes: ["Park once. Do not circle."],
      stayArea: "Day trip — no stay unless you independently book one.",
      estimatedDailyBudget: "Transport, food, optional tickets.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Usual self-drive or hired-car pattern on the Delhi–Jaipur highway belt.",
      note: "Not a live ETA. Tolls apply.",
    },
    {
      mode: "bike",
      summary: "A manageable highway day in cooler months. Heat is the constraint in summer.",
      note: "Hydration and daylight matter.",
    },
    {
      mode: "bus",
      summary: "Highway buses toward this belt exist. Last-mile to the fort area still takes time.",
      note: "Verify current services before you travel.",
    },
  ],
  experiences: [
    { name: "Heritage precinct walk", description: "The point of the hop.", category: "Heritage" },
    { name: "Highway tea", description: "Part of the NCR day-trip rhythm.", category: "Food" },
  ],
  travelTips: [
    "Start earlier than a city brunch.",
    "Summer midday is harsh for walking.",
    "Do not assume palace-hotel access without a booking you already have.",
    "Confirm attraction hours on the day.",
  ],
  packingSuggestions: [
    "Sun protection, walking shoes, water.",
    "A light layer for AC cars / evening return.",
  ],
  thingsToKnow: [
    "This is a day trip, not an overnight itinerary.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "One full day is the usual shape. Overnight is optional if you already have a stay.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Often a budget band, commonly spoken of as roughly ₹2,000–₹6,000 per person if you share a car. Solo cabs cost more. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "Yes as a Saturday or Sunday day trip if you leave early and skip extra towns.",
    },
    {
      question: "Which transport is best?",
      answer: "Car is the default. Bike in cooler months. Bus plus last-mile if you do not drive.",
    },
    {
      question: "What should I pack?",
      answer: "Walking shoes, sun protection, water. Use the Weekend Packing List tool.",
    },
    {
      question: "Can this itinerary be customised?",
      answer: "Yes. Turn it into an overnight or combine with a Jaipur weekend. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["neemrana"],
  relatedItineraries: [
    "delhi-to-jaipur-2-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-lansdowne-2-day-itinerary",
    "delhi-to-kasauli-2-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Neemrana 1-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Neemrana day trip with a practical itinerary, budget bands and travel tips. Estimates only.",
};

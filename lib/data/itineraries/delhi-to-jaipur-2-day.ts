import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToJaipur: ItineraryRecord = {
  id: "delhi-to-jaipur-2-day",
  slug: "delhi-to-jaipur-2-day-itinerary",
  title: "Delhi to Jaipur 2-Day Itinerary",
  shortDescription:
    "A 2-day, 1-night heritage weekend from Delhi NCR: one old-city block, one evening, and a disciplined return — not a three-fort marathon.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "jaipur",
  destinationName: "Jaipur",
  days: 2,
  nights: 1,
  duration: "2-days",
  tripType: "weekend",
  travelModes: ["car", "bike", "bus", "train"],
  travelStyle: "heritage",
  budgetCategory: "mid",
  estimatedBudget:
    "Typically ₹6,000–₹13,000 per person for 2 days, depending on stay area and how many paid monuments you enter.",
  budgetLines: [
    { category: "Transport", estimate: "Expressway fuel or train tickets. City cabs add up if you hop forts." },
    { category: "Accommodation", estimate: "One night. Old-city-adjacent rooms cost more on peak weekends." },
    { category: "Food", estimate: "Thalis and cafes. Tourist-strip meals cost more." },
    { category: "Activities", estimate: "Monument tickets are extra. Do not assume combo prices from an old blog." },
    { category: "Tolls / parking", estimate: "Expressway tolls if you self-drive. City parking can be tight." },
    { category: "Miscellaneous", estimate: "Water, souvenirs buffer, a small taxi float." },
  ],
  bestFor: ["couples", "friends", "families"],
  interests: ["heritage", "food", "old city"],
  bestTimeToVisit:
    "Often more comfortable in cooler months. Summer days are harsh for fort-hopping. Festival weekends are crowded.",
  heroImage: null,
  overview:
    "Jaipur in two days is one heritage cluster plus an evening, not Amber, City Palace, Nahargarh and a shopping list. Leave NCR early. Heat and queues will eat a sloppy plan.",
  highlights: [
    "One fort or palace cluster, not five",
    "An old-city or bazaar evening if you have energy",
    "Train option to skip night driving",
  ],
  routeSummary:
    "Delhi NCR toward Jaipur by expressway, or train on the Delhi–Jaipur corridor plus station-side time. Treat road time as a roughly 4–6 hour category in ordinary traffic — not a guaranteed clock time.",
  travelTimeCategory: "About 4–6 hours each way by road in ordinary traffic (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Travel and one heritage block",
      summary: "Arrive, check in, and pick one cluster — usually Amber-side or old-city, not both at full tilt.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Jaipur",
        location: "Expressway / rail corridor",
        description:
          "Leave early by road, or take a morning train. Do not treat app ETAs as promises.",
        travelNote: "Weekend expressway traffic still clumps. Trains need station buffers.",
      },
      afternoon: {
        period: "afternoon",
        title: "One fort or palace cluster",
        location: "Amber belt or old city — pick one",
        description:
          "Enter one major site if tickets and queues allow. Skip stacking a second fort the same afternoon.",
        foodSuggestion: "A simple lunch near the cluster. Carry water in heat.",
        travelNote: "Ticket rules and prices change. Check official sources on the day.",
      },
      evening: {
        period: "evening",
        title: "Old-city walk or a quiet stay evening",
        location: "Bazaar lanes or stay neighbourhood",
        description:
          "A short bazaar walk if you still have legs. Otherwise rest. This is not a night-market obligation.",
        foodSuggestion: "Thali or a known cafe. Street food only if you already tolerate it.",
      },
      placesToVisit: ["One monument cluster", "Stay neighbourhood"],
      activities: ["Heritage visit", "Optional bazaar walk"],
      foodSuggestions: ["Thalis", "Cafes"],
      travelNotes: ["Park once. City circling wastes heat and fuel."],
      stayArea:
        "Old-city fringe, MI Road belt, or a quieter outskirts stay with a plan for cabs. No hotel is endorsed.",
      estimatedDailyBudget: "Transport plus optional monument tickets.",
    },
    {
      dayNumber: 2,
      title: "Light morning and return",
      summary: "One museum, garden or cafe — then leave before the worst return traffic.",
      morning: {
        period: "morning",
        title: "City Palace area, a garden, or a cafe",
        location: "Central Jaipur — one pocket",
        description:
          "Pick one. Do not reopen the entire Amber plan.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Jaipur → Delhi NCR",
        description:
          "Leave with a buffer. Sunday expressway traffic toward NCR can bunch. Trains need station time.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description: "Simple meal at home.",
      },
      placesToVisit: ["One morning pocket"],
      activities: ["Light heritage or cafe", "Return travel"],
      foodSuggestions: ["Breakfast", "Packed water"],
      travelNotes: ["Confirm train times on the day you travel."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Mostly transport and meals.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Common self-drive or hired-car pattern on the Delhi–Jaipur expressway.",
      note: "Tolls and weekend traffic change the clock. Not a live ETA.",
    },
    {
      mode: "bike",
      summary: "A long highway day. Heat and trucks are the real constraints.",
      note: "Daylight riding and hydration matter.",
    },
    {
      mode: "bus",
      summary: "Volvo and state services run this corridor.",
      note: "Verify current services before you travel.",
    },
    {
      mode: "train",
      summary: "Frequent corridor. Station-side time still counts.",
      note: "Check current enquiry for your date. This page does not list train numbers.",
    },
  ],
  experiences: [
    { name: "One fort or palace", description: "The weekend’s paid highlight — keep it to one cluster.", category: "Heritage" },
    { name: "Bazaar evening", description: "Optional and crowded. Leave if it is only noise.", category: "City" },
    { name: "Thali", description: "Easier than a restaurant crawl.", category: "Food" },
  ],
  travelTips: [
    "Summer sightseeing needs an early monument slot.",
    "Carry water and modest clothing for temples if you include them.",
    "Weekend queues are normal — pick fewer tickets.",
    "Do not invent exact ticket prices from memory; check official counters.",
  ],
  packingSuggestions: [
    "Sun protection, comfortable walking shoes, a light layer for evening.",
    "Power bank and water bottle.",
  ],
  thingsToKnow: [
    "Two days will not cover every fort on a postcard.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "Two days / one night is a first taste. Three days is better if you want two monument clusters.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Often a mid band, commonly spoken of as roughly ₹6,000–₹13,000 per person plus monument tickets. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "Yes if you pick one heritage cluster per day-part and leave NCR early.",
    },
    {
      question: "Which transport is best?",
      answer: "Train is often the least tiring. Car is flexible for groups. Bus works. Bike is a long hot highway.",
    },
    {
      question: "What should I pack?",
      answer: "Walking shoes, sun protection, a layer. Use the Weekend Packing List tool.",
    },
    {
      question: "Can this itinerary be customised?",
      answer: "Yes. Swap forts for food, or add a night. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["jaipur"],
  relatedItineraries: [
    "delhi-to-neemrana-1-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-mussoorie-2-day-itinerary",
    "delhi-to-kasauli-2-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Jaipur 2-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Jaipur 2-day weekend with a practical heritage itinerary, budget bands and travel tips. Estimates only.",
};

import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToMussoorie: ItineraryRecord = {
  id: "delhi-to-mussoorie-2-day",
  slug: "delhi-to-mussoorie-2-day-itinerary",
  title: "Delhi to Mussoorie 2-Day Itinerary",
  shortDescription:
    "A 2-day, 1-night hill-station weekend from Delhi NCR: one climb, one Mall-side evening, and a conservative Sunday return.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "mussoorie",
  destinationName: "Mussoorie",
  days: 2,
  nights: 1,
  duration: "2-days",
  tripType: "weekend",
  travelModes: ["car", "bike", "bus", "train"],
  travelStyle: "hills",
  budgetCategory: "mid",
  estimatedBudget:
    "Typically ₹7,000–₹14,000 per person for 2 days, depending on stay location and whether you hire local cabs.",
  budgetLines: [
    { category: "Transport", estimate: "Road fuel or train-plus-taxi. Hill last-mile can add a cab if you do not drive up." },
    { category: "Accommodation", estimate: "One night. Mall-adjacent rooms cost more on peak weekends." },
    { category: "Food", estimate: "Cafe and hotel meals. Budget a buffer if you eat only on the Mall." },
    { category: "Activities", estimate: "Walks are free. Paid viewpoints or ropeways are optional extras." },
    { category: "Tolls / parking", estimate: "Highway tolls plus hill-town parking pressure on Saturdays." },
    { category: "Miscellaneous", estimate: "Warm layer, snacks, and a small taxi buffer." },
  ],
  bestFor: ["couples", "friends", "families"],
  interests: ["hills", "walking", "cafes", "views"],
  bestTimeToVisit:
    "Often pleasant outside peak monsoon and the busiest holiday weekends. Winter needs warmer packing and daylight driving.",
  heroImage: null,
  overview:
    "Mussoorie in two days is a hill climb plus one evening, not a full Doon-and-beyond circuit. Leave NCR early. Do not add Dehradun sightseeing unless you already have slack. Sunday descents toward the plains routinely slow down.",
  highlights: [
    "Early start so the climb is not entirely after dark",
    "One Mall or ridge evening instead of a viewpoint checklist",
    "A buffer for the return into NCR",
  ],
  routeSummary:
    "Delhi NCR toward Dehradun then the Mussoorie climb by road, or train toward Dehradun plus taxi uphill. Treat it as a long hill-weekend drive category — not a guaranteed clock time.",
  travelTimeCategory: "About 6–8 hours each way by road in ordinary traffic, plus the hill climb (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Climb and a Mall-side evening",
      summary: "Travel, check in, and keep the evening to a walk rather than every viewpoint.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Mussoorie",
        location: "Plains toward Dehradun, then the hill road",
        description:
          "Leave before peak city traffic. If you train into Dehradun, add taxi time for the climb. App ETAs are not promises.",
        travelNote: "Fog, rain and landslide-prone stretches can add hours. Keep a stretch stop.",
      },
      afternoon: {
        period: "afternoon",
        title: "Check in and a short walk",
        location: "Stay neighbourhood",
        description:
          "Drop bags and walk nearby. Skip stacking Camel’s Back, Kempty and a cafe crawl on arrival.",
        foodSuggestion: "A simple lunch near the stay. Mall restaurants fill on Saturdays.",
      },
      evening: {
        period: "evening",
        title: "Mall or ridge walk",
        location: "Town / Mall area",
        description:
          "One evening circuit is enough. Crowds are normal on weekends — pick a quieter stretch if that bothers you.",
        foodSuggestion: "Early dinner. Hill nights get cold; carry a layer.",
      },
      placesToVisit: ["Stay neighbourhood", "Mall or nearby ridge"],
      activities: ["Walking", "Cafe time"],
      foodSuggestions: ["Cafe plates", "Hotel / guesthouse meals"],
      travelNotes: [
        "Park once if you self-drive; circling wastes the evening.",
        "If you ride, finish the climb in daylight when you can.",
      ],
      stayArea:
        "Mall-adjacent, Library end, or a quieter hillside pocket — pick one and stay put. No specific hotel is endorsed.",
      estimatedDailyBudget: "Day 1 often includes the heavier transport share.",
    },
    {
      dayNumber: 2,
      title: "One view, then descent",
      summary: "A short morning pocket, then a conservative departure.",
      morning: {
        period: "morning",
        title: "One viewpoint or a longer walk",
        location: "Town / nearby ridge",
        description:
          "Pick one pocket. Do not try to cover Landour, Kempty and Gun Hill in the same morning.",
        travelNote: "Cloud and rain can hide views. Have a cafe backup.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Mussoorie → Delhi NCR",
        description:
          "Leave with a buffer. Sunday plains traffic toward NCR routinely slows. Trains need station-side time from Dehradun.",
        travelNote: "Do not add Haridwar unless you already have slack.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description: "A simple meal at home. The itinerary ends off the highway.",
      },
      placesToVisit: ["One morning pocket only"],
      activities: ["Short walk or viewpoint", "Return travel"],
      foodSuggestions: ["Breakfast near stay", "Highway snacks"],
      travelNotes: ["Fuel before the last empty stretch if you self-drive."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Mostly transport and meals.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Common self-drive or hired-car pattern via Dehradun then the hill road.",
      note: "Tolls, fog and weekend traffic change the clock. This is not a live ETA.",
    },
    {
      mode: "bike",
      summary: "A full riding day plus a climb. Not a city hop.",
      note: "Daylight on the hill road matters. Gear is not optional.",
    },
    {
      mode: "bus",
      summary: "Services toward Dehradun / Mussoorie exist. Last-mile still takes time.",
      note: "Verify current services before you travel.",
    },
    {
      mode: "train",
      summary: "Trains toward Dehradun plus taxi uphill.",
      note: "Check current enquiry for your date. This page does not list train numbers.",
    },
  ],
  experiences: [
    { name: "Mall or ridge walk", description: "The core hill-station evening.", category: "Walk" },
    { name: "Cafe morning", description: "Useful when views are in cloud.", category: "Food" },
    { name: "One viewpoint", description: "Pick one. Do not collect five.", category: "Views" },
  ],
  travelTips: [
    "Leave NCR earlier than you think.",
    "Carry a warm layer even in shoulder months.",
    "Weekend Mall crowds are normal.",
    "Monsoon weekends need a road check.",
  ],
  packingSuggestions: [
    "Warm layer, rain shell in monsoon, walking shoes.",
    "Power bank and a refillable bottle.",
  ],
  thingsToKnow: [
    "Two days is a taste, not a Landour residency.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "Two days / one night is the common weekend shape. Three days is kinder.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Many people land in a mid band, often spoken of as roughly ₹7,000–₹14,000 per person. Stay location moves that number. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "Yes if you leave early and do not stack Dehradun, Kempty and Landour into the same 36 hours.",
    },
    {
      question: "Which transport is best?",
      answer: "Car for groups. Train to Dehradun plus taxi reduces night climbing. Bike is for experienced riders.",
    },
    {
      question: "What should I pack?",
      answer: "Warm layer, walking shoes, rain cover in monsoon. Use the Weekend Packing List tool.",
    },
    {
      question: "Can this itinerary be customised?",
      answer: "Yes. Swap the viewpoint for a longer walk, or add a night. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["mussoorie"],
  relatedItineraries: [
    "delhi-to-kasauli-2-day-itinerary",
    "delhi-to-lansdowne-2-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-nainital-3-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Mussoorie 2-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Mussoorie 2-day weekend trip with a practical itinerary, budget bands, hill-town walks and travel tips. Estimates only.",
};

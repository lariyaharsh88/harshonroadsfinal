import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToRishikesh: ItineraryRecord = {
  id: "delhi-to-rishikesh-2-day",
  slug: "delhi-to-rishikesh-2-day-itinerary",
  title: "Delhi to Rishikesh 2-Day Itinerary",
  shortDescription:
    "A 2-day, 1-night Ganga-side weekend from Delhi NCR: travel, a riverfront evening, and a lighter second morning before the return.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "rishikesh",
  destinationName: "Rishikesh",
  days: 2,
  nights: 1,
  duration: "2-days",
  tripType: "weekend",
  travelModes: ["car", "bike", "bus", "train"],
  travelStyle: "adventure",
  budgetCategory: "mid",
  estimatedBudget: "Typically ₹6,000–₹12,000 per person for 2 days, depending on stay and whether you book activities.",
  budgetLines: [
    { category: "Transport", estimate: "Fuel or tickets often sit in a mid band for this distance; split a car if you can." },
    { category: "Accommodation", estimate: "One night near the river or in town. Rates swing on long weekends." },
    { category: "Food", estimate: "Cafe and simple vegetarian meals. Budget extra if you eat at stay restaurants." },
    { category: "Activities", estimate: "Optional. River activities are seasonal and paid separately — confirm locally." },
    { category: "Tolls / parking", estimate: "Highway tolls if you self-drive. Parking in town can be tight on Saturdays." },
    { category: "Miscellaneous", estimate: "Keep a small buffer for water, snacks and an unplanned taxi." },
  ],
  bestFor: ["solo", "couples", "friends"],
  interests: ["river", "walking", "cafes", "optional adventure"],
  bestTimeToVisit:
    "Often comfortable outside peak monsoon. River activities follow local seasons and rules — check before you pack for the water.",
  heroImage: null,
  overview:
    "This plan assumes you can leave Delhi NCR early on day one. It is a sketch, not a live timetable. Keep one activity, not five. Two nights is kinder if you hate highway nights; this 1-night version still works if you stay disciplined.",
  highlights: [
    "Early departure so you are not only on NH traffic after dark",
    "A riverfront evening instead of a packed adventure checklist",
    "A buffer morning before the return to NCR",
  ],
  routeSummary:
    "Delhi NCR toward Haridwar–Rishikesh by road, or train toward the same belt plus a last-mile taxi. Treat distance as a roughly 5–7 hour road category in ordinary traffic — not a guaranteed clock time.",
  travelTimeCategory: "About 5–7 hours each way by road in ordinary traffic (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Travel and settle by the river",
      summary: "Leave NCR early, check in, and keep the evening for a walk rather than a stacked activity list.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Rishikesh",
        location: "Highway toward Haridwar / Rishikesh",
        description:
          "Aim to leave before peak city traffic. If you train, pick a morning service and add last-mile time. Do not treat any app ETA as a promise.",
        travelNote: "Fog, rain and weekend jams can add hours. Carry water and a stretch stop.",
      },
      afternoon: {
        period: "afternoon",
        title: "Check in and a short neighbourhood walk",
        location: "Town or river-adjacent stay area",
        description:
          "Drop bags, drink water, and walk a nearby lane or ghat. Skip booking every operator on arrival.",
        foodSuggestion: "A simple lunch near your stay. Cafe hours vary — ask, do not assume.",
      },
      evening: {
        period: "evening",
        title: "Riverfront evening",
        location: "Ghat / river walk (local rules apply)",
        description:
          "An aarti or a quiet walk, depending on crowds and your energy. Photography rules exist in places — follow them.",
        foodSuggestion: "Early dinner. Town nights are not a club circuit.",
      },
      placesToVisit: ["Riverfront / ghat area", "Stay neighbourhood lanes"],
      activities: ["Walking", "Optional cafe time", "Optional seasonal outdoor activity next morning only if booked"],
      foodSuggestions: ["Cafe plates", "Simple North Indian / vegetarian rooms"],
      travelNotes: [
        "Park once if you self-drive; circling for spots wastes the evening.",
        "If you ride, stop while it is still daylight on the last stretch.",
      ],
      stayArea:
        "River-adjacent, in-town, or slightly uphill — pick one pocket and stay put. No specific hotel is endorsed here.",
      estimatedDailyBudget: "Day 1 often includes the heavier transport share. Treat the total trip range as the guide, not this line as a quote.",
    },
    {
      dayNumber: 2,
      title: "Light morning and return",
      summary: "One outdoor or cafe block, then a conservative departure so you are not crawling into NCR at midnight.",
      morning: {
        period: "morning",
        title: "Walk, cafe, or a booked activity",
        location: "Town / river belt",
        description:
          "If rafting or similar is in season and already confirmed, keep it to one slot. Otherwise a trail or cafe is enough.",
        travelNote: "Activities can be cancelled for water levels or rules. Have a walking backup.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Rishikesh → Delhi NCR",
        description:
          "Leave with a buffer. Sunday returns toward NCR routinely slow down. Trains need station-side time too.",
        travelNote: "Do not add Haridwar sightseeing unless you already have slack.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description:
          "Plan a simple meal at home or a known stop. The itinerary ends when you are off the highway, not at a third town.",
      },
      placesToVisit: ["One morning pocket only"],
      activities: ["Optional booked activity", "Return travel"],
      foodSuggestions: ["Breakfast near stay", "Pack snacks for the highway"],
      travelNotes: ["Fuel up before the last empty stretch if you self-drive."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Mostly transport and meals. Activities are extra if you used them.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Common self-drive or hired-car pattern via the Haridwar belt.",
      note: "Tolls, fog and weekend traffic change the clock. This is not a live ETA.",
    },
    {
      mode: "bike",
      summary: "A frequent rider weekend. Treat it as a full riding day, not a city hop.",
      note: "Daylight on hills/river-belt roads matters. Gear is not optional.",
    },
    {
      mode: "bus",
      summary: "State and private buses run this corridor. Last-mile from a bus stand still takes time.",
      note: "Verify current services before you travel. Do not rely on an old blog timetable.",
    },
    {
      mode: "train",
      summary: "Trains toward Haridwar / nearby stations plus taxi or local bus into town.",
      note: "Check IRCTC or the current enquiry for the date you travel. This page does not list train numbers.",
    },
  ],
  experiences: [
    {
      name: "River walk",
      description: "The simplest reason to come — keep it unhurried.",
      category: "Walk",
    },
    {
      name: "Cafe morning",
      description: "Useful if you skip paid adventure or if operators are closed.",
      category: "Food",
    },
    {
      name: "Seasonal river activity",
      description: "Only when local rules and water levels allow. Book and confirm, do not assume.",
      category: "Adventure",
    },
  ],
  travelTips: [
    "Leave NCR earlier than you think you need to.",
    "Carry ID if you might book a registered activity.",
    "Weekend crowds around popular ghats are normal — pick a quieter lane if that bothers you.",
    "Monsoon weekends need a road check, not just a weather emoji.",
  ],
  packingSuggestions: [
    "Light layers, modest clothing for ghats, and a rain shell in monsoon.",
    "Comfortable walking shoes. Flip-flops only as backup.",
    "Power bank and a refillable bottle.",
  ],
  thingsToKnow: [
    "This is not a luxury hill-station mall weekend.",
    "Nightlife is limited. Plan evenings around walking and dinner.",
    "Estimates on this page are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need for Rishikesh from Delhi?",
      answer:
        "Two days / one night is the common weekend shape. Three days is more comfortable. A same-day turnaround is usually a highway trip, not a visit.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Many people land in a mid band, often spoken of as roughly ₹6,000–₹12,000 per person for two days. Stay standard and activities move that number. It is not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer:
        "Yes if you leave early on day one and do not stack Haridwar, Mussoorie and rafting into the same 36 hours.",
    },
    {
      question: "Which transport is best?",
      answer:
        "Car is the default for groups. Train plus taxi reduces night driving. Bike is for experienced riders. Bus works if you accept last-mile time.",
    },
    {
      question: "What should I pack?",
      answer:
        "Walking shoes, a layer, modest clothes for ghats, and rain cover in monsoon. Use the Weekend Packing List tool to tick items.",
    },
    {
      question: "Can this itinerary be customised?",
      answer:
        "Yes. Swap the activity slot for a longer walk, or add a night. The AI Weekend Planner can sketch a version around your group — still verify roads and bookings yourself.",
    },
  ],
  relatedDestinations: ["rishikesh"],
  relatedItineraries: [
    "delhi-to-mussoorie-2-day-itinerary",
    "delhi-to-lansdowne-2-day-itinerary",
    "delhi-to-kasauli-2-day-itinerary",
    "delhi-to-jim-corbett-2-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Rishikesh 2-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Rishikesh 2-day weekend trip with a practical itinerary, budget bands, things to do and travel tips. Estimates only — verify roads and activities.",
};

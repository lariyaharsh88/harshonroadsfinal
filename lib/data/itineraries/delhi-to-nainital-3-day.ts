import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToNainital: ItineraryRecord = {
  id: "delhi-to-nainital-3-day",
  slug: "delhi-to-nainital-3-day-itinerary",
  title: "Delhi to Nainital 3-Day Itinerary",
  shortDescription:
    "A 3-day, 2-night Kumaon weekend from Delhi NCR: travel, a lake-town day, and a buffer morning before the long return.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "nainital",
  destinationName: "Nainital",
  days: 3,
  nights: 2,
  duration: "3-days",
  tripType: "long-weekend",
  travelModes: ["car", "bike", "bus"],
  travelStyle: "hills",
  budgetCategory: "mid",
  estimatedBudget:
    "Typically ₹9,000–₹18,000 per person for 3 days, depending on stay and whether you add lake-district day trips.",
  budgetLines: [
    { category: "Transport", estimate: "Fuel for a longer hill weekend, or bus plus local cabs." },
    { category: "Accommodation", estimate: "Two nights. Lake-view rooms cost more on peak weekends." },
    { category: "Food", estimate: "Mall-road meals add up. Mix stay dining if you can." },
    { category: "Activities", estimate: "Boat rides and viewpoints are optional extras. Prices change — check locally." },
    { category: "Tolls / parking", estimate: "Highway tolls plus tight hill-town parking." },
    { category: "Miscellaneous", estimate: "Warm layer, snacks, taxi buffer for nearby lakes." },
  ],
  bestFor: ["couples", "friends", "families"],
  interests: ["lake", "hills", "walking", "views"],
  bestTimeToVisit:
    "Often pleasant outside peak monsoon. Peak holiday weekends are crowded around the lake. Winters need warmer packing.",
  heroImage: null,
  overview:
    "Nainital is farther than a Jaipur hop. Three days / two nights is the honest weekend-plus shape. Two days is usually a highway sandwich. Keep day two for the lake and one nearby pocket — not every Kumaon lake on a listicle.",
  highlights: [
    "Two nights so the return is not the same evening you arrive",
    "One lake-town day instead of a five-lake circuit",
    "A buffer morning before NCR traffic",
  ],
  routeSummary:
    "Delhi NCR toward Haldwani / Kathgodam then the climb to Nainital. Treat it as a long hill-weekend drive category — often spoken of as 7–9 hours in ordinary traffic, not a guaranteed clock time.",
  travelTimeCategory: "About 7–9 hours each way by road in ordinary traffic, plus the hill climb (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Long travel day",
      summary: "Leave very early. Evening is for check-in and a short lake-edge walk, not a Mall crawl.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Nainital",
        location: "Plains toward Haldwani / Kathgodam, then the hill road",
        description:
          "This is a long day. Leave before dawn if you can. App ETAs are not promises.",
        travelNote: "Fog, rain and weekend jams add hours. Stretch stops help.",
      },
      afternoon: {
        period: "afternoon",
        title: "Climb and check in",
        location: "Hill road / stay area",
        description: "Drop bags. Do not add Bhimtal on arrival.",
        foodSuggestion: "A simple late lunch near the stay.",
      },
      evening: {
        period: "evening",
        title: "Short lake-edge walk",
        location: "Naini Lake belt",
        description: "One circuit is enough. Mall crowds are normal on weekends.",
        foodSuggestion: "Early dinner. Carry a warm layer.",
      },
      placesToVisit: ["Stay neighbourhood", "Lake edge"],
      activities: ["Walking"],
      foodSuggestions: ["Stay / Mall meals"],
      travelNotes: ["If you ride, this is a full endurance day — daylight on the climb matters."],
      stayArea: "Mall-adjacent, Tallital / Mallital, or a quieter hillside pocket. No hotel is endorsed.",
      estimatedDailyBudget: "Transport-heavy day.",
    },
    {
      dayNumber: 2,
      title: "Lake town day",
      summary: "Walk, optional boat, one viewpoint — not a five-stop taxi tour unless you already know the roads.",
      morning: {
        period: "morning",
        title: "Lake and Mall",
        location: "Naini Lake / Mall Road",
        description: "Walk first. Boat rides are optional and weather-dependent.",
      },
      afternoon: {
        period: "afternoon",
        title: "One viewpoint or nearby pocket",
        location: "Town ridge or one nearby lake — pick one",
        description:
          "Do not stack Nainital, Bhimtal, Naukuchiatal and Sattal unless you have a driver and slack.",
        foodSuggestion: "Lunch in town. Carry water.",
      },
      evening: {
        period: "evening",
        title: "Quiet evening",
        location: "Stay neighbourhood",
        description: "Rest. Tomorrow is a return day.",
        foodSuggestion: "Dinner near stay.",
      },
      placesToVisit: ["Lake", "One viewpoint or nearby pocket"],
      activities: ["Walking", "Optional boat"],
      foodSuggestions: ["Cafes", "Hotel meals"],
      travelNotes: ["Parking is painful — walk when you can."],
      stayArea: "Same stay — do not hotel-hop.",
      estimatedDailyBudget: "Food plus optional activities.",
    },
    {
      dayNumber: 3,
      title: "Buffer morning and return",
      summary: "A short walk or cafe, then a conservative descent toward NCR.",
      morning: {
        period: "morning",
        title: "Cafe or short walk",
        location: "Town",
        description: "Do not open a new lake district.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Nainital → Delhi NCR",
        description: "Leave with a large buffer. Sunday plains traffic toward NCR can be slow.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description: "Late arrival is common. Keep dinner simple.",
      },
      placesToVisit: ["None required"],
      activities: ["Return travel"],
      foodSuggestions: ["Breakfast", "Packed snacks"],
      travelNotes: ["Fuel before long stretches if you self-drive."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Mostly transport.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Usual self-drive or hired-car pattern via Haldwani / Kathgodam.",
      note: "Long day. Not a live ETA.",
    },
    {
      mode: "bike",
      summary: "A demanding two-way riding weekend. Three days is kinder than two.",
      note: "Daylight and fatigue management matter.",
    },
    {
      mode: "bus",
      summary: "Overnight and day services exist toward the Kathgodam belt plus last-mile.",
      note: "Verify current services before you travel.",
    },
  ],
  experiences: [
    { name: "Lake walk", description: "The core of the town.", category: "Walk" },
    { name: "Optional boat", description: "Weather and queue dependent. Confirm locally.", category: "Lake" },
    { name: "One viewpoint", description: "Pick one ridge, not five.", category: "Views" },
  ],
  travelTips: [
    "Treat this as a 3-day trip, not a 2-day squeeze.",
    "Carry a warm layer.",
    "Weekend Mall crowds are normal.",
    "Monsoon needs a road check.",
  ],
  packingSuggestions: [
    "Warm layers, rain shell, walking shoes.",
    "Power bank and water bottle.",
  ],
  thingsToKnow: [
    "Two days usually feels like travel, not holiday.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "Three days / two nights is the practical shape from Delhi NCR. Two days is mostly highway.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Often a mid band, commonly spoken of as roughly ₹9,000–₹18,000 per person for three days. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "It fits a long weekend better than a Sat–Sun squeeze. Leave Friday night only if you already know the road.",
    },
    {
      question: "Which transport is best?",
      answer: "Car for families. Bus if you do not want to drive. Bike only if you are used to long hill days.",
    },
    {
      question: "What should I pack?",
      answer: "Warm layers, walking shoes, rain cover. Use the Weekend Packing List tool.",
    },
    {
      question: "Can this itinerary be customised?",
      answer: "Yes. Drop the extra lake, or add a night. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["nainital"],
  relatedItineraries: [
    "delhi-to-jim-corbett-2-day-itinerary",
    "delhi-to-mussoorie-2-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-kasauli-2-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Nainital 3-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Nainital 3-day trip with a practical lake-town itinerary, budget bands and travel tips. Estimates only.",
};

import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { itineraryRelatedToolSlugs } from "@/lib/data/itineraries/related-tools";

export const delhiToJimCorbett: ItineraryRecord = {
  id: "delhi-to-jim-corbett-2-day",
  slug: "delhi-to-jim-corbett-2-day-itinerary",
  title: "Delhi to Jim Corbett 2-Day Itinerary",
  shortDescription:
    "A 2-day, 1-night forest-belt weekend from Delhi NCR: travel, a stay-area evening, and a morning safari slot only if you already have a permit.",
  origin: "delhi-ncr",
  originLabel: "Delhi NCR",
  destinationSlug: "jim-corbett",
  destinationName: "Jim Corbett",
  days: 2,
  nights: 1,
  duration: "2-days",
  tripType: "weekend",
  travelModes: ["car", "bike", "bus"],
  travelStyle: "wildlife",
  budgetCategory: "mid",
  estimatedBudget:
    "Typically ₹8,000–₹16,000 per person for 2 days, depending on stay and whether a safari is booked. Safari fees are separate and change.",
  budgetLines: [
    { category: "Transport", estimate: "Fuel for a long plains-to-foothills drive, or bus plus last-mile." },
    { category: "Accommodation", estimate: "One night in a resort / lodge belt outside core zones. Peak weekends fill." },
    { category: "Food", estimate: "Often stay-inclusive. Budget extra if you eat only at the property restaurant." },
    { category: "Activities", estimate: "Safaris are permit-based and paid. This page does not sell or confirm slots." },
    { category: "Tolls / parking", estimate: "Highway tolls if you self-drive." },
    { category: "Miscellaneous", estimate: "Buffer for permit changes and a small taxi." },
  ],
  bestFor: ["couples", "friends", "families"],
  interests: ["wildlife", "forest", "quiet stay"],
  bestTimeToVisit:
    "Safari zones follow seasonal closures and permit rules. Check official park information before you travel. Monsoon and closures can cancel the whole point of the trip.",
  heroImage: null,
  overview:
    "Corbett is not a guaranteed tiger weekend. This plan assumes a stay in the Ramnagar / resort belt and a safari only if you already hold a valid permit. Do not arrive expecting a walk-in gypsy. Two days is tight; three is kinder.",
  highlights: [
    "Stay-area evening instead of a fake ‘guaranteed sighting’",
    "Safari only with a real permit",
    "Conservative return to NCR",
  ],
  routeSummary:
    "Delhi NCR toward Moradabad / Ramnagar. Treat it as a long foothills drive category — often spoken of as 5–7 hours in ordinary traffic, not a guaranteed clock time.",
  travelTimeCategory: "About 5–7 hours each way by road in ordinary traffic (approximate).",
  dayPlans: [
    {
      dayNumber: 1,
      title: "Travel and forest-belt evening",
      summary: "Arrive, check in, and keep the evening quiet. Do not hunt for unofficial night drives.",
      morning: {
        period: "morning",
        title: "Delhi NCR → Corbett belt",
        location: "Plains toward Ramnagar",
        description: "Leave early. This is a long day. App ETAs are not promises.",
        travelNote: "Fog and weekend traffic add hours.",
      },
      afternoon: {
        period: "afternoon",
        title: "Check in",
        location: "Resort / lodge belt (outside core rules)",
        description: "Drop bags. Rest. Confirm tomorrow’s permit if you have one — with the operator, not a rumour.",
        foodSuggestion: "Lunch at the stay if that is how the property works.",
      },
      evening: {
        period: "evening",
        title: "Stay-area evening",
        location: "Property / nearby market town only if needed",
        description:
          "A walk on the property if allowed. Unofficial night safari claims are a red flag.",
        foodSuggestion: "Dinner at stay. Early night if you have a dawn slot.",
      },
      placesToVisit: ["Stay belt"],
      activities: ["Rest", "Permit confirmation if applicable"],
      foodSuggestions: ["Stay meals"],
      travelNotes: ["Do not enter restricted forest roads."],
      stayArea:
        "Ramnagar-side or a notified resort belt. Core forest stays follow park rules. No hotel is endorsed.",
      estimatedDailyBudget: "Transport plus stay.",
    },
    {
      dayNumber: 2,
      title: "Morning slot or walk, then return",
      summary: "Safari if permitted; otherwise a riverside walk outside restricted zones, then leave.",
      morning: {
        period: "morning",
        title: "Safari slot or a legal walk",
        location: "Booked zone or stay-adjacent public area",
        description:
          "Only enter with a valid permit and authorised vehicle. If cancelled, walk where it is allowed and leave on time.",
        travelNote: "Sightings are never guaranteed. Anyone who promises one is selling a story.",
      },
      afternoon: {
        period: "afternoon",
        title: "Return journey",
        location: "Corbett belt → Delhi NCR",
        description: "Leave with a buffer. Sunday traffic toward NCR can slow.",
      },
      evening: {
        period: "evening",
        title: "Arrive NCR",
        location: "Delhi NCR",
        description: "Simple meal at home.",
      },
      placesToVisit: ["Permitted zone or stay area only"],
      activities: ["Optional safari", "Return travel"],
      foodSuggestions: ["Breakfast at stay", "Packed snacks"],
      travelNotes: ["Carry ID if your permit requires it."],
      stayArea: "N/A — return day.",
      estimatedDailyBudget: "Safari fees extra if used.",
    },
  ],
  howToReach: [
    {
      mode: "car",
      summary: "Usual self-drive or hired-car pattern toward Ramnagar.",
      note: "Not a live ETA.",
    },
    {
      mode: "bike",
      summary: "A long highway day. Forest-belt riding still needs daylight and legal roads only.",
      note: "Gear and fatigue matter.",
    },
    {
      mode: "bus",
      summary: "Services toward Ramnagar plus last-mile to stays.",
      note: "Verify current services before you travel.",
    },
  ],
  experiences: [
    {
      name: "Stay in the forest belt",
      description: "The weekend still works as a quiet night even if a safari is cancelled.",
      category: "Stay",
    },
    {
      name: "Safari (permit only)",
      description: "Book through official / authorised channels. Fees and zones change.",
      category: "Wildlife",
    },
  ],
  travelTips: [
    "Book permits before you leave NCR if a safari is the point of the trip.",
    "Carry ID.",
    "Do not trespass core areas.",
    "Monsoon and closures can wipe the plan — have a backup weekend.",
  ],
  packingSuggestions: [
    "Neutral colours, a warm layer for dawn, closed shoes.",
    "Binoculars if you already own them — not required.",
    "Power bank and water bottle.",
  ],
  thingsToKnow: [
    "This page does not confirm safari availability.",
    "Estimates are categories, not invoices.",
  ],
  faq: [
    {
      question: "How many days do I need?",
      answer: "Two days / one night is the common squeeze. Three days is better if you want two safari slots.",
    },
    {
      question: "What is the approximate budget?",
      answer:
        "Often a mid-to-higher band, commonly spoken of as roughly ₹8,000–₹16,000 per person plus safari fees. Not a live quote.",
    },
    {
      question: "Is this suitable for a weekend?",
      answer: "Yes if permits are already in hand or you are fine with a stay-only weekend.",
    },
    {
      question: "Which transport is best?",
      answer: "Car is the default. Bus plus last-mile works. Bike is a long day.",
    },
    {
      question: "What should I pack?",
      answer: "Warm dawn layer, closed shoes, ID. Use the Weekend Packing List tool.",
    },
    {
      question: "Can this itinerary be customised?",
      answer: "Yes. Drop the safari or add a night. The AI Weekend Planner can sketch a version around your group.",
    },
  ],
  relatedDestinations: ["jim-corbett"],
  relatedItineraries: [
    "delhi-to-nainital-3-day-itinerary",
    "delhi-to-rishikesh-2-day-itinerary",
    "delhi-to-lansdowne-2-day-itinerary",
    "delhi-to-mussoorie-2-day-itinerary",
  ],
  relatedTools: [...itineraryRelatedToolSlugs],
  seoTitle: "Delhi to Jim Corbett 2-Day Itinerary",
  seoDescription:
    "Plan a Delhi to Jim Corbett 2-day weekend with a practical stay-and-safari sketch, budget bands and travel tips. Permits are not guaranteed.",
};

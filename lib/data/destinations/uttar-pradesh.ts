import type { DestinationGuide } from "@/lib/data/destinations/types";

export const uttarPradeshGuides: DestinationGuide[] = [
  {
    id: "agra",
    name: "Agra",
    slug: "agra",
    shortDescription:
      "The Yamuna heritage city — Mughal monuments, crowds and a classic NCR overnight rather than a mountain weekend.",
    region: "uttar-pradesh",
    state: "Uttar Pradesh",
    bestFor: ["couples", "families", "friends", "solo"],
    tripDuration: "1n2d",
    durationOptions: ["day-trip", "1n2d", "2n3d"],
    budgetCategory: "mid",
    travelTimeCategory: "4-6h",
    interests: ["heritage", "photography", "food", "romantic"],
    transportOptions: ["car", "train", "bus"],
    travelStyles: ["heritage", "city-break"],
    bestTimeToVisit:
      "Winter mornings are typically the most comfortable for long outdoor queues. Summer heat is severe. Fog can slow trains and roads. Monument closures for events do happen — check official notices.",
    highlights: [
      "Mughal monument circuit (tickets and photography rules change)",
      "A food-and-city overnight from NCR",
      "A possible pair with Mathura–Vrindavan or Bharatpur if you add time",
    ],
    weekendSuitability: "strong",
    heroImage: null,
    seoTitle: "Agra Weekend Trip from Delhi NCR",
    seoDescription:
      "Agra weekend from Delhi NCR: travel-time band, monument-weekend shape and planning notes. No live ticket prices or crowd scores.",
    relatedDestinations: ["mathura-vrindavan", "bharatpur", "jaipur"],
    introduction:
      "Agra is the monument weekend most NCR travellers already have a picture of. The drive or train is familiar; the queues and heat are the variables. One night is common. Two nights only if you want Fatehpur-side or a slower meal plan — still confirm what is open.",
    whyVisit: [
      "The densest Mughal built heritage close to Delhi NCR.",
      "Train options that remove some night-driving.",
      "A plains weekend when you do not want hills.",
    ],
    whyWeekend:
      "Travel often sits in a 4–6 hour category. Dawn monument slots argue for staying overnight rather than a same-day turnaround in peak heat.",
    stayNotes: [
      "Taj-facing, cantonment and highway hotels all exist. Views and noise differ.",
      "No room rates on this page.",
    ],
    foodNotes: [
      "Mughlai and city restaurants are part of the trip for many groups.",
      "Street food is a personal-risk choice, not a recommendation list.",
    ],
    howToPlan: [
      "Book monument tickets through official channels only.",
      "Do not add Jaipur and Agra as a ‘triangle’ on a 36-hour clock unless you already know that circuit.",
      "Winter fog can erase a sunrise plan.",
    ],
    weekendItineraries: [
      {
        title: "1 night, monument-led",
        steps: [
          "Travel. Rest. One major site if timings allow.",
          "Dawn or morning slot next day, then return with a queue buffer.",
        ],
      },
    ],
    travelTips: [
      "Scams around tickets and photos are a known traveller complaint — use official counters.",
      "We do not publish a live waiting-time.",
    ],
    faq: [
      {
        question: "Is a day trip enough?",
        answer:
          "Some people do it. Heat, queues and traffic make an overnight the more typical comfortable shape.",
      },
      {
        question: "Bike from Delhi?",
        answer:
          "Possible for experienced highway riders. Families usually take train or car.",
      },
    ],
  },
  {
    id: "mathura-vrindavan",
    name: "Mathura-Vrindavan",
    slug: "mathura-vrindavan",
    shortDescription:
      "Twin temple towns on the Yamuna belt — pilgrimage energy, ghats and a short NCR hop.",
    region: "uttar-pradesh",
    state: "Uttar Pradesh",
    bestFor: ["families", "couples", "solo", "friends"],
    tripDuration: "1n2d",
    durationOptions: ["day-trip", "1n2d"],
    budgetCategory: "budget",
    travelTimeCategory: "under-4h",
    interests: ["heritage", "peaceful", "photography", "food"],
    transportOptions: ["car", "train", "bus"],
    travelStyles: ["spiritual", "heritage"],
    bestTimeToVisit:
      "Festival calendars create extreme crowding. Ordinary weekends are still busy in temple cores. Heat in summer is harsh. Confirm festival dates if that is your purpose.",
    highlights: [
      "Temple and ghat precincts (dress and photo rules apply)",
      "A short spiritual weekend from NCR",
      "Food that is often vegetarian-leaning in pilgrimage belts",
    ],
    weekendSuitability: "strong",
    heroImage: null,
    seoTitle: "Mathura Vrindavan Weekend Trip from Delhi NCR",
    seoDescription:
      "Mathura–Vrindavan weekend from Delhi NCR: short travel band, temple-town notes and a respectful outline. No fake festival tickets.",
    relatedDestinations: ["agra", "bharatpur", "alwar"],
    introduction:
      "Mathura and Vrindavan sit close enough to NCR for a genuine day trip or one-night stay. They are living pilgrimage towns, not a quiet spa. Festival days can overwhelm a casual weekend plan. Treat temple etiquette as required, not optional flavour.",
    whyVisit: [
      "The closest spiritual-city pair on this list.",
      "A plains alternative to hills when time is short.",
      "Train and expressway patterns that many NCR families already know.",
    ],
    whyWeekend:
      "Travel often sits under ~4 hours. That is a strong weekend fit — crowds, not distance, are the main limiter.",
    stayNotes: [
      "Dharamshalas, lodges and hotels. Noise near temples is common.",
      "Festival weekends need earlier booking — we do not hold inventory.",
    ],
    foodNotes: [
      "Prasad and vegetarian thalis are the usual pattern in the core.",
      "Hygiene varies; choose for your group.",
    ],
    howToPlan: [
      "Pick a few temples, not a 12-stop list.",
      "If combining Agra, add a night; do not squeeze both at noon.",
      "Follow local rules on photography and clothing.",
    ],
    weekendItineraries: [
      {
        title: "Day trip",
        steps: [
          "Very early start. One town core in the morning.",
          "Second pocket afternoon. Return before full-night fatigue.",
        ],
      },
      {
        title: "1 night",
        steps: [
          "Afternoon arrival. Evening aarti if you wish, with crowd patience.",
          "Morning temples, then return.",
        ],
      },
    ],
    travelTips: [
      "Keep offerings and cash plans simple; touts exist in busy lanes.",
      "This is not a nightlife destination.",
    ],
    faq: [
      {
        question: "Mathura and Vrindavan in one day?",
        answer:
          "People do it. You will see less of each. One night is calmer.",
      },
      {
        question: "Good for small children?",
        answer:
          "Families go often. Crowds, heat and walking are the constraints — not this page’s rating.",
      },
    ],
  },
];

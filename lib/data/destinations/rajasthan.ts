import type { DestinationGuide } from "@/lib/data/destinations/types";

export const rajasthanGuides: DestinationGuide[] = [
  {
    id: "neemrana",
    name: "Neemrana",
    slug: "neemrana",
    shortDescription:
      "A short Rajasthan highway stop from NCR — fort-side stays and a lighter overnight than Jaipur.",
    region: "rajasthan",
    state: "Rajasthan",
    bestFor: ["couples", "friends", "families"],
    tripDuration: "1n2d",
    durationOptions: ["day-trip", "1n2d"],
    budgetCategory: "mid",
    travelTimeCategory: "under-4h",
    interests: ["heritage", "romantic", "photography", "food"],
    transportOptions: ["car", "bike", "bus"],
    travelStyles: ["heritage", "peaceful", "city-break"],
    bestTimeToVisit:
      "Winter and early spring are typically more comfortable than peak summer heat. Confirm stay rules and any activity hours yourself.",
    highlights: [
      "Fort-side heritage atmosphere",
      "A short hop from Delhi NCR compared with Jaipur",
      "An overnight that does not demand a 6-hour-plus category drive",
    ],
    weekendSuitability: "strong",
    heroImage: null,
    seoTitle: "Neemrana Weekend Trip from Delhi NCR",
    seoDescription:
      "Neemrana as a short Rajasthan weekend from Delhi NCR: travel-time category, stay notes and a light plan. No live room rates.",
    relatedDestinations: ["alwar", "jaipur", "sariska"],
    introduction:
      "Neemrana is useful when you want a heritage-flavoured night without committing to a full Jaipur weekend. It sits on a familiar NCR–Jaipur road belt. Treat hotels and activities as things to verify, not as a package this site sells.",
    whyVisit: [
      "One of the shortest Rajasthan-flavoured hops from NCR on this list.",
      "A couple or friends overnight that can still leave Sunday evening free.",
      "A stepping stone if you later want Alwar or Jaipur.",
    ],
    whyWeekend:
      "Travel often sits under a ~4-hour category in ordinary traffic. That makes a 1-night trip more honest than for Shimla or Nainital.",
    stayNotes: [
      "Heritage and highway hotels both exist. Prices move with weekends — check current quotes.",
      "Ask about activity timings if a stay advertises on-site experiences.",
    ],
    foodNotes: [
      "Hotel dining is the default. Highway food is a separate, variable choice.",
    ],
    howToPlan: [
      "Leave Saturday morning or Friday night.",
      "Do not assume you can ‘do Jaipur’ on the same overnight.",
      "Use the fuel and budget tools with your own figures.",
    ],
    weekendItineraries: [
      {
        title: "1 night",
        steps: [
          "Morning drive. Afternoon at the stay.",
          "Unhurried breakfast and return, with traffic buffer.",
        ],
      },
    ],
    travelTips: [
      "This is a highway weekend. Fatigue still matters on the way back.",
      "We do not confirm zip-lines, rooms or tickets.",
    ],
    faq: [
      {
        question: "Day trip or night stay?",
        answer:
          "A day trip is possible. A night stay is the more typical ‘weekend’ shape so you are not only on NH driving.",
      },
      {
        question: "Good on a bike?",
        answer:
          "Yes as a short highway ride for experienced riders. Heat and truck traffic are the real constraints.",
      },
    ],
  },
  {
    id: "jaipur",
    name: "Jaipur",
    slug: "jaipur",
    shortDescription:
      "Rajasthan’s capital as an NCR weekend — forts, bazaars and a full city, not a quiet village.",
    region: "rajasthan",
    state: "Rajasthan",
    bestFor: ["couples", "friends", "families", "solo"],
    tripDuration: "2n3d",
    durationOptions: ["1n2d", "2n3d", "3n4d"],
    budgetCategory: "mid",
    travelTimeCategory: "4-6h",
    interests: [
      "heritage",
      "food",
      "photography",
      "nightlife",
      "romantic",
    ],
    transportOptions: ["car", "bus", "train", "bike"],
    travelStyles: ["heritage", "city-break"],
    bestTimeToVisit:
      "Winter and early spring are typically kinder than peak summer. Festival weeks are crowded. Always re-check monument hours.",
    highlights: [
      "Fort and palace circuits (tickets and timings change)",
      "Old-city bazaars",
      "A proper city food scene compared with small hill towns",
    ],
    weekendSuitability: "good",
    heroImage: null,
    seoTitle: "Jaipur Weekend Trip from Delhi NCR",
    seoDescription:
      "Jaipur weekend from Delhi NCR: city-break shape, travel-time band, budget category and a realistic two-night outline. No fake ticket prices.",
    relatedDestinations: ["neemrana", "alwar", "pushkar"],
    introduction:
      "Jaipur is a city weekend: heritage, shopping, food and traffic. From Delhi NCR, train and road are both common. You will not ‘do Jaipur’ in one afternoon. Two nights is the usual honest frame.",
    whyVisit: [
      "The densest heritage city on this list.",
      "Train options that some hill destinations lack.",
      "A different colour and cuisine than Uttarakhand or Himachal weekends.",
    ],
    whyWeekend:
      "Travel often sits in a 4–6 hour category by road, sometimes less by a well-timed train. Two nights beat a monument sprint.",
    stayNotes: [
      "Old city, C-scheme and highway hotels all change how you move.",
      "No live prices. Peak wedding season can tighten rooms.",
    ],
    foodNotes: [
      "Rajasthani and city restaurant scenes are a reason people come.",
      "Hygiene and spice levels vary — choose for your group, not a ranking.",
    ],
    howToPlan: [
      "Pick two or three sites, not seven.",
      "Use train if you want to avoid night driving.",
      "Pushkar is a separate trip unless you have extra days.",
    ],
    weekendItineraries: [
      {
        title: "2 nights, old-city focus",
        steps: [
          "Travel. Evening bazaar walk.",
          "One fort/palace cluster. Leave the rest for another visit.",
          "Buffer for return traffic or a train.",
        ],
      },
    ],
    travelTips: [
      "Monument tickets are not listed here and change.",
      "Heat in summer is a planning constraint, not a footnote.",
      "Riders should treat the Jaipur approach as highway, not a hill loop.",
    ],
    faq: [
      {
        question: "Is Jaipur too big for a weekend?",
        answer:
          "It is big. It still works if you accept a partial city, not a complete tick-list.",
      },
      {
        question: "Bike from Delhi?",
        answer:
          "Common among riders. Heat, trucks and fatigue matter more than the map distance.",
      },
    ],
  },
  {
    id: "alwar",
    name: "Alwar",
    slug: "alwar",
    shortDescription:
      "A Rajasthan town between NCR and Jaipur — palaces, a fort ridge and a gateway toward Sariska.",
    region: "rajasthan",
    state: "Rajasthan",
    bestFor: ["couples", "friends", "families", "riders"],
    tripDuration: "1n2d",
    durationOptions: ["day-trip", "1n2d", "2n3d"],
    budgetCategory: "budget",
    travelTimeCategory: "under-4h",
    interests: ["heritage", "nature", "wildlife", "photography", "food"],
    transportOptions: ["car", "bike", "bus", "train"],
    travelStyles: ["heritage", "wildlife", "peaceful"],
    bestTimeToVisit:
      "Cooler months are typically easier for forts and any park visit. Summer is hot. Park rules for Sariska are separate.",
    highlights: [
      "Town palaces and a hillside fort",
      "A shorter Rajasthan hop than Jaipur",
      "A staging point toward Sariska if you have more time",
    ],
    weekendSuitability: "strong",
    heroImage: null,
    seoTitle: "Alwar Weekend Trip from Delhi NCR",
    seoDescription:
      "Alwar weekend from Delhi NCR: short Rajasthan hop, budget band and how it pairs with Sariska. Categories, not live safari fees.",
    relatedDestinations: ["sariska", "neemrana", "jaipur"],
    introduction:
      "Alwar is close enough to NCR that it can be a genuine Saturday–Sunday. The town has heritage layers; the forest belt nearby is a different plan. Do not collapse Alwar and a full Sariska safari into one exhausted day unless you already know the timings.",
    whyVisit: [
      "Shorter than Jaipur, more town than Neemrana’s highway-stop feel.",
      "Heritage plus an optional wildlife extension.",
      "Train and road both appear in typical plans.",
    ],
    whyWeekend:
      "Travel often sits under ~4 hours in ordinary conditions. That is a strong weekend fit from Delhi NCR.",
    stayNotes: [
      "Town hotels and a few heritage stays. Confirm current guest access.",
      "If you stay nearer Sariska, you are planning a park weekend, not a bazaar weekend.",
    ],
    foodNotes: [
      "Local Rajasthani and North Indian plates. Do not expect Jaipur’s restaurant density.",
    ],
    howToPlan: [
      "Decide: town forts only, or town plus Sariska as a two-night idea.",
      "Check park status before promising anyone a safari.",
    ],
    weekendItineraries: [
      {
        title: "1 night in town",
        steps: [
          "Morning departure. Fort or palace walk.",
          "Return next day without adding Jaipur.",
        ],
      },
      {
        title: "2 nights toward Sariska",
        steps: [
          "Alwar or forest-edge stay.",
          "Park visit only if it is open and booked through proper channels.",
        ],
      },
    ],
    travelTips: [
      "Fort climbs need sensible footwear and water in heat.",
      "This page does not sell park tickets.",
    ],
    faq: [
      {
        question: "Alwar or Neemrana for a short hop?",
        answer:
          "Neemrana is often a highway heritage stay. Alwar is more of a town, with a possible park extension.",
      },
    ],
  },
  {
    id: "sariska",
    name: "Sariska",
    slug: "sariska",
    shortDescription:
      "A tiger-reserve landscape in Alwar district — safari calendars and heat matter more than Instagram maps.",
    region: "rajasthan",
    state: "Rajasthan",
    bestFor: ["couples", "families", "friends"],
    tripDuration: "2n3d",
    durationOptions: ["1n2d", "2n3d"],
    budgetCategory: "high",
    travelTimeCategory: "4-6h",
    interests: ["wildlife", "nature", "photography", "peaceful"],
    transportOptions: ["car", "bus"],
    travelStyles: ["wildlife", "peaceful"],
    bestTimeToVisit:
      "Park opening hours and closed days are official, not social. Summer is hot; some visitors still go for wildlife. Confirm current rules.",
    highlights: [
      "Dry forest and reserve landscape",
      "Lodge stays outside the core",
      "A closer wildlife belt to NCR than many Himalayan parks",
    ],
    weekendSuitability: "good",
    heroImage: null,
    seoTitle: "Sariska Weekend Trip from Delhi NCR",
    seoDescription:
      "Sariska from Delhi NCR: wildlife-weekend shape, travel band and planning cautions. No guaranteed sightings or ticket prices.",
    relatedDestinations: ["alwar", "bharatpur", "jaipur"],
    introduction:
      "Sariska is a reserve weekend, not a cafe town. From NCR it is nearer than many mountain parks, but jeeps, gates and heat still run the clock. Sightings are uncertain. Two nights beat a same-day gypsy fantasy.",
    whyVisit: [
      "A Rajasthan forest belt within a plausible NCR weekend radius.",
      "Pairs with Alwar if you want town plus park — with extra time.",
      "A wildlife alternative to Corbett when you want to stay west of Delhi.",
    ],
    whyWeekend:
      "Travel often sits in a 4–6 hour category. Safari reporting times still argue for an overnight near the park.",
    stayNotes: [
      "Lodges around the reserve vary widely. We do not rank them.",
      "Confirm whether your stay helps with gypsy booking or not.",
    ],
    foodNotes: [
      "Mostly stay meals. Limited town dining near the forest edge.",
    ],
    howToPlan: [
      "Read current safari notification before you promise a weekend.",
      "Do not combine Pushkar, Jaipur and Sariska in 48 hours.",
    ],
    weekendItineraries: [
      {
        title: "2 nights",
        steps: [
          "Arrive, rest, confirm reporting time.",
          "One safari if open. Quiet afternoon.",
          "Optional second slot or a calm return.",
        ],
      },
    ],
    travelTips: [
      "Carry sun protection. This is not a hill climate.",
      "No playback, no off-road heroics.",
    ],
    faq: [
      {
        question: "Closer than Corbett?",
        answer:
          "For many NCR starting points, Sariska is the nearer forest-reserve idea. ‘Nearer’ is still hours, not a city park.",
      },
      {
        question: "Can I day-trip a safari?",
        answer:
          "Some people try. An overnight is usually kinder around gate times.",
      },
    ],
  },
  {
    id: "bharatpur",
    name: "Bharatpur",
    slug: "bharatpur",
    shortDescription:
      "A bird-reserve town on the Agra–Jaipur belt — binoculars and winter visitors, not a nightlife circuit.",
    region: "rajasthan",
    state: "Rajasthan",
    bestFor: ["couples", "solo", "families", "friends"],
    tripDuration: "1n2d",
    durationOptions: ["day-trip", "1n2d", "2n3d"],
    budgetCategory: "budget",
    travelTimeCategory: "4-6h",
    interests: ["wildlife", "nature", "photography", "peaceful", "heritage"],
    transportOptions: ["car", "train", "bus"],
    travelStyles: ["wildlife", "peaceful", "heritage"],
    bestTimeToVisit:
      "Winter is the typical birding season people talk about. Summer is hot and quieter for many species. Confirm park hours.",
    highlights: [
      "Keoladeo-style wetland birding when in season",
      "A slower town than Jaipur or Agra",
      "A possible pair with Agra if you have more than a micro-weekend",
    ],
    weekendSuitability: "good",
    heroImage: null,
    seoTitle: "Bharatpur Weekend Trip from Delhi NCR",
    seoDescription:
      "Bharatpur from Delhi NCR for a birding-leaning weekend: season note, travel band and a light plan. No species guarantees.",
    relatedDestinations: ["agra", "sariska", "mathura-vrindavan"],
    introduction:
      "Bharatpur is for people who will actually walk or cycle a wetland trail. It is not a party weekend. From NCR, road and train both appear. Pairing it with Agra is a longer plan, not a Saturday brunch idea.",
    whyVisit: [
      "One of the few bird-first destinations on this list.",
      "A calmer Rajasthan town than Jaipur.",
      "Photography without a mountain drive.",
    ],
    whyWeekend:
      "Travel often sits in a 4–6 hour category. A dawn park entry argues for staying the night before.",
    stayNotes: [
      "Small hotels and lodges near the sanctuary. Book around birding season weekends yourself.",
    ],
    foodNotes: [
      "Simple vegetarian-friendly town food is common. Do not expect a large nightlife menu.",
    ],
    howToPlan: [
      "If birding is the point, plan a night, not only a noon visit.",
      "Cycle or walk inside only as currently allowed.",
      "Agra plus Bharatpur needs more than 24 hours on the ground.",
    ],
    weekendItineraries: [
      {
        title: "1 night, birding-led",
        steps: [
          "Arrive evening. Early sanctuary session next day.",
          "Return after a buffer, not immediately at noon rush.",
        ],
      },
    ],
    travelTips: [
      "Carry binoculars if you own them; rentals are a local, changeable option.",
      "Park fees are not listed here.",
    ],
    faq: [
      {
        question: "Is it only for serious birders?",
        answer:
          "Serious birders get more from it. A quiet walker can still enjoy a winter morning. A nightlife group probably will not.",
      },
    ],
  },
  {
    id: "pushkar",
    name: "Pushkar",
    slug: "pushkar",
    shortDescription:
      "A temple-and-lake town beyond Jaipur — spiritual, touristy and better with more than a flying visit.",
    region: "rajasthan",
    state: "Rajasthan",
    bestFor: ["couples", "solo", "friends"],
    tripDuration: "2n3d",
    durationOptions: ["2n3d", "3n4d"],
    budgetCategory: "mid",
    travelTimeCategory: "6-8h",
    interests: ["heritage", "peaceful", "photography", "food", "romantic"],
    transportOptions: ["car", "bus", "train"],
    travelStyles: ["spiritual", "heritage", "peaceful"],
    bestTimeToVisit:
      "Fair season is typically intense and crowded. Other months are calmer but still tourist-facing. Summer is hot. Confirm fair dates if that is your reason to go.",
    highlights: [
      "Lake and temple precinct (local rules apply)",
      "A small-town tourist core rather than a metro",
      "Fair-time culture only in its actual season — do not invent dates",
    ],
    weekendSuitability: "better-long-weekend",
    heroImage: null,
    seoTitle: "Pushkar Weekend Trip from Delhi NCR",
    seoDescription:
      "Pushkar from Delhi NCR: why a long weekend fits better, travel-time category and respectful-visit notes. No fake fair tickets.",
    relatedDestinations: ["jaipur", "alwar", "neemrana"],
    introduction:
      "Pushkar sits past Jaipur. That extra stretch is why it is a weaker pure Saturday–Sunday than Neemrana or Alwar. The lake town is small, sacred and touristed. Fair week is a different beast from an ordinary weekend.",
    whyVisit: [
      "A spiritual-and-bazaar town unlike Jaipur’s palaces.",
      "A slower Rajasthan night if you are not chasing five forts.",
      "Photography and cafe time — still crowded in pockets.",
    ],
    whyWeekend:
      "Travel often sits in a 6–8 hour category via Jaipur. Two nights is the floor; a long weekend is kinder.",
    stayNotes: [
      "Lakeside and lane stays. Noise and stairs vary. No rates here.",
      "Fair dates can sell out — check independently.",
    ],
    foodNotes: [
      "Vegetarian-leaning tourist cafes are common. Hygiene varies.",
    ],
    howToPlan: [
      "Do not ‘see Jaipur by day and Pushkar by night’ as a default 36-hour plan.",
      "Dress and camera rules around ghats and temples — follow local instruction.",
      "Use a long weekend if you can.",
    ],
    weekendItineraries: [
      {
        title: "2 nights, town only",
        steps: [
          "Travel via Jaipur belt. Evening lake circuit.",
          "Temple and market morning. Rest. Return next day with buffer.",
        ],
      },
    ],
    travelTips: [
      "Pushkar is not a drinking-and-nightlife pitch; local norms matter.",
      "This page does not sell camel-fair passes.",
    ],
    faq: [
      {
        question: "Can I do Pushkar as a Delhi Saturday–Sunday?",
        answer:
          "Only as a rushed drive. A long weekend is the more honest recommendation.",
      },
      {
        question: "Combine with Jaipur?",
        answer:
          "Yes with extra nights. Not as two full destinations in one micro-weekend.",
      },
    ],
  },
];

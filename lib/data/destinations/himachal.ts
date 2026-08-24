import type { DestinationGuide } from "@/lib/data/destinations/types";

export const himachalGuides: DestinationGuide[] = [
  {
    id: "kasauli",
    name: "Kasauli",
    slug: "kasauli",
    shortDescription:
      "A compact cantonment hill town in Himachal — pine, short walks and a closer hill option than Shimla.",
    region: "himachal-pradesh",
    state: "Himachal Pradesh",
    bestFor: ["couples", "families", "solo", "riders"],
    tripDuration: "2n3d",
    durationOptions: ["1n2d", "2n3d"],
    budgetCategory: "mid",
    travelTimeCategory: "6-8h",
    interests: ["mountains", "nature", "peaceful", "romantic", "photography"],
    transportOptions: ["bike", "car", "bus"],
    travelStyles: ["peaceful", "hills"],
    bestTimeToVisit:
      "Clear, cool months are typically easier. Monsoon and winter fog can slow the climb. Confirm road notes in rain or snow talk.",
    highlights: [
      "Short mall and ridge walks",
      "Pine cover and sunset points on a clear evening",
      "A smaller hill-station scale than Shimla",
    ],
    weekendSuitability: "good",
    heroImage: null,
    seoTitle: "Kasauli Weekend Trip from Delhi NCR",
    seoDescription:
      "Kasauli as a Himachal weekend from Delhi NCR: travel-time band, spend category, quiet-hill notes and a simple plan. Approximate only.",
    relatedDestinations: ["shimla", "chakrata", "lansdowne"],
    introduction:
      "Kasauli is often chosen when NCR wants hills without Shimla’s size. It remains a cantonment town: quieter nights, limited late food, and rules worth respecting. The climb still takes a full travel block.",
    whyVisit: [
      "A smaller Himachal hill town than Shimla.",
      "Walkable pockets if you stay near the mall.",
      "A common bike and car destination when riders want a hill night without a 10-hour-plus category drive.",
    ],
    whyWeekend:
      "Travel often sits in a 6–8 hour category. One night is possible; two nights is the more comfortable weekend.",
    stayNotes: [
      "Heritage-style hotels and small stays both appear — quality varies.",
      "Heating and parking are the questions to ask, not this page.",
    ],
    foodNotes: [
      "A short list of cafes and hotel dining. Carry a backup snack on arrival night.",
    ],
    howToPlan: [
      "Do not stack Shimla and Kasauli as two full destinations in 36 hours.",
      "Leave NCR early. Sunday return traffic toward Chandigarh–NCR can be slow.",
      "If you ride, plan daylight on the hill stretch.",
    ],
    weekendItineraries: [
      {
        title: "1 night",
        steps: [
          "Early start. Afternoon walk only.",
          "Morning viewpoint if the sky is clear, then descend.",
        ],
      },
      {
        title: "2 nights",
        steps: [
          "Travel and a slow evening.",
          "One full day of walks without a packed taxi circuit.",
          "Late-morning return.",
        ],
      },
    ],
    travelTips: [
      "Cantonment photography and drone rules exist — follow posted guidance.",
      "Nights are cold even when Delhi is mild.",
    ],
    faq: [
      {
        question: "Kasauli or Shimla for a short weekend?",
        answer:
          "Kasauli is usually the smaller, closer-feeling hill town. Shimla is larger and typically asks for more time.",
      },
      {
        question: "Is public transport enough?",
        answer:
          "Buses run; last-mile taxis are common. Confirm current combinations yourself.",
      },
    ],
  },
  {
    id: "shimla",
    name: "Shimla",
    slug: "shimla",
    shortDescription:
      "Himachal’s large ridge town — mall, heritage streets and a longer haul from Delhi NCR than Kasauli.",
    region: "himachal-pradesh",
    state: "Himachal Pradesh",
    bestFor: ["couples", "families", "friends"],
    tripDuration: "2n3d",
    durationOptions: ["2n3d", "3n4d"],
    budgetCategory: "high",
    travelTimeCategory: "8h-plus",
    interests: ["mountains", "heritage", "food", "photography", "romantic"],
    transportOptions: ["car", "bus", "train"],
    travelStyles: ["hills", "heritage", "city-break"],
    bestTimeToVisit:
      "Peak summer and holiday weeks are typically crowded. Winter can mean cold, fog and occasional snow talk — verify forecasts and road status.",
    highlights: [
      "Ridge and mall walks",
      "Heritage streetscape on a clear day",
      "Nearby valleys only if you have extra nights",
    ],
    weekendSuitability: "better-long-weekend",
    heroImage: null,
    seoTitle: "Shimla Weekend Trip from Delhi NCR",
    seoDescription:
      "Shimla from Delhi NCR: why a long weekend fits better, travel-time category, budget band and a cautious outline. No live hotel prices.",
    relatedDestinations: ["kasauli", "chakrata", "mussoorie"],
    introduction:
      "Shimla is a full hill city, not a quiet ridge hamlet. From Delhi NCR the road or Kalka-side rail approach is the tax you pay. A rushed Saturday-Sunday often feels like two travel days with a mall in the middle.",
    whyVisit: [
      "The largest, most service-rich hill town in this list.",
      "Heritage architecture and a long promenade when weather cooperates.",
      "A family default when people want hotels, walks and a town, not a park safari.",
    ],
    whyWeekend:
      "Travel often sits in an 8-hour-plus category. Treat two nights as a minimum and three as the kinder shape.",
    stayNotes: [
      "Ridge-adjacent stays cost more in season; lower bazaar and outskirts change how much you walk.",
      "No tariffs here.",
    ],
    foodNotes: [
      "A wide cafe and restaurant strip on the mall. Hours and crowds swing with season.",
    ],
    howToPlan: [
      "Prefer a Friday start or a three-night window.",
      "Do not add Kufri, Narkanda and a toy-train fantasy to a 40-hour trip.",
      "Use the Long Weekend Planner if dates allow.",
    ],
    weekendItineraries: [
      {
        title: "2 nights, town-focused",
        steps: [
          "Travel. Short evening mall walk.",
          "Ridge and one nearby viewpoint if roads and energy allow.",
          "Conservative return.",
        ],
      },
      {
        title: "3 nights",
        steps: [
          "Same core, plus one extra quiet morning.",
          "Skip stacking too many paid ‘points’.",
        ],
      },
    ],
    travelTips: [
      "The last climb can jam on holiday noons.",
      "Toy-train timing is a separate plan, not a given on a short weekend.",
      "Altitude is moderate; cold is the bigger surprise in winter.",
    ],
    faq: [
      {
        question: "Is Shimla a good Saturday–Sunday from Delhi?",
        answer:
          "Only if you accept long travel blocks. A long weekend is usually the better fit.",
      },
      {
        question: "Bike or car?",
        answer:
          "Both are used. Families typically take a car or a bus/train combination. Riders should plan daylight and fatigue.",
      },
    ],
  },
  {
    id: "chakrata",
    name: "Chakrata",
    slug: "chakrata",
    shortDescription:
      "A quieter cantonment hill pocket west of Mussoorie — forest, views and fewer mall-road crowds.",
    region: "uttarakhand",
    state: "Uttarakhand",
    bestFor: ["couples", "solo", "riders", "friends"],
    tripDuration: "2n3d",
    durationOptions: ["1n2d", "2n3d"],
    budgetCategory: "mid",
    travelTimeCategory: "6-8h",
    interests: ["mountains", "nature", "peaceful", "adventure", "photography"],
    transportOptions: ["bike", "car"],
    travelStyles: ["peaceful", "hills", "adventure"],
    bestTimeToVisit:
      "Clear seasons are typically easier than heavy monsoon. Inner pockets can have restricted access — check current local rules.",
    highlights: [
      "Forest drives and viewpoints on a clear day",
      "A smaller town scale than Mussoorie",
      "Side valleys only with time, weather and permission",
    ],
    weekendSuitability: "good",
    heroImage: null,
    seoTitle: "Chakrata Weekend Trip from Delhi NCR",
    seoDescription:
      "Chakrata weekend from Delhi NCR for a quieter hill pocket: duration, travel band and planning cautions. Confirm access rules before you go.",
    relatedDestinations: ["mussoorie", "kasauli", "rishikesh"],
    introduction:
      "Chakrata is for people who want hills with less mall-road noise. Parts of the belt can have access rules. From NCR it is a road weekend, not a casual train hop. Keep plans flexible around weather and permissions.",
    whyVisit: [
      "Quieter than Mussoorie’s core.",
      "Forest and ridge scenery when the sky is open.",
      "A rider-and-car favourite when the goal is a hill night, not shopping.",
    ],
    whyWeekend:
      "Travel often sits in a 6–8 hour category via Dehradun-side roads. Two nights absorb the drive better than one.",
    stayNotes: [
      "Fewer large hotels than Mussoorie. Book stays that you can actually reach after dark.",
      "Ask about heating and meal timings.",
    ],
    foodNotes: [
      "Limited restaurants. Stay meals matter more here than a food-crawl.",
    ],
    howToPlan: [
      "Check whether the specific village or meadow you named is open to visitors.",
      "Do not treat social-media locations as always accessible.",
      "Leave daylight for the last climb.",
    ],
    weekendItineraries: [
      {
        title: "2 nights, conservative",
        steps: [
          "Travel via Dehradun-side roads. Settle before dark.",
          "One viewpoint or forest walk that your stay host considers currently sensible.",
          "Return without adding Mussoorie as a second full destination.",
        ],
      },
    ],
    travelTips: [
      "Restricted or inner areas may need permits or may be closed. This page cannot issue them.",
      "Network can drop. Download offline maps.",
      "Monsoon landslides are a reason to postpone, not to ‘see the mist’.",
    ],
    faq: [
      {
        question: "Is Chakrata open to everyone?",
        answer:
          "The town is visited, but some nearby pockets have had access rules. Verify current guidance locally before you lock a trail.",
      },
      {
        question: "Mussoorie plus Chakrata in one weekend?",
        answer:
          "Usually too much driving. Pick one hill pocket.",
      },
    ],
  },
];

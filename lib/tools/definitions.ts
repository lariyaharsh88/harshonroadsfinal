import type { ToolDefinition } from "@/types/tool";

const defaultCta = {
  title: "More free travel tools",
  body: "Budget, packing, fuel and planning tools for weekend trips from Delhi NCR.",
  href: "/tools",
  label: "Browse tools",
} as const;

const guidesArticle = {
  title: "Travel Guides",
  href: "/travel-guides",
  description: "Guides for weekend escapes and India travel, as they are published.",
} as const;

const tripsArticle = {
  title: "Road Trips",
  href: "/road-trips",
  description: "Road-trip notes from Delhi NCR and India, when they are ready.",
} as const;

export const toolDefinitions: ToolDefinition[] = [
  {
    slug: "bike-fuel-cost-calculator",
    name: "Bike Fuel Cost Calculator",
    heading: "Bike Fuel Cost Calculator",
    seoTitle: "Bike Fuel Cost Calculator",
    seoDescription:
      "Estimate motorcycle fuel cost from distance, mileage and petrol price. Litres, trip cost and cost per 100 km — useful for a weekend ride from Delhi NCR.",
    description:
      "Estimate fuel spend for a motorcycle ride from distance, mileage and fuel price.",
    category: "fuel",
    status: "live",
    calculatorId: "fuel",
    explanation:
      "Fuel cost is litres burned multiplied by the price you pay. Litres come from distance divided by mileage. The numbers are only as good as the mileage and price you enter.",
    education: [
      {
        title: "How to calculate motorcycle fuel cost",
        paragraphs: [
          "You need three figures: how far you will ride (kilometres), how far the bike goes on a litre (km/l), and what a litre costs (₹/litre).",
          "Fuel required = distance ÷ mileage. Fuel cost = fuel required × fuel price. Cost per 100 km = (fuel price ÷ mileage) × 100, which does not depend on trip length.",
          "The calculator on this page uses that arithmetic in your browser. It does not look up pump prices or your bike’s ECU.",
        ],
      },
      {
        title: "Example calculation",
        paragraphs: [
          "Suppose the ride is 350 km, the bike returns 35 km/l on similar roads, and petrol is ₹105 per litre.",
          "Fuel required = 350 ÷ 35 = 10 litres. Estimated fuel cost = 10 × 105 = ₹1,050. Cost per 100 km = (105 ÷ 35) × 100 = ₹300.",
          "Change any one input and the result moves with it. A return trip of the same route would be 700 km: 20 litres and ₹2,100 at the same mileage and price.",
        ],
      },
      {
        title: "How mileage affects fuel cost",
        paragraphs: [
          "Mileage sits in the denominator. If distance and price stay the same, a higher km/l figure means fewer litres and a lower bill. Halving mileage doubles fuel required and doubles cost.",
          "Brochure or ARAI figures are measured in controlled tests. A loaded touring bike, hills, heat, headwind, stop–go towns and a heavy right wrist all cut real km/l. For planning, use a tank you have already ridden, or a conservative number.",
        ],
      },
      {
        title: "Road trip fuel tips",
        paragraphs: [
          "Count the kilometres you will actually ride, including the way home and likely detours. A one-way map distance under-states a return trip.",
          "Fuel prices in India vary by state and sometimes by town. Enter the price you expect to pay, or a slightly higher one if you will fill in a costlier state.",
          "Keep a reserve beyond the calculated litres. Tanks are not filled to the brim in the same way every time, and remote stretches can have long gaps between pumps.",
          "This tool is an estimate. It does not replace checking your fuel gauge, knowing your range, or local road knowledge.",
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Fuel required = Distance ÷ Mileage",
        "Fuel cost = Fuel required × Fuel price",
        "Cost per 100 km = (Fuel price ÷ Mileage) × 100",
      ],
      notes: [
        "Distance in kilometres, mileage in km/l, fuel price in ₹ per litre.",
        "All three inputs must be greater than zero.",
      ],
    },
    faqs: [
      {
        question: "How is motorcycle fuel cost calculated?",
        answer:
          "Divide distance (km) by mileage (km/l) to get litres. Multiply litres by fuel price (₹/litre). That is the estimated fuel cost.",
      },
      {
        question: "Should I enter one-way or return distance?",
        answer:
          "Enter the total kilometres you will ride. For a return trip, add both legs (or double a one-way figure if you will come back the same way).",
      },
      {
        question: "What mileage should I use?",
        answer:
          "Use a figure from a recent tank on similar roads and load. If you do not know it yet, the Bike Mileage Calculator on this site works it out from distance and fuel used.",
      },
      {
        question: "Does this include tolls, oil or food?",
        answer:
          "No. This page is fuel only. Stay, food, tolls and extras belong in the road trip cost calculator.",
      },
      {
        question: "What does cost per 100 km tell me?",
        answer:
          "It is the fuel bill for every 100 km at the mileage and price you entered. It is useful for comparing bikes or fuel prices without a fixed trip length.",
      },
      {
        question: "Why do I have to type the fuel price?",
        answer:
          "Prices change by place and day. This site does not call a price API or store a pump database. You enter the rate you expect to pay.",
      },
      {
        question: "Does the calculator work without JavaScript?",
        answer:
          "The live form needs JavaScript. The formula, the worked example and the FAQs on this page are ordinary HTML, so you can still do the arithmetic by hand.",
      },
    ],
    relatedToolSlugs: [
      "bike-mileage-calculator",
      "fuel-required-calculator",
      "road-trip-cost-calculator",
      "trip-budget-calculator",
      "toll-fuel-calculator",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: defaultCta,
  },
  {
    slug: "bike-mileage-calculator",
    name: "Bike Mileage Calculator",
    heading: "Bike Mileage Calculator",
    seoTitle: "Bike Mileage Calculator",
    seoDescription:
      "Work out actual motorcycle km/l from kilometres ridden and litres used. Useful after a tank on a weekend ride from Delhi NCR.",
    description:
      "Work out kilometres per litre from distance travelled and fuel consumed.",
    category: "fuel",
    status: "live",
    calculatorId: "mileage",
    explanation:
      "Actual mileage is distance divided by fuel used. Fill to a known tank mark, ride, then fill to the same mark. Litres added and trip-meter kilometres give a real figure for that stretch.",
    education: [
      {
        title: "How motorcycle mileage is calculated",
        paragraphs: [
          "In India, motorcycle mileage is usually quoted in kilometres per litre (km/l). The arithmetic is: mileage = distance travelled ÷ fuel consumed.",
          "Distance is in kilometres. Fuel consumed is in litres. If you rode 350 km and used 10 litres, mileage is 35 km/l.",
          "The inverse figure — litres per 100 km — is (fuel consumed ÷ distance) × 100. It is handy for comparing bikes whose km/l numbers look close.",
          "This page does the sums in your browser. It does not read the bike, a fuel app, or a live price feed.",
        ],
      },
      {
        title: "Example",
        paragraphs: [
          "You reset the trip meter at a brim (or a marked level), ride 350 km, and take 10.00 litres to reach the same mark.",
          "Mileage = 350 ÷ 10 = 35 km/l. Fuel consumption per 100 km = (10 ÷ 350) × 100 ≈ 2.86 L/100 km.",
          "If the next tank is 8.45 litres over 280 km, mileage = 280 ÷ 8.45 ≈ 33.14 km/l. Decimals on the pump receipt are worth typing in.",
        ],
      },
      {
        title: "Why real-world mileage differs",
        paragraphs: [
          "Lab or brochure figures are measured in controlled tests: light load, specified speeds, no luggage. A touring bike with a pillion, bags, hills, heat, or town traffic will usually return less.",
          "How you fill also moves the number. Mixing brim fills with “to the first click” or topping up after 40 km makes the litre figure noisy.",
          "Tyre pressure, chain condition, wind, altitude and riding style all change fuel used. One tank is a snapshot, not a factory rating.",
        ],
      },
      {
        title: "Tips for improving fuel efficiency",
        paragraphs: [
          "Keep tyres at the pressure the manufacturer specifies for your load. Soft tyres waste fuel and wear faster; this page will not tell you the psi — the handbook will.",
          "Smooth throttle and sensible speeds use less fuel than constant wide-open riding. Engine braking into corners is gentler on pads and often on the tank.",
          "A clean air filter, a lubed and correctly tensioned chain, and not carrying unused weight all help. None of these guarantee a fixed km/l gain; they remove obvious losses.",
          "Use this calculator over several tanks and average the results. A single fill can be skewed by a slope at the pump or a short urban hop.",
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Mileage = Distance ÷ Fuel consumed",
        "Fuel per 100 km = (Fuel consumed ÷ Distance) × 100",
      ],
      notes: [
        "Distance in kilometres, fuel consumed in litres, mileage in km/l.",
        "Both inputs must be greater than zero. Decimals are allowed.",
      ],
    },
    faqs: [
      {
        question: "How do I calculate bike mileage?",
        answer:
          "Divide kilometres travelled by litres of fuel used. The result is km/l. Example: 350 km and 10 L → 35 km/l.",
      },
      {
        question: "How should I measure fuel consumed?",
        answer:
          "Fill to a repeatable mark (brim or a line on the tank), reset the trip meter, ride, then fill to the same mark. The litres on the second receipt are fuel consumed.",
      },
      {
        question: "What is fuel consumption per 100 km?",
        answer:
          "Litres needed to cover 100 km at the same rate: (litres ÷ kilometres) × 100. Lower is more efficient. It is the inverse of km/l, not a second measurement.",
      },
      {
        question: "Why is my mileage lower than the brochure?",
        answer:
          "Brochure tests are not a loaded monsoon ride on NH roads. Real tanks include traffic, hills, pillion and luggage. Compare your own tanks to each other, not only to the sticker.",
      },
      {
        question: "Can I enter decimal litres?",
        answer:
          "Yes. Pump displays in India usually show two decimal places. Type them as they appear, for example 8.45.",
      },
      {
        question: "Does this use miles or gallons?",
        answer:
          "No. This tool uses kilometres and litres only.",
      },
      {
        question: "Is my data stored or sent to an API?",
        answer:
          "No. The calculation runs in the browser. There is no account and no database on this page.",
      },
    ],
    relatedToolSlugs: [
      "bike-fuel-cost-calculator",
      "fuel-required-calculator",
      "road-trip-cost-calculator",
      "trip-budget-calculator",
    ],
    relatedArticles: [guidesArticle, tripsArticle],
    cta: defaultCta,
  },
  {
    slug: "road-trip-cost-calculator",
    name: "Road Trip Cost Calculator",
    heading: "Road Trip Cost Calculator",
    seoTitle: "Road Trip Cost Calculator",
    seoDescription:
      "Calculate road trip cost from Delhi NCR or anywhere in India. Enter distance, mileage, fuel price, stay and food to see total, per person and per day. Your estimates only — no live prices.",
    description:
      "Add fuel, stay, food, tolls and extras for a motorcycle or car trip. You enter every rupee; the page adds them up.",
    category: "budget",
    status: "live",
    calculatorId: "trip-cost",
    explanation:
      "Fuel required is distance divided by mileage. Fuel cost is litres times the price you type. Stay, food and extras sit on top. Nothing is fetched from a pump or hotel API.",
    education: [
      {
        title: "Road trip cost calculation",
        paragraphs: [
          "A road-trip bill is fuel plus rooms plus meals plus the small lines people forget: tolls, parking, tickets, a buffer. This calculator totals those lines from figures you already have or can guess.",
          "It works for a Delhi NCR weekend or a longer India run. Enter total kilometres you will actually drive, including the way home if you are returning.",
        ],
        links: [
          {
            href: "/tools/bike-fuel-cost-calculator",
            label: "Bike Fuel Cost Calculator",
          },
          {
            href: "/tools/fuel-required-calculator",
            label: "Fuel Required Calculator",
          },
          {
            href: "/tools/weekend-trip-budget",
            label: "Weekend Trip Budget Calculator",
          },
          {
            href: "/tools/trip-cost-splitter",
            label: "Trip Cost Splitter",
          },
        ],
      },
      {
        title: "Fuel costs",
        paragraphs: [
          "Fuel required (litres) = total distance (km) ÷ mileage (km/l). Fuel cost = litres × ₹ per litre.",
          "Mileage should be a tank you have ridden on similar roads. A car and a motorcycle need different numbers; the vehicle field only labels the result. For a bike-only sketch you can also use the fuel required and bike fuel cost tools.",
        ],
      },
      {
        title: "Accommodation",
        paragraphs: [
          "Accommodation = hotel nights × hotel cost per night. Put the room rate the way you will pay it (whole room, not per pillow, unless that is how you budget).",
          "Zero nights is a valid day trip. This page does not quote hotels.",
        ],
      },
      {
        title: "Food",
        paragraphs: [
          "Food = number of travellers × number of days × food cost per person per day. Days are calendar days on the trip, not hotel nights.",
          "Dhaba meals and hotel breakfasts are both just rupees you type. There is no built-in menu.",
        ],
      },
      {
        title: "Tolls",
        paragraphs: [
          "Tolls are a lump sum. FASTag statements after a similar run are more honest than a guess of zero. Parking is separate so a city overnight does not hide inside fuel.",
        ],
      },
      {
        title: "Budget planning",
        paragraphs: [
          "Read total, per person, per day and per person per day together. A cheap fuel line can still make a steep per-day stay. Change one field and the breakdown updates in the browser.",
          "For an NCR weekend without kilometre maths, the Weekend Trip Budget Calculator takes a transport lump sum instead of mileage. Uneven splits wait on the Trip Cost Splitter.",
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Fuel required = Total distance ÷ Mileage",
        "Fuel cost = Fuel required × Fuel price",
        "Accommodation = Hotel nights × Hotel cost per night",
        "Food = Travellers × Days × Food cost per person per day",
        "Total = Fuel + Accommodation + Food + Tolls + Parking + Activities + Miscellaneous",
        "Per person = Total ÷ Travellers",
        "Per day = Total ÷ Days",
        "Per person per day = Per person ÷ Days",
      ],
      notes: [
        "Distance in km, mileage in km/l, money in ₹. You enter stay, food and extras.",
        "Vehicle type does not change the arithmetic.",
      ],
    },
    faqs: [
      {
        question: "Should distance include the return?",
        answer:
          "Enter the kilometres you will actually drive. For a return trip, add both legs.",
      },
      {
        question: "Does motorcycle vs car change the fuel maths?",
        answer:
          "No. It only labels the breakdown. Mileage and price do the work.",
      },
      {
        question: "Why is there a days field if I already have hotel nights?",
        answer:
          "Food and cost-per-day use calendar days. Hotel nights can be fewer (or zero) than days.",
      },
      {
        question: "Are fuel prices live?",
        answer:
          "No. Type the ₹/litre you expect. There is no pump API.",
      },
      {
        question: "How is food different from the weekend budget tool?",
        answer:
          "Same idea: travellers × days × per-person food. This tool also computes fuel from distance and mileage.",
      },
      {
        question: "Can I leave tolls and parking at zero?",
        answer:
          "Yes, if you truly expect none. Many India highway trips do not.",
      },
      {
        question: "How is the split calculated?",
        answer:
          "Evenly: total ÷ travellers. Custom splits belong on the Trip Cost Splitter when it is live.",
      },
    ],
    relatedToolSlugs: [
      "bike-fuel-cost-calculator",
      "fuel-required-calculator",
      "weekend-trip-budget",
      "trip-cost-splitter",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Price a Delhi NCR weekend",
      body: "If you already have a lump-sum transport number instead of km and mileage, use the weekend budget tool.",
      href: "/tools/weekend-trip-budget",
      label: "Weekend Trip Budget",
    },
  },
  {
    slug: "trip-budget-calculator",
    name: "Trip Budget Calculator",
    heading: "Trip Budget Calculator",
    seoTitle: "Trip Budget Calculator",
    seoDescription:
      "Sketch a trip budget from nights, stay, food, fuel, extras and a buffer. Split per person if you want. Your numbers only — no live hotel prices.",
    description:
      "Plan a daily and total trip budget before you leave home.",
    category: "budget",
    status: "live",
    calculatorId: "budget",
    explanation:
      "Work backwards from nights and daily spend, then add a buffer. Use this before the trip; use the road trip cost calculator when you have a distance and mileage.",
    education: [
      {
        title: "How to sketch a trip budget",
        paragraphs: [
          "Stay total = stay per night × days. Food total = food per day × days. Add a fuel envelope, extras, then a buffer percent on that subtotal.",
          "Example: 2 days, ₹2,500 stay per night, ₹800 food per day, ₹1,200 fuel, ₹400 extras, 10% buffer. Stay ₹5,000 + food ₹1,600 + fuel and extras ₹1,600 = ₹8,200. Buffer ₹820. Total ₹9,020.",
          "This is a planning envelope, not a hotel quote. For a Delhi NCR weekend with stay, food and transport lines you already know, the Weekend Trip Budget Calculator is often a better fit.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-budget",
            label: "Weekend Trip Budget Calculator",
          },
          {
            href: "/tools/road-trip-cost-calculator",
            label: "Road Trip Cost Calculator",
          },
        ],
      },
    ],
    formula: {
      title: "Budget",
      expression:
        "Budget = (Stay per night × days) + (Food per day × days) + Fuel + Extras + Buffer",
      notes: ["Buffer = subtotal × buffer percent.", "Per day = total ÷ days."],
    },
    faqs: [
      {
        question: "How much buffer is sensible?",
        answer:
          "Ten percent covers small detours. Use more for remote stretches where fuel and stay prices swing.",
      },
      {
        question: "Is fuel per day or for the whole trip?",
        answer:
          "Enter a total fuel envelope. Estimate it with the bike fuel cost calculator if you know the route length.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-budget",
      "road-trip-cost-calculator",
      "bike-fuel-cost-calculator",
    ],
    relatedArticles: [tripsArticle],
    cta: defaultCta,
  },
  {
    slug: "fuel-required-calculator",
    name: "Fuel Required Calculator",
    heading: "Fuel Required Calculator",
    seoTitle: "Fuel Required Calculator",
    seoDescription:
      "Estimate litres and fuel cost from distance, mileage and price. Use it for a weekend road trip from Delhi NCR — bike or any vehicle whose km/l you know.",
    description:
      "Find how many litres you need for a ride, and what that fuel is likely to cost.",
    category: "fuel",
    status: "live",
    calculatorId: "fuel-required",
    explanation:
      "Litres required are distance divided by mileage. Multiply those litres by the pump price to estimate fuel cost. Leave a reserve on the bike — this is planning maths, not a fuel gauge.",
    education: [
      {
        title: "How to estimate fuel required",
        paragraphs: [
          "Fuel required (litres) = distance (km) ÷ bike mileage (km/l). Estimated fuel cost = fuel required × price per litre (₹).",
          "Example: 350 km at 35 km/l is 10 litres. At ₹105 per litre the fuel bill is ₹1,050.",
          "Enter a touring mileage you have actually seen. A brochure number will under-state litres on a loaded trip.",
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Fuel required = Distance ÷ Mileage",
        "Fuel cost = Fuel required × Fuel price",
      ],
      notes: [
        "Distance in kilometres, mileage in km/l, fuel price in ₹ per litre.",
        "All three inputs must be greater than zero.",
      ],
    },
    faqs: [
      {
        question: "How is fuel required calculated?",
        answer:
          "Divide the ride distance in kilometres by your bike’s mileage in km/l. The result is litres.",
      },
      {
        question: "How is estimated fuel cost calculated?",
        answer:
          "Multiply fuel required by the price you enter in ₹ per litre. This site does not look up pump prices.",
      },
      {
        question: "Should I add a reserve?",
        answer:
          "Yes, in the real world. The calculator shows the arithmetic only. Usable tank, detours and remote stretches need extra litres beyond this number.",
      },
      {
        question: "Is this the same as the bike fuel cost calculator?",
        answer:
          "The formula is the same. This page leads with litres required; the fuel cost page leads with rupees and also shows cost per 100 km.",
      },
      {
        question: "Does this include tank size?",
        answer:
          "No. It does not convert litres into number of tanks. Compare the litre result with your usable tank capacity yourself.",
      },
      {
        question: "Is any data sent to a server?",
        answer:
          "No. The calculation runs in the browser. There is no API and no database on this page.",
      },
    ],
    relatedToolSlugs: [
      "bike-fuel-cost-calculator",
      "bike-mileage-calculator",
      "road-trip-cost-calculator",
      "weekend-trip-budget",
    ],
    relatedArticles: [guidesArticle, tripsArticle],
    cta: defaultCta,
  },
  {
    slug: "speed-time-distance-calculator",
    name: "Speed Time Distance Calculator",
    description:
      "Convert between speed, riding time and distance for realistic ETAs.",
    category: "planning",
    status: "coming-soon",
    explanation:
      "A three-way converter for speed, time and distance is coming. Use honest average speeds, not peak highway bursts.",
    formula: {
      title: "Speed, time, distance (planned)",
      expression: "Distance = Speed × Time  •  Time = Distance ÷ Speed",
    },
    faqs: [
      {
        question: "What average speed should I assume in India?",
        answer:
          "It depends on the state and the road. Many touring days land far below the speed limit once fuel, food and towns are counted.",
      },
    ],
    relatedToolSlugs: [
      "road-trip-planner",
      "bike-fuel-cost-calculator",
      "trip-budget-calculator",
    ],
    relatedArticles: [tripsArticle],
    cta: defaultCta,
  },
  {
    slug: "toll-fuel-calculator",
    name: "Toll + Fuel Calculator",
    description:
      "Combine highway tolls and fuel cost for a clearer trip total.",
    category: "budget",
    status: "coming-soon",
    explanation:
      "This tool will add corridor tolls to fuel spend. No live toll feed yet — it will stay a client-side estimate.",
    formula: {
      title: "Toll + fuel (planned)",
      expression: "Total = Fuel cost + Sum of tolls",
    },
    faqs: [
      {
        question: "Will you pull live FASTag rates?",
        answer:
          "Not in this architecture. The first version will take toll amounts you enter so the page stays fast and key-free.",
      },
    ],
    relatedToolSlugs: [
      "bike-fuel-cost-calculator",
      "road-trip-cost-calculator",
      "india-road-trip-cost-calculator",
    ],
    relatedArticles: [guidesArticle],
    cta: defaultCta,
  },
  {
    slug: "road-trip-planner",
    name: "Road Trip Planner",
    description:
      "A lightweight planner for routes, overnight stops and riding days.",
    category: "planning",
    status: "coming-soon",
    explanation:
      "A simple day-by-day planner will land here. No accounts — you will fill the days on the page.",
    faqs: [
      {
        question: "Will this replace Google Maps?",
        answer:
          "No. It is for riding days, overnight stops and a cost sketch, not turn-by-turn navigation.",
      },
    ],
    relatedToolSlugs: [
      "speed-time-distance-calculator",
      "trip-budget-calculator",
      "motorcycle-packing-list",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: defaultCta,
  },
  {
    slug: "motorcycle-packing-list",
    name: "Motorcycle Packing List",
    description:
      "A practical packing checklist for motorcycle travel in India.",
    category: "packing",
    status: "coming-soon",
    explanation:
      "A season-aware checklist is coming: riding kit, tools, papers and camp options. Nothing to tick yet.",
    faqs: [
      {
        question: "Will I be able to save a list?",
        answer:
          "The first version will work in the browser without an account. Cloud save is not part of this release.",
      },
    ],
    relatedToolSlugs: [
      "weekend-packing-list",
      "road-trip-planner",
      "trip-budget-calculator",
    ],
    relatedArticles: [guidesArticle],
    cta: defaultCta,
  },
  {
    slug: "weekend-packing-list",
    name: "Weekend Trip Packing List",
    heading: "Weekend Trip Packing List",
    seoTitle: "Weekend Trip Packing List from Delhi NCR",
    seoDescription:
      "Interactive weekend packing checklist for trips from Delhi NCR. Filter by duration, season, trip type and transport. Tick items, add your own, print, and save in the browser — no login.",
    description:
      "A packing checklist for Delhi NCR weekend trips. Duration, season, trip type and transport change the items.",
    category: "packing",
    status: "live",
    interactiveKind: "weekend-packing-list",
    explanation:
      "The list is a rule-based checklist for short trips out of Delhi NCR. Change duration, season, trip type and transport and the categories fill with matching items. Ticks stay on this device via localStorage.",
    education: [
      {
        title: "Weekend Trip Packing List",
        paragraphs: [
          "Use this before a Friday–Sunday escape from Delhi, Gurgaon, Noida, Ghaziabad or Faridabad. It is a packing aid, not a packing service: nothing is ordered, booked or stored on a server.",
          "Start with how many nights you are away, then the season, then whether the trip is mountain, nature, adventure, city, beach, wildlife or a road trip, then bike, car, train or bus. Riding gear only appears for bikes. Car essentials only appear for cars.",
        ],
      },
      {
        title: "What to pack for a 2-day trip",
        paragraphs: [
          "A 2-day trip from Delhi NCR is usually one night away: leave Saturday morning, back Sunday evening — or Friday night out, Sunday back. In this tool that maps to “1 night”. If you leave Friday after work and return Sunday night, use “2 nights”.",
          "For one night, keep clothes to what you will wear plus one spare set, a charged power bank, ID, cash/UPI, and toiletries the hotel may not have. Add a warm layer in winter, rain cover in monsoon, and sunscreen for hills or a long drive.",
          "Two nights (a fuller weekend) needs extra underwear and socks, a laundry bag if you will reuse layers, and a slightly larger first-aid pouch if you are heading to the hills or a park.",
        ],
      },
      {
        title: "What to pack for a road trip from Delhi",
        paragraphs: [
          "Road trips from Delhi NCR fail more often on papers and hydration than on forgotten T-shirts. Keep licence, RC, insurance, PUC and a FASTag or toll cash where you can reach them without unpacking the boot.",
          "In the cabin: water, snacks, wipes, a phone mount and charger, sunglasses, and a rubbish bag. In monsoon add an umbrella. In winter add a blanket. For hills and long highway days, confirm the spare tyre before you leave Ring Road, not at the first puncture.",
          "On a motorcycle, treat riding gear as non-negotiable: helmet, jacket, gloves, rain liner in monsoon, winter gloves in December–February. The packing list adds puncture kit and chain lube when the trip is longer or more remote.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this packing list work without an account?",
        answer:
          "Yes. There is no login. Optional localStorage keeps the last checklist on this browser and device.",
      },
      {
        question: "Will the items change if I change season or transport?",
        answer:
          "Yes. Winter adds thermals and a jacket. Monsoon adds rain kit. Bike shows riding gear. Car shows car essentials. Train and bus add tickets, locks and a neck pillow.",
      },
      {
        question: "What should I pack for a 2-day trip from Delhi?",
        answer:
          "Use 1 night for a Saturday–Sunday outing, or 2 nights for Friday to Sunday. ID, a spare set of clothes, charger, power bank, toiletries and season extras (warm layer or rain jacket) cover most NCR weekends.",
      },
      {
        question: "What should I pack for a road trip from Delhi?",
        answer:
          "Vehicle papers, FASTag or toll cash, water, snacks, phone mount, charger, and a checked spare if you are in a car. On a bike, pack riding gear first, then clothes.",
      },
      {
        question: "Can I add my own items?",
        answer:
          "Yes. Use Add custom item, pick a category, then save. Custom lines stay with the checklist in localStorage until you delete them or hit Reset.",
      },
      {
        question: "If I delete a suggested item, will it come back?",
        answer:
          "Not until you Reset. Deleted suggested items are remembered on this device. Changing duration or season will not restore them.",
      },
      {
        question: "Is beach packing useful from Delhi NCR?",
        answer:
          "A true beach is a long drive from NCR. The Beach type is still there if you are heading to a pool stay, a far coast trip, or packing swim kit. It is not a claim that Goa is a Delhi weekend.",
      },
      {
        question: "Does Print send my list to HarshOnRoads?",
        answer:
          "No. Print uses your browser. Load saved reads localStorage on this device only.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-finder",
      "weekend-trip-budget",
      "ai-packing-list",
      "motorcycle-packing-list",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Match a destination first",
      body: "If you have not picked a place yet, run the Weekend Trip Finder, then come back and pack for that style of trip.",
      href: "/tools/weekend-trip-finder",
      label: "Weekend Trip Finder",
    },
  },
  {
    slug: "india-road-trip-cost-calculator",
    name: "India Road Trip Cost Calculator",
    description:
      "Estimate India-specific road trip costs including fuel, stay and food.",
    category: "india",
    status: "coming-soon",
    explanation:
      "A later version will use India-flavoured defaults (dhaba food, highway stay bands, typical touring mileage). Until then, the live trip cost and budget tools cover the same maths.",
    formula: {
      title: "India trip cost (planned)",
      expression: "Total = Fuel + Stay + Food + Tolls + Buffer",
    },
    faqs: [
      {
        question: "How is this different from the road trip cost calculator?",
        answer:
          "Same bones, India-specific presets and copy. Use the live trip cost tool until this one ships.",
      },
    ],
    relatedToolSlugs: [
      "road-trip-cost-calculator",
      "trip-budget-calculator",
      "toll-fuel-calculator",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: defaultCta,
  },
  {
    slug: "weekend-trip-finder",
    name: "Weekend Trip Finder",
    heading: "Weekend Trip Finder from Delhi NCR",
    seoTitle: "Weekend Trip Finder from Delhi NCR",
    seoDescription:
      "Find the best weekend trips from Delhi NCR based on your budget, time, travel style and interests.",
    description:
      "Match Delhi NCR weekend destinations to your time, budget, group, transport and interests — no AI, no live APIs.",
    category: "planning",
    status: "live",
    interactiveKind: "weekend-trip-finder",
    explanation:
      "HarshOnRoads Match scores a small, fixed list of NCR weekend places against the answers you tap. It is preference matching, not a live hotel, traffic or weather engine.",
    education: [
      {
        title: "What is the Weekend Trip Finder?",
        paragraphs: [
          "It is a filter for weekend escapes from Delhi, Gurgaon, Noida, Ghaziabad and Faridabad. You answer seven questions; the site ranks destinations from a curated list.",
          "Version one does not call maps, hotels or an AI model. Travel times are rough bands, and budgets are category labels — not today’s room rates.",
        ],
      },
      {
        title: "How does it work?",
        paragraphs: [
          "Each place in the list already has compatible durations, budget bands, a travel-time category, group types, transport modes and interests.",
          "Your answers add up to a HarshOnRoads Match percentage. A high score means the destination’s tags line up with what you selected — not that the road will be empty or a hotel will be free.",
        ],
      },
      {
        title: "How to choose a weekend destination from Delhi NCR",
        paragraphs: [
          "Start with hours, not kilometres. A six-hour one-way drive eats a two-day trip. Hill stations like Nainital and Shimla usually need more nights than Neemrana or Agra.",
          "If you are on a motorcycle, use the fuel tools to sanity-check litres and cost after you pick a place. The finder does not calculate fuel.",
        ],
        links: [
          { href: "/tools", label: "All HarshOnRoads tools" },
          {
            href: "/tools/bike-fuel-cost-calculator",
            label: "Bike Fuel Cost Calculator",
          },
          {
            href: "/tools/bike-mileage-calculator",
            label: "Bike Mileage Calculator",
          },
          {
            href: "/tools/fuel-required-calculator",
            label: "Fuel Required Calculator",
          },
        ],
      },
      {
        title: "How much should you budget for a weekend trip?",
        paragraphs: [
          "The bands in the form (under ₹3,000 up to ₹15,000+) are per-person sketches covering stay, food and local travel in a typical non-festival week. Fuel, FASTag, safaris and festival surcharges sit on top.",
          "A day trip to Mathura or Alwar can sit in a lower band. A Taj stay, a Corbett safari or a Shimla hotel weekend often does not. Treat the match as a category, then check current prices yourself.",
        ],
      },
      {
        title: "How far can you travel in a weekend?",
        paragraphs: [
          "From NCR, two hours covers short hops such as Neemrana. Four hours is the Agra / Alwar / Mathura kind of radius. Six hours starts to include Jaipur, Rishikesh and Corbett if you leave early.",
          "Eight hours and beyond is hill-station territory — possible, but you spend the weekend on the road unless you take extra nights. The 10+ hour option exists for people who accept a long haul to Shimla.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this an AI trip planner?",
        answer:
          "No. Destinations and scores are fixed rules on this website. For a day-by-day sketch, use the AI Weekend Planner — it still starts from this same destination list.",
      },
      {
        question: "Are the travel times exact?",
        answer:
          "No. They are approximate driving bands from Delhi, nudged slightly if you start in Gurgaon, Noida, Ghaziabad or Faridabad. Fog, dhaba stops and highway work are not modelled.",
      },
      {
        question: "Do you show live hotel prices?",
        answer:
          "No. Budget choices are broad per-person categories so the filter can work without a database or booking API.",
      },
      {
        question: "Why did a place still appear if one answer did not match?",
        answer:
          "The engine always returns the top five scores. A destination can rank even if one factor is weak, as long as the others add up. Read the why-it-matches list.",
      },
      {
        question: "Can I use this for trips across India?",
        answer:
          "Not yet. This list is weekend escapes from Delhi NCR. Wider India is a later expansion.",
      },
      {
        question: "I am going by bike — does the score include fuel?",
        answer:
          "Transport fit only checks whether the destination is commonly done by bike, car, bus or train. For litres and rupees, use the fuel calculators.",
      },
      {
        question: "What does HarshOnRoads Match mean?",
        answer:
          "It is the share of points from duration, budget, travel time, interests, group and transport. It is not a safety, weather or quality rating.",
      },
      {
        question: "Are wildlife safaris guaranteed?",
        answer:
          "No. Corbett, Sariska and Bharatpur follow park calendars, permits and chance. The finder only notes that wildlife is a reason people go.",
      },
    ],
    relatedToolSlugs: [
      "long-weekend-planner",
      "bike-fuel-cost-calculator",
      "weekend-packing-list",
      "weekend-trip-budget",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Want a complete personalized weekend itinerary?",
      body: "Turn your answers into a three-destination weekend sketch with day-by-day notes. Estimates only — verify before you go.",
      href: "/tools/ai-weekend-planner",
      label: "AI Weekend Planner",
    },
  },
  {
    slug: "long-weekend-planner",
    name: "Long Weekend Trip Planner",
    heading: "Long Weekend Trip Planner from Delhi NCR",
    seoTitle: "Long Weekend Trip Planner from Delhi NCR",
    seoDescription:
      "Plan a 2-day, 3-day, 4-day or 5-day long weekend from Delhi NCR. Match budget, group, transport, interests and travel time to a fixed destination list. No login, no live APIs.",
    description:
      "Decide how to use a 2- to 5-day break from Delhi NCR. Same destination matches as the Weekend Trip Finder, framed for long weekends.",
    category: "planning",
    status: "live",
    interactiveKind: "long-weekend-planner",
    explanation:
      "Available days are mapped onto the destination list’s duration tags, then the Weekend Trip Finder engine ranks places. It is preference matching, not live hotels, traffic or weather.",
    education: [
      {
        title: "Long Weekend Trip Planner from Delhi NCR",
        paragraphs: [
          "A long weekend from Delhi, Gurgaon, Noida, Ghaziabad or Faridabad is mostly a time-budget problem. Extra days help only if they are spent at the destination, not in Ghaziabad traffic on both ends.",
          "This planner asks how many days you have, then budget, group, transport, interests and a maximum one-way travel time. Destinations come from the same curated NCR weekend list as the Weekend Trip Finder. Rankings use that finder engine — they are not a second formula.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-finder",
            label: "Weekend Trip Finder",
          },
        ],
      },
      {
        title: "Make the most of your long weekend",
        paragraphs: [
          "On a 2-day weekend, stay inside a short driving band. Agra, Alwar, Neemrana and Mathura-style distances leave you a Saturday on the ground. A seven-hour hill run does not.",
          "On a 3-day weekend, two nights in one hill or wildlife base is the usual win: Rishikesh, Lansdowne, Corbett, Jaipur if you leave early. Do not add a second city.",
          "On a 4-day weekend, book three nights and treat the fourth calendar day as travel buffer. That is when Nainital or Mussoorie stops feeling like a commute with a hotel in the middle.",
          "On a 5-day break, this list still scores stays as 3 nights / 4 days — the longest tag in the dataset. Use the fifth day to come back slowly, rest, or take a short outing from the same base. A five-stop loop from Ring Road is how the holiday disappears.",
        ],
      },
      {
        title: "How to plan a 3-day weekend from Delhi",
        paragraphs: [
          "Leave Friday after work only if the drive is under about six hours and you have already booked the first night. Otherwise leave Saturday at dawn and take Sunday night plus Monday.",
          "Cap one-way time in this tool before you fall in love with a hill station. The match score will still show places that are a stretch; read the travel-time line.",
          "Price the trip separately. The budget band is a category, not a hotel quote. Use the Weekend Trip Budget calculator with your own stay and food numbers.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-budget",
            label: "Weekend Trip Budget Calculator",
          },
          {
            href: "/tools/weekend-packing-list",
            label: "Weekend Trip Packing List",
          },
        ],
      },
      {
        title: "How far can you go on a long weekend from NCR?",
        paragraphs: [
          "Two hours: short heritage or resort hops. Four hours: Agra, Alwar, Mathura. Six hours: Jaipur, Rishikesh, Corbett if you start early. Eight hours and beyond: possible on a 3- or 4-day break, expensive in fatigue on a 2-day break.",
          "Times in the form are rough driving bands from Delhi NCR, not Google Maps. Festival exodus, fog and mountain landslides are not in the score.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a different ranking engine from the Weekend Trip Finder?",
        answer:
          "No. Long-weekend length is mapped to the same duration tags (1 night / 2 days, 2 nights / 3 days, 3 nights / 4 days), then the finder engine scores the same destination list.",
      },
      {
        question: "How is a 5-day long weekend scored?",
        answer:
          "As 3 nights / 4 days — the longest stay tag in the catalogue. The extra calendar day is for buffer, rest or a short add-on from the same base, not a second long drive.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. Nothing is saved on a server. There is no login, database or API.",
      },
      {
        question: "Are these live hotel or traffic results?",
        answer:
          "No. HarshOnRoads Match is a preference score. Budgets are bands. Travel times are rough hours from NCR.",
      },
      {
        question: "Why include a starting city if I already live in NCR?",
        answer:
          "Gurgaon, Noida, Ghaziabad and Faridabad shift the rough driving hours slightly by corridor. The destination list is still the Delhi NCR weekend set.",
      },
      {
        question: "Can I use this for a pan-India holiday?",
        answer:
          "No. The list is weekend-scale places from Delhi NCR. Goa or Leh are not in this dataset.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-finder",
      "weekend-trip-budget",
      "weekend-packing-list",
      "road-trip-cost-calculator",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Same list, shorter wizard",
      body: "If you already think in 1 night / 2 days instead of calendar days, the Weekend Trip Finder is the same engine with duration tags.",
      href: "/tools/weekend-trip-finder",
      label: "Weekend Trip Finder",
    },
  },
  {
    slug: "ai-weekend-planner",
    name: "AI Weekend Planner",
    heading: "AI Weekend Trip Planner from Delhi NCR",
    seoTitle: "AI Weekend Trip Planner from Delhi NCR",
    seoDescription:
      "Plan a personalized weekend trip from Delhi NCR. Answer a short form and get three destination sketches with day-by-day notes, estimated budgets and packing tips. Verify stay and roads before you go.",
    description:
      "Get three weekend trip ideas from Delhi NCR, with day-by-day sketches drawn from the HarshOnRoads destination list.",
    category: "planning",
    status: "live",
    interactiveKind: "ai-weekend-planner",
    explanation:
      "The planner asks where you start, how much time and budget you have, who is travelling, and what you want. A model then writes three itinerary sketches using the HarshOnRoads destination list. Budgets and timings are estimates. Live hotel, road and ticket status is not checked.",
    education: [
      {
        title: "AI weekend trip planner from Delhi NCR",
        paragraphs: [
          "If you have a free weekend in Delhi, Gurugram, Noida, Ghaziabad or Faridabad, the hard part is choosing a place that fits the hours you actually have.",
          "This planner turns that into a short questionnaire, then writes three destination sketches. It is for personalized weekend trip planning — not live bookings.",
        ],
      },
      {
        title: "How weekend trip planning from Delhi NCR works here",
        paragraphs: [
          "You pick a start city, 1–4 days, a per-person budget band, group type, people count, transport, interests, travel style and a maximum one-way travel time.",
          "HarshOnRoads first ranks its own destination list against those answers. The model then writes day-by-day notes only for places on that list. It does not invent a new hill station.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-finder",
            label: "Weekend Trip Finder",
          },
          { href: "/destinations", label: "Destination notes" },
        ],
      },
      {
        title: "Personalized weekend trips, with limits",
        paragraphs: [
          "The write-up can match your group and interests. It cannot see today’s hotel rooms, park tickets, weather or highway closures.",
          "Read every budget as estimated. Confirm stay, roads and timings yourself before you leave Ring Road.",
        ],
      },
      {
        title: "When to use the finder instead",
        paragraphs: [
          "If you only want a ranked shortlist with no prose, the Weekend Trip Finder uses the same destination list and scoring, with no model in the loop.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this book hotels or tickets?",
        answer:
          "No. It writes an estimated plan. You still book stay, buses, trains and park tickets yourself.",
      },
      {
        question: "Are the prices exact?",
        answer:
          "No. Budgets are per-person sketches for stay, food and local travel. Fuel and tolls are not live quotes.",
      },
      {
        question: "Can it invent a destination that is not on HarshOnRoads?",
        answer:
          "It should not. The server only accepts slugs from the HarshOnRoads destination list. If a result looks wrong, use the Weekend Trip Finder.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. Nothing is saved to a database. Plans stay in this browser session.",
      },
      {
        question: "Are my results indexed by Google?",
        answer:
          "No. Only this tool page is public SEO content. Generated itineraries are not published as URLs.",
      },
      {
        question: "What if the planner is unavailable?",
        answer:
          "If the API key is missing or the model fails, you will see a short error. Use the Weekend Trip Finder for a non-AI match.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-finder",
      "long-weekend-planner",
      "weekend-trip-budget",
      "weekend-packing-list",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Prefer a scored shortlist?",
      body: "The Weekend Trip Finder ranks the same destination list without a model.",
      href: "/tools/weekend-trip-finder",
      label: "Weekend Trip Finder",
    },
  },
  {
    slug: "ai-trip-finder",
    name: "AI Trip Finder",
    heading: "AI Trip Finder from Delhi NCR",
    seoTitle: "AI Trip Finder from Delhi NCR",
    seoDescription:
      "Describe the weekend you want from Delhi NCR and get five HarshOnRoads destinations with preference scores, why they fit, and typical travel and budget bands. Verify stay and roads before you go.",
    description:
      "Type what you want in plain language and get five destination ideas from the HarshOnRoads list.",
    category: "planning",
    status: "live",
    interactiveKind: "ai-trip-finder",
    explanation:
      "Write a free-text request, optionally add start city, days, budget, group, transport and interests, then get five destinations from the HarshOnRoads list. HarshOnRoads Match is a preference score from the filters you chose — not live travel conditions.",
    education: [
      {
        title: "Natural-language destination discovery",
        paragraphs: [
          "If you can describe the weekend — starting from Gurgaon, two free days, about ₹8,000, somewhere peaceful with mountains — this tool turns that into a shortlist.",
          "It only recommends places already on the HarshOnRoads destination list. It does not invent a new hill station.",
        ],
      },
      {
        title: "How the match is scored",
        paragraphs: [
          "HarshOnRoads Match is built from the optional filters you select (and typical weekend defaults where you leave a filter blank).",
          "It is a preference score against the same destination dataset as the Weekend Trip Finder. It is not a scientific ranking and it does not read live traffic, hotels or weather.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-finder",
            label: "Weekend Trip Finder",
          },
          { href: "/destinations", label: "Destination notes" },
        ],
      },
      {
        title: "Estimates, not live conditions",
        paragraphs: [
          "Travel duration and budget bands are typical categories from the destination notes.",
          "Confirm stay, roads, park tickets and timings yourself before you leave Ring Road.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need to fill every filter?",
        answer:
          "No. The description is required. Starting location, days, budget, group, transport and interests are optional.",
      },
      {
        question: "Is HarshOnRoads Match an official ranking?",
        answer:
          "No. It is a preference score from the filters you selected. Treat it as a guide, not objective truth.",
      },
      {
        question: "Does this check live roads or hotels?",
        answer:
          "No. It does not claim live travel conditions. Verify stay, roads and timings before you go.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. Searches are not saved. Results stay in this browser session.",
      },
      {
        question: "Can it recommend a place that is not on HarshOnRoads?",
        answer:
          "It should not. The server only accepts slugs from the HarshOnRoads destination list.",
      },
      {
        question: "Are my results indexed by Google?",
        answer:
          "No. Only this tool page is public SEO content. Generated shortlists are not published as URLs.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-finder",
      "ai-weekend-planner",
      "long-weekend-planner",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Want a scored shortlist without a model?",
      body: "The Weekend Trip Finder ranks the same destination list from structured answers only.",
      href: "/tools/weekend-trip-finder",
      label: "Weekend Trip Finder",
    },
  },
  {
    slug: "ai-itinerary-generator",
    name: "AI Itinerary Generator",
    heading: "AI Itinerary Generator from Delhi NCR",
    seoTitle: "AI Itinerary Generator from Delhi NCR",
    seoDescription:
      "Generate a personalized 1- to 5-day itinerary for a HarshOnRoads destination from Delhi NCR. Day-by-day morning, afternoon and evening notes with estimated budgets. Verify stay and roads before you go.",
    description:
      "Already know the destination? Get a day-by-day itinerary from the HarshOnRoads list, with estimated budgets and road-trip notes.",
    category: "planning",
    status: "live",
    interactiveKind: "ai-itinerary-generator",
    explanation:
      "Choose a start city and a HarshOnRoads destination, then add days, dates, travellers, budget, transport, travel style and interests. A model writes a day-by-day sketch. Budgets and timings are estimates. Live hotel, road and ticket status is not checked.",
    education: [
      {
        title: "Personalized itineraries for a place you already chose",
        paragraphs: [
          "Use this after you have a destination in mind — from the Trip Finder, Weekend Planner, or the destination notes.",
          "It writes morning, afternoon and evening notes for 1–5 days using the HarshOnRoads destination list. It does not invent a new town.",
        ],
      },
      {
        title: "Estimates, not live bookings",
        paragraphs: [
          "Daily budgets, stay areas and travel times are sketches. They are not hotel availability or current pump prices.",
          "Confirm stay, roads, park tickets and timings yourself before you leave Ring Road.",
        ],
        links: [
          {
            href: "/tools/ai-trip-finder",
            label: "AI Trip Finder",
          },
          { href: "/destinations", label: "Destination notes" },
        ],
      },
      {
        title: "Road-trip extras",
        paragraphs: [
          "If you pick bike or car, the plan also includes a suggested departure window, a typical travel-duration category, break ideas and fuel-planning guidance.",
          "Duration is a category from the destination notes, not live traffic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this book hotels or tickets?",
        answer:
          "No. Stay areas are neighbourhood-level suggestions. You still book stay, buses, trains and park tickets yourself.",
      },
      {
        question: "Are the prices exact?",
        answer:
          "No. Daily budgets are per-person sketches for stay, food and local travel. Fuel and tolls are not live quotes.",
      },
      {
        question: "Can it invent a destination that is not on HarshOnRoads?",
        answer:
          "It should not. You pick a destination from the HarshOnRoads list. The server only accepts that slug.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. Nothing is saved to a database. Plans stay in this browser session.",
      },
      {
        question: "Are my results indexed by Google?",
        answer:
          "No. Only this tool page is public SEO content. Generated itineraries are not published as URLs.",
      },
      {
        question: "What if I only want one day rewritten?",
        answer:
          "Use Regenerate day on that card. The rest of the itinerary stays. You can also regenerate the whole plan, edit inputs, print or start over.",
      },
    ],
    relatedToolSlugs: [
      "ai-trip-finder",
      "ai-weekend-planner",
      "long-weekend-planner",
      "weekend-trip-finder",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Still choosing a destination?",
      body: "The AI Trip Finder shortlists HarshOnRoads places from a plain-language request.",
      href: "/tools/ai-trip-finder",
      label: "AI Trip Finder",
    },
  },
  {
    slug: "ai-trip-cost-estimator",
    name: "AI Trip Cost Estimator",
    heading: "AI Trip Cost Estimator from Delhi NCR",
    seoTitle: "AI Trip Cost Estimator from Delhi NCR",
    seoDescription:
      "Estimate a weekend trip cost from Delhi NCR in plain language. Extracts origin, destination, duration, travellers, transport and style, then returns Budget, Comfort and Higher Comfort sketches. Not live prices — edit assumptions before you go.",
    description:
      "Describe a trip in plain language. Get estimated Budget, Comfort and Higher Comfort totals, per-person costs and editable assumptions. Not live prices.",
    category: "budget",
    status: "live",
    interactiveKind: "ai-trip-cost-estimator",
    explanation:
      "Type a sentence such as four friends from Noida going to Rishikesh for two nights in a car. A model extracts origin, destination, duration, travellers, transport and trip style, then sketches three cost bands. Figures are estimates. Live hotel, fuel, toll and ticket prices are not checked. You can edit assumptions, including distance, mileage and fuel price for a private vehicle. Nothing is saved and there is no login.",
    education: [
      {
        title: "Natural-language cost sketches, not quotes",
        paragraphs: [
          "The estimator maps your request onto the HarshOnRoads destination list. It does not invent a town, and it does not look up current hotels or pump prices.",
          "Use it to compare Budget, Comfort and Higher Comfort bands before you type your own numbers into the weekend budget or road-trip calculators.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-budget",
            label: "Weekend Trip Budget Calculator",
          },
          {
            href: "/tools/road-trip-cost-calculator",
            label: "Road Trip Cost Calculator",
          },
        ],
      },
      {
        title: "What gets extracted",
        paragraphs: [
          "Origin, destination, duration, traveller count, transport and trip style are read from the sentence. Optional hints on the form override blanks.",
          "Duration follows the same bands as other tools: day trip, 1 night / 2 days, 2 nights / 3 days, or 3 nights / 4 days.",
        ],
      },
      {
        title: "How the three scenarios are added up",
        paragraphs: [
          "Accommodation = estimated group stay per night × nights. Food = travellers × days × estimated food per person per day.",
          "For a bike or car, transport / fuel = round-trip km ÷ mileage × fuel price. You can change those three inputs. Tolls, parking, activities and miscellaneous stay as editable group totals.",
          "For bus or train, the transport line is an estimated ticket total for the group, not a live fare. Per person = estimated total ÷ travellers.",
        ],
      },
    ],
    formula: {
      title: "How the sketch is calculated",
      expression: [
        "Stay = nights × stay per night (group)",
        "Food = travellers × days × food per person per day",
        "Fuel (bike/car) = round-trip km ÷ mileage × fuel price",
        "Total = stay + food + transport + activities + tolls + parking + miscellaneous",
        "Per person = total ÷ travellers",
      ],
      notes: [
        "Every rupee is an estimate. Fuel price, mileage and distance are assumptions you can edit.",
        "Tolls, parking and tickets are typical sketches, not live quotes.",
      ],
    },
    faqs: [
      {
        question: "Are these current hotel or fuel prices?",
        answer:
          "No. Totals are planning sketches. Edit the assumptions and verify stay, roads, fuel, tolls and tickets yourself.",
      },
      {
        question: "Can I change distance, mileage and fuel price?",
        answer:
          "Yes, when transport is a bike or car. Fuel is recalculated in the browser as distance ÷ mileage × price. Those fields are assumptions, not GPS or pump data.",
      },
      {
        question: "What if the place is not on HarshOnRoads?",
        answer:
          "The model may only use listed destinations. If your place is not on the list, pick the closest listed option or use the Weekend Trip Budget Calculator with your own numbers.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. There is no login and nothing is stored in a database. Sketches stay in this browser session.",
      },
      {
        question: "Can this book hotels or tickets?",
        answer:
          "No. It is not a booking engine. Use the destination notes and the budget calculators when you are ready to enter your own rupees.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-budget",
      "road-trip-cost-calculator",
      "ai-itinerary-generator",
    ],
    relatedArticles: [tripsArticle],
    cta: {
      title: "Want a day-by-day plan for the same place?",
      body: "The AI Itinerary Generator writes morning, afternoon and evening notes for a HarshOnRoads destination.",
      href: "/tools/ai-itinerary-generator",
      label: "AI Itinerary Generator",
    },
  },
  {
    slug: "ai-packing-list",
    name: "AI Packing List",
    heading: "AI Packing List from Delhi NCR",
    seoTitle: "AI Packing List from Delhi NCR",
    seoDescription:
      "Generate a personalized packing list for a HarshOnRoads destination from Delhi NCR. Essential, recommended and optional items by category. Tick, add and print — saved in this browser, not live shop data.",
    description:
      "A personalized packing list for a HarshOnRoads destination. Essential, recommended and optional items you can tick, add to and print. Saved in this browser.",
    category: "packing",
    status: "live",
    interactiveKind: "ai-packing-list",
    explanation:
      "Choose a HarshOnRoads destination, duration, season, transport, trip type, activities and traveller count. A model writes Essential, Recommended and Optional items across documents, clothes, kit and emergency gear. Riding gear appears for bikes. The list is a sketch, not a shop inventory. Ticks, deletes and custom lines save in this browser only. No login.",
    education: [
      {
        title: "A list for a place you already chose",
        paragraphs: [
          "Use this after you have a HarshOnRoads destination in mind. The model does not invent a new town.",
          "Essential, recommended and optional bands help you pack a small bag without treating every line as mandatory.",
        ],
      },
      {
        title: "Check, add, print — on this device",
        paragraphs: [
          "Tick items as you pack, add your own lines, delete what you do not need, then print. Reset clears the saved list on this browser.",
          "Nothing is stored on a HarshOnRoads server. There is no account.",
        ],
        links: [
          {
            href: "/tools/weekend-packing-list",
            label: "Weekend Packing List",
          },
          {
            href: "/tools/ai-itinerary-generator",
            label: "AI Itinerary Generator",
          },
        ],
      },
      {
        title: "Season, transport and activities change the kit",
        paragraphs: [
          "Winter adds layers. Monsoon adds rain cover. A bike adds riding gear. Photography in the activities adds camera kit. Scale clothing to how many people are travelling and how many nights you are away.",
          "Park rules, helmet laws and weather still need a check the day you leave.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a shopping list with live products?",
        answer:
          "No. Names are packing prompts, not products to buy. Confirm what you already own and what the destination actually requires.",
      },
      {
        question: "Does the list save if I close the tab?",
        answer:
          "Yes, in this browser via localStorage. Another phone or a cleared cache will not see it. HarshOnRoads does not store the list.",
      },
      {
        question: "When does riding gear appear?",
        answer:
          "When transport is bike. Car, bus and train lists should skip riding gear.",
      },
      {
        question: "Can I add or delete items?",
        answer:
          "Yes. Add a custom line with a category and priority. Delete removes it from this saved list until you regenerate or reset.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. There is no login and no database.",
      },
    ],
    relatedToolSlugs: [
      "weekend-packing-list",
      "ai-itinerary-generator",
      "ai-weekend-planner",
    ],
    relatedArticles: [guidesArticle],
    cta: {
      title: "Want a rule-based list instead?",
      body: "The Weekend Packing List fills from duration, season, trip type and transport with no model.",
      href: "/tools/weekend-packing-list",
      label: "Weekend Packing List",
    },
  },
  {
    slug: "ai-travel-content-creator",
    name: "AI Travel Content Creator",
    heading: "AI Travel Content Creator from Delhi NCR",
    seoTitle: "AI Travel Content Creator from Delhi NCR",
    seoDescription:
      "Draft YouTube, Shorts, Instagram, Reels and blog copy for a HarshOnRoads destination from Delhi NCR. Titles, hooks, scripts and outlines — not fake trip stories. Copy each block. No login.",
    description:
      "Draft YouTube, Shorts, Instagram, Reels and blog copy for a HarshOnRoads destination. Copy each block. No fake visit claims unless you say you went.",
    category: "planning",
    status: "live",
    interactiveKind: "ai-travel-content-creator",
    explanation:
      "Pick a HarshOnRoads destination, describe the trip, choose audience, tone and platform. A model writes draft titles, hooks, scripts or outlines. It must not invent that you visited unless you tick that box. Copy is a sketch to edit, not published fact. Nothing is stored. No login.",
    education: [
      {
        title: "Copy for a place on the HarshOnRoads list",
        paragraphs: [
          "Use this when you already know the destination. The model should not invent a town off the catalogue.",
          "YouTube, Shorts, Instagram, Reels and blog each return a different set of blocks. Copy them one at a time.",
        ],
      },
      {
        title: "No fake personal travel",
        paragraphs: [
          "Leave “I have been” unchecked unless you actually went. The draft should not write I/we visited as a story.",
          "Even if you went, do not treat invented meals, hotels or weather as something that happened. Edit before you publish.",
        ],
        links: [
          {
            href: "/tools/ai-itinerary-generator",
            label: "AI Itinerary Generator",
          },
          { href: "/destinations", label: "Destination notes" },
        ],
      },
      {
        title: "Not a ranking or booking page",
        paragraphs: [
          "Titles and captions are drafts. They are not live SEO rankings, not a content calendar, and not proof of conditions on the ground.",
          "Verify stay, roads and local rules from current sources before you tell an audience to go.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will this write as if I visited?",
        answer:
          "Only if you tick that you have been there. Otherwise the draft should stay in third person or planning language, not a fake diary.",
      },
      {
        question: "Can I copy one block at a time?",
        answer:
          "Yes. Each result card has its own Copy button.",
      },
      {
        question: "Does this save my drafts?",
        answer:
          "No. There is no login and no database. Refresh the page and the generated copy is gone unless you copied it.",
      },
      {
        question: "Are the titles guaranteed to rank?",
        answer:
          "No. They are starting points. Do not keyword-stuff or treat them as search-volume data.",
      },
      {
        question: "Can it invent a destination HarshOnRoads does not list?",
        answer:
          "It should not. You choose from the HarshOnRoads destination list. The server only accepts that slug.",
      },
    ],
    relatedToolSlugs: [
      "ai-itinerary-generator",
      "ai-weekend-planner",
      "ai-packing-list",
    ],
    relatedArticles: [guidesArticle],
    cta: {
      title: "Need a day-by-day plan first?",
      body: "The AI Itinerary Generator writes morning, afternoon and evening notes for the same destination list.",
      href: "/tools/ai-itinerary-generator",
      label: "AI Itinerary Generator",
    },
  },
  {
    slug: "weekend-trip-budget",
    name: "Weekend Trip Budget Calculator",
    heading: "Weekend Trip Budget Calculator",
    seoTitle: "Weekend Trip Budget Calculator",
    seoDescription:
      "Estimate a weekend trip budget from Delhi NCR. Enter stay, food, transport, tolls and extras to see total cost, per person and per day. No live prices — your numbers only.",
    description:
      "Add up stay, food, transport and extras for a weekend from Delhi NCR. You enter every rupee; the page only adds them up.",
    category: "budget",
    status: "live",
    calculatorId: "weekend-budget",
    explanation:
      "The calculator multiplies nights and daily food by the counts you type, then adds transport, activities, tolls, parking and miscellaneous. It does not look up hotels or fuel.",
    education: [
      {
        title: "How much does a weekend trip from Delhi cost?",
        paragraphs: [
          "There is no single answer. A day in Mathura on a shared car is a different bill from two nights in Mussoorie with a hotel and hill food. This page does not publish a typical price. It totals the estimates you already have.",
          "For a sense of destination style before you price it, use the Weekend Trip Finder. For litres on a bike run, use the Fuel Required Calculator. Then bring those rupees back here.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-finder",
            label: "Weekend Trip Finder",
          },
          {
            href: "/tools/road-trip-cost-calculator",
            label: "Road Trip Cost Calculator",
          },
          {
            href: "/tools/trip-cost-splitter",
            label: "Trip Cost Splitter",
          },
          {
            href: "/tools/fuel-required-calculator",
            label: "Fuel Required Calculator",
          },
        ],
      },
      {
        title: "How to calculate a weekend travel budget",
        paragraphs: [
          "Accommodation total = hotel nights × room rate per night (the rate for the room, not per person, unless you typed it that way).",
          "Food total = travellers × days × food per person per day. Transport, activities, tolls, parking and miscellaneous are lump sums you enter.",
          "Total = all of those lines. Per person = total ÷ travellers. Per person per day = per person ÷ days.",
        ],
      },
      {
        title: "How to travel on a budget",
        paragraphs: [
          "Cut the lines you control: fewer hotel nights (or a day trip), shared rooms, bus or train instead of a car, food from dhabas instead of hotel restaurants. The form will show the new total as soon as you change a field.",
          "Do not delete tolls and parking on a highway weekend. They are small until you ignore them. A miscellaneous line is a buffer, not a wish.",
        ],
      },
      {
        title: "How to split trip expenses",
        paragraphs: [
          "This calculator splits the grand total evenly across travellers. It does not track who paid the fuel or the hotel. Uneven splits belong in the Trip Cost Splitter when that tool ships.",
          "If two people share one hotel room, still enter the full room rate under accommodation, then let per-person do the division — unless you only want one person’s share in every field.",
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Accommodation = Hotel nights × Accommodation per night",
        "Food = Travellers × Days × Food per person per day",
        "Total = Accommodation + Food + Transport + Activities + Tolls + Parking + Miscellaneous",
        "Per person = Total ÷ Travellers",
        "Per person per day = Per person ÷ Days",
      ],
      notes: [
        "All rupee fields are your estimates. Transport mode is a label only.",
        "Hotel nights can be zero for a day trip.",
      ],
    },
    faqs: [
      {
        question: "Does this use live hotel or fuel prices?",
        answer:
          "No. Every rupee is typed by you. There is no API and no database of tariffs.",
      },
      {
        question: "Is the room rate per person or for the whole room?",
        answer:
          "Enter it the way you will pay. If the hotel quotes ₹4,000 for the room, put ₹4,000. The per-person line divides the whole trip, including that room, by the number of travellers.",
      },
      {
        question: "How is food calculated?",
        answer:
          "Food per person per day × number of travellers × number of days. It is not multiplied by hotel nights.",
      },
      {
        question: "What should I put under transport?",
        answer:
          "The cash you expect to spend getting there and back: fuel, bus or train tickets. Pick bike, car, bus or train so the breakdown is labelled. The mode does not change the maths.",
      },
      {
        question: "Can hotel nights be zero?",
        answer:
          "Yes. Use zero nights for a day trip. Accommodation total will be ₹0.",
      },
      {
        question: "How is the split done?",
        answer:
          "Evenly: total ÷ travellers. For custom splits, use the Trip Cost Splitter when it is live.",
      },
      {
        question: "Is this only for Delhi NCR?",
        answer:
          "The copy is aimed at NCR weekends. The arithmetic works for any trip if you enter honest numbers.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-finder",
      "road-trip-cost-calculator",
      "trip-cost-splitter",
      "fuel-required-calculator",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Pick a place, then price it",
      body: "Match a Delhi NCR weekend first, then bring your own rupee estimates back here.",
      href: "/tools/weekend-trip-finder",
      label: "Weekend Trip Finder",
    },
  },
  {
    slug: "trip-cost-splitter",
    name: "Trip Cost Splitter",
    heading: "Trip Cost Splitter",
    seoTitle: "Trip Cost Splitter",
    seoDescription:
      "Split group travel expenses equally. Enter who paid fuel, hotel, food and extras, then see who owes whom. Runs in your browser — no login.",
    description:
      "Split a trip bill among friends. Add names and expenses, then see each person’s share and a settlement list.",
    category: "budget",
    status: "live",
    interactiveKind: "trip-cost-splitter",
    explanation:
      "Everyone owes the same share of the total. People who paid more than their share should receive the difference from people who paid less. The settlement list is a shortest set of those payments.",
    education: [
      {
        title: "Trip Cost Splitter",
        paragraphs: [
          "Use this when several people paid different bills on the same trip. It does not connect to a bank. Names and amounts stay in this browser unless you print or share the summary.",
        ],
      },
      {
        title: "How to split travel expenses with friends",
        paragraphs: [
          "Write every bill once: fuel, hotel, food, tolls, parking, activities, tickets, shopping, miscellaneous. Record who actually paid the cashier.",
          "The tool adds the bills, divides by the number of people, then lists who should pay whom so everyone ends at that share.",
        ],
      },
      {
        title: "How to calculate equal trip expenses",
        paragraphs: [
          "Fair share = total ÷ number of people. Amount owed or due = amount paid − fair share.",
          "Example: Rahul paid ₹8,000, Amit ₹3,000, Neha ₹1,000. Total ₹12,000. Share ₹4,000. Amit pays Rahul ₹1,000. Neha pays Rahul ₹3,000. Rahul does not pay anyone.",
          "If the total does not divide evenly to the paise, leftover paise are given to the first people on the list so the shares still add to the total.",
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Total = Sum of expenses",
        "Fair share = Total ÷ Number of people",
        "Net = Amount paid − Fair share",
        "Positive net should receive; negative net should pay",
      ],
    },
    faqs: [
      {
        question: "Is the split always equal?",
        answer:
          "Yes. This version does not weight by days or rooms. Everyone’s share is the same.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. Optional localStorage remembers the last draft on this device.",
      },
      {
        question: "Can two people have the same name?",
        answer:
          "Yes. Internally each person has an id. Use distinct names if you will print the sheet.",
      },
      {
        question: "Why can’t I remove someone?",
        answer:
          "You need at least two people. You also cannot remove someone who is still marked as having paid an expense — change Paid by first.",
      },
      {
        question: "Is settlement unique?",
        answer:
          "The nets are unique. The exact pairs can vary; this site uses a greedy match (largest unpaid with largest due). The rupees that move still clear every net.",
      },
      {
        question: "Does Share send data to HarshOnRoads?",
        answer:
          "No. It uses your device share sheet or copies text. Nothing is posted to our servers.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-budget",
      "road-trip-cost-calculator",
      "weekend-trip-finder",
    ],
    relatedArticles: [tripsArticle],
    cta: {
      title: "Build the trip total first",
      body: "If you still need fuel, stay and food line items, use the road trip or weekend budget calculators, then split here.",
      href: "/tools/road-trip-cost-calculator",
      label: "Road Trip Cost Calculator",
    },
  },
  {
    slug: "distance-time-calculator",
    name: "Distance & Travel Time Calculator",
    heading: "Distance & Travel Time Calculator",
    seoTitle: "Distance & Travel Time Calculator",
    seoDescription:
      "Estimate travel time from distance in kilometres and average speed in km/h. Optional break time. Not live Google Maps traffic — your numbers only.",
    description:
      "Estimate driving or riding time from kilometres and average km/h. Optional stops. This is not live map traffic.",
    category: "planning",
    status: "live",
    calculatorId: "distance-time",
    explanation:
      "Estimated travel time is distance divided by the average speed you type, then any break hours and minutes are added. It is arithmetic, not a Google Maps ETA.",
    education: [
      {
        title: "How travel time is calculated",
        paragraphs: [
          "Pure driving or riding time (hours) = distance (km) ÷ average speed (km/h). That decimal is shown as hours and minutes.",
          "Estimated total journey time = driving time + stop/break time. If you leave breaks at zero, both figures match.",
          "Example: 350 km at 50 km/h is 7 hours of moving time. Add 45 minutes of stops and the labelled estimate is 7 h 45 min. That is still not a live traffic prediction.",
        ],
      },
      {
        title: "Why actual travel time can be longer",
        paragraphs: [
          "Average speed on paper is often higher than a real NCR-to-hills day. Towns, dhabas, toll plazas, fog, road work and a loaded motorcycle all cut the mean.",
          "This site does not read Google Maps, GPS or highway cameras. If the road is slower than the km/h you entered, you will arrive later than the estimate.",
        ],
      },
      {
        title: "How to plan a weekend road trip",
        paragraphs: [
          "Pick a destination with the Weekend Trip Finder, then use this page with a conservative average speed (many Indian highway days land far below the limit once stops count).",
          "If driving time plus breaks eats most of Friday night and Sunday evening, shorten the destination or add a night. Fuel and stay costs are separate tools.",
        ],
        links: [
          {
            href: "/tools/weekend-trip-finder",
            label: "Weekend Trip Finder",
          },
          {
            href: "/tools/road-trip-cost-calculator",
            label: "Road Trip Cost Calculator",
          },
          {
            href: "/tools/fuel-required-calculator",
            label: "Fuel Required Calculator",
          },
        ],
      },
    ],
    formula: {
      title: "Formula",
      expression: [
        "Driving time (hours) = Distance (km) ÷ Average speed (km/h)",
        "Break time (hours) = Break hours + (Break minutes ÷ 60)",
        "Estimated total journey time = Driving time + Break time",
      ],
      notes: [
        "Results are labelled Estimated travel time. They are not live Google Maps times.",
        "Distance is in kilometres. Average speed is in km/h.",
      ],
    },
    faqs: [
      {
        question: "Is this live Google Maps travel time?",
        answer:
          "No. It is estimated travel time from the distance and average speed you enter, plus optional breaks.",
      },
      {
        question: "What average speed should I use?",
        answer:
          "A speed you have actually averaged on similar roads, including towns. Peak highway bursts are too optimistic for a full day’s mean.",
      },
      {
        question: "How are hours and minutes shown?",
        answer:
          "The decimal hours from distance ÷ speed are converted to whole minutes, then split into hours and leftover minutes.",
      },
      {
        question: "Are breaks required?",
        answer:
          "No. Leave hours and minutes at zero for moving time only. The total estimate will equal pure driving/riding time.",
      },
      {
        question: "Does this include climbing, traffic or weather?",
        answer:
          "Only if you lowered the average speed or added break time yourself. The formula does not model hills or congestion.",
      },
      {
        question: "Can I use miles?",
        answer:
          "Not on this page. Distance is kilometres and speed is km/h.",
      },
    ],
    relatedToolSlugs: [
      "weekend-trip-finder",
      "road-trip-cost-calculator",
      "fuel-required-calculator",
      "speed-time-distance-calculator",
    ],
    relatedArticles: [tripsArticle, guidesArticle],
    cta: {
      title: "Match a weekend, then time the drive",
      body: "The finder suggests Delhi NCR places. This calculator only turns km and km/h into an estimate.",
      href: "/tools/weekend-trip-finder",
      label: "Weekend Trip Finder",
    },
  },
];

export function getToolDefinition(slug: string): ToolDefinition | undefined {
  return toolDefinitions.find((tool) => tool.slug === slug);
}

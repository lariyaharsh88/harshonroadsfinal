import type { DestinationGuide } from "@/lib/data/destinations/types";

export function createDestinationTemplate(): DestinationGuide {
  return {
    id: "new-destination",
    name: "New Destination",
    slug: "new-destination",
    active: true,
    shortDescription: "Short description for cards and SEO.",
    region: "uttarakhand",
    state: "State name",
    bestFor: ["couples"],
    tripDuration: "2n3d",
    durationOptions: ["1n2d", "2n3d"],
    budgetCategory: "mid",
    travelTimeCategory: "4-6h",
    interests: ["nature"],
    transportOptions: ["car"],
    travelStyles: ["hills"],
    bestTimeToVisit: "When to visit — keep estimates honest.",
    highlights: ["Highlight one"],
    weekendSuitability: "good",
    heroImage: null,
    seoTitle: "New Destination Weekend Trip from Delhi NCR",
    seoDescription:
      "Plan a weekend trip from Delhi NCR with practical notes, budget bands and travel tips.",
    relatedDestinations: [],
    introduction: "Introduction paragraph.",
    whyVisit: ["Reason one"],
    whyWeekend: "Why it works as a weekend.",
    stayNotes: ["Stay area notes — no fake hotel names."],
    foodNotes: ["Food notes"],
    howToPlan: ["Planning step one"],
    weekendItineraries: [
      {
        title: "Sample weekend shape",
        steps: ["Day one", "Day two"],
      },
    ],
    travelTips: ["Travel tip one"],
    faq: [
      {
        question: "Is this suitable for a weekend?",
        answer: "Answer with honest planning guidance.",
      },
    ],
  };
}

import { getToolBySlug } from "@/lib/tools/catalog";
import type { Tool, ToolStatus } from "@/types/tool";

export const directoryGroups = [
  {
    id: "find",
    label: "Find Your Trip",
    description:
      "Match a Delhi NCR weekend to your time, budget and what you want to experience.",
  },
  {
    id: "budget",
    label: "Budget & Costs",
    description:
      "Add up a weekend or road-trip bill, then split it if you travelled as a group.",
  },
  {
    id: "journey",
    label: "Journey Planning",
    description:
      "Sketch travel time and fuel before you leave Ring Road. Bike calculators sit here as a travel mode.",
  },
  {
    id: "prepare",
    label: "Prepare for Your Trip",
    description:
      "Pack for the season and shape a 2- to 5-day break around the same destination list.",
  },
] as const;

export type DirectoryGroupId = (typeof directoryGroups)[number]["id"];

export type DirectoryIcon =
  | "compass"
  | "wallet"
  | "split"
  | "clock"
  | "fuel"
  | "bike"
  | "gauge"
  | "bag"
  | "calendar";

export type DirectoryEntry = {
  id: string;
  slug: string;
  group: DirectoryGroupId;
  icon: DirectoryIcon;
  featured: boolean;
  keywords: string[];
};

export type DirectoryTool = Tool & {
  id: string;
  group: DirectoryGroupId;
  groupLabel: string;
  icon: DirectoryIcon;
  featured: boolean;
  keywords: string[];
  status: ToolStatus;
};

/**
 * Directory overlay on the existing tool catalogue.
 * Name, description and status always come from tool definitions — not copied here.
 */
export const directoryEntries: DirectoryEntry[] = [
  {
    id: "weekend-trip-finder",
    slug: "weekend-trip-finder",
    group: "find",
    icon: "compass",
    featured: true,
    keywords: ["weekend", "trip", "finder", "destination", "delhi", "ncr", "getaway"],
  },
  {
    id: "weekend-trip-budget",
    slug: "weekend-trip-budget",
    group: "budget",
    icon: "wallet",
    featured: true,
    keywords: ["weekend", "budget", "cost", "trip", "money"],
  },
  {
    id: "ai-trip-cost-estimator",
    slug: "ai-trip-cost-estimator",
    group: "budget",
    icon: "wallet",
    featured: false,
    keywords: [
      "ai",
      "trip",
      "cost",
      "budget",
      "estimate",
      "fuel",
      "delhi",
      "ncr",
    ],
  },
  {
    id: "road-trip-cost-calculator",
    slug: "road-trip-cost-calculator",
    group: "budget",
    icon: "wallet",
    featured: true,
    keywords: ["road", "trip", "budget", "cost", "fuel", "hotel"],
  },
  {
    id: "trip-cost-splitter",
    slug: "trip-cost-splitter",
    group: "budget",
    icon: "split",
    featured: false,
    keywords: ["trip", "budget", "split", "friends", "cost"],
  },
  {
    id: "distance-time-calculator",
    slug: "distance-time-calculator",
    group: "journey",
    icon: "clock",
    featured: false,
    keywords: ["trip", "road", "time", "distance", "travel"],
  },
  {
    id: "fuel-required-calculator",
    slug: "fuel-required-calculator",
    group: "journey",
    icon: "fuel",
    featured: false,
    keywords: ["fuel", "trip", "road", "litres", "cost"],
  },
  {
    id: "bike-fuel-cost-calculator",
    slug: "bike-fuel-cost-calculator",
    group: "journey",
    icon: "bike",
    featured: false,
    keywords: ["fuel", "bike", "motorcycle", "trip", "road", "cost"],
  },
  {
    id: "bike-mileage-calculator",
    slug: "bike-mileage-calculator",
    group: "journey",
    icon: "gauge",
    featured: false,
    keywords: ["mileage", "fuel", "bike", "motorcycle"],
  },
  {
    id: "weekend-packing-list",
    slug: "weekend-packing-list",
    group: "prepare",
    icon: "bag",
    featured: false,
    keywords: ["packing", "weekend", "trip", "checklist"],
  },
  {
    id: "ai-packing-list",
    slug: "ai-packing-list",
    group: "prepare",
    icon: "bag",
    featured: false,
    keywords: [
      "ai",
      "packing",
      "checklist",
      "weekend",
      "delhi",
      "ncr",
    ],
  },
  {
    id: "long-weekend-planner",
    slug: "long-weekend-planner",
    group: "prepare",
    icon: "calendar",
    featured: false,
    keywords: ["weekend", "trip", "planner", "long", "delhi", "ncr"],
  },
  {
    id: "ai-weekend-planner",
    slug: "ai-weekend-planner",
    group: "find",
    icon: "compass",
    featured: true,
    keywords: [
      "ai",
      "weekend",
      "planner",
      "itinerary",
      "delhi",
      "ncr",
      "personalized",
    ],
  },
  {
    id: "ai-trip-finder",
    slug: "ai-trip-finder",
    group: "find",
    icon: "compass",
    featured: true,
    keywords: [
      "ai",
      "trip",
      "finder",
      "destination",
      "delhi",
      "ncr",
      "weekend",
      "natural language",
    ],
  },
  {
    id: "ai-itinerary-generator",
    slug: "ai-itinerary-generator",
    group: "prepare",
    icon: "calendar",
    featured: true,
    keywords: [
      "ai",
      "itinerary",
      "day by day",
      "destination",
      "delhi",
      "ncr",
      "planner",
    ],
  },
  {
    id: "ai-travel-content-creator",
    slug: "ai-travel-content-creator",
    group: "prepare",
    icon: "calendar",
    featured: false,
    keywords: [
      "ai",
      "content",
      "youtube",
      "instagram",
      "blog",
      "reels",
      "shorts",
      "caption",
      "delhi",
      "ncr",
    ],
  },
];

export const featuredDirectorySlugs = [
  "ai-weekend-planner",
  "weekend-trip-finder",
  "weekend-trip-budget",
] as const;

export const directoryAiTools: readonly { slug: string; name: string }[] =
  [];

export function hydrateDirectoryEntry(
  entry: DirectoryEntry,
): DirectoryTool | null {
  const tool = getToolBySlug(entry.slug);
  if (!tool) {
    return null;
  }
  const group = directoryGroups.find((item) => item.id === entry.group);
  if (!group) {
    return null;
  }
  return {
    ...tool,
    id: entry.id,
    group: entry.group,
    groupLabel: group.label,
    icon: entry.icon,
    featured: entry.featured,
    keywords: entry.keywords,
  };
}

export function getDirectoryTools(): DirectoryTool[] {
  return directoryEntries.flatMap((entry) => {
    const tool = hydrateDirectoryEntry(entry);
    return tool ? [tool] : [];
  });
}

export function getFeaturedDirectoryTools(): DirectoryTool[] {
  return featuredDirectorySlugs.flatMap((slug) => {
    const tool = getDirectoryTools().find((item) => item.slug === slug);
    return tool ? [tool] : [];
  });
}

export function matchesDirectoryQuery(
  tool: DirectoryTool,
  query: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return true;
  }
  const haystack = [
    tool.name,
    tool.description,
    tool.groupLabel,
    tool.slug,
    ...tool.keywords,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

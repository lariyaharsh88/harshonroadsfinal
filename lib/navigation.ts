import { siteConfig } from "@/lib/seo";

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const headerNav: NavItem[] = [
  { href: "/weekend-trips", label: "Weekend Trips" },
  { href: "/destinations", label: "Destinations" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/tools", label: "Tools" },
  { href: "/ai-travel-tools", label: "AI Travel" },
  { href: "/travel-guides", label: "Guides" },
];

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: "HarshOnRoads",
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Explore",
    items: [
      { href: "/weekend-trips", label: "Weekend Trips" },
      { href: "/destinations", label: "Destinations" },
      { href: "/itineraries", label: "Itineraries" },
      { href: "/road-trips", label: "Road Trips" },
      { href: "/travel-guides", label: "Travel Guides" },
    ],
  },
  {
    title: "Plan",
    items: [
      { href: "/tools", label: "Tools" },
      { href: "/tools/weekend-trip-finder", label: "Weekend Trip Finder" },
      { href: "/ai-travel-tools", label: "AI Travel Tools" },
      { href: "/videos", label: "Videos" },
      { href: siteConfig.youtubeUrl, label: "YouTube", external: true },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getLiveTools } from "@/lib/tools/catalog";
import { getPublishedDestinationGuides } from "@/lib/data/destinations";
import { getAllItineraries } from "@/lib/data/itineraries";

const publicRoutes = [
  "/",
  "/tools",
  "/destinations",
  "/weekend-trips",
  "/itineraries",
  "/road-trips",
  "/travel-guides",
  "/videos",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : route === "/tools" ? 0.9 : 0.6,
  }));

  const toolPages = getLiveTools().map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationPages = getPublishedDestinationGuides().map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const itineraryPages = getAllItineraries().map((itinerary) => ({
    url: absoluteUrl(`/itineraries/${itinerary.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...toolPages, ...destinationPages, ...itineraryPages];
}

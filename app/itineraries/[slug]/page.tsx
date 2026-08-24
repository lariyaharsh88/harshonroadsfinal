import { notFound } from "next/navigation";
import { ItineraryGuideView } from "@/components/itineraries/ItineraryGuideView";
import {
  getItineraryBySlug,
  getItinerarySlugs,
} from "@/lib/data/itineraries";
import { buildMetadata } from "@/lib/seo";

type ItineraryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getItinerarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ItineraryPageProps) {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);
  if (!itinerary) {
    return {};
  }
  return buildMetadata({
    title: itinerary.seoTitle,
    description: itinerary.seoDescription,
    path: `/itineraries/${itinerary.slug}`,
  });
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);

  if (!itinerary) {
    notFound();
  }

  return <ItineraryGuideView itinerary={itinerary} />;
}

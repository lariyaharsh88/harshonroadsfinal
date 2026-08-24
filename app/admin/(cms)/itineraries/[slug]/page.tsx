import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItineraryFormEditor } from "@/components/admin/ItineraryFormEditor";
import {
  deleteItineraryAction,
  saveItineraryAction,
} from "@/lib/admin/actions";
import { getAllDestinationGuides } from "@/lib/data/destinations";
import { getItineraryBySlug } from "@/lib/data/itineraries";

export const metadata: Metadata = {
  title: "Edit itinerary",
  robots: { index: false, follow: false },
};

type AdminItineraryEditPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminItineraryEditPage({
  params,
}: AdminItineraryEditPageProps) {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);

  if (!itinerary) {
    notFound();
  }

  const destinationOptions = getAllDestinationGuides().map((guide) => ({
    slug: guide.slug,
    name: guide.active === false ? `${guide.name} (inactive)` : guide.name,
  }));

  return (
    <ItineraryFormEditor
      initial={itinerary}
      destinationOptions={destinationOptions}
      viewHref={`/itineraries/${itinerary.slug}`}
      onSave={saveItineraryAction.bind(null, slug)}
      onDelete={deleteItineraryAction.bind(null, slug)}
    />
  );
}

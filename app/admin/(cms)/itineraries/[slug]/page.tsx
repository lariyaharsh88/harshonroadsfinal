import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonRecordEditor } from "@/components/admin/JsonRecordEditor";
import {
  deleteItineraryAction,
  saveItineraryAction,
} from "@/lib/admin/actions";
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

  const initialJson = `${JSON.stringify(itinerary, null, 2)}\n`;

  return (
    <JsonRecordEditor
      entity="itineraries"
      title={`Edit ${itinerary.title}`}
      description="Edit the full itinerary record as structured JSON. Day plans, budget bands and FAQs stay structured — not HTML."
      initialJson={initialJson}
      viewHref={`/itineraries/${itinerary.slug}`}
      onSave={saveItineraryAction.bind(null, slug)}
      onDelete={deleteItineraryAction.bind(null, slug)}
    />
  );
}

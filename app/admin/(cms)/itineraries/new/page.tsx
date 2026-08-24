import type { Metadata } from "next";
import { JsonRecordEditor } from "@/components/admin/JsonRecordEditor";
import { createItineraryAction } from "@/lib/admin/actions";
import { createItineraryTemplate } from "@/lib/cms/templates/itinerary";

export const metadata: Metadata = {
  title: "New itinerary",
  robots: { index: false, follow: false },
};

export default function AdminNewItineraryPage() {
  const initialJson = `${JSON.stringify(createItineraryTemplate(), null, 2)}\n`;

  return (
    <JsonRecordEditor
      entity="itineraries"
      title="New itinerary"
      description="Create a new itinerary record. Update slug, day plans and budget bands, then save."
      initialJson={initialJson}
      onSave={createItineraryAction}
    />
  );
}

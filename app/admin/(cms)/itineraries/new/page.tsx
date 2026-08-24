import type { Metadata } from "next";
import { ItineraryFormEditor } from "@/components/admin/ItineraryFormEditor";
import { createItineraryAction } from "@/lib/admin/actions";
import { createItineraryTemplate } from "@/lib/cms/templates/itinerary";
import { getAllDestinationGuides } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "New itinerary",
  robots: { index: false, follow: false },
};

export default function AdminNewItineraryPage() {
  const destinationOptions = getAllDestinationGuides().map((guide) => ({
    slug: guide.slug,
    name: guide.active === false ? `${guide.name} (inactive)` : guide.name,
  }));

  return (
    <ItineraryFormEditor
      initial={createItineraryTemplate()}
      destinationOptions={destinationOptions}
      onSave={createItineraryAction}
      isNew
    />
  );
}

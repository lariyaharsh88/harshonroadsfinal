import type { Metadata } from "next";
import { DestinationFormEditor } from "@/components/admin/DestinationFormEditor";
import { createDestinationAction } from "@/lib/admin/actions";
import { createDestinationTemplate } from "@/lib/cms/templates/destination";
import { getAllDestinationGuides } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "New destination",
  robots: { index: false, follow: false },
};

export default function AdminNewDestinationPage() {
  const destinationSlugs = getAllDestinationGuides().map((item) => item.slug);

  return (
    <DestinationFormEditor
      initial={createDestinationTemplate()}
      destinationSlugs={destinationSlugs}
      onSave={createDestinationAction}
      isNew
    />
  );
}

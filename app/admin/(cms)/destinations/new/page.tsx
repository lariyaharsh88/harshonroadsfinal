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
  const destinationOptions = getAllDestinationGuides().map((item) => ({
    slug: item.slug,
    name: item.name,
    active: item.active,
  }));

  return (
    <DestinationFormEditor
      initial={createDestinationTemplate()}
      destinationOptions={destinationOptions}
      onSave={createDestinationAction}
      isNew
    />
  );
}

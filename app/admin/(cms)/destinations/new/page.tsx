import type { Metadata } from "next";
import { JsonRecordEditor } from "@/components/admin/JsonRecordEditor";
import { createDestinationAction } from "@/lib/admin/actions";
import { createDestinationTemplate } from "@/lib/cms/templates/destination";

export const metadata: Metadata = {
  title: "New destination",
  robots: { index: false, follow: false },
};

export default function AdminNewDestinationPage() {
  const initialJson = `${JSON.stringify(createDestinationTemplate(), null, 2)}\n`;

  return (
    <JsonRecordEditor
      entity="destinations"
      title="New destination"
      description="Create a new destination guide. Update the slug, copy and structured fields, then save."
      initialJson={initialJson}
      onSave={createDestinationAction}
    />
  );
}

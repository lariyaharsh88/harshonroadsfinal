import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonRecordEditor } from "@/components/admin/JsonRecordEditor";
import {
  deleteDestinationAction,
  saveDestinationAction,
} from "@/lib/admin/actions";
import { getDestinationGuideBySlug } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "Edit destination",
  robots: { index: false, follow: false },
};

type AdminDestinationEditPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminDestinationEditPage({
  params,
}: AdminDestinationEditPageProps) {
  const { slug } = await params;
  const destination = getDestinationGuideBySlug(slug);

  if (!destination) {
    notFound();
  }

  const initialJson = `${JSON.stringify(destination, null, 2)}\n`;

  return (
    <JsonRecordEditor
      entity="destinations"
      title={`Edit ${destination.name}`}
      description="Edit the full destination record as structured JSON. Save validates required fields and updates the public destination page."
      initialJson={initialJson}
      viewHref={`/destinations/${destination.slug}`}
      onSave={saveDestinationAction.bind(null, slug)}
      onDelete={deleteDestinationAction.bind(null, slug)}
    />
  );
}

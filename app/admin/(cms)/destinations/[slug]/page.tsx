import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationFormEditor } from "@/components/admin/DestinationFormEditor";
import {
  deleteDestinationAction,
  saveDestinationAction,
} from "@/lib/admin/actions";
import {
  getAllDestinationGuides,
  getDestinationGuideBySlug,
} from "@/lib/data/destinations";

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

  const destinationSlugs = getAllDestinationGuides().map((item) => item.slug);

  return (
    <DestinationFormEditor
      initial={destination}
      destinationSlugs={destinationSlugs}
      viewHref={`/destinations/${destination.slug}`}
      onSave={saveDestinationAction.bind(null, slug)}
      onDelete={deleteDestinationAction.bind(null, slug)}
    />
  );
}

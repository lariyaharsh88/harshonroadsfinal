import { notFound } from "next/navigation";
import { DestinationGuideView } from "@/components/destinations/DestinationGuideView";
import {
  getDestinationGuideBySlug,
  getDestinationGuideSlugs,
} from "@/lib/data/destinations";
import { buildMetadata } from "@/lib/seo";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return getDestinationGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { slug } = await params;
  const guide = getDestinationGuideBySlug(slug);
  if (!guide) {
    return {};
  }
  return buildMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/destinations/${guide.slug}`,
  });
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const guide = getDestinationGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <DestinationGuideView guide={guide} />;
}

import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tools/ToolPage";
import { buildMetadata } from "@/lib/seo";
import { getToolDefinition } from "@/lib/tools/definitions";
import { listRegisteredTools } from "@/lib/tools/registry";

type ToolRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listRegisteredTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolRouteProps) {
  const { slug } = await params;
  const tool = getToolDefinition(slug);

  if (!tool) {
    return {};
  }

  return buildMetadata({
    title: tool.seoTitle ?? tool.name,
    description: tool.seoDescription ?? tool.description,
    path: `/tools/${tool.slug}`,
    index: tool.status === "live",
  });
}

export default async function ToolRoutePage({ params }: ToolRouteProps) {
  const { slug } = await params;
  const tool = getToolDefinition(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPage tool={tool} />;
}

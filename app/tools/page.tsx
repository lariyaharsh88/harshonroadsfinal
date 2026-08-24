import { DirectoryToolCard } from "@/components/tools/DirectoryToolCard";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";
import { ToolsSeoContent } from "@/components/tools/ToolsSeoContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/tools/catalog";
import {
  directoryAiTools,
  getDirectoryTools,
  getFeaturedDirectoryTools,
} from "@/lib/tools/directory";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Travel Tools for Your Next Weekend Escape",
  description:
    "Free tools to help you discover weekend trips, calculate your budget, estimate travel costs and prepare for your journey.",
  path: "/tools",
});

export default function ToolsPage() {
  const featured = getFeaturedDirectoryTools();
  const directoryTools = getDirectoryTools();

  return (
    <>
      <PageHeader
        eyebrow="Free tools"
        title="Travel Tools for Your Next Weekend Escape"
        description="Free tools to help you discover weekend trips, calculate your budget, estimate travel costs and prepare for your journey."
      />
      <Container className="space-y-6 pb-16 pt-10 sm:pt-12">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]}
        />
        <p className="max-w-2xl text-base leading-7 text-muted">
          Free tools to plan your next weekend escape from Delhi NCR. No
          login, no bookings — calculators and checklists that run in your
          browser.
        </p>

        <Section
          className="pt-6"
          eyebrow="Start here"
          title="Featured tools"
          description="The three tools that answer where to go, what a weekend might cost, and what a road trip adds up to."
        >
          <ul className="grid gap-4 lg:grid-cols-3">
            {featured.map((tool) => (
              <li key={tool.id}>
                <DirectoryToolCard tool={tool} featured />
              </li>
            ))}
          </ul>
        </Section>

        <ToolsDirectory tools={directoryTools} />

        {directoryAiTools.length > 0 ? (
        <Section
          id="ai-travel-tools"
          eyebrow="AI"
          title="AI Travel Tools"
          description="The weekend planner, trip finder, itinerary generator, trip cost estimator, packing list and travel content creator are live."
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {directoryAiTools.map((item) => {
              const tool = getToolBySlug(item.slug);
              if (!tool) {
                return null;
              }
              return (
                <li key={item.slug}>
                  <Link href={`/tools/${item.slug}`} className="block h-full">
                    <Card
                      className={`lift h-full ${tool.status === "live" ? "" : "border-dashed"}`}
                    >
                      <Badge>
                        {tool.status === "live" ? "Live" : "Coming Soon"}
                      </Badge>
                      <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {tool.description}
                      </p>
                      <p className="mt-6 text-sm font-bold text-foreground">
                        View page →
                      </p>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
        ) : null}

        <ToolsSeoContent />
      </Container>
    </>
  );
}

import { PageHeader } from "@/components/layout/PageHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { homepageAiToolSlugs } from "@/lib/home";
import { buildMetadata } from "@/lib/seo";
import { getToolsBySlugs } from "@/lib/tools/catalog";

export const metadata = buildMetadata({
  title: "AI Travel Tools",
  description:
    "AI weekend planner, trip finder, itinerary generator, trip cost estimator, packing list and travel content creator from Delhi NCR. Generated results are sketches — verify stay, roads and facts before you go.",
  path: "/ai-travel-tools",
  index: false,
});

export default function AiTravelToolsPage() {
  const tools = getToolsBySlugs(homepageAiToolSlugs);

  return (
    <>
      <PageHeader
        eyebrow="AI tools"
        title="AI Travel Tools"
        description="The AI Weekend Planner, AI Trip Finder, AI Itinerary Generator, AI Trip Cost Estimator, AI Packing List and AI Travel Content Creator are live. Sketches still need to be verified before you travel."
      />
      <Container className="space-y-8 py-14">
        <ToolGrid tools={tools} />
        <ButtonLink href="/tools/weekend-trip-finder">
          Find My Weekend Trip
        </ButtonLink>
      </Container>
    </>
  );
}

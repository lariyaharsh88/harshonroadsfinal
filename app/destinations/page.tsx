import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getDestinationCards } from "@/lib/data/destinations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Weekend Destinations from Delhi NCR",
  description:
    "Find your next weekend escape from Delhi NCR. Filter hill, heritage and wildlife destinations by duration, budget, style and transport. Categories are approximate — not live prices.",
  path: "/destinations",
});

export default function DestinationsIndexPage() {
  const destinations = getDestinationCards();

  return (
    <>
      <PageHeader
        eyebrow="Delhi NCR"
        title="Weekend Destinations from Delhi NCR"
        description="Find your next weekend escape."
      />
      <Container className="space-y-10 py-14">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
          ]}
        />
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Sixteen places HarshOnRoads uses for weekend planning from Delhi NCR.
          Filters run in your browser. Hours, budgets and seasons are
          categories, not live quotes. Confirm roads, stays and park rules
          before you go.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tools/weekend-trip-finder">
            Weekend Trip Finder
          </ButtonLink>
          <ButtonLink href="/weekend-trips" variant="secondary">
            Weekend trip ideas
          </ButtonLink>
        </div>
        <noscript>
          <ul className="grid gap-3 sm:grid-cols-2">
            {destinations.map((destination) => (
              <li key={destination.slug}>
                <a href={`/destinations/${destination.slug}`}>
                  {destination.name}
                </a>
              </li>
            ))}
          </ul>
        </noscript>
        <DestinationExplorer destinations={destinations} />
      </Container>
    </>
  );
}

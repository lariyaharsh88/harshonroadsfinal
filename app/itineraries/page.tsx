import { ItineraryExplorer } from "@/components/itineraries/ItineraryExplorer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getItineraryCards } from "@/lib/data/itineraries";
import {
  itineraryAiPlannerHref,
  itineraryFinderHref,
} from "@/lib/data/itineraries/related-tools";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Weekend Itineraries from Delhi NCR",
  description:
    "Explore practical day-by-day travel plans for weekend trips from Delhi NCR, including routes, things to do, budgets and travel tips.",
  path: "/itineraries",
});

export default function ItinerariesPage() {
  const itineraries = getItineraryCards();

  return (
    <>
      <PageHeader
        eyebrow="Delhi NCR"
        title="Weekend Itineraries from Delhi NCR"
        description="Ready-to-use itineraries for your next weekend escape."
      />
      <Container className="space-y-10 py-14">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Itineraries", path: "/itineraries" },
          ]}
        />
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Explore practical day-by-day travel plans for weekend trips from Delhi
          NCR, including routes, things to do, budgets and travel tips. Filters
          run in your browser. Hours, budgets and seasons are categories, not
          live quotes.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={itineraryFinderHref}>Weekend Trip Finder</ButtonLink>
          <ButtonLink href={itineraryAiPlannerHref} variant="secondary">
            Plan with AI
          </ButtonLink>
        </div>
        <noscript>
          <ul className="grid gap-3 sm:grid-cols-2">
            {itineraries.map((itinerary) => (
              <li key={itinerary.slug}>
                <a href={`/itineraries/${itinerary.slug}`}>{itinerary.title}</a>
              </li>
            ))}
          </ul>
        </noscript>
        <ItineraryExplorer itineraries={itineraries} />
      </Container>
    </>
  );
}

import { AIPlannerCTA } from "@/components/itineraries/AIPlannerCTA";
import { BudgetBreakdown } from "@/components/itineraries/BudgetBreakdown";
import { DayTimeline } from "@/components/itineraries/DayTimeline";
import { HowToReach } from "@/components/itineraries/HowToReach";
import { ItineraryHero } from "@/components/itineraries/ItineraryHero";
import { ItinerarySummary } from "@/components/itineraries/ItinerarySummary";
import { PackingSection } from "@/components/itineraries/PackingSection";
import { RelatedItineraries } from "@/components/itineraries/RelatedItineraries";
import { ThingsToDo } from "@/components/itineraries/ThingsToDo";
import { TravelTips } from "@/components/itineraries/TravelTips";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/tools/FAQSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { getRelatedItineraries } from "@/lib/data/itineraries";
import {
  itineraryAiPlannerHref,
  itineraryBudgetToolHref,
} from "@/lib/data/itineraries/related-tools";
import {
  itineraryAudienceLabels,
  itineraryBudgetLabels,
  itineraryDurationLabels,
  itineraryTransportLabels,
  itineraryTravelStyleLabels,
} from "@/lib/data/itineraries/labels";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import Link from "next/link";

function ArticleJsonLd({ itinerary }: { itinerary: ItineraryRecord }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: itinerary.title,
    description: itinerary.shortDescription,
    url: absoluteUrl(`/itineraries/${itinerary.slug}`),
    inLanguage: "en-IN",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return <JsonLdScript data={data} />;
}

export function ItineraryGuideView({
  itinerary,
}: {
  itinerary: ItineraryRecord;
}) {
  const related = getRelatedItineraries(
    itinerary.relatedItineraries,
    itinerary.slug,
  ).slice(0, 6);
  const primaryTransport = itinerary.travelModes[0];
  const primaryAudience = itinerary.bestFor[0];

  return (
    <>
      <ArticleJsonLd itinerary={itinerary} />
      <Container className="space-y-12 py-14">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Itineraries", path: "/itineraries" },
            {
              name: itinerary.title,
              path: `/itineraries/${itinerary.slug}`,
            },
          ]}
        />

        <ItineraryHero itinerary={itinerary} />

        <header className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
            {itinerary.originLabel} · {itinerary.destinationName}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {itinerary.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            {itinerary.shortDescription}
          </p>
        </header>

        <section>
          <SectionHeader eyebrow="Quick stats" title="At a glance" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Duration"
              value={itineraryDurationLabels[itinerary.duration]}
            />
            <Stat
              label="Estimated budget"
              value={itineraryBudgetLabels[itinerary.budgetCategory]}
            />
            <Stat
              label="Transport"
              value={
                primaryTransport
                  ? itineraryTransportLabels[primaryTransport]
                  : "Flexible"
              }
            />
            <Stat
              label="Best for"
              value={
                primaryAudience
                  ? itineraryAudienceLabels[primaryAudience]
                  : itineraryTravelStyleLabels[itinerary.travelStyle]
              }
            />
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">
            {itinerary.estimatedBudget} Categories only — not live prices.
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#itinerary">Use This Itinerary</ButtonLink>
          <ButtonLink href={itineraryAiPlannerHref} variant="secondary">
            Plan My Trip with AI
          </ButtonLink>
          <ButtonLink href={itineraryBudgetToolHref} variant="secondary">
            Calculate Trip Budget
          </ButtonLink>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-muted">
          {itinerary.overview}
        </p>
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {itinerary.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ItinerarySummary itinerary={itinerary} />
        <DayTimeline itinerary={itinerary} />
        <HowToReach itinerary={itinerary} />
        <ThingsToDo itinerary={itinerary} />
        <TravelTips itinerary={itinerary} />
        <PackingSection itinerary={itinerary} />
        <BudgetBreakdown itinerary={itinerary} />
        <AIPlannerCTA />
        <RelatedTools slugs={itinerary.relatedTools} excludeSlug="" />
        <RelatedItineraries itineraries={related} />

        <section>
          <SectionHeader title="Related destination" />
          <p className="mt-3 text-sm leading-6 text-muted">
            Read the weekend destination guide for{" "}
            <Link
              href={`/destinations/${itinerary.destinationSlug}`}
              className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {itinerary.destinationName}
            </Link>
            .
          </p>
        </section>

        <FAQSection faqs={itinerary.faq} />

        <nav aria-label="More from HarshOnRoads" className="text-sm leading-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            Keep planning
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-muted-strong">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/weekend-trips" className="hover:text-foreground">
                Weekend trips
              </Link>
            </li>
            <li>
              <Link href="/itineraries" className="hover:text-foreground">
                All itineraries
              </Link>
            </li>
            <li>
              <Link
                href={`/destinations/${itinerary.destinationSlug}`}
                className="hover:text-foreground"
              >
                {itinerary.destinationName} guide
              </Link>
            </li>
            <li>
              <Link href="/travel-guides" className="hover:text-foreground">
                Travel guides
              </Link>
            </li>
            <li>
              <Link
                href={itineraryAiPlannerHref}
                className="hover:text-foreground"
              >
                AI Weekend Planner
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-foreground">
                Travel tools
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </>
  );
}

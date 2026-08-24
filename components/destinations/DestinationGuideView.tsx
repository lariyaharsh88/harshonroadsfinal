import { DestinationHero, destinationHeroAccent } from "@/components/destinations/DestinationHero";
import { FAQSection } from "@/components/tools/FAQSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { destinationRelatedToolSlugs } from "@/lib/data/destinations/related-tools";
import {
  destinationAudienceLabels,
  destinationBudgetLabels,
  destinationDurationLabels,
  destinationInterestLabels,
  destinationRegionLabels,
  destinationTransportLabels,
  destinationTravelTimeLabels,
  weekendSuitabilityLabels,
} from "@/lib/data/destinations/labels";
import { getRelatedDestinationGuides } from "@/lib/data/destinations";
import { absoluteUrl } from "@/lib/seo";
import type { DestinationGuide } from "@/lib/data/destinations/types";
import Link from "next/link";

function Fact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-foreground">{value}</dd>
    </div>
  );
}

function PlaceJsonLd({ guide }: { guide: DestinationGuide }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: guide.name,
    description: guide.shortDescription,
    url: absoluteUrl(`/destinations/${guide.slug}`),
    address: {
      "@type": "PostalAddress",
      addressRegion: guide.state,
      addressCountry: "IN",
    },
  };

  return <JsonLdScript data={data} />;
}

export function DestinationGuideView({ guide }: { guide: DestinationGuide }) {
  const related = getRelatedDestinationGuides(guide.relatedDestinations);
  const regionLabel = destinationRegionLabels[guide.region];

  return (
    <>
      <PlaceJsonLd guide={guide} />
      <Container className="space-y-12 py-14">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: guide.name, path: `/destinations/${guide.slug}` },
          ]}
        />

        <DestinationHero
          name={guide.name}
          regionLabel={regionLabel}
          accent={destinationHeroAccent(guide.region, guide.travelStyles)}
        />

        <header className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
            {regionLabel} · Weekend escape
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {guide.name} Weekend Trip from Delhi NCR
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            {guide.introduction}
          </p>
        </header>

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Fact
            label="Best for"
            value={guide.bestFor.map((item) => destinationAudienceLabels[item]).join(", ")}
          />
          <Fact
            label="Suggested duration"
            value={destinationDurationLabels[guide.tripDuration]}
          />
          <Fact
            label="Approximate budget category"
            value={destinationBudgetLabels[guide.budgetCategory]}
          />
          <Fact
            label="Approximate travel-time category"
            value={`${destinationTravelTimeLabels[guide.travelTimeCategory]} from Delhi NCR`}
          />
          <Fact
            label="Weekend fit"
            value={weekendSuitabilityLabels[guide.weekendSuitability]}
          />
          <Fact
            label="Transport usually used"
            value={guide.transportOptions
              .map((item) => destinationTransportLabels[item])
              .join(", ")}
          />
        </dl>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Why visit
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {guide.whyVisit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Why it works as a weekend
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            {guide.whyWeekend}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Top things to do
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {guide.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Where to stay
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {guide.stayNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Food and experiences
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {guide.foodNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Best time to visit
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            {guide.bestTimeToVisit}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            How to plan the trip
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {guide.howToPlan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Weekend itinerary suggestions
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {guide.weekendItineraries.map((item) => (
              <Card key={item.title}>
                <h3 className="font-display text-xl font-extrabold tracking-tight">
                  {item.title}
                </h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted">
                  {item.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Travel tips
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {guide.travelTips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="max-w-2xl text-sm leading-6 text-muted">
          Interests often mentioned here:{" "}
          {guide.interests
            .map((item) => destinationInterestLabels[item])
            .join(", ")}
          . These are planning tags, not a ranked list.
        </p>

        <FAQSection faqs={guide.faq} />

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Related destinations
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/destinations/${item.slug}`} className="block h-full">
                  <Card className="h-full transition-colors hover:border-foreground/20">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {destinationRegionLabels[item.region]}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {item.shortDescription}
                    </p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <RelatedTools
          slugs={[...destinationRelatedToolSlugs]}
          excludeSlug={guide.slug}
        />

        <section>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Keep planning
          </h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/itineraries">Itineraries</ButtonLink>
            <ButtonLink href="/travel-guides" variant="secondary">
              Travel guides
            </ButtonLink>
            <ButtonLink href="/weekend-trips" variant="secondary">
              Weekend trip ideas
            </ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}

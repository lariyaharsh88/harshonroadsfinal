import { DestinationCard } from "@/components/cards/DestinationCard";
import { ItineraryCard } from "@/components/cards/ItineraryCard";
import {
  TravelRoadDivider,
  TravelVibesWrap,
} from "@/components/graphics/TravelDecor";
import { HomeHeroVisual } from "@/components/home/HomeHeroVisual";
import { WeekendVibePicker } from "@/components/home/WeekendVibePicker";
import { NewsletterPlaceholder } from "@/components/layout/NewsletterPlaceholder";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { getDestinationCards } from "@/lib/data/destinations";
import { getItineraryCards } from "@/lib/data/itineraries";
import {
  featuredWeekendDestinationIds,
  homepageAiToolSlugs,
  homepageToolSlugs,
} from "@/lib/home";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { getToolsBySlugs } from "@/lib/tools/catalog";
import { weekendTripIdeas } from "@/lib/weekend-ideas";
import { formatComingSoonLabel } from "@/lib/utils";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "HarshOnRoads | Weekend Escapes from Delhi NCR",
  titleAbsolute: true,
  description: siteConfig.description,
  path: "/",
});

const featuredToolSlugs = [
  "weekend-trip-finder",
  "weekend-trip-budget",
  "road-trip-cost-calculator",
  "weekend-packing-list",
] as const;

const featuredAiSlugs = [
  "ai-weekend-planner",
  "ai-trip-finder",
  "ai-itinerary-generator",
] as const;

const roadTripModes = [
  {
    href: "/road-trips#bike",
    title: "Bike trips",
    text: "Motorcycle days stay a mode — not the whole brand.",
  },
  {
    href: "/road-trips#car",
    title: "Car trips",
    text: "Highway weekends and hill drives from NCR.",
  },
  {
    href: "/road-trips#scenic",
    title: "Scenic drives",
    text: "Routes worth the windshield time, published when they are real.",
  },
  {
    href: "/road-trips#adventure",
    title: "Mountain roads",
    text: "Longer, rougher days out of Delhi NCR.",
  },
];

export default function HomePage() {
  const destinationCards = getDestinationCards().filter((item) =>
    (featuredWeekendDestinationIds as readonly string[]).includes(item.slug),
  );
  const itineraries = getItineraryCards().slice(0, 4);
  const featuredTools = getToolsBySlugs(featuredToolSlugs);
  const moreTools = getToolsBySlugs(homepageToolSlugs);
  const aiTools = getToolsBySlugs(featuredAiSlugs);
  const allAiTools = getToolsBySlugs(homepageAiToolSlugs);

  return (
    <>
      <TravelVibesWrap variant="hero" className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-20">
          <div className="reveal">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue/15 bg-blue-soft/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
              <span className="size-1.5 rounded-full bg-teal pulse-ring" aria-hidden="true" />
              HarshOnRoads
            </p>
            <p className="mt-4 text-sm font-semibold text-muted-strong">
              {siteConfig.tagline}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem] lg:leading-[0.95]">
              Your next{" "}
              <span className="gradient-text">weekend escape</span> starts here.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Discover places worth going, build your itinerary, calculate your
              budget and make the most of your time off.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/tools/weekend-trip-finder" variant="lime">
                Find My Weekend
              </ButtonLink>
              <ButtonLink href="/tools" variant="secondary">
                Explore Tools
              </ButtonLink>
            </div>
          </div>
          <div className="relative reveal stagger-2">
            <HomeHeroVisual />
            <Link
              href="/tools/weekend-trip-finder"
              className="pulse-ring absolute right-3 bottom-3 max-w-[15.5rem] rounded-3xl border border-white/40 bg-white/90 p-4 shadow-[0_16px_40px_rgba(37,99,235,0.18)] backdrop-blur transition duration-300 hover:-translate-y-1 sm:right-6 sm:bottom-6"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue">
                48 hours free?
              </p>
              <p className="mt-2 font-display text-lg font-extrabold tracking-tight">
                Where should we go?
              </p>
              <p className="mt-3 text-sm font-bold">Open Weekend Finder →</p>
            </Link>
          </div>
        </Container>
      </TravelVibesWrap>

      <Container>
        <ScrollReveal>
          <TravelVibesWrap variant="form">
            <Section>
              <WeekendVibePicker />
            </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <TravelVibesWrap variant="section">
            <Section
              eyebrow="From Delhi NCR"
              title="Places worth the weekend"
              description="The same destination notes used across HarshOnRoads. Hours and budgets are categories, not live quotes."
            >
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {destinationCards.map((destination) => (
                  <li key={destination.slug}>
                    <DestinationCard destination={destination} />
                  </li>
                ))}
              </ul>
            </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <TravelRoadDivider className="my-2" />

        <ScrollReveal delay={80}>
          <TravelVibesWrap variant="section">
            <Section
              eyebrow="Tools"
              title="Plan it. Price it. Pack it."
              description="Free tools for smarter weekend trips."
            >
            <ToolGrid tools={featuredTools.length > 0 ? featuredTools : moreTools} />
            <div className="mt-8">
              <ButtonLink href="/tools" variant="secondary">
                View all tools
              </ButtonLink>
            </div>
          </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <TravelVibesWrap variant="form">
            <Section id="ai-travel-tools">
            <div className="ai-panel rounded-[2rem] border border-border p-6 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
                AI travel
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Your AI travel co-pilot.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                Tell us where you are, how much time you have and what you&apos;re
                into. We&apos;ll help plan the escape.
              </p>
              <ul className="mt-8 grid gap-4 lg:grid-cols-3">
                {(aiTools.length > 0 ? aiTools : allAiTools).map((tool) => (
                  <li key={tool.slug}>
                    <Link href={`/tools/${tool.slug}`} className="group block h-full">
                      <Card interactive className="lift h-full bg-white/85">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
                          {formatComingSoonLabel(tool.status)}
                        </p>
                        <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight transition-colors group-hover:text-blue">
                          {tool.name}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {tool.description}
                        </p>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/tools/ai-weekend-planner" variant="lime">
                  Plan My Trip with AI →
                </ButtonLink>
              </div>
            </div>
          </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <TravelRoadDivider className="my-2" />

        <ScrollReveal delay={80}>
          <TravelVibesWrap variant="section">
            <Section
              eyebrow="Itineraries"
              title="Don't just go. Go with a plan."
              description="Ready-made day-by-day sketches for Delhi NCR weekends."
            >
            <ul className="grid gap-4 sm:grid-cols-2">
              {itineraries.map((itinerary) => (
                <li key={itinerary.slug}>
                  <ItineraryCard itinerary={itinerary} />
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/itineraries" variant="secondary">
                Browse itineraries
              </ButtonLink>
            </div>
          </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <TravelVibesWrap variant="section">
            <Section
              eyebrow="On the road"
              title="Roads worth taking"
              description="Bike, car, scenic drives and mountain roads — one way to take a weekend, not the only reason this site exists."
            >
            <ul className="grid gap-4 sm:grid-cols-2">
              {roadTripModes.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="block h-full">
                    <Card interactive className="lift h-full">
                      <h3 className="font-display text-2xl font-extrabold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {item.text}
                      </p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <TravelVibesWrap variant="section">
            <Section
              eyebrow="Guides"
              title="Travel ideas for your next escape"
              description="Each card is a filter over the existing destination list — not a new set of invented places."
            >
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {weekendTripIdeas.map((idea) => (
                <li key={idea.slug}>
                  <Link href={`/weekend-trips#${idea.slug}`} className="block h-full">
                    <Card interactive className="lift h-full">
                      <h3 className="font-display text-2xl font-extrabold tracking-tight">
                        {idea.label}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {idea.blurb}
                      </p>
                      <p className="mt-4 text-xs leading-5 text-muted-strong">
                        {idea.names.slice(0, 4).join(" · ")}
                        {idea.names.length > 4 ? ` · +${idea.names.length - 4}` : ""}
                      </p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
          </TravelVibesWrap>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <Section>
            <NewsletterPlaceholder />
          </Section>
        </ScrollReveal>
      </Container>
    </>
  );
}

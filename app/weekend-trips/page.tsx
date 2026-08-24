import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { weekendTripIdeas } from "@/lib/weekend-ideas";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Weekend Trips from Delhi NCR",
  description:
    "Weekend trip ideas from Delhi NCR, grouped from the HarshOnRoads destination list. Find a match with the Weekend Trip Finder.",
  path: "/weekend-trips",
});

export default function WeekendTripsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Delhi NCR"
        title="Weekend Trips"
        description="I have this weekend free. Where should I go from Delhi NCR? Start with a category, then use the finder."
      />
      <Container className="space-y-8 py-14">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Weekend Trips", path: "/weekend-trips" },
          ]}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tools/weekend-trip-finder">
            Find My Weekend Trip
          </ButtonLink>
          <ButtonLink href="/destinations" variant="secondary">
            All destinations
          </ButtonLink>
        </div>
        <ul className="space-y-6">
          {weekendTripIdeas.map((idea) => (
            <li key={idea.slug} id={idea.slug} className="scroll-mt-24">
              <Card>
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {idea.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{idea.blurb}</p>
                <p className="mt-4 text-sm leading-6 text-muted-strong">
                  In the list: {idea.names.join(", ")}.
                </p>
                <div className="mt-5">
                  <Link
                    href="/tools/weekend-trip-finder"
                    className="text-sm font-semibold text-accent hover:text-accent-hover"
                  >
                    Find a match →
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

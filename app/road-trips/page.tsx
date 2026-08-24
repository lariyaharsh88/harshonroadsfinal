import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Road Trips from Delhi NCR",
  description:
    "Road-trip notes from Delhi NCR — bike, car, scenic drives and adventure rides — published when the trips are real.",
  path: "/road-trips",
});

const modes = [
  {
    id: "bike",
    title: "Bike",
    body: "Motorcycle road-trip notes will live here when a ride is written up. Fuel and packing tools already exist.",
  },
  {
    id: "car",
    title: "Car",
    body: "Car weekends from NCR — highway and hill — will be filed as reports, not as invented routes.",
  },
  {
    id: "scenic",
    title: "Scenic drives",
    body: "Drives worth the time in the seat. Empty until a route is documented.",
  },
  {
    id: "adventure",
    title: "Adventure rides",
    body: "Longer or rougher days out of Delhi NCR. Same rule: no dummy trip cards.",
  },
];

export default function RoadTripsPage() {
  return (
    <>
      <PageHeader
        eyebrow="One way to travel"
        title="Road Trips from Delhi NCR"
        description="Bike, car, scenic drives and adventure rides — part of the weekend story, not the whole site."
      />
      <Container className="space-y-6 py-14">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Road Trips", path: "/road-trips" },
          ]}
        />
        <p className="max-w-2xl text-base leading-7 text-muted">
          This section is reserved for real trips. Until a report is ready,
          use the destination list and cost tools to plan.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {modes.map((mode) => (
            <li key={mode.id} id={mode.id} className="scroll-mt-24">
              <Card>
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {mode.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{mode.body}</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tools/weekend-trip-finder">
            Find a weekend
          </ButtonLink>
          <ButtonLink href="/tools/road-trip-cost-calculator" variant="secondary">
            Road trip cost
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

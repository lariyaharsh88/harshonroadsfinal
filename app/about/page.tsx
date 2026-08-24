import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "HarshOnRoads is a personal travel brand for weekend escapes from Delhi NCR, road trips and India travel — with free planning tools.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The project"
        title="About HarshOnRoads"
        description="Weekend escapes. Road trips. India."
      />
      <Container className="max-w-3xl space-y-6 py-14 text-base leading-7 text-muted">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <p>
          HarshOnRoads helps people in Delhi NCR answer a simple question: I
          have this weekend free — where should I go? The longer path is North
          India travel, then India travel.
        </p>
        <p>
          The site is for solo travellers, couples, friends, families,
          professionals leaving on a Friday, road trippers and motorcycle
          riders. Motorcycle travel remains a content category and a transport
          option. It is not the whole brand.
        </p>
        <p>
          This first version is a public workshop: a destination list, weekend
          tools, and empty shelves where films and itineraries are not written
          yet. There is no account system, no booking engine and no paid
          membership.
        </p>
        <p>
          Discover where to go, what to do, how much it costs, and how to plan
          the next escape from Delhi NCR — with numbers you type yourself.
        </p>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <ButtonLink href="/tools/weekend-trip-finder">
            Find My Weekend Trip
          </ButtonLink>
          <ButtonLink href="/tools" variant="secondary">
            Explore tools
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

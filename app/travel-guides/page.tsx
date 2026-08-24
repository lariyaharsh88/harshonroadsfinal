import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Guides",
  description:
    "Travel guides for weekend escapes from Delhi NCR and India will be added here when they are ready.",
  path: "/travel-guides",
});

export default function TravelGuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Field notes"
        title="Travel Guides"
        description="Guides for places, seasons, packing and routes — published when they are strong enough to stand behind."
      />
      <Container className="max-w-2xl space-y-6 py-14 text-base leading-7 text-muted">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Travel Guides", path: "/travel-guides" },
          ]}
        />
        <p>
          No placeholder guides. When a destination or region is documented
          well enough, it will appear on this page. Until then, use the
          destination list and Weekend Trip Finder.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/destinations">Destinations</ButtonLink>
          <ButtonLink href="/tools/weekend-trip-finder" variant="secondary">
            Weekend Trip Finder
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

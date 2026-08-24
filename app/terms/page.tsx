import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use for HarshOnRoads.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms"
        description="Use the public pages and upcoming tools at your own judgement on the road."
      />
      <Container className="max-w-2xl space-y-4 py-14 text-base leading-7 text-muted">
        <p>
          Content on HarshOnRoads is provided for planning and information.
          Fuel prices, tolls, road conditions and riding time change. Check
          local facts before you ride.
        </p>
        <p>
          Calculators, when they ship, will estimate figures. They are not
          a substitute for your own checks, insurance or legal requirements.
        </p>
        <p>
          You may link to these pages. Do not scrape the site in a way that
          harms availability.
        </p>
      </Container>
    </>
  );
}

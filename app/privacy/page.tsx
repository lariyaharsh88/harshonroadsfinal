import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for HarshOnRoads.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="This first version of the site does not collect accounts, payments or personal profiles."
      />
      <Container className="max-w-2xl space-y-4 py-14 text-base leading-7 text-muted">
        <p>
          HarshOnRoads is a static public website. There is no login, no
          newsletter backend and no database on this release.
        </p>
        <p>
          Hosting (for example Vercel) and analytics you enable later may
          process technical logs such as IP addresses. This page will be
          updated if that changes.
        </p>
        <p>
          External links, including YouTube, are governed by those
          services&apos; own policies.
        </p>
      </Container>
    </>
  );
}

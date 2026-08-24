import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with HarshOnRoads about weekend trips, tools, road trips and collaborations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Write in"
        title="Contact"
        description="Questions about a weekend from NCR, the tools, or a collaboration — this is the door."
      />
      <Container className="max-w-2xl space-y-6 py-14 text-base leading-7 text-muted">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <p>
          There is no contact form backend on this first release. Use
          YouTube for public comments, or email when that address is
          published here.
        </p>
        <p>
          Channel:{" "}
          <a
            href={siteConfig.youtubeUrl}
            className="text-accent hover:text-accent-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.youtubeUrl.replace("https://", "")}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </Container>
    </>
  );
}

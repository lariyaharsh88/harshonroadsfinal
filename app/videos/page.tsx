import { PageHeader } from "@/components/layout/PageHeader";
import { ToolBreadcrumbs } from "@/components/tools/ToolBreadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Videos",
  description:
    "Watch HarshOnRoads on YouTube: weekend escapes, road trips, travel experiences and India travel.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Watch the journey"
        title="Videos"
        description="Weekend escapes, road trips, travel experiences and India travel. Motorcycle films appear when those are the days on camera."
      />
      <Container className="max-w-2xl space-y-6 py-14 text-base leading-7 text-muted">
        <ToolBreadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Videos", path: "/videos" },
          ]}
        />
        <p>
          Embeds and episode lists will be added only after real uploads
          exist to link. Until then, watch on YouTube, or plan the next
          weekend from the trip finder.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.youtubeUrl} external>
            Watch on YouTube
          </ButtonLink>
          <ButtonLink href="/weekend-trips" variant="secondary">
            Weekend trips
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

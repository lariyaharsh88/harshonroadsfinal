import type { Metadata } from "next";
import Link from "next/link";
import { reseedCmsAction } from "@/lib/admin/actions";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getAllDestinationGuides } from "@/lib/data/destinations";
import { getAllItineraries } from "@/lib/data/itineraries";
import { getLiveTools } from "@/lib/tools/catalog";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const destinations = getAllDestinationGuides();
  const itineraries = getAllItineraries();
  const tools = getLiveTools();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Manage published content stored in{" "}
          <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs">
            content/cms/*.json
          </code>
          . Changes revalidate public pages immediately on this server. On
          serverless hosts without persistent disk, use a volume or commit JSON
          changes back to git.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
            Destinations
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">
            {destinations.length}
          </p>
          <Link href="/admin/destinations" className="mt-4 inline-block text-sm font-bold">
            Manage →
          </Link>
        </Card>
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
            Itineraries
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">
            {itineraries.length}
          </p>
          <Link href="/admin/itineraries" className="mt-4 inline-block text-sm font-bold">
            Manage →
          </Link>
        </Card>
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
            Live tools
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">
            {tools.length}
          </p>
          <Link href="/tools" className="mt-4 inline-block text-sm font-bold">
            View tools →
          </Link>
        </Card>
      </div>

      <Card>
        <h2 className="font-display text-xl font-extrabold tracking-tight">
          Quick links
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink href="/admin/destinations/new" variant="secondary">
            New destination
          </ButtonLink>
          <ButtonLink href="/admin/itineraries/new" variant="secondary">
            New itinerary
          </ButtonLink>
          <ButtonLink href="/destinations" variant="ghost">
            Public destinations
          </ButtonLink>
          <ButtonLink href="/itineraries" variant="ghost">
            Public itineraries
          </ButtonLink>
        </div>
      </Card>

      <Card className="border-dashed">
        <h2 className="font-display text-xl font-extrabold tracking-tight">
          Reset CMS data
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Restore destinations and itineraries from the built-in seed files. Use
          this if JSON was corrupted or you want to start over locally.
        </p>
        <form action={reseedCmsAction} className="mt-4">
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-bold"
          >
            Reseed from defaults
          </button>
        </form>
      </Card>
    </div>
  );
}

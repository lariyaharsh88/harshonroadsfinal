import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { getAllDestinationGuides } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "Manage destinations",
  robots: { index: false, follow: false },
};

export default function AdminDestinationsPage() {
  const destinations = getAllDestinationGuides();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Destinations
          </h1>
          <p className="mt-2 text-sm text-muted">
            Edit destination guides shown on the public site.
          </p>
        </div>
        <ButtonLink href="/admin/destinations/new" variant="secondary">
          New destination
        </ButtonLink>
      </div>

      <ul className="grid gap-4">
        {destinations.map((destination) => (
          <li key={destination.slug}>
            <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
                  {destination.region}
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                  {destination.name}
                </h2>
                <p className="mt-2 text-sm text-muted">{destination.shortDescription}</p>
                <p className="mt-2 text-xs font-semibold text-muted-strong">
                  /destinations/{destination.slug}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/admin/destinations/${destination.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-bold text-white"
                >
                  Edit
                </Link>
                <a
                  href={`/destinations/${destination.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-bold"
                >
                  View live
                </a>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

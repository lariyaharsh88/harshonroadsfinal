import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { getAllDestinationGuides } from "@/lib/data/destinations";
import { isDestinationActive } from "@/lib/data/destinations/catalog";

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
            Edit destination guides. Inactive destinations stay in the CMS but are
            hidden from the public site.
          </p>
        </div>
        <ButtonLink href="/admin/destinations/new" variant="secondary">
          New destination
        </ButtonLink>
      </div>

      <ul className="grid gap-4">
        {destinations.map((destination) => {
          const active = isDestinationActive(destination);
          return (
            <li key={destination.slug}>
              <Card
                className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
                  active ? "" : "border-dashed opacity-90"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
                      {destination.region}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        active
                          ? "bg-teal-soft text-teal"
                          : "bg-orange/15 text-orange"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                    {destination.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {destination.shortDescription}
                  </p>
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
                  {active ? (
                    <a
                      href={`/destinations/${destination.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-bold"
                    >
                      View live
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-border px-5 text-sm font-semibold text-muted">
                      Hidden on site
                    </span>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { Card } from "@/components/ui/Card";
import {
  itineraryBudgetLabels,
  itineraryDurationLabels,
  itineraryTravelStyleLabels,
} from "@/lib/data/itineraries/labels";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";
import Link from "next/link";

export function RelatedItineraries({
  itineraries,
}: {
  itineraries: ItineraryRecord[];
}) {
  if (itineraries.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Related itineraries
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {itineraries.map((itinerary) => (
          <li key={itinerary.slug}>
            <Link href={`/itineraries/${itinerary.slug}`} className="block h-full">
              <Card className="h-full transition-colors hover:border-foreground/20 hover:bg-surface-raised">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {itinerary.destinationName}
                </p>
                <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">
                  {itinerary.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {itinerary.shortDescription}
                </p>
                <p className="mt-4 text-xs text-muted-strong">
                  {itineraryDurationLabels[itinerary.duration]} ·{" "}
                  {itineraryBudgetLabels[itinerary.budgetCategory]} ·{" "}
                  {itineraryTravelStyleLabels[itinerary.travelStyle]}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

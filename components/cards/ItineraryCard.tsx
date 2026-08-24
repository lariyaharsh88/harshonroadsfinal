import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  itineraryAudienceLabels,
  itineraryBudgetLabels,
  itineraryDurationLabels,
  itineraryTravelStyleLabels,
} from "@/lib/data/itineraries/labels";
import type { ItineraryCardData } from "@/lib/data/itineraries";

export function ItineraryCard({
  itinerary,
}: {
  itinerary: ItineraryCardData;
}) {
  const audience = itinerary.bestFor[0];

  return (
    <Link href={`/itineraries/${itinerary.slug}`} className="group block h-full">
      <Card className="lift relative flex h-full flex-col overflow-hidden pl-6">
        <span
          className="absolute top-6 bottom-6 left-3 w-0.5 rounded-full bg-accent/70"
          aria-hidden="true"
        />
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
          {itinerary.destinationName}
        </p>
        <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">
          {itinerary.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
          {itinerary.shortDescription}
        </p>
        <p className="mt-4 text-xs font-semibold text-muted-strong">
          {itineraryDurationLabels[itinerary.duration]} ·{" "}
          {itineraryBudgetLabels[itinerary.budgetCategory]} ·{" "}
          {audience
            ? itineraryAudienceLabels[audience]
            : itineraryTravelStyleLabels[itinerary.travelStyle]}
        </p>
        <p className="mt-5 text-sm font-bold text-foreground">
          View itinerary
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {" "}
            →
          </span>
        </p>
      </Card>
    </Link>
  );
}

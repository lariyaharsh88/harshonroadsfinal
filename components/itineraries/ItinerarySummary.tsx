import {
  itineraryAudienceLabels,
  itineraryBudgetLabels,
  itineraryDurationLabels,
  itineraryTransportLabels,
  itineraryTripTypeLabels,
} from "@/lib/data/itineraries/labels";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-foreground">{value}</dd>
    </div>
  );
}

export function ItinerarySummary({
  itinerary,
}: {
  itinerary: ItineraryRecord;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Quick summary
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Categories below are planning bands, not live distances, ETAs or prices.
      </p>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Fact
          label="Duration"
          value={itineraryDurationLabels[itinerary.duration]}
        />
        <Fact label="Travel time (approx.)" value={itinerary.travelTimeCategory} />
        <Fact label="Estimated budget" value={itinerary.estimatedBudget} />
        <Fact
          label="Recommended transport"
          value={itinerary.travelModes
            .map((mode) => itineraryTransportLabels[mode])
            .join(", ")}
        />
        <Fact
          label="Best suited for"
          value={itinerary.bestFor
            .map((item) => itineraryAudienceLabels[item])
            .join(", ")}
        />
        <Fact
          label="Trip type"
          value={itineraryTripTypeLabels[itinerary.tripType]}
        />
        <Fact
          label="Budget category"
          value={itineraryBudgetLabels[itinerary.budgetCategory]}
        />
        <Fact label="Best time (general)" value={itinerary.bestTimeToVisit} />
      </dl>
      <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
        {itinerary.routeSummary}
      </p>
    </section>
  );
}

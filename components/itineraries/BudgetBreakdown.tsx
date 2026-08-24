import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { itineraryBudgetToolHref } from "@/lib/data/itineraries/related-tools";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export function BudgetBreakdown({
  itinerary,
}: {
  itinerary: ItineraryRecord;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Estimated budget
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        {itinerary.estimatedBudget} These are planning ranges, not live prices.
      </p>
      <ul className="mt-6 grid gap-3">
        {itinerary.budgetLines.map((line) => (
          <li key={line.category}>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {line.category}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{line.estimate}</p>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink href={itineraryBudgetToolHref}>
          Calculate your trip budget
        </ButtonLink>
      </div>
    </section>
  );
}

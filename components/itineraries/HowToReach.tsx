import { Card } from "@/components/ui/Card";
import {
  itineraryTransportLabels,
} from "@/lib/data/itineraries/labels";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export function HowToReach({ itinerary }: { itinerary: ItineraryRecord }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        How to reach
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Only the methods that make sense for this corridor. Public-transport
        times change — verify current schedules before you travel. This page
        does not list bus or train numbers.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {itinerary.howToReach.map((item) => (
          <li key={item.mode}>
            <Card className="h-full">
              <h3 className="text-sm font-semibold">
                By {itineraryTransportLabels[item.mode]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
              <p className="mt-2 text-sm leading-6 text-muted-strong">
                {item.note}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

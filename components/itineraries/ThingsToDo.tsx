import { Card } from "@/components/ui/Card";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export function ThingsToDo({ itinerary }: { itinerary: ItineraryRecord }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Things to do
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {itinerary.experiences.map((item) => (
          <li key={item.name}>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {item.category}
              </p>
              <h3 className="mt-2 text-base font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

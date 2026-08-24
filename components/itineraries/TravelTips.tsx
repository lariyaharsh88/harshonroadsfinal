import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export function TravelTips({ itinerary }: { itinerary: ItineraryRecord }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Travel tips
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {itinerary.travelTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
      {itinerary.thingsToKnow.length > 0 ? (
        <>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Things to know
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {itinerary.thingsToKnow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

import { ButtonLink } from "@/components/ui/ButtonLink";
import { itineraryPackingToolHref } from "@/lib/data/itineraries/related-tools";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export function PackingSection({
  itinerary,
}: {
  itinerary: ItineraryRecord;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        What to pack
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {itinerary.packingSuggestions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink href={itineraryPackingToolHref} variant="secondary">
          Weekend packing list
        </ButtonLink>
      </div>
    </section>
  );
}

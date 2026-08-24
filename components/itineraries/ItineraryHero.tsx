import { DestinationHero } from "@/components/destinations/DestinationHero";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

function itineraryHeroAccent(
  itinerary: ItineraryRecord,
): "hills" | "desert" | "plains" | "forest" {
  if (itinerary.travelStyle === "wildlife") {
    return "forest";
  }
  if (
    itinerary.destinationSlug === "jaipur" ||
    itinerary.destinationSlug === "neemrana"
  ) {
    return "desert";
  }
  return "hills";
}

export function ItineraryHero({ itinerary }: { itinerary: ItineraryRecord }) {
  return (
    <DestinationHero
      name={itinerary.destinationName}
      regionLabel={`${itinerary.originLabel} weekend itinerary`}
      accent={itineraryHeroAccent(itinerary)}
    />
  );
}

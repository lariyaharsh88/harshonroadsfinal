import { himachalGuides } from "@/lib/data/destinations/himachal";
import { rajasthanGuides } from "@/lib/data/destinations/rajasthan";
import { uttarakhandGuides } from "@/lib/data/destinations/uttarakhand";
import { uttarPradeshGuides } from "@/lib/data/destinations/uttar-pradesh";
import { delhiToJaipur } from "@/lib/data/itineraries/delhi-to-jaipur-2-day";
import { delhiToJimCorbett } from "@/lib/data/itineraries/delhi-to-jim-corbett-2-day";
import { delhiToKasauli } from "@/lib/data/itineraries/delhi-to-kasauli-2-day";
import { delhiToLansdowne } from "@/lib/data/itineraries/delhi-to-lansdowne-2-day";
import { delhiToMussoorie } from "@/lib/data/itineraries/delhi-to-mussoorie-2-day";
import { delhiToNainital } from "@/lib/data/itineraries/delhi-to-nainital-3-day";
import { delhiToNeemrana } from "@/lib/data/itineraries/delhi-to-neemrana-1-day";
import { delhiToRishikesh } from "@/lib/data/itineraries/delhi-to-rishikesh-2-day";
import type { DestinationGuide } from "@/lib/data/destinations/types";
import type { ItineraryRecord } from "@/lib/data/itineraries/types";

export const seedDestinations: DestinationGuide[] = [
  ...uttarakhandGuides,
  ...himachalGuides,
  ...rajasthanGuides,
  ...uttarPradeshGuides,
];

export const seedItineraries: ItineraryRecord[] = [
  delhiToRishikesh,
  delhiToMussoorie,
  delhiToLansdowne,
  delhiToJaipur,
  delhiToNainital,
  delhiToJimCorbett,
  delhiToKasauli,
  delhiToNeemrana,
];

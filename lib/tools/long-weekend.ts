import {
  interestLabels,
  recommendWeekends,
} from "@/lib/tools/weekend-engine";
import type {
  Destination,
  TripDuration,
  WeekendPreferences,
  WeekendRecommendation,
} from "@/types/destination";

export const longWeekendSpans = [
  "2-day",
  "3-day",
  "4-day",
  "5-day",
] as const;

export type LongWeekendSpan = (typeof longWeekendSpans)[number];

export const longWeekendSpanLabels: Record<LongWeekendSpan, string> = {
  "2-day": "2-day weekend",
  "3-day": "3-day weekend",
  "4-day": "4-day weekend",
  "5-day": "5-day long weekend",
};

export type LongWeekendPreferences = Omit<WeekendPreferences, "duration"> & {
  availableDays: LongWeekendSpan;
};

/**
 * Maps a long-weekend length onto the destination dataset’s duration tags.
 * Five-day weekends use the longest tag in the catalogue (3 nights / 4 days).
 */
export function spanToTripDuration(span: LongWeekendSpan): TripDuration {
  switch (span) {
    case "2-day":
      return "1n2d";
    case "3-day":
      return "2n3d";
    case "4-day":
    case "5-day":
      return "3n4d";
  }
}

export function recommendLongWeekends(
  preferences: LongWeekendPreferences,
  limit = 5,
): WeekendRecommendation[] {
  return recommendWeekends(
    {
      origin: preferences.origin,
      duration: spanToTripDuration(preferences.availableDays),
      budget: preferences.budget,
      group: preferences.group,
      transport: preferences.transport,
      interests: preferences.interests,
      maxTravelTime: preferences.maxTravelTime,
    },
    limit,
  );
}

export function destinationTravelStyle(destination: Destination): string {
  const named = destination.interests
    .slice(0, 3)
    .map((item) => interestLabels[item]);
  if (named.length === 0) {
    return destination.tags[0] ?? "Weekend escape";
  }
  return named.join(" · ");
}

export function longWeekendGroundTime(span: LongWeekendSpan): string {
  switch (span) {
    case "2-day":
      return "1 night / 2 days on the ground";
    case "3-day":
      return "2 nights / 3 days on the ground";
    case "4-day":
      return "3 nights / 4 days on the ground";
    case "5-day":
      return "3 nights / 4 days on the ground, plus a buffer day";
  }
}

export function makeTheMostTips(span: LongWeekendSpan): string[] {
  switch (span) {
    case "2-day":
      return [
        "Leave Friday night or Saturday before dawn. A six-hour one-way drive leaves almost no Saturday at the destination.",
        "Prefer places inside about four hours of NCR unless you accept a short stay and a tired Sunday return.",
        "Pack one plan for Saturday afternoon and keep Sunday morning light so the drive home is not a rush through dusk traffic.",
        "If both days are public holidays, still treat driving time as part of the weekend — it is.",
      ];
    case "3-day":
      return [
        "This is the classic Delhi NCR long weekend: Friday evening out, Monday evening back, or Saturday–Monday.",
        "Hills such as Rishikesh, Lansdowne and Corbett start to make sense if you cap one-way time around six hours and book stay for two nights.",
        "Do not stack a second destination. One base plus one short outing beats two hotel check-ins.",
        "Use the extra morning for the thing you came for (lake, safari, walk), not for shopping the mall road twice.",
      ];
    case "4-day":
      return [
        "Spend three nights in one place. The fourth calendar day should absorb travel, not another checkout.",
        "Nainital, Mussoorie and Jaipur-style distances work better with this buffer than with a two-day dash.",
        "Keep one full day with no intercity driving. That is the day the trip actually feels like a holiday.",
        "If you ride, plan a shorter return or a train for one leg so the last day is not eight hours in the saddle.",
      ];
    case "5-day":
      return [
        "The destination list is tagged up to 3 nights / 4 days. Use the fifth day as a slow return, a rest night in NCR, or a nearby add-on you already know — not a second long haul.",
        "Book the core stay as a 3-night block. Do not invent a five-city loop from Delhi in five days.",
        "Hill weather and park closures still apply; extra days do not fix a closed safari zone or a landslide delay.",
        "If energy is high, add a nearby day trip from the same base (for example a second lake or a quieter village) instead of changing hotels.",
      ];
  }
}

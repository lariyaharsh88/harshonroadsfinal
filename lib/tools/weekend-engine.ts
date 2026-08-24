import { destinations } from "@/lib/tools/destinations";
import type {
  BudgetRange,
  Destination,
  GroupType,
  Interest,
  MaxTravelTime,
  Origin,
  Transport,
  TripDuration,
  WeekendPreferences,
  WeekendRecommendation,
} from "@/types/destination";

const MAX_HOURS: Record<MaxTravelTime, number> = {
  "2h": 2,
  "4h": 4,
  "6h": 6,
  "8h": 8,
  "10h-plus": 12,
};

const ORIGIN_SHIFT: Record<
  Origin,
  Record<Destination["corridor"], number>
> = {
  delhi: { "north-hills": 0, "west-rajasthan": 0, "south-up": 0 },
  gurgaon: { "north-hills": 0.4, "west-rajasthan": -0.5, "south-up": 0.2 },
  noida: { "north-hills": -0.2, "west-rajasthan": 0.5, "south-up": 0 },
  ghaziabad: { "north-hills": -0.3, "west-rajasthan": 0.6, "south-up": 0.1 },
  faridabad: { "north-hills": 0.3, "west-rajasthan": 0.2, "south-up": -0.4 },
};

const DURATION_ORDER: TripDuration[] = [
  "day-trip",
  "1n2d",
  "2n3d",
  "3n4d",
];

const BUDGET_ORDER: BudgetRange[] = [
  "under-3000",
  "3000-5000",
  "5000-10000",
  "10000-15000",
  "15000-plus",
];

function adjacentIndex(list: string[], value: string, other: string): boolean {
  const a = list.indexOf(value);
  const b = list.indexOf(other);
  return a >= 0 && b >= 0 && Math.abs(a - b) === 1;
}

function durationScore(destination: Destination, duration: TripDuration) {
  if (destination.tripDuration.includes(duration)) {
    return { score: 20, ok: true, label: "Fits your weekend duration" };
  }
  const near = destination.tripDuration.some((item) =>
    adjacentIndex(DURATION_ORDER, duration, item),
  );
  if (near) {
    return {
      score: 8,
      ok: true,
      label: "Close to your weekend duration",
    };
  }
  return { score: 0, ok: false, label: "A stretch for your available time" };
}

function budgetScore(destination: Destination, budget: BudgetRange) {
  if (destination.budgetRange.includes(budget)) {
    return { score: 20, ok: true, label: "Matches your budget band" };
  }
  const near = destination.budgetRange.some((item) =>
    adjacentIndex(BUDGET_ORDER, budget, item),
  );
  if (near) {
    return {
      score: 8,
      ok: true,
      label: "Near your budget band (still a rough category)",
    };
  }
  return { score: 0, ok: false, label: "Budget band may not line up" };
}

function travelHours(
  destination: Destination,
  origin: Origin,
): number {
  return Math.max(
    1,
    destination.approxTravelHoursFromDelhi +
      ORIGIN_SHIFT[origin][destination.corridor],
  );
}

function travelScore(
  destination: Destination,
  origin: Origin,
  maxTravelTime: MaxTravelTime,
) {
  const hours = travelHours(destination, origin);
  const cap = MAX_HOURS[maxTravelTime];
  if (hours <= cap) {
    return { score: 20, ok: true, label: "Within your travel-time window" };
  }
  if (hours <= cap + 1.5) {
    return {
      score: 6,
      ok: true,
      label: "Slightly over your travel-time window",
    };
  }
  return { score: 0, ok: false, label: "Likely longer than your max travel time" };
}

function interestScore(destination: Destination, selected: Interest[]) {
  if (selected.length === 0) {
    return { score: 0, ok: false, label: "No interests selected" };
  }
  const hits = selected.filter((item) => destination.interests.includes(item));
  const ratio = hits.length / selected.length;
  const score = Math.round(ratio * 20);
  if (hits.length === 0) {
    return { score: 0, ok: false, label: "Different mood than your interests" };
  }
  const named = hits
    .slice(0, 2)
    .map((item) => interestLabels[item])
    .join("/");
  return {
    score,
    ok: true,
    label:
      hits.length >= 2
        ? `Strong ${named} match`
        : `Matches your ${interestLabels[hits[0]]} interest`,
  };
}

function groupScore(destination: Destination, group: GroupType) {
  if (destination.bestFor.includes(group)) {
    return { score: 10, ok: true, label: "Works for your group type" };
  }
  return { score: 2, ok: false, label: "Less typical for your group type" };
}

function transportScore(destination: Destination, transport: Transport) {
  if (destination.transport.includes(transport)) {
    return {
      score: 10,
      ok: true,
      label: "Suitable for your selected transport",
    };
  }
  return {
    score: 0,
    ok: false,
    label: "Not a usual option for your transport",
  };
}

function pickRecommendedDuration(
  destination: Destination,
  duration: TripDuration,
): TripDuration {
  if (destination.tripDuration.includes(duration)) {
    return duration;
  }
  return destination.tripDuration[0];
}

export function recommendWeekends(
  preferences: WeekendPreferences,
  limit = 5,
): WeekendRecommendation[] {
  const ranked = destinations.map((destination) => {
    const duration = durationScore(destination, preferences.duration);
    const budget = budgetScore(destination, preferences.budget);
    const travel = travelScore(
      destination,
      preferences.origin,
      preferences.maxTravelTime,
    );
    const interest = interestScore(destination, preferences.interests);
    const group = groupScore(destination, preferences.group);
    const transport = transportScore(destination, preferences.transport);

    const total =
      duration.score +
      budget.score +
      travel.score +
      interest.score +
      group.score +
      transport.score;

    const reasons = [duration, budget, travel, interest, group, transport].map(
      (item) => ({ ok: item.ok, label: item.label }),
    );

    return {
      destination,
      matchPercent: total,
      reasons,
      recommendedDuration: pickRecommendedDuration(
        destination,
        preferences.duration,
      ),
      whySummary: reasons
        .filter((item) => item.ok)
        .map((item) => item.label)
        .join(" · "),
    };
  });

  return ranked
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, limit);
}

export const originLabels: Record<Origin, string> = {
  delhi: "Delhi",
  gurgaon: "Gurgaon",
  noida: "Noida",
  ghaziabad: "Ghaziabad",
  faridabad: "Faridabad",
};

export const durationLabels: Record<TripDuration, string> = {
  "day-trip": "Day Trip",
  "1n2d": "1 Night / 2 Days",
  "2n3d": "2 Nights / 3 Days",
  "3n4d": "3 Nights / 4 Days",
};

export const budgetLabels: Record<BudgetRange, string> = {
  "under-3000": "Under ₹3,000",
  "3000-5000": "₹3,000–₹5,000",
  "5000-10000": "₹5,000–₹10,000",
  "10000-15000": "₹10,000–₹15,000",
  "15000-plus": "₹15,000+",
};

export const groupLabels: Record<GroupType, string> = {
  solo: "Solo",
  couple: "Couple",
  friends: "Friends",
  family: "Family",
};

export const transportLabels: Record<Transport, string> = {
  bike: "Bike",
  car: "Car",
  bus: "Bus",
  train: "Train",
};

export const interestLabels: Record<Interest, string> = {
  mountains: "Mountains",
  nature: "Nature",
  adventure: "Adventure",
  peaceful: "Peaceful",
  romantic: "Romantic",
  heritage: "Heritage",
  wildlife: "Wildlife",
  food: "Food",
  photography: "Photography",
  nightlife: "Nightlife",
};

export const travelTimeLabels: Record<MaxTravelTime, string> = {
  "2h": "2 hours",
  "4h": "4 hours",
  "6h": "6 hours",
  "8h": "8 hours",
  "10h-plus": "10+ hours",
};

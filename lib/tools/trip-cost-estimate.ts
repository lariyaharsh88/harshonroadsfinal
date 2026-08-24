import { roundTo } from "@/lib/tools/engine";
import type { Transport, TripDuration } from "@/types/destination";

export const costScenarioIds = [
  "budget",
  "comfort",
  "higher-comfort",
] as const;

export type CostScenarioId = (typeof costScenarioIds)[number];

export const costScenarioLabels: Record<CostScenarioId, string> = {
  budget: "Budget",
  comfort: "Comfort",
  "higher-comfort": "Higher Comfort",
};

export type CostScenarioRates = {
  id: CostScenarioId;
  stayPerNightInr: number;
  foodPerPersonPerDayInr: number;
  activitiesTotalInr: number;
  tollsInr: number;
  parkingInr: number;
  miscellaneousInr: number;
  publicTransportTotalInr: number;
  assumptions: string[];
};

export type CostEstimateContext = {
  travellers: number;
  duration: TripDuration;
  transport: Transport;
  roundTripKm: number;
  mileageKmpl: number;
  fuelPricePerLitre: number;
};

export type CostLine = {
  key: string;
  label: string;
  amountInr: number;
  detail: string;
};

export type ComputedScenario = {
  id: CostScenarioId;
  label: string;
  totalInr: number;
  perPersonInr: number;
  lines: CostLine[];
  assumptions: string[];
};

export function durationNightsDays(duration: TripDuration): {
  nights: number;
  days: number;
} {
  switch (duration) {
    case "day-trip":
      return { nights: 0, days: 1 };
    case "1n2d":
      return { nights: 1, days: 2 };
    case "2n3d":
      return { nights: 2, days: 3 };
    case "3n4d":
      return { nights: 3, days: 4 };
  }
}

export function isPrivateVehicle(transport: Transport): boolean {
  return transport === "bike" || transport === "car";
}

export function defaultMileageKmpl(transport: Transport): number {
  return transport === "bike" ? 40 : 14;
}

export function estimatedFuelCostInr(input: {
  distanceKm: number;
  mileageKmpl: number;
  fuelPricePerLitre: number;
}): number {
  if (input.mileageKmpl <= 0 || input.distanceKm < 0) {
    return 0;
  }
  return roundTo(
    (input.distanceKm / input.mileageKmpl) * input.fuelPricePerLitre,
    0,
  );
}

export function computeScenarioCost(
  context: CostEstimateContext,
  rates: CostScenarioRates,
): ComputedScenario {
  const { nights, days } = durationNightsDays(context.duration);
  const travellers = Math.max(1, context.travellers);
  const stay = roundTo(rates.stayPerNightInr * nights, 0);
  const food = roundTo(
    rates.foodPerPersonPerDayInr * travellers * days,
    0,
  );
  const privateVehicle = isPrivateVehicle(context.transport);
  const transport = privateVehicle
    ? estimatedFuelCostInr({
        distanceKm: context.roundTripKm,
        mileageKmpl: context.mileageKmpl,
        fuelPricePerLitre: context.fuelPricePerLitre,
      })
    : roundTo(rates.publicTransportTotalInr, 0);

  const activities = roundTo(rates.activitiesTotalInr, 0);
  const tolls = roundTo(rates.tollsInr, 0);
  const parking = roundTo(rates.parkingInr, 0);
  const miscellaneous = roundTo(rates.miscellaneousInr, 0);
  const total =
    stay + food + transport + activities + tolls + parking + miscellaneous;
  const perPerson = roundTo(total / travellers, 0);

  return {
    id: rates.id,
    label: costScenarioLabels[rates.id],
    totalInr: total,
    perPersonInr: perPerson,
    assumptions: rates.assumptions,
    lines: [
      {
        key: "transport",
        label: privateVehicle ? "Transport / fuel" : "Transport",
        amountInr: transport,
        detail: privateVehicle
          ? "Round-trip km ÷ mileage × fuel price. Typical assumptions, not a pump quote."
          : "Estimated group tickets and local transfers, not live fares.",
      },
      {
        key: "stay",
        label: "Accommodation",
        amountInr: stay,
        detail: `${nights} night${nights === 1 ? "" : "s"} × estimated group stay per night`,
      },
      {
        key: "food",
        label: "Food",
        amountInr: food,
        detail: `${travellers} traveller${travellers === 1 ? "" : "s"} × ${days} day${days === 1 ? "" : "s"} × estimated food per person per day`,
      },
      {
        key: "activities",
        label: "Activities",
        amountInr: activities,
        detail: "Estimated group total for tickets and paid activities",
      },
      {
        key: "tolls",
        label: "Tolls",
        amountInr: tolls,
        detail: "Typical highway toll sketch, not a live FASTag quote",
      },
      {
        key: "parking",
        label: "Parking",
        amountInr: parking,
        detail: "Typical parking sketch for the stay, not a live rate",
      },
      {
        key: "miscellaneous",
        label: "Miscellaneous",
        amountInr: miscellaneous,
        detail: "Buffer for water, snacks and small extras",
      },
    ],
  };
}

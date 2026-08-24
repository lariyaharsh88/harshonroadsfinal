import {
  errorIfNegative,
  errorIfNotPositive,
  formatInr,
  formatKm,
  formatKmpl,
  formatLitres,
  formatNumber,
  mergeErrors,
  roundTo,
} from "@/lib/tools/engine";
import type { CalculatorOutput, CalculatorSpec, FieldErrors } from "@/types/calculator";

export type TripCostInput = {
  distanceKm: number;
  vehicle: string;
  mileageKmpl: number;
  fuelPricePerLitre: number;
  travellers: number;
  days: number;
  hotelNights: number;
  hotelPerNight: number;
  foodPerPersonPerDay: number;
  tolls: number;
  parking: number;
  activities: number;
  miscellaneous: number;
};

const vehicleLabels: Record<string, string> = {
  motorcycle: "Motorcycle",
  car: "Car",
};

export function validateTripCost(input: TripCostInput): FieldErrors {
  const errors = mergeErrors({
    distanceKm: errorIfNotPositive(input.distanceKm, "Total distance"),
    mileageKmpl: errorIfNotPositive(input.mileageKmpl, "Mileage"),
    fuelPricePerLitre: errorIfNotPositive(input.fuelPricePerLitre, "Fuel price"),
    travellers: errorIfNotPositive(input.travellers, "Number of travellers"),
    days: errorIfNotPositive(input.days, "Number of days"),
    hotelNights: errorIfNegative(input.hotelNights, "Hotel nights"),
    hotelPerNight: errorIfNegative(input.hotelPerNight, "Hotel cost per night"),
    foodPerPersonPerDay: errorIfNegative(
      input.foodPerPersonPerDay,
      "Food cost per person per day",
    ),
    tolls: errorIfNegative(input.tolls, "Tolls"),
    parking: errorIfNegative(input.parking, "Parking"),
    activities: errorIfNegative(input.activities, "Activities"),
    miscellaneous: errorIfNegative(input.miscellaneous, "Miscellaneous"),
  });

  if (!input.vehicle) {
    errors.vehicle = "Choose motorcycle or car.";
  }

  if (input.travellers !== Math.floor(input.travellers)) {
    errors.travellers = "Use a whole number of travellers.";
  }

  return errors;
}

export function calculateTripCost(input: TripCostInput): CalculatorOutput {
  const fuelRequired = input.distanceKm / input.mileageKmpl;
  const fuelCost = fuelRequired * input.fuelPricePerLitre;
  const accommodation = input.hotelNights * input.hotelPerNight;
  const food =
    input.travellers * input.days * input.foodPerPersonPerDay;
  const total =
    fuelCost +
    accommodation +
    food +
    input.tolls +
    input.parking +
    input.activities +
    input.miscellaneous;
  const perPerson = total / input.travellers;
  const perDay = total / input.days;
  const perPersonPerDay = perPerson / input.days;
  const vehicle = vehicleLabels[input.vehicle] ?? input.vehicle;

  return {
    headline: {
      key: "total",
      label: "Total trip cost",
      value: formatInr(total),
      emphasize: true,
    },
    results: [
      {
        key: "total",
        label: "Total trip cost",
        value: formatInr(roundTo(total, 2)),
        emphasize: true,
      },
      {
        key: "person",
        label: "Cost per person",
        value: formatInr(roundTo(perPerson, 2)),
      },
      {
        key: "day",
        label: "Cost per day",
        value: formatInr(roundTo(perDay, 2)),
      },
      {
        key: "personDay",
        label: "Cost per person per day",
        value: formatInr(roundTo(perPersonPerDay, 2)),
      },
    ],
    breakdown: [
      {
        label: "Vehicle",
        value: vehicle,
      },
      {
        label: "Total distance",
        value: formatKm(input.distanceKm),
      },
      {
        label: "Mileage",
        value: formatKmpl(input.mileageKmpl),
      },
      {
        label: "Fuel required",
        value: formatLitres(roundTo(fuelRequired, 2)),
        detail: "Distance ÷ mileage",
      },
      {
        label: "Fuel cost",
        value: formatInr(roundTo(fuelCost, 2)),
        detail: "Fuel required × fuel price",
      },
      {
        label: "Accommodation",
        value: formatInr(roundTo(accommodation, 2)),
        detail: `${formatNumber(input.hotelNights, 0)} nights × ${formatInr(input.hotelPerNight)}`,
      },
      {
        label: "Food",
        value: formatInr(roundTo(food, 2)),
        detail: `${formatNumber(input.travellers, 0)} × ${formatNumber(input.days, 0)} days × ${formatInr(input.foodPerPersonPerDay)}`,
      },
      {
        label: "Tolls",
        value: formatInr(roundTo(input.tolls, 2)),
      },
      {
        label: "Parking",
        value: formatInr(roundTo(input.parking, 2)),
      },
      {
        label: "Activities",
        value: formatInr(roundTo(input.activities, 2)),
      },
      {
        label: "Miscellaneous",
        value: formatInr(roundTo(input.miscellaneous, 2)),
      },
      {
        label: "Total trip cost",
        value: formatInr(roundTo(total, 2)),
        emphasize: true,
      },
      {
        label: "Cost per person",
        value: formatInr(roundTo(perPerson, 2)),
        emphasize: true,
      },
    ],
  };
}

export const spec: CalculatorSpec<TripCostInput> = {
  fields: [
    {
      name: "distanceKm",
      label: "Total distance",
      type: "number",
      suffix: "km",
      required: true,
      min: 0,
      max: 20000,
      step: 0.1,
      placeholder: "700",
      helper: "Full kilometres you will drive, including the return if you are coming back.",
      section: "Fuel",
    },
    {
      name: "vehicle",
      label: "Vehicle type",
      type: "select",
      required: true,
      defaultValue: "motorcycle",
      options: [
        { value: "motorcycle", label: "Motorcycle" },
        { value: "car", label: "Car" },
      ],
      helper: "A label for the breakdown. Mileage is still the number you enter.",
      section: "Fuel",
    },
    {
      name: "mileageKmpl",
      label: "Mileage",
      type: "number",
      suffix: "km/l",
      required: true,
      min: 0,
      max: 150,
      step: 0.1,
      placeholder: "35",
      helper: "Use a real tank figure for this vehicle, not the brochure peak.",
      section: "Fuel",
    },
    {
      name: "fuelPricePerLitre",
      label: "Fuel price",
      type: "number",
      prefix: "₹",
      suffix: "/ litre",
      required: true,
      min: 0,
      max: 250,
      step: 0.1,
      placeholder: "105",
      helper: "Price you expect to pay. This page does not fetch pump rates.",
      section: "Fuel",
    },
    {
      name: "travellers",
      label: "Number of travellers",
      type: "number",
      required: true,
      min: 1,
      max: 40,
      step: 1,
      placeholder: "2",
      section: "Stay and food",
    },
    {
      name: "days",
      label: "Number of days",
      type: "number",
      required: true,
      min: 1,
      max: 60,
      step: 1,
      placeholder: "3",
      helper: "Needed for food total and cost per day.",
      section: "Stay and food",
    },
    {
      name: "hotelNights",
      label: "Hotel nights",
      type: "number",
      required: true,
      min: 0,
      max: 60,
      step: 1,
      defaultValue: "2",
      helper: "Use 0 if you will not take a room.",
      section: "Stay and food",
    },
    {
      name: "hotelPerNight",
      label: "Hotel cost per night",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 200000,
      step: 0.01,
      defaultValue: "0",
      helper: "Room total per night as you expect to pay — not a listed tariff.",
      section: "Stay and food",
    },
    {
      name: "foodPerPersonPerDay",
      label: "Food cost per person per day",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 20000,
      step: 0.01,
      defaultValue: "0",
      section: "Stay and food",
    },
    {
      name: "tolls",
      label: "Tolls",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 100000,
      step: 0.01,
      defaultValue: "0",
      section: "Extras",
    },
    {
      name: "parking",
      label: "Parking",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 50000,
      step: 0.01,
      defaultValue: "0",
      section: "Extras",
    },
    {
      name: "activities",
      label: "Activities",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 500000,
      step: 0.01,
      defaultValue: "0",
      section: "Extras",
    },
    {
      name: "miscellaneous",
      label: "Miscellaneous",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 500000,
      step: 0.01,
      defaultValue: "0",
      section: "Extras",
    },
  ],
  validate: validateTripCost,
  calculate: calculateTripCost,
};

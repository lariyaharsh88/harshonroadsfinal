import {
  errorIfNegative,
  errorIfNotPositive,
  formatInr,
  formatNumber,
  mergeErrors,
  roundTo,
} from "@/lib/tools/engine";
import type { CalculatorOutput, CalculatorSpec, FieldErrors } from "@/types/calculator";

export type WeekendBudgetInput = {
  travellers: number;
  days: number;
  hotelNights: number;
  transport: string;
  transportCost: number;
  accommodationPerNight: number;
  foodPerPersonPerDay: number;
  activities: number;
  tolls: number;
  parking: number;
  miscellaneous: number;
};

const transportLabels: Record<string, string> = {
  bike: "Bike",
  car: "Car",
  bus: "Bus",
  train: "Train",
};

export function validateWeekendBudget(input: WeekendBudgetInput): FieldErrors {
  const errors = mergeErrors({
    travellers: errorIfNotPositive(input.travellers, "Number of travellers"),
    days: errorIfNotPositive(input.days, "Number of days"),
    hotelNights: errorIfNegative(input.hotelNights, "Hotel nights"),
    transportCost: errorIfNegative(input.transportCost, "Transport/fuel cost"),
    accommodationPerNight: errorIfNegative(
      input.accommodationPerNight,
      "Accommodation per night",
    ),
    foodPerPersonPerDay: errorIfNegative(
      input.foodPerPersonPerDay,
      "Food per person per day",
    ),
    activities: errorIfNegative(input.activities, "Activities"),
    tolls: errorIfNegative(input.tolls, "Tolls"),
    parking: errorIfNegative(input.parking, "Parking"),
    miscellaneous: errorIfNegative(input.miscellaneous, "Miscellaneous"),
  });

  if (!input.transport) {
    errors.transport = "Choose a transport mode.";
  }

  if (input.travellers !== Math.floor(input.travellers)) {
    errors.travellers = "Use a whole number of travellers.";
  }

  return errors;
}

export function calculateWeekendBudget(
  input: WeekendBudgetInput,
): CalculatorOutput {
  const accommodation = input.accommodationPerNight * input.hotelNights;
  const food =
    input.foodPerPersonPerDay * input.travellers * input.days;
  const transport = input.transportCost;
  const activities = input.activities;
  const tolls = input.tolls;
  const parking = input.parking;
  const miscellaneous = input.miscellaneous;
  const total =
    accommodation +
    food +
    transport +
    activities +
    tolls +
    parking +
    miscellaneous;
  const perPerson = total / input.travellers;
  const perPersonPerDay = perPerson / input.days;
  const mode = transportLabels[input.transport] ?? input.transport;

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
        label: "Per person",
        value: formatInr(roundTo(perPerson, 2)),
      },
      {
        key: "personDay",
        label: "Per person per day",
        value: formatInr(roundTo(perPersonPerDay, 2)),
      },
    ],
    breakdown: [
      {
        label: "Accommodation",
        value: formatInr(roundTo(accommodation, 2)),
        detail: `${formatInr(input.accommodationPerNight)} × ${formatNumber(input.hotelNights, 0)} nights`,
      },
      {
        label: "Food",
        value: formatInr(roundTo(food, 2)),
        detail: `${formatInr(input.foodPerPersonPerDay)} × ${formatNumber(input.travellers, 0)} people × ${formatNumber(input.days, 0)} days`,
      },
      {
        label: "Transport",
        value: formatInr(roundTo(transport, 2)),
        detail: `${mode} — amount you entered`,
      },
      {
        label: "Activities",
        value: formatInr(roundTo(activities, 2)),
      },
      {
        label: "Tolls",
        value: formatInr(roundTo(tolls, 2)),
      },
      {
        label: "Parking",
        value: formatInr(roundTo(parking, 2)),
      },
      {
        label: "Miscellaneous",
        value: formatInr(roundTo(miscellaneous, 2)),
      },
      {
        label: "Total",
        value: formatInr(roundTo(total, 2)),
        emphasize: true,
      },
      {
        label: "Per person",
        value: formatInr(roundTo(perPerson, 2)),
        detail: `Split across ${formatNumber(input.travellers, 0)} travellers`,
        emphasize: true,
      },
    ],
  };
}

export const spec: CalculatorSpec<WeekendBudgetInput> = {
  fields: [
    {
      name: "travellers",
      label: "Number of travellers",
      type: "number",
      required: true,
      min: 1,
      max: 40,
      step: 1,
      placeholder: "2",
      section: "Trip",
    },
    {
      name: "days",
      label: "Number of days",
      type: "number",
      required: true,
      min: 1,
      max: 14,
      step: 1,
      placeholder: "2",
      helper: "Calendar days away from home, including the travel days.",
      section: "Trip",
    },
    {
      name: "hotelNights",
      label: "Number of hotel nights",
      type: "number",
      required: true,
      min: 0,
      max: 14,
      step: 1,
      defaultValue: "1",
      helper: "Use 0 for a day trip. This is not filled with a default price.",
      section: "Trip",
    },
    {
      name: "transport",
      label: "Transport",
      type: "select",
      required: true,
      defaultValue: "bike",
      options: [
        { value: "bike", label: "Bike" },
        { value: "car", label: "Car" },
        { value: "bus", label: "Bus" },
        { value: "train", label: "Train" },
      ],
      helper: "Used as a label. Enter the rupees yourself in the next field.",
      section: "Transport",
    },
    {
      name: "transportCost",
      label: "Transport / fuel cost",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 500000,
      step: 0.01,
      defaultValue: "0",
      helper: "Tickets, fuel, or both — your estimate, not a live fare.",
      section: "Transport",
    },
    {
      name: "accommodationPerNight",
      label: "Accommodation per night",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 200000,
      step: 0.01,
      defaultValue: "0",
      helper: "Room total per night for the group, as you expect to pay.",
      section: "Stay and food",
    },
    {
      name: "foodPerPersonPerDay",
      label: "Food per person per day",
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
      name: "activities",
      label: "Activities",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 500000,
      step: 0.01,
      defaultValue: "0",
      helper: "Safaris, tickets, rafting — whatever you plan to spend.",
      section: "Extras",
    },
    {
      name: "tolls",
      label: "Tolls",
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
      name: "parking",
      label: "Parking",
      type: "number",
      prefix: "₹",
      required: true,
      min: 0,
      max: 20000,
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
      max: 200000,
      step: 0.01,
      defaultValue: "0",
      helper: "Snacks, tips, a buffer — still your number.",
      section: "Extras",
    },
  ],
  validate: validateWeekendBudget,
  calculate: calculateWeekendBudget,
};

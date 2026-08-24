import {
  errorIfNegative,
  errorIfNotPositive,
  formatInr,
  mergeErrors,
  roundTo,
} from "@/lib/tools/engine";
import type { CalculatorOutput, CalculatorSpec, FieldErrors } from "@/types/calculator";

export type BudgetInput = {
  days: number;
  stayPerNight: number;
  foodPerDay: number;
  fuelBudget: number;
  extras: number;
  bufferPercent: number;
  split: string;
  people: number;
};

export function validateBudget(input: BudgetInput): FieldErrors {
  const errors = mergeErrors({
    days: errorIfNotPositive(input.days, "Days"),
    stayPerNight: errorIfNegative(input.stayPerNight, "Stay per night"),
    foodPerDay: errorIfNegative(input.foodPerDay, "Food per day"),
    fuelBudget: errorIfNegative(input.fuelBudget, "Fuel budget"),
    extras: errorIfNegative(input.extras, "Extras"),
    bufferPercent: errorIfNegative(input.bufferPercent, "Buffer"),
    people: errorIfNotPositive(input.people, "People"),
  });

  if (input.bufferPercent > 50) {
    errors.bufferPercent = "Keep the buffer at 50% or below.";
  }

  if (!input.split) {
    errors.split = "Choose how to split the budget.";
  }

  return errors;
}

export function calculateBudget(input: BudgetInput): CalculatorOutput {
  const stay = input.stayPerNight * input.days;
  const food = input.foodPerDay * input.days;
  const subtotal = stay + food + input.fuelBudget + input.extras;
  const buffer = subtotal * (input.bufferPercent / 100);
  const total = subtotal + buffer;
  const divisor = input.split === "split" ? input.people : 1;
  const perPerson = total / divisor;
  const perDay = total / input.days;

  return {
    headline: {
      key: "total",
      label: "Trip budget",
      value: formatInr(total),
      emphasize: true,
    },
    results: [
      {
        key: "total",
        label: "Recommended budget",
        value: formatInr(total),
        hint: `Includes ${input.bufferPercent}% buffer`,
        emphasize: true,
      },
      {
        key: "perDay",
        label: "Per day",
        value: formatInr(perDay),
      },
      {
        key: "perPerson",
        label: input.split === "split" ? "Per person" : "Your share",
        value: formatInr(perPerson),
      },
    ],
    breakdown: [
      {
        label: "Stay",
        value: formatInr(roundTo(stay, 2)),
        detail: `${formatInr(input.stayPerNight)} × ${input.days} nights`,
      },
      {
        label: "Food",
        value: formatInr(roundTo(food, 2)),
        detail: `${formatInr(input.foodPerDay)} × ${input.days} days`,
      },
      {
        label: "Fuel",
        value: formatInr(input.fuelBudget),
      },
      {
        label: "Extras",
        value: formatInr(input.extras),
      },
      {
        label: "Subtotal",
        value: formatInr(roundTo(subtotal, 2)),
      },
      {
        label: "Buffer",
        value: formatInr(roundTo(buffer, 2)),
        detail: `${input.bufferPercent}%`,
      },
    ],
  };
}

export const spec: CalculatorSpec<BudgetInput> = {
  fields: [
    {
      name: "days",
      label: "Days on the road",
      type: "number",
      suffix: "days",
      min: 1,
      max: 120,
      step: 1,
      placeholder: "5",
    },
    {
      name: "stayPerNight",
      label: "Stay per night",
      type: "number",
      prefix: "₹",
      min: 0,
      max: 50000,
      step: 50,
      placeholder: "1800",
    },
    {
      name: "foodPerDay",
      label: "Food per day",
      type: "number",
      prefix: "₹",
      min: 0,
      max: 20000,
      step: 50,
      placeholder: "800",
    },
    {
      name: "fuelBudget",
      label: "Fuel budget",
      type: "number",
      prefix: "₹",
      min: 0,
      max: 200000,
      step: 50,
      placeholder: "3500",
      helper: "Use the fuel cost calculator if you know distance and mileage.",
    },
    {
      name: "extras",
      label: "Extras",
      type: "number",
      prefix: "₹",
      min: 0,
      max: 200000,
      step: 50,
      defaultValue: "0",
      helper: "Tolls, parking, permits, gear.",
    },
    {
      name: "bufferPercent",
      label: "Buffer",
      type: "number",
      suffix: "%",
      min: 0,
      max: 50,
      step: 1,
      defaultValue: "10",
      helper: "A 10–15% pad covers detours and price swings.",
    },
    {
      name: "split",
      label: "Split",
      type: "select",
      defaultValue: "solo",
      options: [
        { value: "solo", label: "I pay the full budget" },
        { value: "split", label: "Split equally" },
      ],
    },
    {
      name: "people",
      label: "People sharing",
      type: "number",
      min: 1,
      max: 20,
      step: 1,
      defaultValue: "1",
    },
  ],
  validate: validateBudget,
  calculate: calculateBudget,
};

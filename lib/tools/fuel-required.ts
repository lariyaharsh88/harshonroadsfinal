import {
  errorIfNotPositive,
  formatInr,
  formatKm,
  formatKmpl,
  formatLitres,
  mergeErrors,
  roundTo,
} from "@/lib/tools/engine";
import type { CalculatorOutput, CalculatorSpec, FieldErrors } from "@/types/calculator";

export type FuelRequiredInput = {
  distanceKm: number;
  mileageKmpl: number;
  fuelPricePerLitre: number;
};

export function validateFuelRequired(input: FuelRequiredInput): FieldErrors {
  return mergeErrors({
    distanceKm: errorIfNotPositive(input.distanceKm, "Distance"),
    mileageKmpl: errorIfNotPositive(input.mileageKmpl, "Bike mileage"),
    fuelPricePerLitre: errorIfNotPositive(
      input.fuelPricePerLitre,
      "Fuel price",
    ),
  });
}

export function calculateFuelRequired(
  input: FuelRequiredInput,
): CalculatorOutput {
  const fuelRequired = input.distanceKm / input.mileageKmpl;
  const fuelCost = fuelRequired * input.fuelPricePerLitre;

  return {
    headline: {
      key: "litres",
      label: "Fuel required",
      value: formatLitres(fuelRequired),
      emphasize: true,
    },
    results: [
      {
        key: "litres",
        label: "Fuel required",
        value: formatLitres(roundTo(fuelRequired, 2)),
        emphasize: true,
      },
      {
        key: "cost",
        label: "Estimated fuel cost",
        value: formatInr(fuelCost),
      },
    ],
    breakdown: [
      {
        label: "Distance",
        value: formatKm(input.distanceKm),
      },
      {
        label: "Bike mileage",
        value: formatKmpl(input.mileageKmpl),
      },
      {
        label: "Fuel price",
        value: `${formatInr(input.fuelPricePerLitre)} / litre`,
      },
      {
        label: "Fuel required",
        value: formatLitres(roundTo(fuelRequired, 2)),
        detail: "Distance ÷ mileage",
      },
      {
        label: "Estimated fuel cost",
        value: formatInr(roundTo(fuelCost, 2)),
        detail: "Fuel required × fuel price",
      },
    ],
  };
}

export const spec: CalculatorSpec<FuelRequiredInput> = {
  fields: [
    {
      name: "distanceKm",
      label: "Distance",
      type: "number",
      suffix: "km",
      required: true,
      min: 0,
      max: 20000,
      step: 0.1,
      placeholder: "350",
      helper: "Kilometres you plan to ride, including any return leg.",
    },
    {
      name: "mileageKmpl",
      label: "Bike mileage",
      type: "number",
      suffix: "km/l",
      required: true,
      min: 0,
      max: 150,
      step: 0.1,
      placeholder: "35",
      helper: "Use a real tank figure, not the brochure peak.",
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
      helper: "Price you expect to pay. This page does not fetch live rates.",
    },
  ],
  validate: validateFuelRequired,
  calculate: calculateFuelRequired,
};

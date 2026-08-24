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

export type FuelCostInput = {
  distanceKm: number;
  mileageKmpl: number;
  fuelPricePerLitre: number;
};

export function validateFuelCost(input: FuelCostInput): FieldErrors {
  return mergeErrors({
    distanceKm: errorIfNotPositive(input.distanceKm, "Distance"),
    mileageKmpl: errorIfNotPositive(input.mileageKmpl, "Bike mileage"),
    fuelPricePerLitre: errorIfNotPositive(input.fuelPricePerLitre, "Fuel price"),
  });
}

export function calculateFuelCost(input: FuelCostInput): CalculatorOutput {
  const fuelRequired = input.distanceKm / input.mileageKmpl;
  const fuelCost = fuelRequired * input.fuelPricePerLitre;
  const costPer100Km = (input.fuelPricePerLitre / input.mileageKmpl) * 100;

  return {
    headline: {
      key: "cost",
      label: "Estimated fuel cost",
      value: formatInr(fuelCost),
      emphasize: true,
    },
    results: [
      {
        key: "cost",
        label: "Estimated fuel cost",
        value: formatInr(fuelCost),
        emphasize: true,
      },
      {
        key: "litres",
        label: "Fuel required",
        value: formatLitres(fuelRequired),
      },
      {
        key: "per100",
        label: "Cost per 100 km",
        value: formatInr(costPer100Km),
      },
    ],
    breakdown: [
      {
        label: "Distance",
        value: formatKm(input.distanceKm),
      },
      {
        label: "Mileage",
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
      {
        label: "Cost per 100 km",
        value: formatInr(roundTo(costPer100Km, 2)),
        detail: "(Fuel price ÷ mileage) × 100",
      },
    ],
  };
}

export const spec: CalculatorSpec<FuelCostInput> = {
  fields: [
    {
      name: "distanceKm",
      label: "Distance",
      type: "number",
      suffix: "km",
      required: true,
      min: 0,
      max: 20000,
      step: 1,
      placeholder: "350",
      helper: "Kilometres you will actually ride, including any return leg.",
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
      helper: "Use a real tank figure from similar roads, not the brochure peak.",
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
      helper: "Price at the pump you expect to use. This site does not fetch live prices.",
    },
  ],
  validate: validateFuelCost,
  calculate: calculateFuelCost,
};

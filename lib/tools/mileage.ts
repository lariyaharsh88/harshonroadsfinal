import {
  errorIfNotPositive,
  formatKm,
  formatKmpl,
  formatLitres,
  formatLitresPer100Km,
  formatNumber,
  mergeErrors,
  roundTo,
} from "@/lib/tools/engine";
import type { CalculatorOutput, CalculatorSpec, FieldErrors } from "@/types/calculator";

export type MileageInput = {
  distanceKm: number;
  fuelUsedLitres: number;
};

export function validateMileage(input: MileageInput): FieldErrors {
  return mergeErrors({
    distanceKm: errorIfNotPositive(input.distanceKm, "Distance travelled"),
    fuelUsedLitres: errorIfNotPositive(input.fuelUsedLitres, "Fuel consumed"),
  });
}

export function calculateMileage(input: MileageInput): CalculatorOutput {
  const mileageKmpl = input.distanceKm / input.fuelUsedLitres;
  const litresPer100Km = (input.fuelUsedLitres / input.distanceKm) * 100;

  return {
    headline: {
      key: "mileage",
      label: "Actual mileage",
      value: formatKmpl(mileageKmpl),
      emphasize: true,
    },
    results: [
      {
        key: "mileage",
        label: "Actual mileage",
        value: formatKmpl(roundTo(mileageKmpl, 2)),
        hint: "km/l",
        emphasize: true,
      },
      {
        key: "distance",
        label: "Distance",
        value: formatKm(input.distanceKm),
      },
      {
        key: "fuel",
        label: "Fuel consumed",
        value: formatLitres(input.fuelUsedLitres),
      },
      {
        key: "per100",
        label: "Fuel per 100 km",
        value: formatLitresPer100Km(roundTo(litresPer100Km, 2)),
      },
    ],
    breakdown: [
      {
        label: "Distance",
        value: formatKm(input.distanceKm),
      },
      {
        label: "Fuel consumed",
        value: formatLitres(input.fuelUsedLitres),
      },
      {
        label: "Actual mileage",
        value: formatKmpl(roundTo(mileageKmpl, 2)),
        detail: "Distance ÷ fuel consumed",
      },
      {
        label: "km/l",
        value: formatNumber(roundTo(mileageKmpl, 2), 2),
      },
      {
        label: "Fuel consumption per 100 km",
        value: formatLitresPer100Km(roundTo(litresPer100Km, 2)),
        detail: "(Fuel consumed ÷ distance) × 100",
      },
    ],
  };
}

export const spec: CalculatorSpec<MileageInput> = {
  fields: [
    {
      name: "distanceKm",
      label: "Distance travelled",
      type: "number",
      suffix: "km",
      required: true,
      min: 0,
      max: 5000,
      step: 0.1,
      placeholder: "350",
      helper: "Trip-meter kilometres since the last matching fill.",
    },
    {
      name: "fuelUsedLitres",
      label: "Fuel consumed",
      type: "number",
      suffix: "L",
      required: true,
      min: 0,
      max: 80,
      step: 0.01,
      placeholder: "10",
      helper: "Litres added to reach the same tank mark. Decimals are fine (e.g. 8.45).",
    },
  ],
  validate: validateMileage,
  calculate: calculateMileage,
};

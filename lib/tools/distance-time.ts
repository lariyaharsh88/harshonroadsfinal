import {
  errorIfNegative,
  errorIfNotPositive,
  formatKm,
  formatNumber,
  mergeErrors,
} from "@/lib/tools/engine";
import type { CalculatorOutput, CalculatorSpec, FieldErrors } from "@/types/calculator";

export type DistanceTimeInput = {
  distanceKm: number;
  averageSpeedKmh: number;
  breakHours: number;
  breakMinutes: number;
};

function durationParts(totalHours: number): {
  hours: number;
  minutes: number;
  label: string;
} {
  const totalMinutes = Math.max(0, Math.round(totalHours * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const label =
    hours === 0
      ? `${minutes} min`
      : minutes === 0
        ? `${hours} h`
        : `${hours} h ${minutes} min`;
  return { hours, minutes, label };
}

export function validateDistanceTime(input: DistanceTimeInput): FieldErrors {
  const errors = mergeErrors({
    distanceKm: errorIfNotPositive(input.distanceKm, "Distance"),
    averageSpeedKmh: errorIfNotPositive(
      input.averageSpeedKmh,
      "Average speed",
    ),
    breakHours: errorIfNegative(input.breakHours, "Break hours"),
    breakMinutes: errorIfNegative(input.breakMinutes, "Break minutes"),
  });

  if (input.breakMinutes >= 60) {
    errors.breakMinutes = "Keep extra minutes under 60, or add them as hours.";
  }

  return errors;
}

export function calculateDistanceTime(
  input: DistanceTimeInput,
): CalculatorOutput {
  const drivingHours = input.distanceKm / input.averageSpeedKmh;
  const breakHours = input.breakHours + input.breakMinutes / 60;
  const totalHours = drivingHours + breakHours;
  const driving = durationParts(drivingHours);
  const journey = durationParts(totalHours);
  const breaks = durationParts(breakHours);

  return {
    headline: {
      key: "estimate",
      label: "Estimated travel time",
      value: journey.label,
      hint: "Not live Google Maps traffic. Average speed is the number you typed.",
      emphasize: true,
    },
    results: [
      {
        key: "estimate",
        label: "Estimated travel time",
        value: journey.label,
        hint: "Driving plus stops",
        emphasize: true,
      },
      {
        key: "driving",
        label: "Pure driving / riding time",
        value: driving.label,
        hint: `${driving.hours} h ${driving.minutes} min`,
      },
      {
        key: "breaks",
        label: "Stop / break time",
        value: breaks.label,
      },
    ],
    breakdown: [
      {
        label: "Distance",
        value: formatKm(input.distanceKm),
      },
      {
        label: "Average speed",
        value: `${formatNumber(input.averageSpeedKmh, 1)} km/h`,
      },
      {
        label: "Pure driving / riding time",
        value: driving.label,
        detail: "Distance ÷ average speed",
      },
      {
        label: "Stop / break time",
        value: breaks.label,
      },
      {
        label: "Estimated total journey time",
        value: journey.label,
        detail: "Driving time + breaks",
        emphasize: true,
      },
    ],
  };
}

export const spec: CalculatorSpec<DistanceTimeInput> = {
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
      helper: "Kilometres you expect to cover, not a live map route.",
    },
    {
      name: "averageSpeedKmh",
      label: "Average speed",
      type: "number",
      suffix: "km/h",
      required: true,
      min: 0,
      max: 160,
      step: 0.1,
      placeholder: "45",
      helper: "Overall average including towns, not peak highway speed.",
    },
    {
      name: "breakHours",
      label: "Stop / break hours",
      type: "number",
      suffix: "h",
      required: false,
      min: 0,
      max: 24,
      step: 1,
      defaultValue: "0",
      helper: "Optional. Tea, fuel, meals. Not traffic delay from an app.",
    },
    {
      name: "breakMinutes",
      label: "Stop / break minutes",
      type: "number",
      suffix: "min",
      required: false,
      min: 0,
      max: 59,
      step: 1,
      defaultValue: "0",
    },
  ],
  validate: validateDistanceTime,
  calculate: calculateDistanceTime,
};

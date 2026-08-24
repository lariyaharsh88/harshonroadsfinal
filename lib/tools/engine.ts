import type {
  CalculatorOutput,
  CalculatorSpec,
  FieldErrors,
  ToolField,
} from "@/types/calculator";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const compactNumber = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function roundTo(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function formatInr(value: number): string {
  return inr.format(value);
}

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(roundTo(value, digits));
}

export function formatLitres(value: number): string {
  return `${formatNumber(value, 2)} L`;
}

export function formatKm(value: number): string {
  return `${formatNumber(value, 1)} km`;
}

export function formatKmpl(value: number): string {
  return `${formatNumber(value, 2)} km/l`;
}

export function formatLitresPer100Km(value: number): string {
  return `${formatNumber(value, 2)} L/100 km`;
}

export function formatHours(value: number): string {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  if (hours <= 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${hours} h`;
  }
  return `${hours} h ${minutes} min`;
}

export function defaultFieldValues(fields: ToolField[]): Record<string, string> {
  return Object.fromEntries(
    fields.map((field) => [field.name, field.defaultValue ?? ""]),
  );
}

export function errorIfNotPositive(
  value: number,
  label: string,
): string | undefined {
  if (!Number.isFinite(value)) {
    return `Enter a valid ${label.toLowerCase()}.`;
  }
  if (value <= 0) {
    return `${label} must be greater than zero.`;
  }
  return undefined;
}

export function errorIfNegative(
  value: number,
  label: string,
): string | undefined {
  if (!Number.isFinite(value)) {
    return `Enter a valid ${label.toLowerCase()}.`;
  }
  if (value < 0) {
    return `${label} cannot be negative.`;
  }
  return undefined;
}

function isPendingNumber(raw: string): boolean {
  const trimmed = raw.trim();
  return (
    trimmed === "." ||
    trimmed === "-" ||
    trimmed === "-." ||
    trimmed === "0." ||
    /^-?\d+\.$/.test(trimmed)
  );
}

function parseNumberField(
  field: ToolField,
  raw: string,
): { value?: number; error?: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    if (field.required !== false) {
      return { error: `${field.label} is required.` };
    }
    return { value: 0 };
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return { error: `Enter a valid number for ${field.label.toLowerCase()}.` };
  }
  if (field.min !== undefined && value < field.min) {
    return { error: `${field.label} must be at least ${compactNumber.format(field.min)}.` };
  }
  if (field.max !== undefined && value > field.max) {
    return { error: `${field.label} must be at most ${compactNumber.format(field.max)}.` };
  }
  return { value };
}

export function parseInputs(
  fields: ToolField[],
  raw: Record<string, string>,
  options?: { skipEmptyRequired?: boolean },
): { input: Record<string, number | string>; errors: FieldErrors } {
  const input: Record<string, number | string> = {};
  const errors: FieldErrors = {};

  for (const field of fields) {
    const rawValue = raw[field.name] ?? "";
    const isEmpty = rawValue.trim() === "";

    if (field.type === "select") {
      if (isEmpty && field.required !== false) {
        if (!options?.skipEmptyRequired) {
          errors[field.name] = `Choose ${field.label.toLowerCase()}.`;
        }
        continue;
      }
      input[field.name] = rawValue;
      continue;
    }

    if (
      options?.skipEmptyRequired &&
      (isEmpty || isPendingNumber(rawValue)) &&
      field.required !== false
    ) {
      continue;
    }

    const parsed = parseNumberField(field, rawValue);
    if (parsed.error) {
      errors[field.name] = parsed.error;
      continue;
    }
    input[field.name] = parsed.value ?? 0;
  }

  return { input, errors };
}

export function compactErrors(errors: FieldErrors): FieldErrors {
  return Object.fromEntries(
    Object.entries(errors).filter((entry): entry is [string, string] =>
      Boolean(entry[1]),
    ),
  );
}

export function mergeErrors(...groups: FieldErrors[]): FieldErrors {
  return compactErrors(Object.assign({}, ...groups));
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(compactErrors(errors)).length > 0;
}

export function runCalculator<
  TInput extends Record<string, number | string>,
>(
  spec: CalculatorSpec<TInput>,
  raw: Record<string, string>,
  options?: { instant?: boolean },
): { errors: FieldErrors; result: CalculatorOutput | null } {
  const parsed = parseInputs(spec.fields, raw, {
    skipEmptyRequired: options?.instant,
  });
  if (hasErrors(parsed.errors)) {
    return { errors: parsed.errors, result: null };
  }

  const missingRequired = spec.fields.some((field) => {
    if (field.required === false) {
      return false;
    }
    const rawValue = raw[field.name] ?? "";
    return !rawValue.trim() || isPendingNumber(rawValue);
  });
  if (missingRequired) {
    return { errors: {}, result: null };
  }

  const input = parsed.input as TInput;
  const domainErrors = spec.validate(input);
  if (hasErrors(domainErrors)) {
    return { errors: domainErrors, result: null };
  }

  return { errors: {}, result: spec.calculate(input) };
}

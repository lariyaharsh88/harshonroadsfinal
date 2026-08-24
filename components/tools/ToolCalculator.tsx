"use client";

import { use, useMemo, useState, type FormEvent } from "react";
import { CalculationBreakdown } from "@/components/tools/CalculationBreakdown";
import { ToolForm } from "@/components/tools/ToolForm";
import { ToolInput } from "@/components/tools/ToolInput";
import { ToolResult } from "@/components/tools/ToolResult";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { Card } from "@/components/ui/Card";
import { defaultFieldValues, runCalculator } from "@/lib/tools/engine";
import { loadCalculatorSpec } from "@/lib/tools/load-calculator";
import type { FieldErrors, ToolField } from "@/types/calculator";

function fieldSections(fields: ToolField[]): string[] {
  const seen: string[] = [];
  for (const field of fields) {
    const name = field.section ?? "";
    if (!seen.includes(name)) {
      seen.push(name);
    }
  }
  return seen;
}

function FieldControl({
  field,
  value,
  error,
  onChange,
}: {
  field: ToolField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "select") {
    return (
      <ToolSelect
        name={field.name}
        label={field.label}
        value={value}
        options={field.options ?? []}
        helper={field.helper}
        error={error}
        onChange={onChange}
      />
    );
  }

  return (
    <ToolInput
      name={field.name}
      label={field.label}
      value={value}
      prefix={field.prefix}
      suffix={field.suffix}
      placeholder={field.placeholder}
      helper={field.helper}
      min={field.min}
      max={field.max}
      step={field.step}
      error={error}
      onChange={onChange}
    />
  );
}

export function ToolCalculator({ calculatorId }: { calculatorId: string }) {
  const spec = use(
    useMemo(() => loadCalculatorSpec(calculatorId), [calculatorId]),
  );
  const [values, setValues] = useState(() => defaultFieldValues(spec.fields));
  const outcome = runCalculator(spec, values, { instant: true });
  const errors: FieldErrors = outcome.errors;
  const sections = fieldSections(spec.fields);
  const grouped = sections.some(Boolean);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleReset() {
    setValues(defaultFieldValues(spec.fields));
  }

  function updateField(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <Card>
        <h2 className="mb-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Calculator
        </h2>
        <p className="mb-6 text-sm leading-6 text-muted">
          Results update as you type. Nothing is sent to a server.
        </p>
        <ToolForm onSubmit={handleSubmit} onReset={handleReset}>
          {grouped
            ? sections.map((section) => (
                <div key={section} className="sm:col-span-2 space-y-4">
                  {section ? (
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      {section}
                    </h3>
                  ) : null}
                  <div className="grid gap-5 sm:grid-cols-2">
                    {spec.fields
                      .filter((field) => (field.section ?? "") === section)
                      .map((field) => (
                        <FieldControl
                          key={field.name}
                          field={field}
                          value={values[field.name] ?? ""}
                          error={errors[field.name]}
                          onChange={(value) => updateField(field.name, value)}
                        />
                      ))}
                  </div>
                </div>
              ))
            : spec.fields.map((field) => (
                <FieldControl
                  key={field.name}
                  field={field}
                  value={values[field.name] ?? ""}
                  error={errors[field.name]}
                  onChange={(value) => updateField(field.name, value)}
                />
              ))}
        </ToolForm>
      </Card>
      <div className="space-y-6">
        {outcome.result ? (
          <>
            <ToolResult result={outcome.result} />
            {outcome.result.breakdown ? (
              <CalculationBreakdown items={outcome.result.breakdown} />
            ) : null}
          </>
        ) : (
          <Card className="h-full">
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Result
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Fill every required field with a number greater than zero.
              Results update as you type.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

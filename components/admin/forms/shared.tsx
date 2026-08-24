"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-blue/40 focus:ring-2 focus:ring-blue/10";

export function FormSection({
  title,
  description,
  children,
  defaultOpen = true,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <details open={defaultOpen} className="group">
        <summary className="cursor-pointer list-none px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-extrabold tracking-tight">
                {title}
              </h2>
              {description ? (
                <p className="mt-1 text-sm text-muted">{description}</p>
              ) : null}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted group-open:rotate-180">
              ▼
            </span>
          </div>
        </summary>
        <div className="space-y-4 border-t border-border px-5 py-5 sm:px-6">
          {children}
        </div>
      </details>
    </Card>
  );
}

export function AdminField({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-muted-strong">
        {label}
      </span>
      {hint ? <span className="mb-2 block text-xs text-muted">{hint}</span> : null}
      {children}
    </label>
  );
}

export function AdminInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={inputClass}
    />
  );
}

export function AdminTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, "min-h-[5rem] resize-y leading-6")}
    />
  );
}

export function AdminSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, "cursor-pointer")}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function ChipMultiSelect<T extends string>({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  selected: T[];
  onChange: (values: T[]) => void;
}) {
  function toggle(value: T) {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  }

  return (
    <AdminField label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.value)}
              className={cn(
                "min-h-9 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition",
                active
                  ? "border-blue bg-blue text-white"
                  : "border-border bg-white text-muted-strong hover:border-blue/25",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </AdminField>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
  placeholder = "Add item…",
  addLabel = "Add item",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  function updateItem(index: number, value: string) {
    onChange(items.map((item, i) => (i === index ? value : item)));
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <AdminField label={label}>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <input
              value={item}
              placeholder={placeholder}
              onChange={(event) => updateItem(index, event.target.value)}
              className={inputClass}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeItem(index)}
              className="shrink-0 px-3"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <Button type="button" variant="secondary" onClick={addItem} className="mt-3">
        {addLabel}
      </Button>
    </AdminField>
  );
}

export function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: { question: string; answer: string }[];
  onChange: (faqs: { question: string; answer: string }[]) => void;
}) {
  function updateFaq(
    index: number,
    field: "question" | "answer",
    value: string,
  ) {
    onChange(
      faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    );
  }

  function removeFaq(index: number) {
    onChange(faqs.filter((_, i) => i !== index));
  }

  function addFaq() {
    onChange([...faqs, { question: "", answer: "" }]);
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="space-y-3 rounded-xl border border-border bg-surface-raised/50 p-4"
        >
          <AdminField label={`Question ${index + 1}`}>
            <AdminInput
              value={faq.question}
              onChange={(value) => updateFaq(index, "question", value)}
              placeholder="FAQ question"
            />
          </AdminField>
          <AdminField label="Answer">
            <AdminTextarea
              value={faq.answer}
              onChange={(value) => updateFaq(index, "answer", value)}
              rows={3}
              placeholder="FAQ answer"
            />
          </AdminField>
          <Button type="button" variant="ghost" onClick={() => removeFaq(index)}>
            Remove FAQ
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={addFaq}>
        Add FAQ
      </Button>
    </div>
  );
}

export function PairListEditor({
  label,
  items,
  onChange,
  keyLabel,
  valueLabel,
}: {
  label: string;
  items: { category: string; estimate: string }[];
  onChange: (items: { category: string; estimate: string }[]) => void;
  keyLabel: string;
  valueLabel: string;
}) {
  function updateItem(
    index: number,
    field: "category" | "estimate",
    value: string,
  ) {
    onChange(
      items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <AdminField label={label}>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="grid gap-2 sm:grid-cols-2">
            <AdminInput
              value={item.category}
              onChange={(value) => updateItem(index, "category", value)}
              placeholder={keyLabel}
            />
            <div className="flex gap-2">
              <AdminInput
                value={item.estimate}
                onChange={(value) => updateItem(index, "estimate", value)}
                placeholder={valueLabel}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="shrink-0 px-3"
              >
                ×
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="secondary"
        onClick={() => onChange([...items, { category: "", estimate: "" }])}
        className="mt-3"
      >
        Add row
      </Button>
    </AdminField>
  );
}

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

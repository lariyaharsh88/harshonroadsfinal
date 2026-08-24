"use client";

import type { ReactNode } from "react";
import { FieldSelect, FieldTextarea } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = ["Free", "No login", "One screen"] as const;

export function AiTrustBar() {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tool benefits">
      {TRUST_ITEMS.map((item) => (
        <li key={item} className="ai-trust-pill">
          <span className="ai-trust-pill-dot" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

type AiToolShellProps = {
  title: string;
  hint?: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  showTrust?: boolean;
};

export function AiToolShell({
  title,
  hint,
  eyebrow = "Plan",
  children,
  footer,
  showTrust = true,
}: AiToolShellProps) {
  return (
    <div className="relative z-[1] p-5 sm:p-6">
      <div className="relative">
        <p className="ai-type-eyebrow text-muted-strong">{eyebrow} · HarshOnRoads</p>
        <h2 className="ai-type-display mt-2 text-balance">{title}</h2>
        {hint ? (
          <p className="mt-2 max-w-[44ch] text-sm leading-6 text-muted">{hint}</p>
        ) : null}
        {showTrust ? <AiTrustBar /> : null}
        <div className="mt-5 space-y-1">{children}</div>
        {footer}
      </div>
    </div>
  );
}

type AiPromptInputProps = {
  name: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hint?: string;
  rows?: number;
  maxLength?: number;
};

export function AiPromptInput({
  name,
  label = "Describe your trip",
  value,
  onChange,
  placeholder,
  hint,
  rows = 3,
  maxLength = 1500,
}: AiPromptInputProps) {
  return (
    <div className="ai-field-panel">
      <FieldTextarea
        name={name}
        label={label}
        hint={hint}
        value={value}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
}

type AiFieldRowProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  compact?: boolean;
};

export function AiFieldRow({ label, hint, children, compact = false }: AiFieldRowProps) {
  return (
    <div className={cn("ai-field-panel", compact && "!py-2")}>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-strong">
        {label}
      </p>
      {hint ? (
        <p className="mt-0.5 text-[11px] leading-5 text-muted">{hint}</p>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

type AiChipProps = {
  selected: boolean;
  onClick: () => void;
  children: string;
  multi?: boolean;
};

export function AiChip({ selected, onClick, children, multi = false }: AiChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-9 rounded-full border px-3 py-1.5 text-sm font-semibold transition duration-200",
        selected
          ? "ai-chip-selected"
          : "border-border bg-white text-muted-strong hover:border-blue/20 hover:text-foreground",
      )}
    >
      {multi ? (
        <span className="mr-1 opacity-70" aria-hidden="true">
          {selected ? "✓" : "+"}
        </span>
      ) : null}
      {children}
    </button>
  );
}

type AiStyleChipProps = {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
};

export function AiStyleChip({ selected, onClick, label, hint }: AiStyleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition duration-200",
        selected
          ? "ai-chip-selected rounded-xl"
          : "border-border bg-white text-muted-strong hover:border-blue/20",
      )}
    >
      <span className="block capitalize">{label}</span>
      {hint ? (
        <span
          className={cn(
            "mt-0.5 block text-[11px] font-normal",
            selected ? "text-white/75" : "text-muted",
          )}
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

type AiGenerateButtonProps = {
  pending?: boolean;
  disabled: boolean;
  onClick?: () => void;
  label: string;
  pendingLabel: string;
  type?: "button" | "submit";
};

export function AiGenerateButton({
  pending = false,
  disabled,
  onClick,
  label,
  pendingLabel,
  type = "button",
}: AiGenerateButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
      className="ai-generate-btn group/btn relative mt-5 flex min-h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="relative z-[1] flex items-center gap-2">
        {pending ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
            {pendingLabel}
          </>
        ) : (
          <>
            {label}
            <span aria-hidden="true">→</span>
          </>
        )}
      </span>
    </button>
  );
}

export function AiError({ message }: { message: string }) {
  return (
    <p
      className="mt-4 rounded-xl border border-red-200/90 bg-red-50/95 px-3 py-2.5 text-sm text-red-800"
      role="alert"
    >
      {message}
    </p>
  );
}

export function AiDisclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="no-print rounded-xl border border-border bg-surface-raised/60 px-4 py-3 text-sm leading-6 text-muted-strong">
      {children}
    </div>
  );
}

export function AiResultActions({
  pending,
  onEdit,
  onRegenerate,
  onReset,
  regenerateLabel,
  pendingLabel,
  share,
  print,
}: {
  pending: boolean;
  onEdit: () => void;
  onRegenerate: () => void;
  onReset: () => void;
  regenerateLabel: string;
  pendingLabel: string;
  share?: ReactNode;
  print?: boolean;
}) {
  return (
    <div className="no-print flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex min-h-9 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-semibold"
      >
        Edit brief
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={onRegenerate}
        className="ai-generate-btn inline-flex min-h-9 items-center justify-center rounded-full px-4 text-sm font-bold disabled:opacity-40"
      >
        {pending ? pendingLabel : regenerateLabel}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-9 items-center justify-center rounded-full border border-border px-4 text-sm font-semibold"
      >
        Start over
      </button>
      {print ? (
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-9 items-center justify-center rounded-full border border-border px-4 text-sm font-semibold"
        >
          Print
        </button>
      ) : null}
      {share}
    </div>
  );
}

export function AiInlineInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  min,
  max,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("ai-field-panel", className)}>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-strong">
          {label}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          min={min}
          max={max}
          onChange={(event) => onChange(event.target.value)}
          className="field-control mt-2 max-w-xs px-3 py-2 text-sm"
        />
      </label>
    </div>
  );
}

export function AiSelect({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="ai-field-panel">
      <FieldSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        className="max-w-md"
      />
    </div>
  );
}

export function AiDaysStepper({
  days,
  onChange,
  min = 1,
  max = 4,
}: {
  days: number;
  onChange: (days: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="ai-field-panel">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-strong">
        Trip length
      </p>
      <div
        className="mt-2 flex max-w-xs items-center justify-between gap-2 rounded-xl border border-border bg-white px-1.5 py-1.5"
        role="group"
        aria-label="Adjust number of trip days"
      >
        <button
          type="button"
          aria-label="Decrease days"
          disabled={days <= min}
          onClick={() => onChange(Math.max(min, days - 1))}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised text-base font-semibold disabled:opacity-40"
        >
          −
        </button>
        <div className="flex min-w-0 flex-1 flex-col items-center">
          <span className="font-display text-2xl font-extrabold tabular-nums leading-none text-foreground">
            {days}
          </span>
          <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
            days
          </span>
        </div>
        <button
          type="button"
          aria-label="Increase days"
          disabled={days >= max}
          onClick={() => onChange(Math.min(max, days + 1))}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised text-base font-semibold disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

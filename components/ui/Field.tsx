import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

type FieldLabelProps = {
  htmlFor?: string;
  children: ReactNode;
  hint?: string;
  className?: string;
};

export function FieldLabel({ htmlFor, children, hint, className }: FieldLabelProps) {
  return (
    <span className={cn("mb-1.5 block", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold uppercase tracking-[0.14em] text-muted-strong"
      >
        {children}
      </label>
      {hint ? (
        <span className="mt-0.5 block text-xs font-normal normal-case tracking-normal text-muted">
          {hint}
        </span>
      ) : null}
    </span>
  );
}

type SearchFieldProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  className?: string;
};

export function SearchField({
  id = "search",
  label = "Search",
  value,
  onChange,
  placeholder = "Search…",
  hint,
  className,
}: SearchFieldProps) {
  return (
    <div className={cn("w-full", className)}>
      <FieldLabel htmlFor={id} hint={hint}>
        {label}
      </FieldLabel>
      <div className="field-control field-control-search">
        <SearchIcon className="field-search-icon size-[1.125rem] text-muted" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="field-input field-input-search"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="field-clear-btn"
            aria-label="Clear search"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}

type FieldInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  onChange: (value: string) => void;
  wrapperClassName?: string;
};

export function FieldInput({
  label,
  hint,
  error,
  prefix,
  suffix,
  onChange,
  className,
  wrapperClassName,
  id,
  name,
  ...props
}: FieldInputProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("w-full", wrapperClassName)}>
      <FieldLabel htmlFor={fieldId} hint={hint}>
        {label}
      </FieldLabel>
      <div
        className={cn(
          "field-control",
          prefix || suffix ? "field-control-affix" : "",
          error ? "field-control-error" : "",
        )}
      >
        {prefix ? <span className="field-affix">{prefix}</span> : null}
        <input
          id={fieldId}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className={cn("field-input", className)}
          {...props}
        />
        {suffix ? <span className="field-affix field-affix-end">{suffix}</span> : null}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-orange" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FieldTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  label: string;
  hint?: string;
  onChange: (value: string) => void;
};

export function FieldTextarea({
  label,
  hint,
  onChange,
  className,
  id,
  name,
  rows = 3,
  ...props
}: FieldTextareaProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <FieldLabel htmlFor={fieldId} hint={hint}>
        {label}
      </FieldLabel>
      <textarea
        id={fieldId}
        name={name}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className={cn("field-control field-textarea", className)}
        {...props}
      />
    </div>
  );
}

type FieldSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> & {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function FieldSelect({
  label,
  hint,
  options,
  onChange,
  className,
  id,
  name,
  value,
  ...props
}: FieldSelectProps) {
  const fieldId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <FieldLabel htmlFor={fieldId} hint={hint}>
        {label}
      </FieldLabel>
      <select
        id={fieldId}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn("field-control field-select", className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FilterChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-9 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition duration-200",
        selected
          ? "filter-chip-selected"
          : "border-border bg-white text-muted-strong hover:border-blue/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

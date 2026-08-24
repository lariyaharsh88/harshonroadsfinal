import { cn } from "@/lib/utils";

type ToolInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  helper?: string;
  min?: number;
  max?: number;
  step?: number;
};

export function ToolInput({
  name,
  label,
  value,
  onChange,
  error,
  prefix,
  suffix,
  placeholder,
  helper,
  min,
  max,
  step,
}: ToolInputProps) {
  const describedBy = [
    helper ? `${name}-helper` : null,
    error ? `${name}-error` : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <label className="block">
      <span className="mb-2.5 block text-sm font-bold text-foreground">
        {label}
      </span>
      <span
        className={cn(
          "flex min-h-[3.25rem] items-center rounded-2xl border bg-surface px-4 shadow-sm transition focus-within:border-foreground/30",
          error ? "border-orange" : "border-border",
        )}
      >
        {prefix ? (
          <span className="mr-2 text-sm font-semibold text-muted">{prefix}</span>
        ) : null}
        <input
          id={name}
          name={name}
          type="text"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-foreground outline-none placeholder:text-muted/70"
        />
        {suffix ? (
          <span className="ml-2 shrink-0 text-sm font-semibold text-muted">
            {suffix}
          </span>
        ) : null}
      </span>
      {helper ? (
        <span id={`${name}-helper`} className="mt-2 block text-xs leading-5 text-muted">
          {helper}
        </span>
      ) : null}
      {error ? (
        <span id={`${name}-error`} className="mt-2 block text-xs font-semibold text-orange">
          {error}
        </span>
      ) : null}
    </label>
  );
}

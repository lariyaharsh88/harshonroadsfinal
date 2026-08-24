import { cn } from "@/lib/utils";
import type { ToolFieldOption } from "@/types/calculator";

type ToolSelectProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ToolFieldOption[];
  error?: string;
  helper?: string;
};

export function ToolSelect({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helper,
}: ToolSelectProps) {
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
      <select
        id={name}
        name={name}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "min-h-[3.25rem] w-full rounded-2xl border bg-surface px-4 text-base text-foreground shadow-sm",
          error ? "border-orange" : "border-border",
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

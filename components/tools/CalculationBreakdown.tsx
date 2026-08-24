import { cn } from "@/lib/utils";
import type { BreakdownItem } from "@/types/calculator";

export function CalculationBreakdown({
  items,
}: {
  items: BreakdownItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Breakdown
      </h2>
      <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between",
              item.emphasize && "bg-accent-soft",
            )}
          >
            <dt
              className={
                item.emphasize
                  ? "text-sm font-semibold text-foreground"
                  : "text-sm text-muted"
              }
            >
              {item.label}
              {item.detail ? (
                <span className="mt-1 block text-xs text-muted/80">
                  {item.detail}
                </span>
              ) : null}
            </dt>
            <dd className="text-sm font-semibold text-foreground">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

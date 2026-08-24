import { cn } from "@/lib/utils";
import type { ResultItem } from "@/types/calculator";

export function ResultCard({ item }: { item: ResultItem }) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-border bg-surface p-6 shadow-sm",
        item.emphasize && "border-accent/50 bg-accent-soft/60",
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
        {item.label}
      </p>
      <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground">
        {item.value}
      </p>
      {item.hint ? (
        <p className="mt-2 text-sm leading-6 text-muted">{item.hint}</p>
      ) : null}
    </div>
  );
}

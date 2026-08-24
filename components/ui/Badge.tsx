import { cn } from "@/lib/utils";

type BadgeProps = {
  children: string;
  tone?: "accent" | "muted" | "blue";
};

export function Badge({ children, tone = "accent" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
        tone === "accent" && "bg-accent-soft text-accent-ink",
        tone === "muted" && "border border-border bg-surface-raised text-muted",
        tone === "blue" && "bg-blue-soft text-blue",
      )}
    >
      {children}
    </span>
  );
}

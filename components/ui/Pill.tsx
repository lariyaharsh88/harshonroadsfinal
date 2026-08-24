import { cn } from "@/lib/utils";

type PillProps = {
  children: string;
  selected?: boolean;
  className?: string;
};

export function Pill({ children, selected = false, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold",
        selected
          ? "border-foreground bg-foreground text-white"
          : "border-border bg-surface text-muted-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}

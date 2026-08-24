import { cn } from "@/lib/utils";

type ChoiceButtonProps = {
  selected: boolean;
  onClick: () => void;
  children: string;
  multi?: boolean;
};

export function ChoiceButton({
  selected,
  onClick,
  children,
  multi = false,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-[3.25rem] rounded-2xl border px-4 py-3 text-left text-sm font-semibold tracking-tight transition duration-200",
        selected
          ? "border-foreground bg-foreground text-white shadow-sm"
          : "border-border bg-surface text-muted-strong hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm",
      )}
    >
      {multi ? (
        <span className="mr-2" aria-hidden="true">
          {selected ? "☑" : "☐"}
        </span>
      ) : null}
      {children}
    </button>
  );
}

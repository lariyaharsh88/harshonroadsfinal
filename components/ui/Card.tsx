import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-border bg-surface p-6 shadow-[var(--shadow)]",
        interactive && "glow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-border bg-surface p-6 shadow-[0_10px_30px_rgba(17,19,24,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

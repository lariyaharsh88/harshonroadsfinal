import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "lime";
};

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-foreground text-white hover:-translate-y-0.5 hover:bg-foreground/90 btn-cyan",
    lime: "bg-lime text-white hover:-translate-y-0.5 hover:bg-lime-hover btn-glow",
    secondary:
      "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-blue/30 hover:bg-blue-soft/40",
    ghost: "text-muted-strong hover:text-foreground",
  } as const;

  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-bold tracking-tight transition duration-200 disabled:translate-y-0 disabled:opacity-40",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

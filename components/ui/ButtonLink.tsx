import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "lime";
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-foreground text-white hover:-translate-y-0.5 hover:bg-foreground/90 btn-cyan",
    lime: "bg-lime text-white hover:-translate-y-0.5 hover:bg-lime-hover btn-glow",
    secondary:
      "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-blue/30 hover:bg-blue-soft/40 hover:shadow-[0_8px_24px_rgba(37,99,235,0.1)]",
    ghost: "text-muted-strong hover:text-foreground",
  } as const;

  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-bold tracking-tight transition duration-200",
    styles[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

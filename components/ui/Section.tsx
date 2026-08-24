import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Section({
  children,
  className,
  id,
  eyebrow,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      {(eyebrow || title || description) && (
        <header className="mb-10 max-w-2xl">
          {eyebrow ? (
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-3 text-base leading-7 text-muted">{description}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}

"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="max-w-2xl py-24">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
        Error
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        The page failed to load. Try again, or head back to planning your
        weekend.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => reset()} className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-bold text-accent-ink transition hover:-translate-y-0.5 hover:bg-accent-hover">
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Home
        </ButtonLink>
        <Link
          href="/tools/weekend-trip-finder"
          className="inline-flex min-h-11 items-center text-sm font-bold text-foreground"
        >
          Find My Weekend →
        </Link>
      </div>
    </Container>
  );
}

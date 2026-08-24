import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist on HarshOnRoads.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <Container className="max-w-2xl py-24">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">
        This page is not on the map
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        That URL does not exist. Head home, browse weekend trips, or open the
        tools list.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/weekend-trips" variant="secondary">
          Weekend trips
        </ButtonLink>
        <Link
          href="/tools"
          className="inline-flex min-h-11 items-center text-sm font-bold text-foreground"
        >
          Tools →
        </Link>
      </div>
    </Container>
  );
}

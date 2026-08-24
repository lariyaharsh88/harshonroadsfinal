import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 text-foreground"
      aria-label="HarshOnRoads home"
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-accent"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" role="img">
          <path d="M4 16.5c4.2-1.4 7.4-4.2 10.2-8.1.4-.6 1.3-.3 1.2.4-.4 2.4.2 4.3 2.2 6.2.3.3.1.8-.3.9-3.3.8-6.2.3-9.3-1.1-1.4 1.7-3 3-5.2 3.8-.5.2-.9-.4-.8-.9.4-1.2.9-2.2 2-3.2Z" />
        </svg>
      </span>
      <span className="leading-[1.05]">
        <span className="block font-display text-[15px] font-extrabold tracking-[-0.04em] sm:text-base">
          HARSH
          <span className="text-muted-strong">ON</span>
          ROADS
        </span>
        {compact ? null : (
          <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Weekend Escapes
          </span>
        )}
      </span>
    </Link>
  );
}

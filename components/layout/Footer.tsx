import { Logo } from "@/components/navigation/Logo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { footerColumns } from "@/lib/navigation";
import { siteConfig } from "@/lib/seo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-14">
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#0b1220_0%,#1e3a5f_45%,#0f766e_100%)] px-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.2),transparent_50%)]" />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              Where next?
            </p>
            <p className="mt-3 max-w-md font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Where are you going next?
            </p>
          </div>
          <ButtonLink href="/tools/weekend-trip-finder" variant="lime" className="relative">
            Find My Weekend →
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              {siteConfig.tagline}
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-sm font-bold text-foreground">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    {item.external ? (
                      <a
                        href={item.href}
                        className="text-sm text-muted hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition-colors hover:text-blue"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteConfig.name}
            <span className="mx-2">·</span>
            {siteConfig.tagline}
          </p>
          <p>© {new Date().getFullYear()} Delhi NCR weekends.</p>
        </Container>
      </div>
    </footer>
  );
}

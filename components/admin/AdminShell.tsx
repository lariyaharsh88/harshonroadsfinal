import Link from "next/link";
import type { ReactNode } from "react";
import { adminLogoutAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/itineraries", label: "Itineraries" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
              HarshOnRoads CMS
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold tracking-tight">
              Content admin
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-muted-strong hover:text-foreground">
              View site
            </Link>
            <form action={adminLogoutAction}>
              <Button type="submit" variant="secondary">
                Log out
              </Button>
            </form>
          </div>
        </Container>
      </header>

      <Container className="grid gap-8 py-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label="Admin" className="h-fit rounded-[1.25rem] border border-border bg-surface p-3 shadow-sm">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold text-muted-strong hover:bg-surface-raised hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main>{children}</main>
      </Container>
    </div>
  );
}

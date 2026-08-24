"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {headerNav.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-semibold tracking-tight transition-colors",
              active
                ? "bg-surface-raised text-foreground"
                : "text-muted hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

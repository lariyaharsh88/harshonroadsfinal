"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { headerNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-surface px-3 text-sm font-bold"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-foreground/25"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}
      <div
        id={menuId}
        hidden={!open}
        className={cn(
          "fixed inset-x-3 bottom-3 z-50 rounded-[1.5rem] border border-border bg-surface p-5 shadow-[0_16px_50px_rgba(17,19,24,0.18)]",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl bg-surface-raised px-4 py-3 text-base font-semibold"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tools/weekend-trip-finder"
            className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-4 text-sm font-bold text-white"
            onClick={() => setOpen(false)}
          >
            Find My Weekend
          </Link>
        </nav>
      </div>
    </div>
  );
}

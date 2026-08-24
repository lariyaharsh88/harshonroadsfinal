"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";

const vibes = [
  "Mountains",
  "Nature",
  "Adventure",
  "Peaceful",
  "Romantic",
  "Friends",
  "Solo",
  "Road Trip",
] as const;

export function WeekendVibePicker() {
  const [selected, setSelected] = useState<(typeof vibes)[number]>("Mountains");

  return (
    <div className="ai-panel rounded-[1.75rem] border border-border p-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
        Got 48 hours?
      </p>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Got a weekend free?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        Tell us your vibe. We&apos;ll help you find the escape.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {vibes.map((vibe) => (
          <button
            key={vibe}
            type="button"
            onClick={() => setSelected(vibe)}
            className={cn(
              "min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition duration-200",
              selected === vibe
                ? "border-blue bg-blue text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                : "border-border bg-white text-muted-strong hover:border-blue/25 hover:text-foreground",
            )}
          >
            {vibe}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/tools/weekend-trip-finder" variant="lime">
          Find My Escape →
        </ButtonLink>
      </div>
    </div>
  );
}

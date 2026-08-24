type DestinationHeroProps = {
  name: string;
  regionLabel: string;
  accent: "hills" | "desert" | "plains" | "forest";
};

const palettes: Record<
  DestinationHeroProps["accent"],
  { sky: string; mid: string; ground: string; label: string }
> = {
  hills: {
    sky: "#dce8f0",
    mid: "#9eb8a8",
    ground: "#6d8f82",
    label: "Hill illustration placeholder",
  },
  desert: {
    sky: "#f5e8d8",
    mid: "#e8b888",
    ground: "#c48858",
    label: "Desert illustration placeholder",
  },
  plains: {
    sky: "#e4ece8",
    mid: "#98b0a0",
    ground: "#6a8578",
    label: "Plains illustration placeholder",
  },
  forest: {
    sky: "#d8e8dc",
    mid: "#6a9078",
    ground: "#3f5c48",
    label: "Forest illustration placeholder",
  },
};

export function destinationHeroAccent(
  region: string,
  styles: string[],
): DestinationHeroProps["accent"] {
  if (styles.includes("wildlife")) {
    return "forest";
  }
  if (region === "rajasthan") {
    return "desert";
  }
  if (region === "uttar-pradesh") {
    return "plains";
  }
  return "hills";
}

export function DestinationHero({
  name,
  regionLabel,
  accent,
}: DestinationHeroProps) {
  const palette = palettes[accent];
  const alt = `${name}, ${regionLabel} — ${palette.label}. Original photography will replace this when a HarshOnRoads image is ready.`;

  return (
    <figure className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow)]">
      <div
        role="img"
        aria-label={alt}
        className="relative isolate min-h-[240px] sm:min-h-[320px]"
        style={{
          background: `linear-gradient(180deg, ${palette.sky} 0%, ${palette.mid} 48%, ${palette.ground} 100%)`,
        }}
      >
        <svg
          viewBox="0 0 800 360"
          className="absolute inset-0 h-full w-full opacity-80"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 210 L120 140 L200 180 L320 90 L420 160 L540 70 L640 150 L800 100 V360 H0 Z"
            fill={palette.mid}
            opacity="0.85"
          />
          <path
            d="M0 260 L180 200 L360 240 L520 170 L800 210 V360 H0 Z"
            fill={palette.ground}
          />
        </svg>
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent px-5 py-5 sm:py-6">
          <p className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {name}
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            {regionLabel} · image placeholder
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

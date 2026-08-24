import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type GraphicProps = {
  className?: string;
  style?: CSSProperties;
};

export function SpraySplatter({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <circle cx="40" cy="45" r="18" fill="currentColor" opacity="0.35" />
      <circle cx="68" cy="38" r="10" fill="currentColor" opacity="0.28" />
      <circle cx="82" cy="62" r="14" fill="currentColor" opacity="0.22" />
      <circle cx="28" cy="72" r="8" fill="currentColor" opacity="0.3" />
      <circle cx="55" cy="78" r="6" fill="currentColor" opacity="0.25" />
      <path
        d="M35 90 Q42 98 50 88 Q58 78 48 72"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function DoodleCompass({ className, style }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="32" r="24" opacity="0.9" />
      <path d="M32 12v8M32 44v8M12 32h8M44 32h8" opacity="0.6" />
      <path d="M32 18 L38 38 L32 32 L26 38 Z" fill="currentColor" stroke="none" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DoodlePlane({ className, style }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 80 48"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M4 24 L28 20 L36 8 L42 20 L76 24 L42 28 L36 40 L28 28 Z" opacity="0.9" />
      <path d="M36 20 L52 24 L36 28 Z" opacity="0.5" />
    </svg>
  );
}

export function DoodleMountains({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 120 64"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M0 64 L30 22 L52 44 L78 12 L120 64 Z" opacity="0.85" />
      <path d="M0 64 L20 48 L38 64 Z" opacity="0.5" />
      <circle cx="92" cy="16" r="8" fill="#fbbf24" opacity="0.9" />
    </svg>
  );
}

export function DoodleRoad({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M0 28 C40 20 80 36 120 24 C160 12 180 20 200 16"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        className="travel-road-dash"
        d="M0 28 C40 20 80 36 120 24 C160 12 180 20 200 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodlePin({ className, style }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 48 64"
      className={cn("pointer-events-none select-none", className)}
      style={style}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M24 4 C14 4 8 14 8 24 C8 38 24 58 24 58 C24 58 40 38 40 24 C40 14 34 4 24 4 Z" />
      <circle cx="24" cy="24" r="8" fill="white" opacity="0.85" />
    </svg>
  );
}

export function DoodleBackpack({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 56 64"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 22 C16 12 40 12 40 22 V48 C40 54 16 54 16 48 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M16 22 C16 12 40 12 40 22 V48 C40 54 16 54 16 48 Z" />
      <path d="M22 12 V8 C22 4 34 4 34 8 V12" />
      <rect x="24" y="30" width="8" height="10" rx="2" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  );
}

type GraffitiStickerProps = {
  children: string;
  className?: string;
  tone?: "lime" | "cyan" | "white" | "dark";
  rotate?: number;
};

const stickerTones = {
  lime: "border-accent/40 bg-accent/90 text-white shadow-[2px_2px_0_rgba(15,23,42,0.15)]",
  cyan: "border-blue/30 bg-blue/85 text-white shadow-[2px_2px_0_rgba(15,23,42,0.12)]",
  white: "border-white/40 bg-white/90 text-foreground shadow-[2px_2px_0_rgba(15,23,42,0.12)]",
  dark: "border-white/15 bg-foreground/90 text-white shadow-[2px_2px_0_rgba(29,78,216,0.2)]",
};

export function GraffitiSticker({
  children,
  className,
  tone = "lime",
  rotate = -3,
}: GraffitiStickerProps) {
  return (
    <span
      className={cn(
        "graffiti-sticker graffiti-pop inline-block rounded-md border-2 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]",
        stickerTones[tone],
        className,
      )}
      style={{ ["--graffiti-rotate" as string]: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}

export function TravelRoadDivider({ className }: GraphicProps) {
  return (
    <div className={cn("travel-road-divider relative py-2", className)} aria-hidden="true">
      <DoodleRoad className="mx-auto h-8 w-full max-w-xl text-blue" />
    </div>
  );
}

export function GraffitiScribble({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 160 48"
      className={cn("pointer-events-none select-none text-accent", className)}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path
        className="graffiti-scribble-path"
        d="M8 32 Q40 8 72 28 T136 20"
        opacity="0.85"
      />
      <path d="M142 18 L152 14 L148 24 Z" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}

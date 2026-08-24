import type { ReactNode } from "react";
import {
  DoodleBackpack,
  DoodleCompass,
  DoodleMountains,
  DoodlePin,
  DoodlePlane,
  GraffitiSticker,
  SpraySplatter,
  TravelRoadDivider,
} from "@/components/graphics/TravelGraphics";
import { cn } from "@/lib/utils";

export { TravelRoadDivider };

export type TravelDecorVariant = "hero" | "section" | "form" | "header" | "minimal";

type TravelDecorProps = {
  variant?: TravelDecorVariant;
  className?: string;
};

export function TravelDecor({ variant = "section", className }: TravelDecorProps) {
  if (variant === "minimal") {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className,
      )}
      aria-hidden="true"
    >
      {variant === "hero" ? (
        <>
          <GraffitiSticker
            tone="lime"
            rotate={-6}
            className="graffiti-pop absolute top-8 right-6 hidden sm:inline-flex sm:top-12 sm:right-10"
          >
            Let&apos;s go!
          </GraffitiSticker>
          <GraffitiSticker
            tone="cyan"
            rotate={4}
            className="graffiti-pop graffiti-pop-delay absolute top-24 right-24 hidden lg:inline-flex"
          >
            Weekend
          </GraffitiSticker>
          <DoodlePlane className="travel-plane-drift absolute -top-2 left-[8%] h-8 w-14 text-accent opacity-70" />
          <SpraySplatter className="travel-drift-slow absolute -bottom-4 -left-6 h-24 w-24 text-teal opacity-40" />
          <DoodleMountains className="travel-drift-reverse absolute bottom-4 right-[5%] h-12 w-24 text-blue/30" />
        </>
      ) : null}

      {variant === "header" ? (
        <>
          <DoodleCompass className="travel-wiggle absolute top-6 right-[6%] hidden h-14 w-14 text-blue/20 sm:block" />
          <GraffitiSticker
            tone="cyan"
            rotate={-4}
            className="graffiti-pop absolute bottom-6 right-[12%] hidden md:inline-flex"
          >
            On the road
          </GraffitiSticker>
          <SpraySplatter className="absolute -top-8 left-[4%] h-20 w-20 text-accent/25" />
          <DoodlePin className="travel-float absolute bottom-8 left-[8%] hidden h-10 w-8 text-teal/35 lg:block" />
        </>
      ) : null}

      {variant === "section" ? (
        <>
          <DoodleBackpack className="travel-float absolute -top-2 right-[4%] hidden h-14 w-12 text-blue/25 lg:block" />
          <SpraySplatter className="travel-drift-slow absolute bottom-0 left-[2%] h-16 w-16 text-teal/30" />
          <GraffitiSticker
            tone="white"
            rotate={3}
            className="graffiti-pop absolute top-4 right-[10%] hidden sm:inline-flex"
          >
            Explore
          </GraffitiSticker>
        </>
      ) : null}

      {variant === "form" ? (
        <>
          <DoodleCompass className="travel-wiggle absolute -top-4 -right-2 hidden h-12 w-12 text-blue/15 sm:block" />
          <GraffitiSticker
            tone="lime"
            rotate={-5}
            className="graffiti-pop absolute -bottom-1 -left-1 hidden sm:inline-flex"
          >
            Go!
          </GraffitiSticker>
          <SpraySplatter className="absolute -bottom-6 -right-4 h-14 w-14 text-accent/20" />
        </>
      ) : null}
    </div>
  );
}

export function TravelVibesWrap({
  children,
  variant = "section",
  className,
}: {
  children: ReactNode;
  variant?: TravelDecorVariant;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <TravelDecor variant={variant} />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

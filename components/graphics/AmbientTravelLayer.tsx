import {
  DoodleCompass,
  DoodlePlane,
  DoodlePin,
} from "@/components/graphics/TravelGraphics";

const floatingItems = [
  { Icon: DoodlePlane, className: "travel-ambient-plane top-[12%] left-[6%] h-7 w-12 text-blue/25", delay: "0s" },
  { Icon: DoodleCompass, className: "travel-ambient-drift top-[28%] right-[8%] h-10 w-10 text-teal/20", delay: "-4s" },
  { Icon: DoodlePin, className: "travel-ambient-drift top-[55%] left-[12%] h-9 w-7 text-accent/22", delay: "-8s" },
  { Icon: DoodlePlane, className: "travel-ambient-plane-reverse top-[72%] right-[15%] h-6 w-10 text-blue/18", delay: "-2s" },
  { Icon: DoodleCompass, className: "travel-ambient-drift top-[85%] left-[45%] h-8 w-8 text-teal/15", delay: "-12s" },
] as const;

export function AmbientTravelLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {floatingItems.map(({ Icon, className, delay }, index) => (
        <Icon
          key={index}
          className={`absolute ${className}`}
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
}

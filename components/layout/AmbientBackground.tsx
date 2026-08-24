import { AmbientTravelLayer } from "@/components/graphics/AmbientTravelLayer";

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient-bg">
      <AmbientTravelLayer />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
    </div>
  );
}

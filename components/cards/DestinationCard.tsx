import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  destinationBudgetLabels,
  destinationDurationLabels,
} from "@/lib/data/destinations/labels";
import type { DestinationCardData } from "@/lib/data/destinations/catalog";

export function DestinationCard({
  destination,
}: {
  destination: DestinationCardData;
}) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block h-full">
      <Card interactive className="lift h-full overflow-hidden p-0">
        <div className="hero-panel relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-foreground/10 transition duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.45),transparent)]" />
          <p className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {destination.name}
          </p>
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl font-extrabold tracking-tight transition-colors group-hover:text-blue">
            {destination.name}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
            {destination.shortDescription}
          </p>
          <p className="mt-4 text-xs font-semibold text-muted-strong">
            {destinationDurationLabels[destination.tripDuration]} ·{" "}
            {destinationBudgetLabels[destination.budgetCategory]}
          </p>
          <p className="mt-4 text-sm font-bold text-blue">
            Explore
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
              {" "}
              →
            </span>
          </p>
        </div>
      </Card>
    </Link>
  );
}

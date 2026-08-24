import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { itineraryAiPlannerHref } from "@/lib/data/itineraries/related-tools";

export function AIPlannerCTA() {
  return (
    <Card className="border-accent/30 bg-accent-soft/40">
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Want a trip built around you?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Get a personalized itinerary based on your budget, travel style, group
        and interests.
      </p>
      <div className="mt-6">
        <ButtonLink href={itineraryAiPlannerHref}>
          Create My AI Itinerary
        </ButtonLink>
      </div>
    </Card>
  );
}

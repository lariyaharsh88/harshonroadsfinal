import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { itineraryPeriodLabels } from "@/lib/data/itineraries/labels";
import type { ItineraryBlock, ItineraryRecord } from "@/lib/data/itineraries/types";

function PeriodCard({ block }: { block: ItineraryBlock }) {
  return (
    <Card className="bg-surface-raised/50 shadow-none">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
        {itineraryPeriodLabels[block.period]}
      </p>
      <h4 className="mt-2 text-base font-bold text-foreground">{block.title}</h4>
      {block.location ? (
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {block.location}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-6 text-muted">{block.description}</p>
      {block.travelNote ? (
        <p className="mt-3 text-sm leading-6 text-muted-strong">
          Travel note: {block.travelNote}
        </p>
      ) : null}
      {block.foodSuggestion ? (
        <p className="mt-2 text-sm leading-6 text-muted-strong">
          Food: {block.foodSuggestion}
        </p>
      ) : null}
    </Card>
  );
}

export function DayTimeline({ itinerary }: { itinerary: ItineraryRecord }) {
  return (
    <section id="itinerary">
      <SectionHeader
        eyebrow="Your journey"
        title="Day by day"
        description="A sketch you can follow, not a live booking. Stay notes use area or type, not a hotel name."
      />
      <ol className="mt-8 space-y-10">
        {itinerary.dayPlans.map((day) => (
          <li key={day.dayNumber} className="relative pl-7 sm:pl-9">
            <span
              className="absolute top-2 left-3 h-[calc(100%-0.5rem)] w-px bg-border sm:left-4"
              aria-hidden="true"
            />
            <span
              className="absolute top-2 left-0 grid size-6 place-items-center rounded-full bg-accent text-[10px] font-extrabold text-accent-ink sm:left-1"
              aria-hidden="true"
            >
              {String(day.dayNumber).padStart(2, "0")}
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue">
              Day {day.dayNumber}
            </p>
            <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight sm:text-2xl">
              {day.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{day.summary}</p>
            <div className="mt-5 grid gap-3">
              <PeriodCard block={day.morning} />
              <PeriodCard block={day.afternoon} />
              <PeriodCard block={day.evening} />
            </div>
            <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  Places
                </dt>
                <dd className="mt-2 text-muted-strong">
                  {day.placesToVisit.join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  Stay area / type
                </dt>
                <dd className="mt-2 text-muted-strong">{day.stayArea}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  Estimated daily spend
                </dt>
                <dd className="mt-2 text-muted-strong">
                  {day.estimatedDailyBudget}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  Food suggestions
                </dt>
                <dd className="mt-2 text-muted-strong">
                  {day.foodSuggestions.join(" · ")}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}

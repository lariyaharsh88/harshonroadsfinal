"use client";

import { useMemo, useState } from "react";
import {
  generateItineraryAction,
  regenerateItineraryDayAction,
} from "@/lib/ai/actions/generate-itinerary";
import type { TravelStyle } from "@/lib/ai/schemas/weekend-planner";
import type {
  ItineraryGeneratorInput,
  ItineraryGeneratorResult,
} from "@/lib/ai/schemas/itinerary";
import { ShareButton } from "@/components/tools/ShareButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import {
  AiChip,
  AiDisclaimer,
  AiError,
  AiFieldRow,
  AiGenerateButton,
  AiInlineInput,
  AiResultActions,
  AiSelect,
  AiToolShell,
} from "@/components/tools/ai/shared/AiShell";
import { AiPlannerFrame } from "@/components/tools/ai/shared/AiPlannerFrame";
import { destinations } from "@/lib/tools/destinations";
import {
  budgetLabels,
  interestLabels,
  originLabels,
  transportLabels,
} from "@/lib/tools/weekend-engine";
import {
  budgetRanges,
  interests,
  origins,
  transports,
  type Interest,
} from "@/types/destination";

const travelStyles = [
  "budget",
  "relaxed",
  "adventure",
  "comfort",
  "luxury",
] as const satisfies readonly TravelStyle[];

const travelStyleLabels: Record<TravelStyle, string> = {
  budget: "Budget",
  relaxed: "Relaxed",
  adventure: "Adventure",
  comfort: "Comfort",
  luxury: "Luxury",
};

const dayOptions = [1, 2, 3, 4, 5] as const;

const destinationOptions = [...destinations].sort((a, b) =>
  a.name.localeCompare(b.name),
);

type Draft = Partial<ItineraryGeneratorInput> & { interests: Interest[] };

const emptyDraft: Draft = { interests: [] };

function toInput(draft: Draft): ItineraryGeneratorInput | null {
  if (
    !draft.origin ||
    !draft.destinationSlug ||
    !draft.dayCount ||
    !draft.startDate ||
    !draft.budget ||
    !draft.transport ||
    !draft.travelStyle ||
    draft.interests.length === 0
  ) {
    return null;
  }
  const travellerCount = draft.travellerCount ?? 2;
  if (travellerCount < 1 || travellerCount > 12) {
    return null;
  }
  return {
    origin: draft.origin,
    destinationSlug: draft.destinationSlug,
    dayCount: draft.dayCount,
    startDate: draft.startDate,
    travellerCount,
    budget: draft.budget,
    transport: draft.transport,
    travelStyle: draft.travelStyle,
    interests: draft.interests,
  };
}

const destinationSelectOptions = destinationOptions.map((item) => ({
  value: item.slug,
  label: `${item.name} · ${item.region}`,
}));

function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}


export function AiItineraryGenerator() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [result, setResult] = useState<ItineraryGeneratorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [dayPending, setDayPending] = useState<number | null>(null);
  const [shareUrl, setShareUrl] = useState("/tools/ai-itinerary-generator");

  const input = useMemo(() => toInput(draft), [draft]);

  function reset() {
    setDraft(emptyDraft);
    setResult(null);
    setError(null);
    setDayPending(null);
  }

  function toggleInterest(value: Interest) {
    setDraft((current) => ({
      ...current,
      interests: current.interests.includes(value)
        ? current.interests.filter((item) => item !== value)
        : [...current.interests, value],
    }));
  }

  async function generate() {
    const payload = toInput(draft);
    if (!payload) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await generateItineraryAction(payload);
      if (!response.ok) {
        setError(response.message);
        setResult(null);
        return;
      }
      setResult(response.data);
      if (typeof window !== "undefined") {
        setShareUrl(window.location.href);
      }
    } catch {
      setError("The generator could not complete this request. Please try again.");
      setResult(null);
    } finally {
      setPending(false);
    }
  }

  async function regenerateDay(dayNumber: number) {
    const payload = toInput(draft);
    if (!payload || !result) {
      return;
    }
    setDayPending(dayNumber);
    setError(null);
    try {
      const response = await regenerateItineraryDayAction({
        ...payload,
        dayNumber,
        itinerary: result,
      });
      if (!response.ok) {
        setError(response.message);
        return;
      }
      setResult(response.data);
    } catch {
      setError("That day could not be rewritten. Please try again.");
    } finally {
      setDayPending(null);
    }
  }

  if (result) {
    const shareText = `HarshOnRoads itinerary for ${result.destinationName}. Estimates only — verify before you go.`;

    return (
      <div className="print-results space-y-6">
        <AiDisclaimer>
          This itinerary is estimated. Stay, roads, tickets and timings change.
          Not a booking — verify before you travel.
        </AiDisclaimer>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Your itinerary
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {result.overview}
          </p>
          <p className="mt-3 text-sm text-muted">
            {result.destinationName}
            {result.region ? ` · ${result.region}` : ""}
            {input
              ? ` · ${input.dayCount} day${input.dayCount === 1 ? "" : "s"} from ${input.startDate}`
              : ""}
          </p>
        </div>
        <AiResultActions
          pending={pending}
          onEdit={() => setResult(null)}
          onRegenerate={() => {
            void generate();
          }}
          onReset={reset}
          regenerateLabel="Regenerate itinerary"
          pendingLabel="Rewriting…"
          print
          share={
            <ShareButton
              title="HarshOnRoads AI Itinerary Generator"
              url={shareUrl}
              text={shareText}
            />
          }
        />
        {error ? <AiError message={error} /> : null}

        {result.roadGuidance ? (
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
              Road-trip notes
            </p>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Suggested departure time</dt>
                <dd className="mt-1 font-semibold">
                  {result.roadGuidance.suggestedDepartureTime}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Travel duration category</dt>
                <dd className="mt-1 font-semibold">
                  {result.roadGuidance.travelDurationCategory}
                </dd>
                <p className="mt-1 text-xs text-muted">
                  Typical band from the destination notes, not live traffic.
                </p>
              </div>
            </dl>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
              Suggested breaks
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
              {result.roadGuidance.suggestedBreaks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
              Fuel planning
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {result.roadGuidance.fuelPlanningNote}
            </p>
          </Card>
        ) : null}

        <div className="space-y-6">
          {result.days.map((day) => (
            <article
              key={day.dayNumber}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-6 print:break-inside-avoid"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Day {day.dayNumber}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                    {day.title}
                  </h3>
                </div>
                <p className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                  {formatInr(day.estimatedDailyBudget.amountInr)} estimated /
                  person
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{day.summary}</p>
              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-xl border border-border p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    Morning
                  </dt>
                  <dd className="mt-2 leading-6">{day.morning}</dd>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    Afternoon
                  </dt>
                  <dd className="mt-2 leading-6">{day.afternoon}</dd>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    Evening
                  </dt>
                  <dd className="mt-2 leading-6">{day.evening}</dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <ListBlock title="Places to visit" items={day.placesToVisit} />
                <ListBlock title="Activities" items={day.activities} />
                <ListBlock title="Food suggestions" items={day.foodSuggestions} />
                <ListBlock title="Tips" items={day.tips} />
              </div>
              <div className="mt-6 rounded-xl border border-border p-4 text-sm leading-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                  Stay area
                </p>
                <p className="mt-2 font-semibold">{day.stayArea}</p>
                <p className="mt-1 text-muted">{day.stayNote}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                  Travel guidance
                </p>
                <p className="mt-2 text-muted">{day.travelGuidance}</p>
                <p className="mt-3 text-xs text-muted">
                  Daily budget is {day.estimatedDailyBudget.label}. Treat it as
                  an estimate, not a live price.
                </p>
              </div>
              <div className="mt-6 no-print">
                <button
                  type="button"
                  disabled={dayPending !== null || pending}
                  onClick={() => {
                    void regenerateDay(day.dayNumber);
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold disabled:opacity-40"
                >
                  {dayPending === day.dayNumber
                    ? "Rewriting this day…"
                    : "Regenerate day"}
                </button>
              </div>
            </article>
          ))}
        </div>
        <Card className="bg-surface-raised">
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Verify before you go
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
            {result.verificationNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-muted">{result.disclaimer}</p>
          <div className="mt-6 no-print">
            <ButtonLink href={`/destinations/${result.destinationSlug}`}>
              Open destination page
            </ButtonLink>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AiPlannerFrame
      pending={pending}
      loadingContext={
        draft.destinationSlug
          ? destinationSelectOptions.find((o) => o.value === draft.destinationSlug)?.label
          : ""
      }
      toolLabel="itinerary generator"
      onSubmit={(event) => {
        event.preventDefault();
        void generate();
      }}
    >
      <AiToolShell
        title="Your itinerary, one brief"
        hint="Pick destination, dates and vibe — one generate. Estimates only."
        footer={
          <>
            {error ? (
              <AiError message={`${error} You can also use the AI Weekend Planner.`} />
            ) : null}
            <AiGenerateButton
              type="submit"
              disabled={!input}
              label="Generate my plan"
              pendingLabel="Writing your itinerary…"
            />
          </>
        }
      >
      <AiFieldRow label="Starting from">
        {origins.map((value) => (
          <AiChip
            key={value}
            selected={draft.origin === value}
            onClick={() => setDraft((current) => ({ ...current, origin: value }))}
          >
            {originLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiSelect
        label="Destination"
        name="destination"
        value={draft.destinationSlug ?? ""}
        onChange={(value) =>
          setDraft((current) => ({ ...current, destinationSlug: value }))
        }
        options={[{ value: "", label: "Choose destination…" }, ...destinationSelectOptions]}
      />

      <AiFieldRow label="Days">
        {dayOptions.map((value) => (
          <AiChip
            key={value}
            selected={draft.dayCount === value}
            onClick={() => setDraft((current) => ({ ...current, dayCount: value }))}
          >
            {value === 1 ? "1 day" : `${value} days`}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiInlineInput
        label="Start date"
        name="startDate"
        type="date"
        value={draft.startDate ?? ""}
        onChange={(value) =>
          setDraft((current) => ({ ...current, startDate: value }))
        }
      />

      <AiInlineInput
        label="Travellers"
        name="travellerCount"
        type="number"
        min={1}
        max={12}
        value={String(draft.travellerCount ?? 2)}
        onChange={(value) => {
          const parsed = Number.parseInt(value, 10);
          setDraft((current) => ({
            ...current,
            travellerCount: Number.isFinite(parsed) ? parsed : undefined,
          }));
        }}
      />

      <AiFieldRow label="Budget per person">
        {budgetRanges.map((value) => (
          <AiChip
            key={value}
            selected={draft.budget === value}
            onClick={() => setDraft((current) => ({ ...current, budget: value }))}
          >
            {budgetLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiFieldRow label="Transport">
        {transports.map((value) => (
          <AiChip
            key={value}
            selected={draft.transport === value}
            onClick={() => setDraft((current) => ({ ...current, transport: value }))}
          >
            {transportLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiFieldRow label="Travel style">
        {travelStyles.map((value) => (
          <AiChip
            key={value}
            selected={draft.travelStyle === value}
            onClick={() => setDraft((current) => ({ ...current, travelStyle: value }))}
          >
            {travelStyleLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiFieldRow label="Interests">
        {interests.map((value) => (
          <AiChip
            key={value}
            multi
            selected={draft.interests.includes(value)}
            onClick={() => toggleInterest(value)}
          >
            {interestLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>
      </AiToolShell>
    </AiPlannerFrame>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
        {title}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

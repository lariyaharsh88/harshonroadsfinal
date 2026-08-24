"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  generateItineraryAction,
  regenerateItineraryDayAction,
} from "@/lib/ai/actions/generate-itinerary";
import type { TravelStyle } from "@/lib/ai/schemas/weekend-planner";
import type {
  ItineraryGeneratorInput,
  ItineraryGeneratorResult,
} from "@/lib/ai/schemas/itinerary";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { ToolInput } from "@/components/tools/ToolInput";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
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

const STEPS = [
  "Where are you starting from?",
  "Where do you want to go?",
  "How many days do you have?",
  "When are you travelling?",
  "Who's travelling?",
  "What's your trip budget?",
  "How are you getting there?",
  "What's your travel style?",
  "What are you in the mood for?",
  "Ready to generate?",
] as const;

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

function stepReady(step: number, draft: Draft): boolean {
  switch (step) {
    case 0:
      return Boolean(draft.origin);
    case 1:
      return Boolean(draft.destinationSlug);
    case 2:
      return Boolean(draft.dayCount);
    case 3:
      return Boolean(draft.startDate);
    case 4:
      return (draft.travellerCount ?? 0) >= 1;
    case 5:
      return Boolean(draft.budget);
    case 6:
      return Boolean(draft.transport);
    case 7:
      return Boolean(draft.travelStyle);
    case 8:
      return draft.interests.length > 0;
    case 9:
      return toInput(draft) !== null;
    default:
      return false;
  }
}

function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function destinationName(slug: string | undefined): string {
  return destinations.find((item) => item.slug === slug)?.name ?? slug ?? "";
}

export function AiItineraryGenerator() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [result, setResult] = useState<ItineraryGeneratorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [dayPending, setDayPending] = useState<number | null>(null);
  const [shareUrl, setShareUrl] = useState("/tools/ai-itinerary-generator");

  const input = useMemo(() => toInput(draft), [draft]);
  const progress = ((step + 1) / STEPS.length) * 100;

  function reset() {
    setDraft(emptyDraft);
    setStep(0);
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
        <div className="no-print rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-muted-strong">
          This itinerary is estimated. Stay, roads, tickets and timings change.
          It is not a booking and it does not check live hotel rooms or prices.
          Verify before you travel.
        </div>
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
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setStep(STEPS.length - 1);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Edit inputs
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              void generate();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            {pending ? "Rewriting itinerary…" : "Regenerate itinerary"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Start over
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Print
          </button>
          <ShareButton
            title="HarshOnRoads AI Itinerary Generator"
            url={shareUrl}
            text={shareText}
          />
        </div>
        {error ? (
          <p className="no-print text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}

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
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Step {step + 1} of {STEPS.length}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-accent transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {STEPS[step]}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Pick a HarshOnRoads destination you already want, then fill time, dates
        and budget. Nothing is saved. Plans are estimates, not live bookings.
      </p>

      <div className="mt-8">
        {step === 0 ? (
          <ChoiceGrid>
            {origins.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.origin === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, origin: value }))
                }
              >
                {originLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 1 ? (
          <ChoiceGrid>
            {destinationOptions.map((item) => (
              <ChoiceButton
                key={item.slug}
                selected={draft.destinationSlug === item.slug}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    destinationSlug: item.slug,
                  }))
                }
              >
                {`${item.name} · ${item.region}`}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 2 ? (
          <ChoiceGrid>
            {dayOptions.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.dayCount === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, dayCount: value }))
                }
              >
                {value === 1 ? "1 day" : `${value} days`}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 3 ? (
          <label className="block max-w-md">
            <span className="mb-2 block text-sm font-medium text-muted-strong">
              Start date
            </span>
            <input
              type="date"
              name="startDate"
              value={draft.startDate ?? ""}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  startDate: event.target.value,
                }))
              }
              className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none"
            />
            <span className="mt-1.5 block text-xs leading-5 text-muted">
              Used to label the plan. We do not check weather, traffic or
              bookings for that date.
            </span>
          </label>
        ) : null}
        {step === 4 ? (
          <ToolInput
            name="travellerCount"
            label="Number of travellers"
            value={String(draft.travellerCount ?? 2)}
            onChange={(value) => {
              const parsed = Number.parseInt(value, 10);
              setDraft((current) => ({
                ...current,
                travellerCount: Number.isFinite(parsed) ? parsed : undefined,
              }));
            }}
            helper="Used only to scale language. Nothing is saved."
            min={1}
            max={12}
          />
        ) : null}
        {step === 5 ? (
          <>
            <ChoiceGrid>
              {budgetRanges.map((value) => (
                <ChoiceButton
                  key={value}
                  selected={draft.budget === value}
                  onClick={() =>
                    setDraft((current) => ({ ...current, budget: value }))
                  }
                >
                  {budgetLabels[value]}
                </ChoiceButton>
              ))}
            </ChoiceGrid>
            <p className="mt-4 text-xs leading-5 text-muted">
              Per person, stay + food + local travel. Estimated bands, not live
              hotel quotes.
            </p>
          </>
        ) : null}
        {step === 6 ? (
          <ChoiceGrid>
            {transports.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.transport === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, transport: value }))
                }
              >
                {transportLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 7 ? (
          <ChoiceGrid>
            {travelStyles.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.travelStyle === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, travelStyle: value }))
                }
              >
                {travelStyleLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 8 ? (
          <ChoiceGrid>
            {interests.map((value) => (
              <ChoiceButton
                key={value}
                multi
                selected={draft.interests.includes(value)}
                onClick={() => toggleInterest(value)}
              >
                {interestLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 9 && input ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <ReviewRow label="From" value={originLabels[input.origin]} />
            <ReviewRow
              label="Destination"
              value={destinationName(input.destinationSlug)}
            />
            <ReviewRow
              label="Days"
              value={`${input.dayCount} day${input.dayCount === 1 ? "" : "s"}`}
            />
            <ReviewRow label="Start date" value={input.startDate} />
            <ReviewRow
              label="Travellers"
              value={String(input.travellerCount)}
            />
            <ReviewRow label="Budget" value={budgetLabels[input.budget]} />
            <ReviewRow
              label="Transport"
              value={transportLabels[input.transport]}
            />
            <ReviewRow
              label="Style"
              value={travelStyleLabels[input.travelStyle]}
            />
            <ReviewRow
              label="Interests"
              value={input.interests.map((item) => interestLabels[item]).join(", ")}
            />
          </dl>
        ) : null}
      </div>
      {error ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          {error} You can also use the AI Weekend Planner.
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={step === 0 || pending}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold disabled:opacity-40"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            disabled={!stepReady(step, draft)}
            onClick={() => setStep((value) => value + 1)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={!input || pending}
            onClick={() => {
              void generate();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            {pending ? "Writing your itinerary…" : "Generate itinerary"}
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
        >
          Start over
        </button>
      </div>
    </Card>
  );
}

function ChoiceGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

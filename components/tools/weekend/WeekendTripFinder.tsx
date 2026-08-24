"use client";

import { useMemo, useState } from "react";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import {
  budgetLabels,
  durationLabels,
  groupLabels,
  interestLabels,
  originLabels,
  recommendWeekends,
  transportLabels,
  travelTimeLabels,
} from "@/lib/tools/weekend-engine";
import type {
  BudgetRange,
  GroupType,
  Interest,
  MaxTravelTime,
  Origin,
  TripDuration,
  Transport,
  WeekendPreferences,
  WeekendRecommendation,
} from "@/types/destination";
import {
  budgetRanges,
  groups,
  interests,
  maxTravelTimes,
  origins,
  transports,
  tripDurations,
} from "@/types/destination";

const STEPS = [
  "Where are you starting?",
  "How much time do you have?",
  "Budget",
  "Who are you travelling with?",
  "Transport",
  "What do you want to experience?",
  "Maximum travel time",
] as const;

type Draft = {
  origin?: Origin;
  duration?: TripDuration;
  budget?: BudgetRange;
  group?: GroupType;
  transport?: Transport;
  interests: Interest[];
  maxTravelTime?: MaxTravelTime;
};

const emptyDraft: Draft = { interests: [] };

function stepComplete(step: number, draft: Draft): boolean {
  switch (step) {
    case 0:
      return Boolean(draft.origin);
    case 1:
      return Boolean(draft.duration);
    case 2:
      return Boolean(draft.budget);
    case 3:
      return Boolean(draft.group);
    case 4:
      return Boolean(draft.transport);
    case 5:
      return draft.interests.length > 0;
    case 6:
      return Boolean(draft.maxTravelTime);
    default:
      return false;
  }
}

function toPreferences(draft: Draft): WeekendPreferences | null {
  if (
    !draft.origin ||
    !draft.duration ||
    !draft.budget ||
    !draft.group ||
    !draft.transport ||
    draft.interests.length === 0 ||
    !draft.maxTravelTime
  ) {
    return null;
  }
  return {
    origin: draft.origin,
    duration: draft.duration,
    budget: draft.budget,
    group: draft.group,
    transport: draft.transport,
    interests: draft.interests,
    maxTravelTime: draft.maxTravelTime,
  };
}

function ResultCard({
  rank,
  item,
}: {
  rank: number;
  item: WeekendRecommendation;
}) {
  const { destination } = item;
  const primaryBudget = destination.budgetRange[0];

  return (
    <article className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {["1st", "2nd", "3rd", "4th", "5th"][rank - 1] ?? `${rank}th`} destination
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-display text-3xl font-extrabold tracking-tight">
          {destination.name}
        </h3>
        <p className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
          {item.matchPercent}% HarshOnRoads Match
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{destination.description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
        Why it matches
      </p>
      <ul className="mt-2 space-y-1.5 text-sm leading-6">
        {item.reasons.map((reason) => (
          <li
            key={reason.label}
            className={reason.ok ? "text-foreground" : "text-muted"}
          >
            {reason.ok ? "✓" : "–"} {reason.label}
          </li>
        ))}
      </ul>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Recommended duration</dt>
          <dd className="font-semibold">
            {durationLabels[item.recommendedDuration]}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Approximate budget</dt>
          <dd className="font-semibold">{budgetLabels[primaryBudget]} band</dd>
        </div>
        <div>
          <dt className="text-muted">Travel-time category</dt>
          <dd className="font-semibold">
            {travelTimeLabels[destination.travelTimeCategory]} from Delhi
          </dd>
        </div>
        <div>
          <dt className="text-muted">Best for</dt>
          <dd className="font-semibold">
            {destination.bestFor.map((item) => groupLabels[item]).join(", ")}
          </dd>
        </div>
      </dl>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
        Top experiences
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
        {destination.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink href={`/destinations/${destination.slug}`}>
          View Destination
        </ButtonLink>
      </div>
    </article>
  );
}

export function WeekendTripFinder() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [results, setResults] = useState<WeekendRecommendation[] | null>(null);

  const preferences = useMemo(() => toPreferences(draft), [draft]);
  const canAdvance = stepComplete(step, draft);

  function reset() {
    setDraft(emptyDraft);
    setStep(0);
    setResults(null);
  }

  function findWeekend() {
    const next = toPreferences(draft);
    if (!next) {
      return;
    }
    setResults(recommendWeekends(next));
  }

  function toggleInterest(value: Interest) {
    setDraft((current) => {
      const has = current.interests.includes(value);
      return {
        ...current,
        interests: has
          ? current.interests.filter((item) => item !== value)
          : [...current.interests, value],
      };
    });
  }

  if (results) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Results
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            Your Weekend Matches
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            HarshOnRoads Match is a preference score from your answers — not a
            scientific ranking, live traffic check or hotel quote.
            {preferences
              ? ` Starting from ${originLabels[preferences.origin]}.`
              : null}
          </p>
        </div>
        <div className="space-y-4">
          {results.map((item, index) => (
            <ResultCard
              key={item.destination.id}
              rank={index + 1}
              item={item}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setResults(null)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Back to answers
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Reset
          </button>
        </div>
        <Card className="bg-surface-raised">
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Want a complete personalized weekend itinerary?
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            Turn these matches into a day-by-day weekend sketch. Figures stay
            estimates — verify stay and roads before you go.
          </p>
          <div className="mt-5">
            <ButtonLink href="/tools/ai-weekend-planner" variant="secondary">
              AI Weekend Planner
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
      <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {STEPS[step]}
      </h2>
      <div
        className="mt-4 h-1 overflow-hidden rounded-full bg-border"
        aria-hidden="true"
      >
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {step === 0
          ? origins.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.origin === value}
                onClick={() => setDraft((current) => ({ ...current, origin: value }))}
              >
                {originLabels[value]}
              </ChoiceButton>
            ))
          : null}
        {step === 1
          ? tripDurations.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.duration === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, duration: value }))
                }
              >
                {durationLabels[value]}
              </ChoiceButton>
            ))
          : null}
        {step === 2
          ? budgetRanges.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.budget === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, budget: value }))
                }
              >
                {budgetLabels[value]}
              </ChoiceButton>
            ))
          : null}
        {step === 3
          ? groups.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.group === value}
                onClick={() => setDraft((current) => ({ ...current, group: value }))}
              >
                {groupLabels[value]}
              </ChoiceButton>
            ))
          : null}
        {step === 4
          ? transports.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.transport === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, transport: value }))
                }
              >
                {transportLabels[value]}
              </ChoiceButton>
            ))
          : null}
        {step === 5
          ? interests.map((value) => (
              <ChoiceButton
                key={value}
                multi
                selected={draft.interests.includes(value)}
                onClick={() => toggleInterest(value)}
              >
                {interestLabels[value]}
              </ChoiceButton>
            ))
          : null}
        {step === 6
          ? maxTravelTimes.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.maxTravelTime === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, maxTravelTime: value }))
                }
              >
                {travelTimeLabels[value]}
              </ChoiceButton>
            ))
          : null}
      </div>

      {step === 2 ? (
        <p className="mt-4 text-xs leading-5 text-muted">
          Bands are approximate per person for stay + food + local travel — not
          live hotel or fuel quotes.
        </p>
      ) : null}
      {step === 6 ? (
        <p className="mt-4 text-xs leading-5 text-muted">
          Times are rough driving bands from Delhi NCR, shifted slightly by
          your starting city. They are not live traffic.
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold disabled:opacity-40"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep((value) => value + 1)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={findWeekend}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            Find My Weekend
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
        >
          Reset
        </button>
      </div>
    </Card>
  );
}

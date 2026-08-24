"use client";

import { useMemo, useState, type ReactNode } from "react";
import { planWeekendAction } from "@/lib/ai/actions/plan-weekend";
import type {
  TravelStyle,
  WeekendPlannerInput,
  WeekendPlannerResult,
} from "@/lib/ai/schemas/weekend-planner";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { ToolInput } from "@/components/tools/ToolInput";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import {
  budgetLabels,
  groupLabels,
  interestLabels,
  originLabels,
  transportLabels,
  travelTimeLabels,
} from "@/lib/tools/weekend-engine";
import {
  budgetRanges,
  groups,
  interests,
  maxTravelTimes,
  origins,
  transports,
  tripDurations,
  type GroupType,
  type Interest,
} from "@/types/destination";

const STEPS = [
  "Where are you starting from?",
  "How much time do you have?",
  "What's your trip budget?",
  "Who's travelling?",
  "How are you getting there?",
  "What are you in the mood for?",
  "What's your travel style?",
  "How far will you go?",
  "Ready to plan?",
] as const;

const durationFormLabels: Record<(typeof tripDurations)[number], string> = {
  "day-trip": "1 day",
  "1n2d": "2 days",
  "2n3d": "3 days",
  "3n4d": "4+ days",
};

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

type Draft = Partial<WeekendPlannerInput> & { interests: Interest[] };

const emptyDraft: Draft = { interests: [] };

function defaultPeople(group: GroupType | undefined): number {
  if (group === "solo") return 1;
  if (group === "couple") return 2;
  if (group === "friends") return 3;
  if (group === "family") return 4;
  return 2;
}

function toInput(draft: Draft): WeekendPlannerInput | null {
  if (
    !draft.origin ||
    !draft.duration ||
    !draft.budget ||
    !draft.group ||
    !draft.transport ||
    draft.interests.length === 0 ||
    !draft.travelStyle ||
    !draft.maxTravelTime
  ) {
    return null;
  }
  const peopleCount = draft.peopleCount ?? defaultPeople(draft.group);
  if (peopleCount < 1 || peopleCount > 12) {
    return null;
  }
  return {
    origin: draft.origin,
    duration: draft.duration,
    budget: draft.budget,
    group: draft.group,
    peopleCount,
    transport: draft.transport,
    interests: draft.interests,
    travelStyle: draft.travelStyle,
    maxTravelTime: draft.maxTravelTime,
  };
}

function stepReady(step: number, draft: Draft): boolean {
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
      return Boolean(draft.travelStyle);
    case 7:
      return Boolean(draft.maxTravelTime);
    case 8:
      return toInput(draft) !== null;
    default:
      return false;
  }
}

function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function AiWeekendPlanner() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [result, setResult] = useState<WeekendPlannerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [shareUrl, setShareUrl] = useState("/tools/ai-weekend-planner");

  const input = useMemo(() => toInput(draft), [draft]);
  const progress = ((step + 1) / STEPS.length) * 100;

  function reset() {
    setDraft(emptyDraft);
    setStep(0);
    setResult(null);
    setError(null);
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
      const response = await planWeekendAction(payload);
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
      setError("The planner could not complete this request. Please try again.");
      setResult(null);
    } finally {
      setPending(false);
    }
  }

  if (result) {
    const shareText = `HarshOnRoads weekend plan: ${result.destinations
      .map((item) => item.name)
      .join(", ")}. Estimates only — verify before you go.`;

    return (
      <div className="print-results space-y-6">
        <div className="no-print rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-muted-strong">
          Figures are estimated. Stay, roads, tickets and timings change.
          Verify before you travel. This plan is not a booking.
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Your weekend plan
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {result.summary}
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
            Edit answers
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              void generate();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            {pending ? "Regenerating…" : "Regenerate"}
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
            title="HarshOnRoads AI Weekend Planner"
            url={shareUrl}
            text={shareText}
          />
        </div>
        {error ? (
          <p className="no-print text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}
        <div className="space-y-6">
          {result.destinations.map((item, index) => (
            <article
              key={item.slug}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-6 print:break-inside-avoid"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {["Best match", "Second pick", "Third pick"][index]}
              </p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <h3 className="font-display text-3xl font-extrabold tracking-tight">
                  {item.name}
                </h3>
                <p className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                  {formatInr(item.estimatedBudget.amountInr)} estimated / person
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">{item.region}</p>
              <p className="mt-4 text-sm leading-6">{item.whyItMatches}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{item.overview}</p>
              <p className="mt-4 text-sm">
                <span className="text-muted">Suggested duration: </span>
                <span className="font-semibold">{item.suggestedDuration}</span>
              </p>
              <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                Day by day
              </h4>
              <ol className="mt-3 space-y-3">
                {item.days.map((day) => (
                  <li
                    key={day.dayLabel}
                    className="rounded-xl border border-border bg-background/40 p-4"
                  >
                    <p className="font-semibold">{day.dayLabel}</p>
                    <p className="mt-1 text-sm text-muted">{day.summary}</p>
                    <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-muted">Morning</dt>
                        <dd>{day.morning}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Afternoon</dt>
                        <dd>{day.afternoon}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Evening</dt>
                        <dd>{day.evening}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <ListBlock title="Things to do" items={item.thingsToDo} />
                <ListBlock title="Food" items={item.foodSuggestions} />
                <ListBlock title="Packing" items={item.packingSuggestions} />
                <ListBlock title="Travel tips" items={item.travelTips} />
              </div>
              <div className="mt-6 rounded-xl border border-border p-4 text-sm leading-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                  Stay
                </p>
                <p className="mt-2 font-semibold">
                  {item.stay.type} · {item.stay.area}
                </p>
                <p className="mt-1 text-muted">{item.stay.note}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                  Getting there
                </p>
                <p className="mt-2 text-muted">{item.transportGuidance}</p>
                <p className="mt-4 text-xs text-muted">
                  Budget is {item.estimatedBudget.label}. Treat it as an estimate.
                </p>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                If this does not fit
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-muted">
                {item.alternatives.map((alt) => (
                  <li key={alt.slug}>
                    <ButtonLink
                      href={`/destinations/${alt.slug}`}
                      variant="ghost"
                      className="!inline min-h-0 px-0"
                    >
                      {alt.name}
                    </ButtonLink>
                    {" — "}
                    {alt.why}
                  </li>
                ))}
              </ul>
              <div className="mt-6 no-print">
                <ButtonLink href={`/destinations/${item.slug}`}>
                  Open destination page
                </ButtonLink>
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
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
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
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-8">
        {step === 0 ? (
          <ChoiceGrid>
            {origins.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.origin === value}
                onClick={() => setDraft((current) => ({ ...current, origin: value }))}
              >
                {originLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 1 ? (
          <ChoiceGrid>
            {tripDurations.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.duration === value}
                onClick={() =>
                  setDraft((current) => ({ ...current, duration: value }))
                }
              >
                {durationFormLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        ) : null}
        {step === 2 ? (
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
        {step === 3 ? (
          <div className="space-y-6">
            <ChoiceGrid>
              {groups.map((value) => (
                <ChoiceButton
                  key={value}
                  selected={draft.group === value}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      group: value,
                      peopleCount: current.peopleCount ?? defaultPeople(value),
                    }))
                  }
                >
                  {groupLabels[value]}
                </ChoiceButton>
              ))}
            </ChoiceGrid>
            <ToolInput
              name="peopleCount"
              label="Number of people"
              value={String(draft.peopleCount ?? defaultPeople(draft.group))}
              onChange={(value) => {
                const parsed = Number.parseInt(value, 10);
                setDraft((current) => ({
                  ...current,
                  peopleCount: Number.isFinite(parsed) ? parsed : undefined,
                }));
              }}
              helper="Used only to scale packing and budget language. Nothing is saved."
              min={1}
              max={12}
            />
          </div>
        ) : null}
        {step === 4 ? (
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
        {step === 5 ? (
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
        {step === 6 ? (
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
        {step === 7 ? (
          <>
            <ChoiceGrid>
              {maxTravelTimes.map((value) => (
                <ChoiceButton
                  key={value}
                  selected={draft.maxTravelTime === value}
                  onClick={() =>
                    setDraft((current) => ({ ...current, maxTravelTime: value }))
                  }
                >
                  {travelTimeLabels[value]}
                </ChoiceButton>
              ))}
            </ChoiceGrid>
            <p className="mt-4 text-xs leading-5 text-muted">
              One-way driving bands from Delhi NCR, not live traffic.
            </p>
          </>
        ) : null}
        {step === 8 && input ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <ReviewRow label="From" value={originLabels[input.origin]} />
            <ReviewRow label="Time" value={durationFormLabels[input.duration]} />
            <ReviewRow label="Budget" value={budgetLabels[input.budget]} />
            <ReviewRow
              label="Travellers"
              value={`${groupLabels[input.group]} · ${input.peopleCount} people`}
            />
            <ReviewRow label="Transport" value={transportLabels[input.transport]} />
            <ReviewRow
              label="Interests"
              value={input.interests.map((item) => interestLabels[item]).join(", ")}
            />
            <ReviewRow
              label="Style"
              value={travelStyleLabels[input.travelStyle]}
            />
            <ReviewRow
              label="Max travel time"
              value={travelTimeLabels[input.maxTravelTime]}
            />
          </dl>
        ) : null}
      </div>
      {error ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          {error} You can also use the Weekend Trip Finder.
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
            {pending ? "Planning your weekend…" : "Generate trip"}
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

"use client";

import { useMemo, useState } from "react";
import { planWeekendAction } from "@/lib/ai/actions/plan-weekend";
import type {
  TravelStyle,
  WeekendPlannerInput,
  WeekendPlannerResult,
} from "@/lib/ai/schemas/weekend-planner";
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
  AiStyleChip,
  AiToolShell,
} from "@/components/tools/ai/shared/AiShell";
import { AiPlannerFrame } from "@/components/tools/ai/shared/AiPlannerFrame";
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

const travelStyleHints: Record<TravelStyle, string> = {
  budget: "Smart spends",
  relaxed: "Slow pace",
  adventure: "Active & bold",
  comfort: "Easy stays",
  luxury: "Premium picks",
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

function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function AiWeekendPlanner() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [result, setResult] = useState<WeekendPlannerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [shareUrl, setShareUrl] = useState("/tools/ai-weekend-planner");

  const input = useMemo(() => toInput(draft), [draft]);

  function reset() {
    setDraft(emptyDraft);
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
        <AiDisclaimer>
          Figures are estimated. Stay, roads, tickets and timings change.
          Verify before you travel. This plan is not a booking.
        </AiDisclaimer>
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
        <AiResultActions
          pending={pending}
          onEdit={() => setResult(null)}
          onRegenerate={() => {
            void generate();
          }}
          onReset={reset}
          regenerateLabel="Regenerate"
          pendingLabel="Planning…"
          print
          share={
            <ShareButton
              title="HarshOnRoads AI Weekend Planner"
              url={shareUrl}
              text={shareText}
            />
          }
        />
        {error ? <AiError message={error} /> : null}
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
    <AiPlannerFrame
      pending={pending}
      loadingContext={draft.origin ? originLabels[draft.origin] : "Delhi NCR"}
      toolLabel="weekend planner"
      onSubmit={(event) => {
        event.preventDefault();
        void generate();
      }}
    >
      <AiToolShell
        title="Your trip, one brief"
        hint="Set origin, time, budget and vibe — one generate. Estimates only, nothing saved."
        footer={
          <>
            {error ? (
              <AiError message={`${error} You can also use the Weekend Trip Finder.`} />
            ) : null}
            <AiGenerateButton
              type="submit"
              disabled={!input}
              label="Generate my plan"
              pendingLabel="Planning your weekend…"
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

      <AiFieldRow label="Duration">
        {tripDurations.map((value) => (
          <AiChip
            key={value}
            selected={draft.duration === value}
            onClick={() => setDraft((current) => ({ ...current, duration: value }))}
          >
            {durationFormLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiFieldRow label="Budget per person" hint="Stay + food + local travel. Estimated bands.">
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

      <AiFieldRow label="Who's going">
        {groups.map((value) => (
          <AiChip
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
          </AiChip>
        ))}
      </AiFieldRow>

      <AiInlineInput
        label="People"
        name="peopleCount"
        type="number"
        min={1}
        max={12}
        value={String(draft.peopleCount ?? defaultPeople(draft.group))}
        onChange={(value) => {
          const parsed = Number.parseInt(value, 10);
          setDraft((current) => ({
            ...current,
            peopleCount: Number.isFinite(parsed) ? parsed : undefined,
          }));
        }}
      />

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

      <AiFieldRow label="Travel style">
        {travelStyles.map((value) => (
          <AiStyleChip
            key={value}
            selected={draft.travelStyle === value}
            onClick={() => setDraft((current) => ({ ...current, travelStyle: value }))}
            label={travelStyleLabels[value]}
            hint={travelStyleHints[value]}
          />
        ))}
      </AiFieldRow>

      <AiFieldRow label="Max drive time" hint="One-way from Delhi NCR. Not live traffic.">
        {maxTravelTimes.map((value) => (
          <AiChip
            key={value}
            selected={draft.maxTravelTime === value}
            onClick={() => setDraft((current) => ({ ...current, maxTravelTime: value }))}
          >
            {travelTimeLabels[value]}
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

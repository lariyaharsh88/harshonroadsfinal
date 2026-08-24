"use client";

import { useMemo, useState, type ReactNode } from "react";
import { findTripsAction } from "@/lib/ai/actions/find-trips";
import type {
  TripFinderInput,
  TripFinderResult,
} from "@/lib/ai/schemas/trip-recommendation";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import {
  budgetLabels,
  durationLabels,
  groupLabels,
  interestLabels,
  originLabels,
  transportLabels,
} from "@/lib/tools/weekend-engine";
import {
  budgetRanges,
  groups,
  interests,
  origins,
  transports,
  tripDurations,
  type Interest,
} from "@/types/destination";

type Draft = {
  query: string;
  origin?: TripFinderInput["origin"];
  duration?: TripFinderInput["duration"];
  budget?: TripFinderInput["budget"];
  group?: TripFinderInput["group"];
  transport?: TripFinderInput["transport"];
  interests: Interest[];
};

const emptyDraft: Draft = { query: "", interests: [] };

const exampleQuery =
  "I live in Gurgaon, have Saturday and Sunday free, have ₹8,000 per person and want somewhere peaceful with mountains.";

export function AiTripFinder() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TripFinderResult | null>(null);
  const [shareUrl, setShareUrl] = useState("/tools/ai-trip-finder");

  const input = useMemo((): TripFinderInput | null => {
    const query = draft.query.trim();
    if (query.length < 20) {
      return null;
    }
    return {
      query,
      origin: draft.origin,
      duration: draft.duration,
      budget: draft.budget,
      group: draft.group,
      transport: draft.transport,
      interests: draft.interests.length ? draft.interests : undefined,
    };
  }, [draft]);

  const shareText = result
    ? `HarshOnRoads trip ideas: ${result.destinations
        .map((item) => item.name)
        .join(", ")}`
    : "HarshOnRoads AI Trip Finder";

  async function generate() {
    if (!input) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await findTripsAction(input);
      if (!response.ok) {
        setError(response.message);
        return;
      }
      setResult(response.data);
      if (typeof window !== "undefined") {
        setShareUrl(
          window.location.href.split("#")[0] ?? "/tools/ai-trip-finder",
        );
      }
    } catch {
      setError("The finder could not complete this request. Please try again.");
    } finally {
      setPending(false);
    }
  }

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

  if (result) {
    return (
      <div className="print-results space-y-6">
        <div className="no-print rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-muted-strong">
          HarshOnRoads Match is a preference score from the filters you
          selected
          {result.usedDefaultFilters
            ? " (blank filters used typical weekend defaults)"
            : ""}
          . It is not live traffic, hotels, weather or a scientific ranking.
          Verify stay and roads before you travel.
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Top 5 destinations
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.querySummary}
          </h2>
        </div>
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setResult(null)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Edit request
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              void generate();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            {pending ? "Finding destinations…" : "Find again"}
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
            title="HarshOnRoads AI Trip Finder"
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
                {index + 1} of 5
              </p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <h3 className="font-display text-3xl font-extrabold tracking-tight">
                  {item.name}
                </h3>
                <p className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                  {item.matchPercent}% HarshOnRoads Match
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">{item.region}</p>
              <p className="mt-4 text-sm leading-6">{item.whyItMatches}</p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <Meta
                  label="Travel duration"
                  value={`Typically about ${item.travelDurationLabel} from Delhi NCR`}
                />
                <Meta label="Budget category" value={item.budgetCategoryLabel} />
                <Meta
                  label="Suggested duration"
                  value={item.suggestedDuration}
                />
                <Meta label="Best for" value={item.bestForLabels.join(", ")} />
              </dl>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.bestForNote}
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                Best experiences
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
                {item.bestExperiences.map((experience) => (
                  <li key={experience}>{experience}</li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
                Alternative destination
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                <ButtonLink
                  href={`/destinations/${item.alternative.slug}`}
                  variant="ghost"
                  className="!inline min-h-0 px-0"
                >
                  {item.alternative.name}
                </ButtonLink>
                {" — "}
                {item.alternative.why}
              </p>
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
          <p className="mt-4 text-sm leading-6 text-muted">
            {result.disclaimer}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Describe a weekend
      </p>
      <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        AI Trip Finder
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Type what you want in plain language. Optional filters narrow the
        HarshOnRoads destination list. Nothing is saved. Results are estimates,
        not live travel conditions.
      </p>

      <label className="mt-8 block">
        <span className="mb-2 block text-sm font-medium text-muted-strong">
          Describe what you want
        </span>
        <textarea
          name="query"
          value={draft.query}
          rows={5}
          maxLength={1500}
          placeholder={exampleQuery}
          autoComplete="off"
          onChange={(event) =>
            setDraft((current) => ({ ...current, query: event.target.value }))
          }
          className="w-full rounded-xl border border-border bg-background px-3 py-3 text-base text-foreground outline-none placeholder:text-muted/70 focus:border-foreground/30"
        />
        <span className="mt-1.5 block text-xs leading-5 text-muted">
          At least 20 characters. Example: {exampleQuery}
        </span>
      </label>

      <details className="mt-8 rounded-2xl border border-border px-4 py-4">
        <summary className="cursor-pointer text-sm font-semibold">
          Optional filters
        </summary>
        <p className="mt-3 text-xs leading-5 text-muted">
          Leave blank if the description already covers it. Click a selected
          option again to clear it.
        </p>
        <FilterBlock title="Starting location">
          <ChoiceGrid>
            {origins.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.origin === value}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    origin: current.origin === value ? undefined : value,
                  }))
                }
              >
                {originLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        </FilterBlock>
        <FilterBlock title="Available days">
          <ChoiceGrid>
            {tripDurations.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.duration === value}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    duration: current.duration === value ? undefined : value,
                  }))
                }
              >
                {durationLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        </FilterBlock>
        <FilterBlock title="Budget">
          <ChoiceGrid>
            {budgetRanges.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.budget === value}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    budget: current.budget === value ? undefined : value,
                  }))
                }
              >
                {budgetLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
          <p className="mt-3 text-xs leading-5 text-muted">
            Per person, stay + food + local travel. Estimated bands, not live
            hotel quotes.
          </p>
        </FilterBlock>
        <FilterBlock title="Group">
          <ChoiceGrid>
            {groups.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.group === value}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    group: current.group === value ? undefined : value,
                  }))
                }
              >
                {groupLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        </FilterBlock>
        <FilterBlock title="Transport">
          <ChoiceGrid>
            {transports.map((value) => (
              <ChoiceButton
                key={value}
                selected={draft.transport === value}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    transport:
                      current.transport === value ? undefined : value,
                  }))
                }
              >
                {transportLabels[value]}
              </ChoiceButton>
            ))}
          </ChoiceGrid>
        </FilterBlock>
        <FilterBlock title="Interests">
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
        </FilterBlock>
      </details>

      {error ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          {error} You can also use the Weekend Trip Finder.
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={!input || pending}
          onClick={() => {
            void generate();
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
        >
          {pending ? "Finding destinations…" : "Find destinations"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
        >
          Clear
        </button>
        <ButtonLink href="/tools/weekend-trip-finder" variant="secondary">
          Weekend Trip Finder
        </ButtonLink>
      </div>
    </Card>
  );
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-strong">
        {title}
      </p>
      {children}
    </div>
  );
}

function ChoiceGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

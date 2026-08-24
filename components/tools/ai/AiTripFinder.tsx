"use client";

import { useMemo, useState } from "react";
import { findTripsAction } from "@/lib/ai/actions/find-trips";
import type {
  TripFinderInput,
  TripFinderResult,
} from "@/lib/ai/schemas/trip-recommendation";
import { ShareButton } from "@/components/tools/ShareButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import {
  AiDisclaimer,
  AiError,
  AiGenerateButton,
  AiPromptInput,
  AiResultActions,
  AiToolShell,
} from "@/components/tools/ai/shared/AiShell";
import { AiPlannerFrame } from "@/components/tools/ai/shared/AiPlannerFrame";

type Draft = {
  query: string;
};

const emptyDraft: Draft = { query: "" };

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

  if (result) {
    return (
      <div className="print-results space-y-6">
        <AiDisclaimer>
          HarshOnRoads Match is a preference score from your description
          {result.usedDefaultFilters
            ? " (blank filters used typical weekend defaults)"
            : ""}
          . Not live traffic, hotels or weather. Verify before you travel.
        </AiDisclaimer>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue">
            Top 5 destinations
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.querySummary}
          </h2>
        </div>
        <AiResultActions
          pending={pending}
          onEdit={() => setResult(null)}
          onRegenerate={() => {
            void generate();
          }}
          onReset={reset}
          regenerateLabel="Find again"
          pendingLabel="Finding…"
          print
          share={
            <ShareButton
              title="HarshOnRoads AI Trip Finder"
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
    <AiPlannerFrame
      pending={pending}
      loadingContext={draft.query}
      toolLabel="trip finder"
      onSubmit={(event) => {
        event.preventDefault();
        void generate();
      }}
    >
      <AiToolShell
        title="Your weekend, one brief"
        hint="Describe where you start, time, budget and vibe. AI picks from HarshOnRoads destinations — verify before you travel."
        footer={
          <>
            {error ? <AiError message={error} /> : null}
            <AiGenerateButton
              type="submit"
              disabled={!input}
              label="Generate my plan"
              pendingLabel="Finding destinations…"
            />
            <p className="mt-4 text-center sm:text-left">
              <ButtonLink href="/tools/weekend-trip-finder" variant="ghost">
                Prefer rule-based finder →
              </ButtonLink>
            </p>
          </>
        }
      >
        <AiPromptInput
          name="query"
          label="Describe your trip"
          value={draft.query}
          onChange={(value) => setDraft({ query: value })}
          placeholder={exampleQuery}
          hint="At least 20 characters. Example: Gurgaon · 2 days · ₹8k · peaceful mountains."
          rows={5}
        />
      </AiToolShell>
    </AiPlannerFrame>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

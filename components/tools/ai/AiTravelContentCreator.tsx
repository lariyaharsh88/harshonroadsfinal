"use client";

import { useMemo, useState, type ReactNode } from "react";
import { generateTravelContentAction } from "@/lib/ai/actions/generate-travel-content";
import {
  contentCreatorAudienceLabels,
  contentCreatorAudiences,
  contentCreatorPlatformLabels,
  contentCreatorPlatforms,
  contentCreatorToneLabels,
  contentCreatorTones,
  type TravelContentCreatorInput,
  type TravelContentCreatorResult,
} from "@/lib/ai/schemas/ai-travel-content-creator";
import { CopyBlock } from "@/components/tools/CopyBlock";
import { ShareButton } from "@/components/tools/ShareButton";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { destinations } from "@/lib/tools/destinations";

const destinationOptions = [...destinations]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((item) => ({ value: item.slug, label: item.name }));

const exampleNotes =
  "Weekend from Delhi with friends, two nights, nature and photography. I have not been yet. Keep it practical, no fake stay stories.";

type Draft = {
  destinationSlug: string;
  tripDescription: string;
  audience: TravelContentCreatorInput["audience"];
  tone: TravelContentCreatorInput["tone"];
  platform: TravelContentCreatorInput["platform"];
  hasVisited: boolean;
};

const emptyDraft: Draft = {
  destinationSlug: "rishikesh",
  tripDescription: "",
  audience: "weekend-travellers",
  tone: "practical",
  platform: "youtube",
  hasVisited: false,
};

function toInput(draft: Draft): TravelContentCreatorInput | null {
  const tripDescription = draft.tripDescription.trim();
  if (!draft.destinationSlug || tripDescription.length < 20) {
    return null;
  }
  return {
    destinationSlug: draft.destinationSlug,
    tripDescription,
    audience: draft.audience,
    tone: draft.tone,
    platform: draft.platform,
    hasVisited: draft.hasVisited,
  };
}

function numbered(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
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
      <p className="mb-3 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function ChoiceGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

export function AiTravelContentCreator() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TravelContentCreatorResult | null>(
    null,
  );

  const input = useMemo(() => toInput(draft), [draft]);
  const shareUrl = "/tools/ai-travel-content-creator";

  async function generate() {
    if (!input) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await generateTravelContentAction(input);
      if (!response.ok) {
        setError(response.message);
        return;
      }
      setResult(response.data);
    } catch {
      setError("The content draft could not be generated. Please try again.");
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
      <div className="space-y-6">
        <div className="rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-muted-strong">
          Draft copy for {result.destinationName} ({result.destinationRegion}).
          {result.hasVisited
            ? " You said you have visited — still do not treat invented details as facts."
            : " This draft does not claim that you visited."}{" "}
          Verify timings and local rules before you publish. Nothing is stored
          on a HarshOnRoads server.
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {contentCreatorPlatformLabels[result.platform]} draft
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.destinationName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {contentCreatorAudienceLabels[result.audience]} ·{" "}
            {contentCreatorToneLabels[result.tone]}. {result.angleSummary}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setResult(null)}
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
            {pending ? "Writing draft…" : "Regenerate"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Reset
          </button>
          <ShareButton
            title="HarshOnRoads AI Travel Content Creator"
            url={shareUrl}
            text={`Draft travel copy for ${result.destinationName}`}
          />
        </div>
        {error ? (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}

        <div className="space-y-4">
          {result.youtube ? (
            <>
              <CopyBlock
                label="Title ideas"
                text={numbered(result.youtube.titleIdeas)}
              />
              <CopyBlock
                label="Description"
                text={result.youtube.description}
              />
              <CopyBlock label="Hook" text={result.youtube.hook} />
              <CopyBlock
                label="Thumbnail text"
                text={result.youtube.thumbnailText}
              />
              <CopyBlock
                label="Chapter suggestions"
                text={result.youtube.chapters
                  .map((item) => `${item.timestamp} ${item.title}`)
                  .join("\n")}
              />
              <CopyBlock label="CTA" text={result.youtube.cta} />
            </>
          ) : null}
          {result.shortsReels ? (
            <>
              <CopyBlock label="Hook" text={result.shortsReels.hook} />
              <CopyBlock
                label="30-second script"
                text={result.shortsReels.script30}
              />
              <CopyBlock
                label="60-second script"
                text={result.shortsReels.script60}
              />
              <CopyBlock
                label="Caption"
                text={result.shortsReels.caption}
              />
              <CopyBlock label="CTA" text={result.shortsReels.cta} />
            </>
          ) : null}
          {result.instagram ? (
            <>
              <CopyBlock label="Caption" text={result.instagram.caption} />
              <CopyBlock
                label="Reel caption"
                text={result.instagram.reelCaption}
              />
              <CopyBlock
                label="Carousel structure"
                text={result.instagram.carousel
                  .map(
                    (slide, index) =>
                      `Slide ${index + 1}: ${slide.heading}\n${slide.body}`,
                  )
                  .join("\n\n")}
              />
              <CopyBlock label="Hook" text={result.instagram.hook} />
            </>
          ) : null}
          {result.blog ? (
            <>
              <CopyBlock
                label="Article title ideas"
                text={numbered(result.blog.titleIdeas)}
              />
              <CopyBlock label="SEO title" text={result.blog.seoTitle} />
              <CopyBlock
                label="Meta description"
                text={result.blog.metaDescription}
              />
              <CopyBlock
                label="Outline"
                text={result.blog.outline
                  .map(
                    (section) =>
                      `${section.heading}\n${section.bullets
                        .map((bullet) => `• ${bullet}`)
                        .join("\n")}`,
                  )
                  .join("\n\n")}
              />
              <CopyBlock
                label="FAQ ideas"
                text={result.blog.faqIdeas
                  .map(
                    (item) => `${item.question}\nAngle: ${item.answerAngle}`,
                  )
                  .join("\n\n")}
              />
            </>
          ) : null}
        </div>

        <Card className="bg-surface-raised">
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Verify before you publish
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
            {result.verificationNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-muted">
            {result.disclaimer}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/destinations/${result.destinationSlug}`}>
              Open destination page
            </ButtonLink>
            <ButtonLink
              href="/tools/ai-itinerary-generator"
              variant="secondary"
            >
              AI Itinerary Generator
            </ButtonLink>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Creator brief
      </p>
      <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        AI Travel Content Creator
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Draft titles, scripts and outlines for a HarshOnRoads destination.
        Copy is a starting point, not a travel diary, unless you say you
        went. Nothing is stored. No login.
      </p>

      <div className="mt-8 max-w-xl">
        <ToolSelect
          name="destination"
          label="Destination"
          value={draft.destinationSlug}
          options={destinationOptions}
          onChange={(value) =>
            setDraft((current) => ({ ...current, destinationSlug: value }))
          }
        />
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-muted-strong">
          Trip description
        </span>
        <textarea
          name="tripDescription"
          value={draft.tripDescription}
          rows={5}
          maxLength={1500}
          placeholder={exampleNotes}
          autoComplete="off"
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              tripDescription: event.target.value,
            }))
          }
          className="w-full rounded-xl border border-border bg-background px-3 py-3 text-base text-foreground outline-none placeholder:text-muted/70 focus:border-foreground/30"
        />
        <span className="mt-1.5 block text-xs leading-5 text-muted">
          At least 20 characters. Say if you visited. Do not ask the tool to
          invent a trip you did not take.
        </span>
      </label>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          checked={draft.hasVisited}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              hasVisited: event.target.checked,
            }))
          }
          className="mt-1 size-4 accent-[var(--accent)]"
        />
        <span>
          I have been to this destination. Leave unchecked unless that is
          true — the draft will not pretend you went.
        </span>
      </label>

      <FilterBlock title="Target audience">
        <ChoiceGrid>
          {contentCreatorAudiences.map((value) => (
            <ChoiceButton
              key={value}
              selected={draft.audience === value}
              onClick={() =>
                setDraft((current) => ({ ...current, audience: value }))
              }
            >
              {contentCreatorAudienceLabels[value]}
            </ChoiceButton>
          ))}
        </ChoiceGrid>
      </FilterBlock>

      <FilterBlock title="Tone">
        <ChoiceGrid>
          {contentCreatorTones.map((value) => (
            <ChoiceButton
              key={value}
              selected={draft.tone === value}
              onClick={() =>
                setDraft((current) => ({ ...current, tone: value }))
              }
            >
              {contentCreatorToneLabels[value]}
            </ChoiceButton>
          ))}
        </ChoiceGrid>
      </FilterBlock>

      <FilterBlock title="Platform">
        <ChoiceGrid>
          {contentCreatorPlatforms.map((value) => (
            <ChoiceButton
              key={value}
              selected={draft.platform === value}
              onClick={() =>
                setDraft((current) => ({ ...current, platform: value }))
              }
            >
              {contentCreatorPlatformLabels[value]}
            </ChoiceButton>
          ))}
        </ChoiceGrid>
      </FilterBlock>

      {error ? (
        <p className="mt-6 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!input || pending}
          onClick={() => {
            void generate();
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
        >
          {pending ? "Writing draft…" : "Generate content draft"}
        </button>
      </div>
    </Card>
  );
}

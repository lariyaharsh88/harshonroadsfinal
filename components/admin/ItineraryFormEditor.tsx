"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  ChipMultiSelect,
  FaqEditor,
  FormSection,
  PairListEditor,
  slugifyName,
  StringListEditor,
} from "@/components/admin/forms/shared";
import { Button } from "@/components/ui/Button";
import { itineraryPeriodLabels } from "@/lib/data/itineraries/labels";
import {
  itineraryAudienceLabels,
  itineraryBudgetLabels,
  itineraryDurationLabels,
  itineraryTransportLabels,
  itineraryTravelStyleLabels,
  itineraryTripTypeLabels,
} from "@/lib/data/itineraries/labels";
import {
  durationFromDays,
  itineraryAudiences,
  itineraryBudgets,
  itineraryDurations,
  itineraryOrigins,
  itineraryTransports,
  itineraryTravelStyles,
  itineraryTripTypes,
  type ItineraryBlock,
  type ItineraryDay,
  type ItineraryRecord,
} from "@/lib/data/itineraries/types";

type SaveResult = { ok: boolean; error?: string; slug?: string };

function emptyBlock(period: ItineraryBlock["period"]): ItineraryBlock {
  return { period, title: "", description: "" };
}

function emptyDay(dayNumber: number): ItineraryDay {
  return {
    dayNumber,
    title: `Day ${dayNumber}`,
    summary: "",
    morning: emptyBlock("morning"),
    afternoon: emptyBlock("afternoon"),
    evening: emptyBlock("evening"),
    placesToVisit: [],
    activities: [],
    foodSuggestions: [],
    travelNotes: [],
    stayArea: "",
    estimatedDailyBudget: "",
  };
}

function DayBlockFields({
  label,
  block,
  onChange,
}: {
  label: string;
  block: ItineraryBlock;
  onChange: (block: ItineraryBlock) => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border/70 bg-white p-3">
      <p className="text-xs font-bold uppercase tracking-wider text-blue">{label}</p>
      <AdminField label="Title">
        <AdminInput value={block.title} onChange={(title) => onChange({ ...block, title })} />
      </AdminField>
      <AdminField label="Description">
        <AdminTextarea
          value={block.description}
          onChange={(description) => onChange({ ...block, description })}
          rows={2}
        />
      </AdminField>
      <div className="grid gap-3 sm:grid-cols-2">
        <AdminField label="Location (optional)">
          <AdminInput
            value={block.location ?? ""}
            onChange={(location) => onChange({ ...block, location: location || undefined })}
          />
        </AdminField>
        <AdminField label="Travel note (optional)">
          <AdminInput
            value={block.travelNote ?? ""}
            onChange={(travelNote) => onChange({ ...block, travelNote: travelNote || undefined })}
          />
        </AdminField>
      </div>
      <AdminField label="Food suggestion (optional)">
        <AdminInput
          value={block.foodSuggestion ?? ""}
          onChange={(foodSuggestion) =>
            onChange({ ...block, foodSuggestion: foodSuggestion || undefined })
          }
        />
      </AdminField>
    </div>
  );
}

function DayPlanEditor({
  day,
  onChange,
  onRemove,
}: {
  day: ItineraryDay;
  onChange: (day: ItineraryDay) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-surface-raised/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-extrabold">Day {day.dayNumber}</h3>
        <Button type="button" variant="ghost" onClick={onRemove}>
          Remove day
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Day title">
          <AdminInput value={day.title} onChange={(title) => onChange({ ...day, title })} />
        </AdminField>
        <AdminField label="Stay area">
          <AdminInput
            value={day.stayArea}
            onChange={(stayArea) => onChange({ ...day, stayArea })}
          />
        </AdminField>
      </div>
      <AdminField label="Day summary">
        <AdminTextarea
          value={day.summary}
          onChange={(summary) => onChange({ ...day, summary })}
          rows={2}
        />
      </AdminField>
      <AdminField label="Estimated daily budget">
        <AdminInput
          value={day.estimatedDailyBudget}
          onChange={(estimatedDailyBudget) => onChange({ ...day, estimatedDailyBudget })}
        />
      </AdminField>
      <DayBlockFields
        label={itineraryPeriodLabels.morning}
        block={day.morning}
        onChange={(morning) => onChange({ ...day, morning })}
      />
      <DayBlockFields
        label={itineraryPeriodLabels.afternoon}
        block={day.afternoon}
        onChange={(afternoon) => onChange({ ...day, afternoon })}
      />
      <DayBlockFields
        label={itineraryPeriodLabels.evening}
        block={day.evening}
        onChange={(evening) => onChange({ ...day, evening })}
      />
      <StringListEditor
        label="Places to visit"
        items={day.placesToVisit}
        onChange={(placesToVisit) => onChange({ ...day, placesToVisit })}
      />
      <StringListEditor
        label="Activities"
        items={day.activities}
        onChange={(activities) => onChange({ ...day, activities })}
      />
      <StringListEditor
        label="Food suggestions"
        items={day.foodSuggestions}
        onChange={(foodSuggestions) => onChange({ ...day, foodSuggestions })}
      />
      <StringListEditor
        label="Travel notes"
        items={day.travelNotes}
        onChange={(travelNotes) => onChange({ ...day, travelNotes })}
      />
    </div>
  );
}

type ItineraryFormEditorProps = {
  initial: ItineraryRecord;
  destinationOptions: { slug: string; name: string }[];
  onSave: (record: ItineraryRecord) => Promise<SaveResult>;
  onDelete?: () => Promise<{ ok: boolean; error?: string }>;
  viewHref?: string;
  isNew?: boolean;
};

export function ItineraryFormEditor({
  initial,
  destinationOptions,
  onSave,
  onDelete,
  viewHref,
  isNew = false,
}: ItineraryFormEditorProps) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function patch(partial: Partial<ItineraryRecord>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function updateDayPlans(dayPlans: ItineraryDay[]) {
    patch({ dayPlans });
  }

  function handleSave() {
    setMessage(null);
    setError(null);
    const record: ItineraryRecord = {
      ...draft,
      id: draft.slug.trim() || draft.id,
      slug: draft.slug.trim(),
      title: draft.title.trim(),
      highlights: draft.highlights.filter(Boolean),
      interests: draft.interests.filter(Boolean),
      travelTips: draft.travelTips.filter(Boolean),
      packingSuggestions: draft.packingSuggestions.filter(Boolean),
      thingsToKnow: draft.thingsToKnow.filter(Boolean),
      relatedDestinations: draft.relatedDestinations.filter(Boolean),
      relatedItineraries: draft.relatedItineraries.filter(Boolean),
      relatedTools: draft.relatedTools.filter(Boolean),
      faq: draft.faq.filter((item) => item.question.trim() && item.answer.trim()),
      budgetLines: draft.budgetLines.filter(
        (line) => line.category.trim() && line.estimate.trim(),
      ),
      dayPlans: draft.dayPlans.map((day) => ({
        ...day,
        placesToVisit: day.placesToVisit.filter(Boolean),
        activities: day.activities.filter(Boolean),
        foodSuggestions: day.foodSuggestions.filter(Boolean),
        travelNotes: day.travelNotes.filter(Boolean),
      })),
    };

    startTransition(async () => {
      const result = await onSave(record);
      if (!result.ok) {
        setError(result.error ?? "Save failed.");
        return;
      }
      setMessage("Saved. Public pages will refresh on the next request.");
      if (result.slug) {
        router.replace(`/admin/itineraries/${result.slug}`);
      }
      router.refresh();
    });
  }

  function handleDelete() {
    if (!onDelete || !window.confirm("Delete this itinerary? This cannot be undone.")) {
      return;
    }
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await onDelete();
      if (!result.ok) {
        setError(result.error ?? "Delete failed.");
        return;
      }
      router.push("/admin/itineraries");
      router.refresh();
    });
  }

  function setDays(days: number) {
    const nights = Math.max(0, days - 1);
    patch({
      days,
      nights,
      duration: durationFromDays(days),
    });
  }

  return (
    <div className="admin-form space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          {isNew ? "New itinerary" : `Edit ${draft.title}`}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Edit day plans, budget bands and travel notes with structured fields.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleSave} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
        {isNew ? (
          <Button
            type="button"
            variant="secondary"
            disabled={pending}
            onClick={() =>
              patch({
                slug: `${slugifyName(draft.destinationName)}-${draft.days}-day-itinerary`,
              })
            }
          >
            Suggest slug
          </Button>
        ) : null}
        {viewHref ? (
          <a
            href={viewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-bold"
          >
            View live page
          </a>
        ) : null}
        {onDelete ? (
          <Button type="button" variant="ghost" onClick={handleDelete} disabled={pending}>
            Delete
          </Button>
        ) : null}
      </div>

      {message ? (
        <p className="rounded-2xl border border-teal/30 bg-teal-soft/40 px-4 py-3 text-sm">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-2xl border border-orange/40 bg-orange/10 px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}

      <FormSection title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Title">
            <AdminInput
              value={draft.title}
              onChange={(title) => patch({ title })}
              required
            />
          </AdminField>
          <AdminField label="Slug">
            <AdminInput
              value={draft.slug}
              onChange={(slug) => patch({ slug, id: slug })}
              required
            />
          </AdminField>
          <AdminField label="Destination">
            <AdminSelect
              value={draft.destinationSlug}
              onChange={(slug) => {
                const match = destinationOptions.find((item) => item.slug === slug);
                patch({
                  destinationSlug: slug,
                  destinationName: match?.name ?? draft.destinationName,
                });
              }}
              options={destinationOptions.map((item) => ({
                value: item.slug,
                label: item.name,
              }))}
            />
          </AdminField>
          <AdminField label="Origin">
            <AdminSelect
              value={draft.origin}
              onChange={(origin) =>
                patch({ origin: origin as ItineraryRecord["origin"] })
              }
              options={itineraryOrigins.map((origin) => ({
                value: origin,
                label: "Delhi NCR",
              }))}
            />
          </AdminField>
          <AdminField label="Days">
            <AdminInput
              type="number"
              value={String(draft.days)}
              onChange={(value) => setDays(Math.max(1, Number(value) || 1))}
            />
          </AdminField>
          <AdminField label="Nights">
            <AdminInput
              type="number"
              value={String(draft.nights)}
              onChange={(value) =>
                patch({ nights: Math.max(0, Number(value) || 0) })
              }
            />
          </AdminField>
        </div>
        <AdminField label="Short description">
          <AdminTextarea
            value={draft.shortDescription}
            onChange={(shortDescription) => patch({ shortDescription })}
            rows={3}
          />
        </AdminField>
      </FormSection>

      <FormSection title="Trip tags">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminField label="Duration label">
            <AdminSelect
              value={draft.duration}
              onChange={(duration) =>
                patch({ duration: duration as ItineraryRecord["duration"] })
              }
              options={itineraryDurations.map((duration) => ({
                value: duration,
                label: itineraryDurationLabels[duration],
              }))}
            />
          </AdminField>
          <AdminField label="Trip type">
            <AdminSelect
              value={draft.tripType}
              onChange={(tripType) =>
                patch({ tripType: tripType as ItineraryRecord["tripType"] })
              }
              options={itineraryTripTypes.map((type) => ({
                value: type,
                label: itineraryTripTypeLabels[type],
              }))}
            />
          </AdminField>
          <AdminField label="Travel style">
            <AdminSelect
              value={draft.travelStyle}
              onChange={(travelStyle) =>
                patch({ travelStyle: travelStyle as ItineraryRecord["travelStyle"] })
              }
              options={itineraryTravelStyles.map((style) => ({
                value: style,
                label: itineraryTravelStyleLabels[style],
              }))}
            />
          </AdminField>
          <AdminField label="Budget category">
            <AdminSelect
              value={draft.budgetCategory}
              onChange={(budgetCategory) =>
                patch({
                  budgetCategory: budgetCategory as ItineraryRecord["budgetCategory"],
                })
              }
              options={itineraryBudgets.map((budget) => ({
                value: budget,
                label: itineraryBudgetLabels[budget],
              }))}
            />
          </AdminField>
        </div>
        <ChipMultiSelect
          label="Travel modes"
          selected={draft.travelModes}
          onChange={(travelModes) => patch({ travelModes })}
          options={itineraryTransports.map((mode) => ({
            value: mode,
            label: itineraryTransportLabels[mode],
          }))}
        />
        <ChipMultiSelect
          label="Best for"
          selected={draft.bestFor}
          onChange={(bestFor) => patch({ bestFor })}
          options={itineraryAudiences.map((audience) => ({
            value: audience,
            label: itineraryAudienceLabels[audience],
          }))}
        />
        <StringListEditor
          label="Interests"
          items={draft.interests}
          onChange={(interests) => patch({ interests })}
        />
      </FormSection>

      <FormSection title="Overview & route" defaultOpen={false}>
        <AdminField label="Overview">
          <AdminTextarea
            value={draft.overview}
            onChange={(overview) => patch({ overview })}
            rows={4}
          />
        </AdminField>
        <AdminField label="Route summary">
          <AdminTextarea
            value={draft.routeSummary}
            onChange={(routeSummary) => patch({ routeSummary })}
            rows={3}
          />
        </AdminField>
        <AdminField label="Travel time category">
          <AdminInput
            value={draft.travelTimeCategory}
            onChange={(travelTimeCategory) => patch({ travelTimeCategory })}
          />
        </AdminField>
        <AdminField label="Best time to visit">
          <AdminTextarea
            value={draft.bestTimeToVisit}
            onChange={(bestTimeToVisit) => patch({ bestTimeToVisit })}
            rows={2}
          />
        </AdminField>
        <StringListEditor
          label="Highlights"
          items={draft.highlights}
          onChange={(highlights) => patch({ highlights })}
        />
      </FormSection>

      <FormSection title="Budget">
        <AdminField label="Estimated budget (summary)">
          <AdminTextarea
            value={draft.estimatedBudget}
            onChange={(estimatedBudget) => patch({ estimatedBudget })}
            rows={2}
          />
        </AdminField>
        <PairListEditor
          label="Budget breakdown"
          items={draft.budgetLines}
          onChange={(budgetLines) => patch({ budgetLines })}
          keyLabel="Category"
          valueLabel="Estimate"
        />
      </FormSection>

      <FormSection title="Day plans">
        <div className="space-y-6">
          {draft.dayPlans.map((day, index) => (
            <DayPlanEditor
              key={day.dayNumber}
              day={day}
              onChange={(updated) =>
                updateDayPlans(
                  draft.dayPlans.map((item, i) => (i === index ? updated : item)),
                )
              }
              onRemove={() =>
                updateDayPlans(
                  draft.dayPlans
                    .filter((_, i) => i !== index)
                    .map((item, i) => ({ ...item, dayNumber: i + 1 })),
                )
              }
            />
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() =>
            updateDayPlans([
              ...draft.dayPlans,
              emptyDay(draft.dayPlans.length + 1),
            ])
          }
        >
          Add day
        </Button>
      </FormSection>

      <FormSection title="How to reach" defaultOpen={false}>
        <div className="space-y-4">
          {draft.howToReach.map((mode, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-border bg-surface-raised/50 p-4"
            >
              <AdminField label="Mode">
                <AdminSelect
                  value={mode.mode}
                  onChange={(value) =>
                    patch({
                      howToReach: draft.howToReach.map((item, i) =>
                        i === index
                          ? { ...item, mode: value as typeof mode.mode }
                          : item,
                      ),
                    })
                  }
                  options={itineraryTransports.map((transport) => ({
                    value: transport,
                    label: itineraryTransportLabels[transport],
                  }))}
                />
              </AdminField>
              <AdminField label="Summary">
                <AdminTextarea
                  value={mode.summary}
                  onChange={(summary) =>
                    patch({
                      howToReach: draft.howToReach.map((item, i) =>
                        i === index ? { ...item, summary } : item,
                      ),
                    })
                  }
                  rows={2}
                />
              </AdminField>
              <AdminField label="Note">
                <AdminTextarea
                  value={mode.note}
                  onChange={(note) =>
                    patch({
                      howToReach: draft.howToReach.map((item, i) =>
                        i === index ? { ...item, note } : item,
                      ),
                    })
                  }
                  rows={2}
                />
              </AdminField>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  patch({
                    howToReach: draft.howToReach.filter((_, i) => i !== index),
                  })
                }
              >
                Remove mode
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              patch({
                howToReach: [
                  ...draft.howToReach,
                  { mode: "car", summary: "", note: "" },
                ],
              })
            }
          >
            Add transport mode
          </Button>
        </div>
      </FormSection>

      <FormSection title="Experiences" defaultOpen={false}>
        <div className="space-y-4">
          {draft.experiences.map((experience, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-border bg-surface-raised/50 p-4"
            >
              <AdminField label="Name">
                <AdminInput
                  value={experience.name}
                  onChange={(name) =>
                    patch({
                      experiences: draft.experiences.map((item, i) =>
                        i === index ? { ...item, name } : item,
                      ),
                    })
                  }
                />
              </AdminField>
              <AdminField label="Category">
                <AdminInput
                  value={experience.category}
                  onChange={(category) =>
                    patch({
                      experiences: draft.experiences.map((item, i) =>
                        i === index ? { ...item, category } : item,
                      ),
                    })
                  }
                />
              </AdminField>
              <AdminField label="Description">
                <AdminTextarea
                  value={experience.description}
                  onChange={(description) =>
                    patch({
                      experiences: draft.experiences.map((item, i) =>
                        i === index ? { ...item, description } : item,
                      ),
                    })
                  }
                  rows={2}
                />
              </AdminField>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  patch({
                    experiences: draft.experiences.filter((_, i) => i !== index),
                  })
                }
              >
                Remove experience
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              patch({
                experiences: [
                  ...draft.experiences,
                  { name: "", description: "", category: "" },
                ],
              })
            }
          >
            Add experience
          </Button>
        </div>
      </FormSection>

      <FormSection title="Tips, packing & links" defaultOpen={false}>
        <StringListEditor
          label="Travel tips"
          items={draft.travelTips}
          onChange={(travelTips) => patch({ travelTips })}
        />
        <StringListEditor
          label="Packing suggestions"
          items={draft.packingSuggestions}
          onChange={(packingSuggestions) => patch({ packingSuggestions })}
        />
        <StringListEditor
          label="Things to know"
          items={draft.thingsToKnow}
          onChange={(thingsToKnow) => patch({ thingsToKnow })}
        />
        <StringListEditor
          label="Related destinations (slugs)"
          items={draft.relatedDestinations}
          onChange={(relatedDestinations) => patch({ relatedDestinations })}
        />
        <StringListEditor
          label="Related itineraries (slugs)"
          items={draft.relatedItineraries}
          onChange={(relatedItineraries) => patch({ relatedItineraries })}
        />
        <StringListEditor
          label="Related tools (slugs)"
          items={draft.relatedTools}
          onChange={(relatedTools) => patch({ relatedTools })}
        />
      </FormSection>

      <FormSection title="SEO & FAQ" defaultOpen={false}>
        <AdminField label="SEO title">
          <AdminInput
            value={draft.seoTitle}
            onChange={(seoTitle) => patch({ seoTitle })}
          />
        </AdminField>
        <AdminField label="SEO description">
          <AdminTextarea
            value={draft.seoDescription}
            onChange={(seoDescription) => patch({ seoDescription })}
            rows={3}
          />
        </AdminField>
        <AdminField label="Hero image URL">
          <AdminInput
            value={draft.heroImage ?? ""}
            onChange={(value) => patch({ heroImage: value.trim() || null })}
          />
        </AdminField>
        <FaqEditor faqs={draft.faq} onChange={(faq) => patch({ faq })} />
      </FormSection>
    </div>
  );
}

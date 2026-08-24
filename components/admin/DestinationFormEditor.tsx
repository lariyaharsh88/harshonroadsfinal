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
  slugifyName,
  StringListEditor,
} from "@/components/admin/forms/shared";
import { Button } from "@/components/ui/Button";
import {
  destinationAudienceLabels,
  destinationBudgetLabels,
  destinationDurationLabels,
  destinationInterestLabels,
  destinationRegionLabels,
  destinationTransportLabels,
  destinationTravelStyleLabels,
  destinationTravelTimeLabels,
  weekendSuitabilityLabels,
} from "@/lib/data/destinations/labels";
import {
  destinationAudiences,
  destinationBudgets,
  destinationDurations,
  destinationInterests,
  destinationRegions,
  destinationTransports,
  destinationTravelStyles,
  destinationTravelTimes,
  weekendSuitabilityLevels,
  type DestinationGuide,
  type DestinationItinerary,
} from "@/lib/data/destinations/types";

type SaveResult = { ok: boolean; error?: string; slug?: string };

type DestinationFormEditorProps = {
  initial: DestinationGuide;
  destinationSlugs: string[];
  viewHref?: string;
  onSave: (record: DestinationGuide) => Promise<SaveResult>;
  onDelete?: () => Promise<{ ok: boolean; error?: string }>;
  isNew?: boolean;
};

function WeekendItineraryEditor({
  items,
  onChange,
}: {
  items: DestinationItinerary[];
  onChange: (items: DestinationItinerary[]) => void;
}) {
  function updateItem(index: number, patch: Partial<DestinationItinerary>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded-xl border border-border bg-surface-raised/50 p-4"
        >
          <AdminField label="Itinerary title">
            <AdminInput
              value={item.title}
              onChange={(value) => updateItem(index, { title: value })}
            />
          </AdminField>
          <StringListEditor
            label="Steps"
            items={item.steps}
            onChange={(steps) => updateItem(index, { steps })}
            addLabel="Add step"
            placeholder="Day or step description"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            Remove itinerary
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          onChange([...items, { title: "Weekend shape", steps: ["Day one"] }])
        }
      >
        Add weekend itinerary
      </Button>
    </div>
  );
}

export function DestinationFormEditor({
  initial,
  destinationSlugs,
  viewHref,
  onSave,
  onDelete,
  isNew = false,
}: DestinationFormEditorProps) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function patch(partial: Partial<DestinationGuide>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function handleSave() {
    setMessage(null);
    setError(null);
    const record: DestinationGuide = {
      ...draft,
      id: draft.slug.trim() || draft.id,
      slug: draft.slug.trim(),
      name: draft.name.trim(),
      highlights: draft.highlights.filter(Boolean),
      whyVisit: draft.whyVisit.filter(Boolean),
      stayNotes: draft.stayNotes.filter(Boolean),
      foodNotes: draft.foodNotes.filter(Boolean),
      howToPlan: draft.howToPlan.filter(Boolean),
      travelTips: draft.travelTips.filter(Boolean),
      relatedDestinations: draft.relatedDestinations.filter(Boolean),
      faq: draft.faq.filter((item) => item.question.trim() && item.answer.trim()),
      weekendItineraries: draft.weekendItineraries
        .filter((item) => item.title.trim())
        .map((item) => ({
          ...item,
          steps: item.steps.filter(Boolean),
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
        router.replace(`/admin/destinations/${result.slug}`);
      }
      router.refresh();
    });
  }

  function handleDelete() {
    if (!onDelete || !window.confirm("Delete this destination? This cannot be undone.")) {
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
      router.push("/admin/destinations");
      router.refresh();
    });
  }

  const relatedOptions = destinationSlugs
    .filter((slug) => slug !== draft.slug)
    .map((slug) => ({ value: slug, label: slug }));

  return (
    <div className="admin-form space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          {isNew ? "New destination" : `Edit ${draft.name}`}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Update destination fields below. Changes appear on the public site after you save.
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
            onClick={() => patch({ slug: slugifyName(draft.name), id: slugifyName(draft.name) })}
          >
            Generate slug from name
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

      <FormSection title="Basics" description="Name, slug and card summary.">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Name" hint="Display name on cards and pages.">
            <AdminInput
              value={draft.name}
              onChange={(value) => patch({ name: value })}
              required
            />
          </AdminField>
          <AdminField label="Slug" hint="URL path: /destinations/[slug]">
            <AdminInput
              value={draft.slug}
              onChange={(value) => patch({ slug: value, id: value })}
              required
            />
          </AdminField>
          <AdminField label="State">
            <AdminInput
              value={draft.state}
              onChange={(value) => patch({ state: value })}
            />
          </AdminField>
          <AdminField label="Region">
            <AdminSelect
              value={draft.region}
              onChange={(value) =>
                patch({ region: value as DestinationGuide["region"] })
              }
              options={destinationRegions.map((region) => ({
                value: region,
                label: destinationRegionLabels[region],
              }))}
            />
          </AdminField>
        </div>
        <AdminField label="Short description">
          <AdminTextarea
            value={draft.shortDescription}
            onChange={(value) => patch({ shortDescription: value })}
            rows={3}
          />
        </AdminField>
      </FormSection>

      <FormSection title="Trip details" description="Duration, budget and travel bands.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminField label="Default trip duration">
            <AdminSelect
              value={draft.tripDuration}
              onChange={(value) =>
                patch({ tripDuration: value as DestinationGuide["tripDuration"] })
              }
              options={destinationDurations.map((duration) => ({
                value: duration,
                label: destinationDurationLabels[duration],
              }))}
            />
          </AdminField>
          <AdminField label="Budget category">
            <AdminSelect
              value={draft.budgetCategory}
              onChange={(value) =>
                patch({ budgetCategory: value as DestinationGuide["budgetCategory"] })
              }
              options={destinationBudgets.map((budget) => ({
                value: budget,
                label: destinationBudgetLabels[budget],
              }))}
            />
          </AdminField>
          <AdminField label="Travel time">
            <AdminSelect
              value={draft.travelTimeCategory}
              onChange={(value) =>
                patch({
                  travelTimeCategory: value as DestinationGuide["travelTimeCategory"],
                })
              }
              options={destinationTravelTimes.map((time) => ({
                value: time,
                label: destinationTravelTimeLabels[time],
              }))}
            />
          </AdminField>
          <AdminField label="Weekend suitability">
            <AdminSelect
              value={draft.weekendSuitability}
              onChange={(value) =>
                patch({
                  weekendSuitability: value as DestinationGuide["weekendSuitability"],
                })
              }
              options={weekendSuitabilityLevels.map((level) => ({
                value: level,
                label: weekendSuitabilityLabels[level],
              }))}
            />
          </AdminField>
        </div>
        <AdminField label="Best time to visit">
          <AdminTextarea
            value={draft.bestTimeToVisit}
            onChange={(value) => patch({ bestTimeToVisit: value })}
            rows={2}
          />
        </AdminField>
        <ChipMultiSelect
          label="Duration options"
          selected={draft.durationOptions}
          onChange={(values) => patch({ durationOptions: values })}
          options={destinationDurations.map((duration) => ({
            value: duration,
            label: destinationDurationLabels[duration],
          }))}
        />
        <ChipMultiSelect
          label="Best for"
          selected={draft.bestFor}
          onChange={(values) => patch({ bestFor: values })}
          options={destinationAudiences.map((audience) => ({
            value: audience,
            label: destinationAudienceLabels[audience],
          }))}
        />
        <ChipMultiSelect
          label="Interests"
          selected={draft.interests}
          onChange={(values) => patch({ interests: values })}
          options={destinationInterests.map((interest) => ({
            value: interest,
            label: destinationInterestLabels[interest],
          }))}
        />
        <ChipMultiSelect
          label="Transport options"
          selected={draft.transportOptions}
          onChange={(values) => patch({ transportOptions: values })}
          options={destinationTransports.map((transport) => ({
            value: transport,
            label: destinationTransportLabels[transport],
          }))}
        />
        <ChipMultiSelect
          label="Travel styles"
          selected={draft.travelStyles}
          onChange={(values) => patch({ travelStyles: values })}
          options={destinationTravelStyles.map((style) => ({
            value: style,
            label: destinationTravelStyleLabels[style],
          }))}
        />
      </FormSection>

      <FormSection title="SEO" defaultOpen={false}>
        <AdminField label="SEO title">
          <AdminInput
            value={draft.seoTitle}
            onChange={(value) => patch({ seoTitle: value })}
          />
        </AdminField>
        <AdminField label="SEO description">
          <AdminTextarea
            value={draft.seoDescription}
            onChange={(value) => patch({ seoDescription: value })}
            rows={3}
          />
        </AdminField>
        <AdminField label="Hero image URL" hint="Optional. Leave empty for gradient placeholder.">
          <AdminInput
            value={draft.heroImage ?? ""}
            onChange={(value) => patch({ heroImage: value.trim() || null })}
            placeholder="https://…"
          />
        </AdminField>
      </FormSection>

      <FormSection title="Page content">
        <AdminField label="Introduction">
          <AdminTextarea
            value={draft.introduction}
            onChange={(value) => patch({ introduction: value })}
            rows={4}
          />
        </AdminField>
        <AdminField label="Why weekend">
          <AdminTextarea
            value={draft.whyWeekend}
            onChange={(value) => patch({ whyWeekend: value })}
            rows={3}
          />
        </AdminField>
        <StringListEditor
          label="Highlights"
          items={draft.highlights}
          onChange={(highlights) => patch({ highlights })}
        />
        <StringListEditor
          label="Why visit"
          items={draft.whyVisit}
          onChange={(whyVisit) => patch({ whyVisit })}
        />
        <StringListEditor
          label="Stay notes"
          items={draft.stayNotes}
          onChange={(stayNotes) => patch({ stayNotes })}
        />
        <StringListEditor
          label="Food notes"
          items={draft.foodNotes}
          onChange={(foodNotes) => patch({ foodNotes })}
        />
        <StringListEditor
          label="How to plan"
          items={draft.howToPlan}
          onChange={(howToPlan) => patch({ howToPlan })}
        />
        <StringListEditor
          label="Travel tips"
          items={draft.travelTips}
          onChange={(travelTips) => patch({ travelTips })}
        />
      </FormSection>

      <FormSection title="Weekend itineraries" defaultOpen={false}>
        <WeekendItineraryEditor
          items={draft.weekendItineraries}
          onChange={(weekendItineraries) => patch({ weekendItineraries })}
        />
      </FormSection>

      <FormSection title="Related & FAQ" defaultOpen={false}>
        <ChipMultiSelect
          label="Related destinations"
          selected={draft.relatedDestinations}
          onChange={(relatedDestinations) => patch({ relatedDestinations })}
          options={relatedOptions}
        />
        <FaqEditor faqs={draft.faq} onChange={(faq) => patch({ faq })} />
      </FormSection>
    </div>
  );
}

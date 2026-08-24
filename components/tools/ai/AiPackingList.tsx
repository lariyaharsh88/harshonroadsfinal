"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { generateAiPackingListAction } from "@/lib/ai/actions/generate-ai-packing-list";
import {
  aiPackingListResultSchema,
  packingDurationLabels,
  packingDurations,
  packingListCategories,
  packingListCategoryLabels,
  packingPriorityLabels,
  packingPriorities,
  packingSeasonLabels,
  packingSeasons,
  packingTripTypeLabels,
  packingTripTypes,
  type AiPackingListInput,
  type AiPackingListItem,
  type AiPackingListResult,
} from "@/lib/ai/schemas/ai-packing-list";
import { ChoiceButton } from "@/components/tools/weekend/ChoiceButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import {
  AiChip,
  AiError,
  AiFieldRow,
  AiGenerateButton,
  AiInlineInput,
  AiSelect,
  AiToolShell,
} from "@/components/tools/ai/shared/AiShell";
import { AiPlannerFrame } from "@/components/tools/ai/shared/AiPlannerFrame";
import { destinations } from "@/lib/tools/destinations";
import {
  getAiPackingListServerSnapshot,
  getAiPackingListSnapshot,
  subscribeAiPackingList,
  writeAiPackingList,
} from "@/lib/tools/ai-packing-list-store";
import {
  interestLabels,
  transportLabels,
} from "@/lib/tools/weekend-engine";
import {
  interests,
  transports,
  type Interest,
} from "@/types/destination";

const destinationOptions = [...destinations]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((item) => ({ value: item.slug, label: item.name }));

type Draft = {
  destinationSlug: string;
  duration: AiPackingListInput["duration"];
  season: AiPackingListInput["season"];
  transport: AiPackingListInput["transport"];
  tripType: AiPackingListInput["tripType"];
  activities: Interest[];
  travellerCount: number;
};

const emptyDraft: Draft = {
  destinationSlug: "rishikesh",
  duration: "2-nights",
  season: "winter",
  transport: "car",
  tripType: "mountain",
  activities: ["mountains", "nature"],
  travellerCount: 2,
};

function toInput(draft: Draft): AiPackingListInput | null {
  if (!draft.destinationSlug || draft.activities.length === 0) {
    return null;
  }
  if (draft.travellerCount < 1 || draft.travellerCount > 12) {
    return null;
  }
  return {
    destinationSlug: draft.destinationSlug,
    duration: draft.duration,
    season: draft.season,
    transport: draft.transport,
    tripType: draft.tripType,
    activities: draft.activities,
    travellerCount: draft.travellerCount,
  };
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `custom-${crypto.randomUUID()}`;
  }
  return `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseStoredList(raw: string | null): AiPackingListResult | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = aiPackingListResultSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function draftFromResult(result: AiPackingListResult): Draft {
  return {
    destinationSlug: result.destinationSlug,
    duration: result.duration,
    season: result.season,
    transport: result.transport,
    tripType: result.tripType,
    activities: result.activities,
    travellerCount: result.travellerCount,
  };
}

function inputFromResult(result: AiPackingListResult): AiPackingListInput {
  return {
    destinationSlug: result.destinationSlug,
    duration: result.duration,
    season: result.season,
    transport: result.transport,
    tripType: result.tripType,
    activities: result.activities,
    travellerCount: result.travellerCount,
  };
}


export function AiPackingList() {
  const storedRaw = useSyncExternalStore(
    subscribeAiPackingList,
    getAiPackingListSnapshot,
    getAiPackingListServerSnapshot,
  );
  const storedResult = useMemo(
    () => parseStoredList(storedRaw),
    [storedRaw],
  );
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | AiPackingListItem["priority"]
  >("all");
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] =
    useState<AiPackingListItem["category"]>("travel-essentials");
  const [customPriority, setCustomPriority] =
    useState<AiPackingListItem["priority"]>("optional");
  const [statusNote, setStatusNote] = useState("");

  const result = editing ? null : storedResult;
  const input = useMemo(() => toInput(draft), [draft]);
  const shareUrl = "/tools/ai-packing-list";

  function persist(next: AiPackingListResult | null) {
    writeAiPackingList(next ? JSON.stringify(next) : null);
    if (next) {
      setDraft(draftFromResult(next));
      setEditing(false);
    }
  }

  function flash(message: string) {
    setStatusNote(message);
    window.setTimeout(() => setStatusNote(""), 2000);
  }

  async function generate(payload: AiPackingListInput | null = input) {
    if (!payload) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await generateAiPackingListAction(payload);
      if (!response.ok) {
        setError(response.message);
        return;
      }
      persist(response.data);
      flash("List saved on this device");
    } catch {
      setError("The packing list could not be generated. Please try again.");
    } finally {
      setPending(false);
    }
  }

  function togglePacked(id: string) {
    if (!result) {
      return;
    }
    persist({
      ...result,
      items: result.items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    });
  }

  function deleteItem(id: string) {
    if (!result) {
      return;
    }
    persist({
      ...result,
      items: result.items.filter((item) => item.id !== id),
    });
  }

  function addCustom(event: FormEvent) {
    event.preventDefault();
    if (!result) {
      return;
    }
    const name = customName.trim();
    if (name.length < 2) {
      return;
    }
    persist({
      ...result,
      items: [
        ...result.items,
        {
          id: createId(),
          name,
          category: customCategory,
          priority: customPriority,
          custom: true,
          packed: false,
        },
      ],
    });
    setCustomName("");
    flash("Custom item added");
  }

  function resetList() {
    persist(null);
    setDraft(emptyDraft);
    setEditing(false);
    setError(null);
    setPriorityFilter("all");
    flash("Checklist reset");
  }

  function toggleActivity(value: Interest) {
    setDraft((current) => ({
      ...current,
      activities: current.activities.includes(value)
        ? current.activities.filter((item) => item !== value)
        : [...current.activities, value].slice(0, 8),
    }));
  }

  const visibleItems = useMemo(() => {
    if (!result) {
      return [];
    }
    return result.items.filter((item) =>
      priorityFilter === "all" ? true : item.priority === priorityFilter,
    );
  }, [result, priorityFilter]);

  const grouped = useMemo(() => {
    return packingListCategories
      .map((category) => ({
        category,
        items: visibleItems.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [visibleItems]);

  const packedCount = result
    ? result.items.filter((item) => item.packed).length
    : 0;

  const shareText = result
    ? `HarshOnRoads packing list: ${result.tripLabel}`
    : "HarshOnRoads AI Packing List";

  if (result) {
    return (
      <div className="print-results space-y-6">
        <div className="no-print rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-muted-strong">
          This is a packing sketch for a HarshOnRoads destination, not a
          complete kit. Tick items, add your own, then check weather, park
          rules and riding-gear laws before you go. Saved only in this browser.
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Personalized packing list
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            {result.tripLabel}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {result.destinationName} ({result.destinationRegion}).{" "}
            {packingDurationLabels[result.duration]},{" "}
            {packingSeasonLabels[result.season]},{" "}
            {transportLabels[result.transport]},{" "}
            {packingTripTypeLabels[result.tripType]}, {result.travellerCount}{" "}
            traveller{result.travellerCount === 1 ? "" : "s"}. Packed{" "}
            {packedCount} of {result.items.length}.
          </p>
        </div>
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => {
              setDraft(draftFromResult(result));
              setEditing(true);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Edit inputs
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              void generate(inputFromResult(result));
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            {pending ? "Writing list…" : "Regenerate list"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Print
          </button>
          <button
            type="button"
            onClick={resetList}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Reset
          </button>
          <ShareButton
            title="HarshOnRoads AI Packing List"
            url={shareUrl}
            text={shareText}
          />
        </div>
        {error ? (
          <p className="no-print text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}
        {statusNote ? (
          <p className="no-print text-sm text-accent" role="status">
            {statusNote}
          </p>
        ) : null}

        <div className="no-print flex flex-wrap gap-2">
          <ChoiceButton
            selected={priorityFilter === "all"}
            onClick={() => setPriorityFilter("all")}
          >
            All items
          </ChoiceButton>
          {packingPriorities.map((value) => (
            <ChoiceButton
              key={value}
              selected={priorityFilter === value}
              onClick={() => setPriorityFilter(value)}
            >
              {packingPriorityLabels[value]}
            </ChoiceButton>
          ))}
        </div>

        <form
          onSubmit={addCustom}
          className="no-print grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)_minmax(0,10rem)_auto] sm:items-end"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-strong">
              Add custom item
            </span>
            <input
              value={customName}
              onChange={(event) => setCustomName(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base"
              placeholder="e.g. Kid’s jacket"
            />
          </label>
          <ToolSelect
            name="custom-category"
            label="Category"
            value={customCategory}
            options={packingListCategories.map((category) => ({
              value: category,
              label: packingListCategoryLabels[category],
            }))}
            onChange={(value) => {
              setCustomCategory(value as AiPackingListItem["category"]);
            }}
          />
          <ToolSelect
            name="custom-priority"
            label="Priority"
            value={customPriority}
            options={packingPriorities.map((priority) => ({
              value: priority,
              label: packingPriorityLabels[priority],
            }))}
            onChange={(value) => {
              setCustomPriority(value as AiPackingListItem["priority"]);
            }}
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold"
          >
            Add item
          </button>
        </form>

        <div className="space-y-8">
          {grouped.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`${group.category}-heading`}
            >
              <h3
                id={`${group.category}-heading`}
                className="font-display text-lg font-extrabold tracking-tight"
              >
                {packingListCategoryLabels[group.category]}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-2"
                  >
                    <label className="flex min-h-11 flex-1 cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => togglePacked(item.id)}
                        className="size-4 accent-[var(--accent)]"
                      />
                      <span
                        className={
                          item.packed
                            ? "text-sm text-muted line-through"
                            : "text-sm text-foreground"
                        }
                      >
                        {item.name}
                        <span className="ml-2 text-xs text-muted">
                          {packingPriorityLabels[item.priority]}
                          {item.custom ? " · custom" : ""}
                        </span>
                        {item.note ? (
                          <span className="mt-1 block text-xs leading-5 text-muted">
                            {item.note}
                          </span>
                        ) : null}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      className="no-print mt-2 text-xs font-semibold text-muted hover:text-foreground"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Card className="bg-surface-raised">
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Packing notes
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
            {result.packingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
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
          <div className="mt-6 no-print flex flex-wrap gap-3">
            <ButtonLink href={`/destinations/${result.destinationSlug}`}>
              Open destination page
            </ButtonLink>
            <ButtonLink href="/tools/weekend-packing-list" variant="secondary">
              Rule-based packing list
            </ButtonLink>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AiPlannerFrame
      pending={pending}
      loadingContext={draft.destinationSlug}
      toolLabel="packing list"
      onSubmit={(event) => {
        event.preventDefault();
        void generate();
      }}
    >
      <AiToolShell
        title="Your packing list, one brief"
        hint="Pick trip details — one generate. Ticks save in this browser only."
        footer={
          <>
            {error ? <AiError message={error} /> : null}
            {statusNote ? (
              <p className="mt-3 text-sm text-teal" role="status">
                {statusNote}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AiGenerateButton
                type="submit"
                disabled={!input}
                label="Generate my plan"
                pendingLabel="Writing list…"
              />
              {storedResult ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setEditing(false)}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold disabled:opacity-40"
                >
                  Back to saved list
                </button>
              ) : null}
            </div>
          </>
        }
      >
      <AiSelect
        label="Destination"
        name="destination"
        value={draft.destinationSlug}
        onChange={(value) =>
          setDraft((current) => ({ ...current, destinationSlug: value }))
        }
        options={destinationOptions}
      />

      <AiFieldRow label="Duration">
        {packingDurations.map((value) => (
          <AiChip
            key={value}
            selected={draft.duration === value}
            onClick={() => setDraft((current) => ({ ...current, duration: value }))}
          >
            {packingDurationLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiFieldRow label="Season">
        {packingSeasons.map((value) => (
          <AiChip
            key={value}
            selected={draft.season === value}
            onClick={() => setDraft((current) => ({ ...current, season: value }))}
          >
            {packingSeasonLabels[value]}
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

      <AiFieldRow label="Trip type">
        {packingTripTypes.map((value) => (
          <AiChip
            key={value}
            selected={draft.tripType === value}
            onClick={() => setDraft((current) => ({ ...current, tripType: value }))}
          >
            {packingTripTypeLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiFieldRow label="Activities" hint="Pick 1–8">
        {interests.map((value) => (
          <AiChip
            key={value}
            multi
            selected={draft.activities.includes(value)}
            onClick={() => toggleActivity(value)}
          >
            {interestLabels[value]}
          </AiChip>
        ))}
      </AiFieldRow>

      <AiInlineInput
        label="Travellers"
        name="travellerCount"
        type="number"
        min={1}
        max={12}
        value={String(draft.travellerCount)}
        onChange={(value) =>
          setDraft((current) => ({
            ...current,
            travellerCount: Math.min(
              12,
              Math.max(1, Math.round(Number(value) || 1)),
            ),
          }))
        }
      />
      </AiToolShell>
    </AiPlannerFrame>
  );
}

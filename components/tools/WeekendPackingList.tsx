"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { ToolSelect } from "@/components/tools/ToolSelect";
import {
  defaultPackingSelection,
  generatePackingItems,
  isPackingCategory,
  isPackingDuration,
  isPackingSeason,
  isPackingTransport,
  isPackingTripType,
  packingCategoryLabels,
  packingCategoryOrder,
  packingDurations,
  packingSeasons,
  packingTransports,
  packingTripTypes,
  selectionLabels,
  type PackingCategory,
  type PackingLine,
  type PackingSelection,
} from "@/lib/tools/weekend-packing";

const STORAGE_KEY = "harshonroads-weekend-packing-v1";

type Draft = {
  selection: PackingSelection;
  checkedIds: string[];
  removedIds: string[];
  custom: PackingLine[];
};

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function defaultDraft(): Draft {
  return {
    selection: defaultPackingSelection,
    checkedIds: [],
    removedIds: [],
    custom: [],
  };
}

function parseDraft(raw: string): Draft | null {
  try {
    const data = JSON.parse(raw) as Draft;
    if (
      !data?.selection ||
      !isPackingDuration(data.selection.duration) ||
      !isPackingSeason(data.selection.season) ||
      !isPackingTripType(data.selection.tripType) ||
      !isPackingTransport(data.selection.transport) ||
      !Array.isArray(data.checkedIds) ||
      !Array.isArray(data.removedIds) ||
      !Array.isArray(data.custom)
    ) {
      return null;
    }
    const custom = data.custom.filter(
      (item): item is PackingLine =>
        Boolean(item) &&
        typeof item.id === "string" &&
        typeof item.label === "string" &&
        isPackingCategory(item.category),
    );
    return {
      selection: data.selection,
      checkedIds: data.checkedIds.filter((id) => typeof id === "string"),
      removedIds: data.removedIds.filter((id) => typeof id === "string"),
      custom: custom.map((item) => ({ ...item, custom: true })),
    };
  } catch {
    return null;
  }
}

export function WeekendPackingList() {
  const headingId = useId();
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [customLabel, setCustomLabel] = useState("");
  const [customCategory, setCustomCategory] =
    useState<PackingCategory>("travel-essentials");
  const [statusNote, setStatusNote] = useState("");

  const generated = useMemo(
    () =>
      generatePackingItems(draft.selection).filter(
        (item) => !draft.removedIds.includes(item.id),
      ),
    [draft.selection, draft.removedIds],
  );

  const lines: PackingLine[] = useMemo(() => {
    const base: PackingLine[] = generated.map((item) => ({
      id: item.id,
      label: item.label,
      category: item.category,
      custom: false,
    }));
    return [...base, ...draft.custom];
  }, [generated, draft.custom]);

  const grouped = useMemo(() => {
    return packingCategoryOrder
      .map((category) => ({
        category,
        items: lines.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [lines]);

  const checkedSet = useMemo(
    () => new Set(draft.checkedIds),
    [draft.checkedIds],
  );
  const packedCount = lines.filter((item) => checkedSet.has(item.id)).length;

  function persist(next: Draft) {
    setDraft(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function flash(message: string) {
    setStatusNote(message);
    window.setTimeout(() => setStatusNote(""), 2000);
  }

  function updateSelection<K extends keyof PackingSelection>(
    key: K,
    value: PackingSelection[K],
  ) {
    persist({
      ...draft,
      selection: { ...draft.selection, [key]: value },
    });
  }

  function toggleItem(id: string) {
    const next = checkedSet.has(id)
      ? draft.checkedIds.filter((item) => item !== id)
      : [...draft.checkedIds, id];
    persist({ ...draft, checkedIds: next });
  }

  function deleteItem(line: PackingLine) {
    if (line.custom) {
      persist({
        ...draft,
        custom: draft.custom.filter((item) => item.id !== line.id),
        checkedIds: draft.checkedIds.filter((id) => id !== line.id),
      });
      return;
    }
    persist({
      ...draft,
      removedIds: draft.removedIds.includes(line.id)
        ? draft.removedIds
        : [...draft.removedIds, line.id],
      checkedIds: draft.checkedIds.filter((id) => id !== line.id),
    });
  }

  function addCustom(event: FormEvent) {
    event.preventDefault();
    const label = customLabel.trim();
    if (!label) {
      return;
    }
    persist({
      ...draft,
      custom: [
        ...draft.custom,
        {
          id: createId(),
          label,
          category: customCategory,
          custom: true,
        },
      ],
    });
    setCustomLabel("");
  }

  function reset() {
    const next = defaultDraft();
    setDraft(next);
    window.localStorage.removeItem(STORAGE_KEY);
    setCustomLabel("");
    flash("Checklist reset");
  }

  function loadSaved() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      flash("Nothing saved on this device yet");
      return;
    }
    const parsed = parseDraft(raw);
    if (!parsed) {
      flash("Saved list could not be read");
      return;
    }
    setDraft(parsed);
    flash("Loaded saved checklist");
  }

  return (
    <div className="space-y-8">
      <Card className="no-print">
        <h2
          id={headingId}
          className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Trip details
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          The list updates with duration, season, trip type and transport.
          Ticks and custom items save in this browser only — no login.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ToolSelect
            name="packing-duration"
            label="Trip duration"
            value={draft.selection.duration}
            options={[...packingDurations]}
            onChange={(value) => {
              if (isPackingDuration(value)) {
                updateSelection("duration", value);
              }
            }}
          />
          <ToolSelect
            name="packing-season"
            label="Season"
            value={draft.selection.season}
            options={[...packingSeasons]}
            onChange={(value) => {
              if (isPackingSeason(value)) {
                updateSelection("season", value);
              }
            }}
          />
          <ToolSelect
            name="packing-type"
            label="Trip type"
            value={draft.selection.tripType}
            options={[...packingTripTypes]}
            onChange={(value) => {
              if (isPackingTripType(value)) {
                updateSelection("tripType", value);
              }
            }}
          />
          <ToolSelect
            name="packing-transport"
            label="Transport"
            value={draft.selection.transport}
            options={[...packingTransports]}
            onChange={(value) => {
              if (isPackingTransport(value)) {
                updateSelection("transport", value);
              }
            }}
          />
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Weekend packing checklist
            </h2>
            <p className="mt-2 text-sm text-muted">
              {selectionLabels(draft.selection)}
            </p>
            <p className="mt-1 text-sm text-muted-strong">
              Packed {packedCount} of {lines.length}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-[#fff8ef]"
            >
              Print
            </button>
            <button
              type="button"
              onClick={loadSaved}
              className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold"
            >
              Load saved
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold"
            >
              Reset
            </button>
          </div>
        </div>
        {statusNote ? (
          <p className="no-print mt-3 text-sm text-accent" role="status">
            {statusNote}
          </p>
        ) : null}

        <form
          onSubmit={addCustom}
          className="no-print mt-6 grid gap-3 rounded-xl border border-border bg-surface-raised p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)_auto] sm:items-end"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-strong">
              Add custom item
            </span>
            <input
              value={customLabel}
              onChange={(event) => setCustomLabel(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base"
              placeholder="e.g. Kid’s jacket"
            />
          </label>
          <ToolSelect
            name="custom-category"
            label="Category"
            value={customCategory}
            options={packingCategoryOrder.map((category) => ({
              value: category,
              label: packingCategoryLabels[category],
            }))}
            onChange={(value) => {
              if (isPackingCategory(value)) {
                setCustomCategory(value);
              }
            }}
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold"
          >
            Add item
          </button>
        </form>

        <div className="mt-8 space-y-8">
          {grouped.map((group) => (
            <section key={group.category} aria-labelledby={`${group.category}-heading`}>
              <h3
                id={`${group.category}-heading`}
                className="font-display text-lg font-extrabold tracking-tight"
              >
                {packingCategoryLabels[group.category]}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => {
                  const checked = checkedSet.has(item.id);
                  return (
                    <li
                      key={item.id}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-2"
                    >
                      <label className="flex min-h-11 flex-1 cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleItem(item.id)}
                          className="size-4 accent-[var(--accent)]"
                        />
                        <span
                          className={
                            checked
                              ? "text-sm text-muted line-through"
                              : "text-sm text-foreground"
                          }
                        >
                          {item.label}
                          {item.custom ? (
                            <span className="ml-2 text-xs text-muted">
                              (custom)
                            </span>
                          ) : null}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => deleteItem(item)}
                        className="no-print mt-2 text-xs font-semibold text-muted hover:text-foreground"
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}

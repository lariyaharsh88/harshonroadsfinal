"use client";

import { useId, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { formatInr } from "@/lib/tools/engine";
import {
  formatSettlementText,
  splitTripExpenses,
} from "@/lib/tools/trip-splitter";
import {
  expenseCategories,
  type ExpenseCategory,
  type SplitExpense,
  type SplitPerson,
} from "@/types/splitter";

const STORAGE_KEY = "harshonroads-trip-splitter-v1";
const MIN_PEOPLE = 2;
const MAX_PEOPLE = 20;

type Draft = {
  people: SplitPerson[];
  expenses: SplitExpense[];
};

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function emptyPerson(index: number): SplitPerson {
  return { id: createId(), name: `Person ${index}` };
}

function defaultDraft(): Draft {
  return {
    people: [emptyPerson(1), emptyPerson(2)],
    expenses: [],
  };
}

function parseDraft(raw: string): Draft | null {
  try {
    const data = JSON.parse(raw) as Draft;
    if (!Array.isArray(data.people) || !Array.isArray(data.expenses)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function TripCostSplitter() {
  const headingId = useId();
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [shareNote, setShareNote] = useState("");

  const result = useMemo(
    () => splitTripExpenses(draft.people, draft.expenses),
    [draft],
  );

  function persist(next: Draft) {
    setDraft(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function updatePerson(id: string, name: string) {
    persist({
      ...draft,
      people: draft.people.map((person) =>
        person.id === id ? { ...person, name } : person,
      ),
    });
  }

  function addPerson() {
    if (draft.people.length >= MAX_PEOPLE) {
      return;
    }
    persist({
      ...draft,
      people: [...draft.people, emptyPerson(draft.people.length + 1)],
    });
  }

  function removePerson(id: string) {
    if (draft.people.length <= MIN_PEOPLE) {
      return;
    }
    if (draft.expenses.some((item) => item.paidById === id)) {
      return;
    }
    persist({
      ...draft,
      people: draft.people.filter((person) => person.id !== id),
    });
  }

  function addExpense() {
    persist({
      ...draft,
      expenses: [
        ...draft.expenses,
        {
          id: createId(),
          category: "Food",
          amount: 0,
          paidById: draft.people[0]?.id ?? "",
        },
      ],
    });
  }

  function updateExpense(
    id: string,
    patch: Partial<Pick<SplitExpense, "category" | "amount" | "paidById">>,
  ) {
    persist({
      ...draft,
      expenses: draft.expenses.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  }

  function removeExpense(id: string) {
    persist({
      ...draft,
      expenses: draft.expenses.filter((item) => item.id !== id),
    });
  }

  function reset() {
    const next = defaultDraft();
    persist(next);
    window.localStorage.removeItem(STORAGE_KEY);
    setShareNote("");
  }

  function loadSaved() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setShareNote("Nothing saved on this device");
      window.setTimeout(() => setShareNote(""), 2000);
      return;
    }
    const parsed = parseDraft(saved);
    if (parsed && parsed.people.length >= MIN_PEOPLE) {
      setDraft(parsed);
    }
  }

  async function share() {
    const text = formatSettlementText(result);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Trip Cost Splitter — HarshOnRoads",
          text,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }
    await navigator.clipboard.writeText(text);
    setShareNote("Settlement copied");
    window.setTimeout(() => setShareNote(""), 2000);
  }

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id={headingId}
              className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              People
            </h2>
            <p className="mt-2 text-sm text-muted">
              {draft.people.length} travellers. Names stay on this device only.
            </p>
          </div>
          <button
            type="button"
            onClick={addPerson}
            disabled={draft.people.length >= MAX_PEOPLE}
            className="no-print inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-[#fff8ef] disabled:opacity-40"
          >
            Add person
          </button>
        </div>
        <ul className="mt-6 space-y-3">
          {draft.people.map((person, index) => {
            const locked = draft.expenses.some(
              (item) => item.paidById === person.id,
            );
            return (
              <li
                key={person.id}
                className="flex flex-col gap-2 sm:flex-row sm:items-center"
              >
                <label className="block flex-1">
                  <span className="sr-only">Name {index + 1}</span>
                  <input
                    value={person.name}
                    onChange={(event) =>
                      updatePerson(person.id, event.target.value)
                    }
                    className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-base"
                    placeholder={`Person ${index + 1}`}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removePerson(person.id)}
                  disabled={draft.people.length <= MIN_PEOPLE || locked}
                  className="no-print min-h-11 rounded-full border border-border px-4 text-sm font-semibold disabled:opacity-40"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        {draft.expenses.length > 0 ? (
          <p className="mt-4 text-xs text-muted">
            A person who paid an expense cannot be removed until that line is
            deleted or reassigned.
          </p>
        ) : null}
      </Card>

      <Card>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Expenses
            </h2>
            <p className="mt-2 text-sm text-muted">
              Amount in rupees. Who paid the bill at the counter.
            </p>
          </div>
          <button
            type="button"
            onClick={addExpense}
            className="no-print inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-[#fff8ef]"
          >
            Add expense
          </button>
        </div>
        {draft.expenses.length === 0 ? (
          <p className="mt-6 text-sm text-muted">No expenses yet.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {draft.expenses.map((expense) => (
              <li
                key={expense.id}
                className="grid gap-3 rounded-2xl border border-border p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Category</span>
                  <select
                    value={expense.category}
                    onChange={(event) =>
                      updateExpense(expense.id, {
                        category: event.target.value as ExpenseCategory,
                      })
                    }
                    className="min-h-11 w-full rounded-xl border border-border bg-background px-3"
                  >
                    {expenseCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Amount</span>
                  <span className="flex min-h-11 items-center rounded-xl border border-border bg-background px-3">
                    <span className="mr-2 text-muted">₹</span>
                    <input
                      inputMode="decimal"
                      value={
                        expense.amount === 0 ? "" : String(expense.amount)
                      }
                      onChange={(event) => {
                        const raw = event.target.value;
                        const amount = raw === "" ? 0 : Number(raw);
                        updateExpense(expense.id, {
                          amount: Number.isFinite(amount) ? amount : 0,
                        });
                      }}
                      className="min-w-0 flex-1 bg-transparent outline-none"
                      placeholder="0"
                    />
                  </span>
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Paid by</span>
                  <select
                    value={expense.paidById}
                    onChange={(event) =>
                      updateExpense(expense.id, {
                        paidById: event.target.value,
                      })
                    }
                    className="min-h-11 w-full rounded-xl border border-border bg-background px-3"
                  >
                    {draft.people.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name.trim() || "Unnamed"}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => removeExpense(expense.id)}
                  className="no-print min-h-11 self-end rounded-full border border-border px-4 text-sm font-semibold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="print-block">
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Settlement
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Equal split. Fair share is total divided by the number of people,
          rounded to the paise so the shares add up exactly.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
              Total trip expense
            </dt>
            <dd className="mt-1 font-display text-3xl">
              {formatInr(result.total)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
              Fair share
            </dt>
            <dd className="mt-1 font-display text-3xl">
              {formatInr(result.fairShare)} each
            </dd>
          </div>
        </dl>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border">
          {result.balances.map((item) => (
            <li
              key={item.personId}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">
                Paid {formatInr(item.paid)} · share {formatInr(item.share)} ·{" "}
                {item.net > 0.004
                  ? `should receive ${formatInr(item.net)}`
                  : item.net < -0.004
                    ? `owes ${formatInr(-item.net)}`
                    : "settled"}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="mt-8 font-display text-xl font-extrabold tracking-tight">
          Who pays whom
        </h3>
        {result.transfers.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Everyone is settled.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {result.transfers.map((item) => (
              <li
                key={`${item.fromId}-${item.toId}-${item.amount}`}
                className="rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm"
              >
                <span className="font-semibold">{item.fromName}</span>
                {" → "}
                <span className="font-semibold">{item.toName}</span>
                {` ${formatInr(item.amount)}`}
              </li>
            ))}
          </ul>
        )}
        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#fff8ef]"
          >
            Print
          </button>
          <button
            type="button"
            onClick={() => {
              void share();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            {shareNote || "Share"}
          </button>
          <button
            type="button"
            onClick={loadSaved}
            className="no-print inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Load saved
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            Reset
          </button>
        </div>
      </Card>
    </div>
  );
}

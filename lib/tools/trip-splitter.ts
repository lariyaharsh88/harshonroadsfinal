import { formatInr, roundTo } from "@/lib/tools/engine";
import type {
  PersonBalance,
  SettlementTransfer,
  SplitExpense,
  SplitPerson,
  SplitResult,
} from "@/types/splitter";

function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

function fromPaise(paise: number): number {
  return roundTo(paise / 100, 2);
}

function sharesInPaise(totalPaise: number, count: number): number[] {
  if (count <= 0) {
    return [];
  }
  const base = Math.floor(totalPaise / count);
  const remainder = totalPaise - base * count;
  return Array.from({ length: count }, (_, index) =>
    index < remainder ? base + 1 : base,
  );
}

export function splitTripExpenses(
  people: SplitPerson[],
  expenses: SplitExpense[],
): SplitResult {
  const totalPaise = expenses.reduce((sum, item) => {
    const amount = Number.isFinite(item.amount) ? item.amount : 0;
    return sum + toPaise(Math.max(0, amount));
  }, 0);

  const paidPaise = new Map<string, number>(
    people.map((person) => [person.id, 0]),
  );

  for (const expense of expenses) {
    const amount = Number.isFinite(expense.amount)
      ? toPaise(Math.max(0, expense.amount))
      : 0;
    paidPaise.set(
      expense.paidById,
      (paidPaise.get(expense.paidById) ?? 0) + amount,
    );
  }

  const sharePaise = sharesInPaise(totalPaise, people.length);
  const balances: PersonBalance[] = people.map((person, index) => {
    const paid = paidPaise.get(person.id) ?? 0;
    const share = sharePaise[index] ?? 0;
    return {
      personId: person.id,
      name: person.name.trim() || `Person ${index + 1}`,
      paid: fromPaise(paid),
      share: fromPaise(share),
      net: fromPaise(paid - share),
    };
  });

  const debtors = balances
    .map((item) => ({
      ...item,
      netPaise: toPaise(item.net),
    }))
    .filter((item) => item.netPaise < 0)
    .sort((a, b) => a.netPaise - b.netPaise);

  const creditors = balances
    .map((item) => ({
      ...item,
      netPaise: toPaise(item.net),
    }))
    .filter((item) => item.netPaise > 0)
    .sort((a, b) => b.netPaise - a.netPaise);

  const transfers: SettlementTransfer[] = [];
  let d = 0;
  let c = 0;

  while (d < debtors.length && c < creditors.length) {
    const owe = -debtors[d].netPaise;
    const due = creditors[c].netPaise;
    const pay = Math.min(owe, due);
    if (pay > 0) {
      transfers.push({
        fromId: debtors[d].personId,
        fromName: debtors[d].name,
        toId: creditors[c].personId,
        toName: creditors[c].name,
        amount: fromPaise(pay),
      });
    }
    debtors[d].netPaise += pay;
    creditors[c].netPaise -= pay;
    if (debtors[d].netPaise === 0) {
      d += 1;
    }
    if (creditors[c].netPaise === 0) {
      c += 1;
    }
  }

  return {
    total: fromPaise(totalPaise),
    fairShare: people.length ? fromPaise(sharePaise[0] ?? 0) : 0,
    balances,
    transfers,
  };
}

export function formatSettlementText(result: SplitResult): string {
  const lines = [
    "HarshOnRoads Trip Cost Splitter",
    `Total: ${formatInr(result.total)}`,
    `Fair share: ${formatInr(result.fairShare)} each`,
    "",
    ...result.balances.map(
      (item) =>
        `${item.name} paid ${formatInr(item.paid)} (share ${formatInr(item.share)})`,
    ),
    "",
    "Settlement:",
    ...(result.transfers.length
      ? result.transfers.map(
          (item) =>
            `${item.fromName} → ${item.toName} ${formatInr(item.amount)}`,
        )
      : ["Everyone is settled."]),
  ];
  return lines.join("\n");
}

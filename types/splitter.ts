export const expenseCategories = [
  "Fuel",
  "Hotel",
  "Food",
  "Tolls",
  "Parking",
  "Activities",
  "Tickets",
  "Shopping",
  "Miscellaneous",
] as const;

export type ExpenseCategory = (typeof expenseCategories)[number];

export type SplitPerson = {
  id: string;
  name: string;
};

export type SplitExpense = {
  id: string;
  category: ExpenseCategory;
  amount: number;
  paidById: string;
};

export type PersonBalance = {
  personId: string;
  name: string;
  paid: number;
  share: number;
  net: number;
};

export type SettlementTransfer = {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
};

export type SplitResult = {
  total: number;
  fairShare: number;
  balances: PersonBalance[];
  transfers: SettlementTransfer[];
};

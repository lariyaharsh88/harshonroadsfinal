import { z } from "zod";
import {
  aiDisclaimerSchema,
  estimatedMoneySchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const tripBudgetLineSchema = z.object({
  category: z.enum([
    "stay",
    "food",
    "transport",
    "fuel",
    "activities",
    "misc",
  ]),
  estimated: estimatedMoneySchema,
  note: z.string().min(4).max(200),
});

export const tripBudgetSchema = z.object({
  destinationName: z.string().min(2).max(80),
  travellers: z.number().int().min(1).max(12),
  days: z.number().int().min(1).max(5),
  lines: z.array(tripBudgetLineSchema).min(2).max(8),
  estimatedTotal: estimatedMoneySchema,
  perPerson: estimatedMoneySchema,
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type TripBudget = z.infer<typeof tripBudgetSchema>;

import { z } from "zod";
import {
  aiDisclaimerSchema,
  estimatedMoneySchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const weekendPlanDaySchema = z.object({
  dayLabel: z.string().min(2).max(40),
  summary: z.string().min(12).max(400),
  morning: z.string().min(8).max(280),
  afternoon: z.string().min(8).max(280),
  evening: z.string().min(8).max(280),
});

export const weekendPlanSchema = z.object({
  destinationName: z.string().min(2).max(80),
  region: z.string().min(2).max(80),
  nights: z.number().int().min(0).max(4),
  days: z.array(weekendPlanDaySchema).min(1).max(5),
  estimatedBudget: estimatedMoneySchema,
  bestFor: z.array(z.string().min(2).max(40)).min(1).max(6),
  packingNotes: z.array(z.string().min(4).max(160)).max(8),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type WeekendPlan = z.infer<typeof weekendPlanSchema>;

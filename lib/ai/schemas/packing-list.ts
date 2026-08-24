import { z } from "zod";
import {
  aiDisclaimerSchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const packingItemSchema = z.object({
  name: z.string().min(2).max(80),
  optional: z.boolean(),
  note: z.string().max(160).optional(),
});

export const packingCategorySchema = z.object({
  category: z.string().min(2).max(40),
  items: z.array(packingItemSchema).min(1).max(16),
});

export const packingListSchema = z.object({
  tripLabel: z.string().min(4).max(120),
  season: z.string().min(3).max(40),
  categories: z.array(packingCategorySchema).min(1).max(8),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type PackingList = z.infer<typeof packingListSchema>;

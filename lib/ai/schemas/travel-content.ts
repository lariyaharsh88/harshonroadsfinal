import { z } from "zod";
import {
  aiDisclaimerSchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const travelContentSectionSchema = z.object({
  heading: z.string().min(4).max(100),
  paragraphs: z.array(z.string().min(20).max(800)).min(1).max(4),
});

export const travelContentSchema = z.object({
  title: z.string().min(8).max(120),
  summary: z.string().min(20).max(320),
  sections: z.array(travelContentSectionSchema).min(1).max(6),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type TravelContent = z.infer<typeof travelContentSchema>;

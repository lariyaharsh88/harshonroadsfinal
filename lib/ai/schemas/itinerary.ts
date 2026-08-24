import { z } from "zod";
import {
  budgetRanges,
  interests,
  origins,
  transports,
} from "@/types/destination";
import { travelStyles } from "@/lib/ai/schemas/weekend-planner";
import {
  aiDisclaimerSchema,
  estimatedMoneySchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const itineraryGeneratorInputSchema = z.object({
  origin: z.enum(origins),
  destinationSlug: z.string().min(2).max(80),
  dayCount: z.number().int().min(1).max(5),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a YYYY-MM-DD start date."),
  travellerCount: z.number().int().min(1).max(12),
  budget: z.enum(budgetRanges),
  transport: z.enum(transports),
  travelStyle: z.enum(travelStyles),
  interests: z.array(z.enum(interests)).min(1).max(10),
});

export type ItineraryGeneratorInput = z.infer<
  typeof itineraryGeneratorInputSchema
>;

export const itineraryDaySchema = z.object({
  dayNumber: z.number().int().min(1).max(5),
  title: z.string().min(3).max(80),
  summary: z.string().min(12).max(320),
  morning: z.string().min(12).max(400),
  afternoon: z.string().min(12).max(400),
  evening: z.string().min(12).max(400),
  placesToVisit: z.array(z.string().min(4).max(120)).min(2).max(8),
  activities: z.array(z.string().min(8).max(180)).min(2).max(8),
  foodSuggestions: z.array(z.string().min(8).max(180)).min(2).max(6),
  travelGuidance: z.string().min(16).max(400),
  estimatedDailyBudget: estimatedMoneySchema,
  stayArea: z.string().min(4).max(80),
  stayNote: z.string().min(12).max(280),
  tips: z.array(z.string().min(8).max(200)).min(2).max(6),
});

export type ItineraryDay = z.infer<typeof itineraryDaySchema>;

export const roadGuidanceSchema = z.object({
  suggestedDepartureTime: z.string().min(4).max(80),
  travelDurationCategory: z.string().min(2).max(80),
  suggestedBreaks: z.array(z.string().min(8).max(180)).min(2).max(6),
  fuelPlanningNote: z.string().min(20).max(400),
});

export type RoadGuidance = z.infer<typeof roadGuidanceSchema>;

export const itineraryGeneratorResultSchema = z.object({
  headline: z.string().min(8).max(120),
  overview: z.string().min(24).max(600),
  destinationSlug: z.string().min(2).max(80),
  destinationName: z.string().min(2).max(80),
  region: z.string().min(2).max(80),
  days: z.array(itineraryDaySchema).min(1).max(5),
  roadGuidance: roadGuidanceSchema.nullable(),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type ItineraryGeneratorResult = z.infer<
  typeof itineraryGeneratorResultSchema
>;

/** @deprecated Use itineraryGeneratorResultSchema. Kept for the AI barrel. */
export const itinerarySchema = itineraryGeneratorResultSchema;
export type Itinerary = ItineraryGeneratorResult;

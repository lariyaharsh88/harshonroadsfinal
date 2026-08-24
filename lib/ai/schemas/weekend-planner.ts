import { z } from "zod";
import {
  budgetRanges,
  groups,
  interests,
  maxTravelTimes,
  origins,
  transports,
  tripDurations,
} from "@/types/destination";
import {
  aiDisclaimerSchema,
  estimatedMoneySchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const travelStyles = [
  "budget",
  "relaxed",
  "adventure",
  "comfort",
  "luxury",
] as const;

export type TravelStyle = (typeof travelStyles)[number];

export const weekendPlannerInputSchema = z.object({
  origin: z.enum(origins),
  duration: z.enum(tripDurations),
  budget: z.enum(budgetRanges),
  group: z.enum(groups),
  peopleCount: z.number().int().min(1).max(12),
  transport: z.enum(transports),
  interests: z.array(z.enum(interests)).min(1).max(10),
  travelStyle: z.enum(travelStyles),
  maxTravelTime: z.enum(maxTravelTimes),
});

export type WeekendPlannerInput = z.infer<typeof weekendPlannerInputSchema>;

const plannerDaySchema = z.object({
  dayLabel: z.string().min(2).max(40),
  summary: z.string().min(12).max(320),
  morning: z.string().min(8).max(240),
  afternoon: z.string().min(8).max(240),
  evening: z.string().min(8).max(240),
});

const plannerStaySchema = z.object({
  area: z.string().min(4).max(80),
  type: z.string().min(4).max(80),
  note: z.string().min(12).max(280),
});

const plannerAlternativeSchema = z.object({
  slug: z.string().min(2).max(80),
  name: z.string().min(2).max(80),
  why: z.string().min(12).max(240),
});

export const weekendPlannerDestinationSchema = z.object({
  slug: z.string().min(2).max(80),
  name: z.string().min(2).max(80),
  region: z.string().min(2).max(80),
  whyItMatches: z.string().min(24).max(500),
  overview: z.string().min(24).max(500),
  suggestedDuration: z.string().min(4).max(80),
  days: z.array(plannerDaySchema).min(1).max(5),
  thingsToDo: z.array(z.string().min(8).max(180)).min(3).max(8),
  foodSuggestions: z.array(z.string().min(8).max(180)).min(2).max(6),
  stay: plannerStaySchema,
  estimatedBudget: estimatedMoneySchema,
  transportGuidance: z.string().min(20).max(400),
  packingSuggestions: z.array(z.string().min(4).max(140)).min(3).max(8),
  travelTips: z.array(z.string().min(8).max(200)).min(2).max(6),
  alternatives: z.array(plannerAlternativeSchema).min(1).max(3),
});

export const weekendPlannerResultSchema = z.object({
  headline: z.string().min(8).max(120),
  summary: z.string().min(20).max(400),
  destinations: z.array(weekendPlannerDestinationSchema).length(3),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type WeekendPlannerResult = z.infer<typeof weekendPlannerResultSchema>;
export type WeekendPlannerDestination = z.infer<
  typeof weekendPlannerDestinationSchema
>;

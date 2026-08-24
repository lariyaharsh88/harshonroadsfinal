import { z } from "zod";
import { travelStyles } from "@/lib/ai/schemas/weekend-planner";
import {
  aiDisclaimerSchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";
import { costScenarioIds } from "@/lib/tools/trip-cost-estimate";
import {
  origins,
  transports,
  tripDurations,
} from "@/types/destination";

export const tripCostEstimatorInputSchema = z.object({
  query: z.string().trim().min(20).max(1_500),
  origin: z.enum(origins).optional(),
  destinationSlug: z.string().min(2).max(80).optional(),
  duration: z.enum(tripDurations).optional(),
  travellerCount: z.number().int().min(1).max(12).optional(),
  transport: z.enum(transports).optional(),
  tripStyle: z.enum(travelStyles).optional(),
});

export type TripCostEstimatorInput = z.infer<
  typeof tripCostEstimatorInputSchema
>;

export const costScenarioRatesSchema = z.object({
  id: z.enum(costScenarioIds),
  stayPerNightInr: z.number().nonnegative().max(200_000),
  foodPerPersonPerDayInr: z.number().nonnegative().max(20_000),
  activitiesTotalInr: z.number().nonnegative().max(200_000),
  tollsInr: z.number().nonnegative().max(50_000),
  parkingInr: z.number().nonnegative().max(20_000),
  miscellaneousInr: z.number().nonnegative().max(50_000),
  publicTransportTotalInr: z.number().nonnegative().max(200_000),
  assumptions: z.array(z.string().min(8).max(240)).min(2).max(8),
});

export const tripCostEstimatorModelSchema = z.object({
  origin: z.enum(origins),
  destinationSlug: z.string().min(2).max(80),
  destinationName: z.string().min(2).max(80),
  duration: z.enum(tripDurations),
  travellerCount: z.number().int().min(1).max(12),
  transport: z.enum(transports),
  tripStyle: z.enum(travelStyles),
  querySummary: z.string().min(12).max(220),
  estimatedRoundTripKm: z.number().min(20).max(3_000),
  typicalMileageKmpl: z.number().min(4).max(80),
  typicalFuelPricePerLitre: z.number().min(50).max(200),
  scenarios: z.array(costScenarioRatesSchema).length(3),
  verificationNotes: z.array(verificationNoteSchema).min(2).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type TripCostEstimatorModelResult = z.infer<
  typeof tripCostEstimatorModelSchema
>;

export const tripCostEstimatorResultSchema =
  tripCostEstimatorModelSchema.extend({
    destinationRegion: z.string().min(2).max(80),
    nights: z.number().int().min(0).max(4),
    days: z.number().int().min(1).max(5),
  });

export type TripCostEstimatorResult = z.infer<
  typeof tripCostEstimatorResultSchema
>;

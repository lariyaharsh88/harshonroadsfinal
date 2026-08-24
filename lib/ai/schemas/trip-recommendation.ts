import { z } from "zod";
import {
  budgetRanges,
  groups,
  interests,
  origins,
  transports,
  tripDurations,
} from "@/types/destination";
import {
  aiDisclaimerSchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const tripFinderInputSchema = z.object({
  query: z.string().trim().min(20).max(1_500),
  origin: z.enum(origins).optional(),
  duration: z.enum(tripDurations).optional(),
  budget: z.enum(budgetRanges).optional(),
  group: z.enum(groups).optional(),
  transport: z.enum(transports).optional(),
  interests: z.array(z.enum(interests)).max(10).optional(),
});

export type TripFinderInput = z.infer<typeof tripFinderInputSchema>;

const alternativeSchema = z.object({
  slug: z.string().min(2).max(80),
  name: z.string().min(2).max(80),
  why: z.string().min(12).max(240),
});

export const tripFinderDestinationSchema = z.object({
  slug: z.string().min(2).max(80),
  name: z.string().min(2).max(80),
  region: z.string().min(2).max(80),
  whyItMatches: z.string().min(24).max(500),
  bestExperiences: z.array(z.string().min(8).max(180)).min(3).max(6),
  bestForNote: z.string().min(8).max(200),
  suggestedDuration: z.string().min(4).max(80),
  alternative: alternativeSchema,
});

export const tripFinderResultSchema = z.object({
  querySummary: z.string().min(8).max(200),
  destinations: z.array(tripFinderDestinationSchema).length(5),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type TripFinderModelResult = z.infer<typeof tripFinderResultSchema>;
export type TripFinderModelDestination = z.infer<
  typeof tripFinderDestinationSchema
>;

export type TripFinderDestination = TripFinderModelDestination & {
  matchPercent: number;
  travelDurationLabel: string;
  budgetCategoryLabel: string;
  bestForLabels: string[];
};

export type TripFinderResult = Omit<TripFinderModelResult, "destinations"> & {
  destinations: TripFinderDestination[];
  usedDefaultFilters: boolean;
};

/** @deprecated Use tripFinderResultSchema. Kept as an alias for the AI barrel. */
export const tripRecommendationSchema = tripFinderResultSchema;
export type TripRecommendation = TripFinderModelResult;

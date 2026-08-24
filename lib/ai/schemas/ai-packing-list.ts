import { z } from "zod";
import { interests, transports } from "@/types/destination";
import {
  aiDisclaimerSchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const packingDurations = [
  "day-trip",
  "1-night",
  "2-nights",
  "3-plus",
] as const;

export const packingSeasons = [
  "summer",
  "winter",
  "monsoon",
  "spring-autumn",
] as const;

export const packingTripTypes = [
  "mountain",
  "nature",
  "adventure",
  "city",
  "beach",
  "wildlife",
  "road-trip",
] as const;

export const packingPriorities = [
  "essential",
  "recommended",
  "optional",
] as const;

export const packingListCategories = [
  "documents",
  "clothing",
  "footwear",
  "toiletries",
  "electronics",
  "travel-essentials",
  "first-aid-essentials",
  "weather-specific",
  "activity-specific",
  "riding-gear",
  "photography",
  "emergency",
] as const;

export const packingDurationLabels: Record<
  (typeof packingDurations)[number],
  string
> = {
  "day-trip": "Day trip",
  "1-night": "1 night",
  "2-nights": "2 nights",
  "3-plus": "3+ nights",
};

export const packingSeasonLabels: Record<
  (typeof packingSeasons)[number],
  string
> = {
  summer: "Summer",
  winter: "Winter",
  monsoon: "Monsoon",
  "spring-autumn": "Spring / autumn",
};

export const packingTripTypeLabels: Record<
  (typeof packingTripTypes)[number],
  string
> = {
  mountain: "Mountain",
  nature: "Nature",
  adventure: "Adventure",
  city: "City",
  beach: "Beach",
  wildlife: "Wildlife",
  "road-trip": "Road trip",
};

export const packingPriorityLabels: Record<
  (typeof packingPriorities)[number],
  string
> = {
  essential: "Essential",
  recommended: "Recommended",
  optional: "Optional",
};

export const packingListCategoryLabels: Record<
  (typeof packingListCategories)[number],
  string
> = {
  documents: "Documents",
  clothing: "Clothing",
  footwear: "Footwear",
  toiletries: "Toiletries",
  electronics: "Electronics",
  "travel-essentials": "Travel essentials",
  "first-aid-essentials": "First-aid essentials",
  "weather-specific": "Weather-specific items",
  "activity-specific": "Activity-specific items",
  "riding-gear": "Riding gear",
  photography: "Photography gear",
  emergency: "Emergency items",
};

export const aiPackingListInputSchema = z.object({
  destinationSlug: z.string().min(2).max(80),
  duration: z.enum(packingDurations),
  season: z.enum(packingSeasons),
  transport: z.enum(transports),
  tripType: z.enum(packingTripTypes),
  activities: z.array(z.enum(interests)).min(1).max(8),
  travellerCount: z.number().int().min(1).max(12),
});

export type AiPackingListInput = z.infer<typeof aiPackingListInputSchema>;

export const aiPackingListItemSchema = z.object({
  name: z.string().min(2).max(80),
  category: z.enum(packingListCategories),
  priority: z.enum(packingPriorities),
  note: z.string().min(4).max(160).optional(),
});

export const aiPackingListModelSchema = z.object({
  tripLabel: z.string().min(8).max(140),
  items: z.array(aiPackingListItemSchema).min(12).max(70),
  packingNotes: z.array(z.string().min(8).max(200)).min(2).max(6),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type AiPackingListModelResult = z.infer<
  typeof aiPackingListModelSchema
>;

export const aiPackingListStoredItemSchema = aiPackingListItemSchema.extend({
  id: z.string().min(4).max(80),
  custom: z.boolean(),
  packed: z.boolean(),
});

export const aiPackingListResultSchema = aiPackingListModelSchema.extend({
  destinationSlug: z.string().min(2).max(80),
  destinationName: z.string().min(2).max(80),
  destinationRegion: z.string().min(2).max(80),
  duration: z.enum(packingDurations),
  season: z.enum(packingSeasons),
  transport: z.enum(transports),
  tripType: z.enum(packingTripTypes),
  activities: z.array(z.enum(interests)).min(1).max(8),
  travellerCount: z.number().int().min(1).max(12),
  items: z.array(aiPackingListStoredItemSchema).min(1).max(90),
});

export type AiPackingListItem = z.infer<typeof aiPackingListStoredItemSchema>;
export type AiPackingListResult = z.infer<typeof aiPackingListResultSchema>;

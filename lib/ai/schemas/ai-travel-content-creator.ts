import { z } from "zod";
import {
  aiDisclaimerSchema,
  verificationNoteSchema,
} from "@/lib/ai/schemas/common";

export const contentCreatorPlatforms = [
  "youtube",
  "youtube-shorts",
  "instagram",
  "instagram-reels",
  "blog",
] as const;

export const contentCreatorAudiences = [
  "weekend-travellers",
  "couples",
  "families",
  "solo",
  "bike-riders",
  "first-timers",
] as const;

export const contentCreatorTones = [
  "practical",
  "warm",
  "energetic",
  "calm",
  "witty",
] as const;

export const contentCreatorPlatformLabels: Record<
  (typeof contentCreatorPlatforms)[number],
  string
> = {
  youtube: "YouTube",
  "youtube-shorts": "YouTube Shorts",
  instagram: "Instagram",
  "instagram-reels": "Instagram Reels",
  blog: "Blog",
};

export const contentCreatorAudienceLabels: Record<
  (typeof contentCreatorAudiences)[number],
  string
> = {
  "weekend-travellers": "Weekend travellers",
  couples: "Couples",
  families: "Families",
  solo: "Solo travellers",
  "bike-riders": "Bike riders",
  "first-timers": "First-time visitors",
};

export const contentCreatorToneLabels: Record<
  (typeof contentCreatorTones)[number],
  string
> = {
  practical: "Practical",
  warm: "Warm",
  energetic: "Energetic",
  calm: "Calm",
  witty: "Witty",
};

export const travelContentCreatorInputSchema = z.object({
  destinationSlug: z.string().min(2).max(80),
  tripDescription: z.string().min(20).max(1500),
  audience: z.enum(contentCreatorAudiences),
  tone: z.enum(contentCreatorTones),
  platform: z.enum(contentCreatorPlatforms),
  hasVisited: z.boolean(),
});

export type TravelContentCreatorInput = z.infer<
  typeof travelContentCreatorInputSchema
>;

export const youtubeChapterSchema = z.object({
  timestamp: z.string().min(3).max(12),
  title: z.string().min(4).max(80),
});

export const youtubeContentSchema = z.object({
  titleIdeas: z.array(z.string().min(8).max(100)).length(10),
  description: z.string().min(80).max(2000),
  hook: z.string().min(12).max(280),
  thumbnailText: z.string().min(4).max(48),
  chapters: z.array(youtubeChapterSchema).min(4).max(12),
  cta: z.string().min(12).max(280),
});

export const shortsReelsContentSchema = z.object({
  hook: z.string().min(8).max(200),
  script30: z.string().min(40).max(900),
  script60: z.string().min(80).max(1600),
  caption: z.string().min(20).max(800),
  cta: z.string().min(8).max(220),
});

export const instagramCarouselSlideSchema = z.object({
  heading: z.string().min(4).max(80),
  body: z.string().min(12).max(280),
});

export const instagramContentSchema = z.object({
  caption: z.string().min(40).max(1200),
  reelCaption: z.string().min(20).max(800),
  carousel: z.array(instagramCarouselSlideSchema).min(4).max(8),
  hook: z.string().min(8).max(200),
});

export const blogOutlineSectionSchema = z.object({
  heading: z.string().min(4).max(100),
  bullets: z.array(z.string().min(8).max(180)).min(2).max(6),
});

export const blogFaqIdeaSchema = z.object({
  question: z.string().min(10).max(140),
  answerAngle: z.string().min(16).max(280),
});

export const blogContentSchema = z.object({
  titleIdeas: z.array(z.string().min(8).max(100)).min(6).max(10),
  seoTitle: z.string().min(12).max(70),
  metaDescription: z.string().min(50).max(170),
  outline: z.array(blogOutlineSectionSchema).min(4).max(10),
  faqIdeas: z.array(blogFaqIdeaSchema).min(4).max(8),
});

export const travelContentCreatorModelSchema = z.object({
  angleSummary: z.string().min(16).max(320),
  youtube: youtubeContentSchema.nullable(),
  shortsReels: shortsReelsContentSchema.nullable(),
  instagram: instagramContentSchema.nullable(),
  blog: blogContentSchema.nullable(),
  verificationNotes: z.array(verificationNoteSchema).min(1).max(6),
  disclaimer: aiDisclaimerSchema,
});

export type TravelContentCreatorModel = z.infer<
  typeof travelContentCreatorModelSchema
>;

export const travelContentCreatorResultSchema =
  travelContentCreatorModelSchema.extend({
    destinationSlug: z.string().min(2).max(80),
    destinationName: z.string().min(2).max(80),
    destinationRegion: z.string().min(2).max(80),
    audience: z.enum(contentCreatorAudiences),
    tone: z.enum(contentCreatorTones),
    platform: z.enum(contentCreatorPlatforms),
    hasVisited: z.boolean(),
  });

export type TravelContentCreatorResult = z.infer<
  typeof travelContentCreatorResultSchema
>;

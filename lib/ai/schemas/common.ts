import { z } from "zod";

export const aiDisclaimerSchema = z
  .string()
  .min(12)
  .max(600)
  .describe("Must say estimates need to be verified before travel.");

export const estimatedMoneySchema = z.object({
  amountInr: z.number().nonnegative().max(10_000_000),
  label: z.string().min(2).max(80),
  isEstimate: z.literal(true),
});

export const verificationNoteSchema = z.string().min(8).max(280);

import { AI_LIMITS, AiError } from "@/lib/ai/errors";

export function clipText(value: string, maxChars: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxChars) {
    return trimmed;
  }
  return trimmed.slice(0, maxChars);
}

export function assertPromptLength(
  text: string,
  maxChars = AI_LIMITS.maxPromptChars,
): void {
  if (text.trim().length === 0 || text.length > maxChars) {
    throw new AiError("input_too_large");
  }
}

export function assertDestinationCount(
  count: number,
  max = AI_LIMITS.maxDestinations,
): void {
  if (count < 1 || count > max) {
    throw new AiError("input_too_large");
  }
}

export function assertItineraryDays(
  days: number,
  max = AI_LIMITS.maxItineraryDays,
): void {
  if (days < 1 || days > max) {
    throw new AiError("input_too_large");
  }
}

export function extractJson(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new AiError("empty");
  }

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new AiError("invalid_response");
  }

  try {
    return JSON.parse(candidate.slice(start, end + 1)) as unknown;
  } catch {
    throw new AiError("invalid_response");
  }
}

export async function withTimeout<T>(
  factory: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number = AI_LIMITS.requestTimeoutMs,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await factory(controller.signal);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new AiError("timeout");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

import "server-only";

import { AI_LIMITS } from "@/lib/ai/errors";

export type RateLimitDecision = {
  allowed: boolean;
  retryAfterMs?: number;
};

export type RateLimiter = {
  check: (key: string) => RateLimitDecision;
};

type WindowState = {
  count: number;
  resetAt: number;
};

export function createMemoryRateLimiter(options?: {
  windowMs?: number;
  max?: number;
}): RateLimiter {
  const windowMs = options?.windowMs ?? AI_LIMITS.rateLimitWindowMs;
  const max = options?.max ?? AI_LIMITS.rateLimitMaxPerWindow;
  const buckets = new Map<string, WindowState>();

  return {
    check(key: string) {
      const now = Date.now();
      const current = buckets.get(key);
      if (!current || now >= current.resetAt) {
        buckets.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true };
      }
      if (current.count >= max) {
        return { allowed: false, retryAfterMs: current.resetAt - now };
      }
      current.count += 1;
      return { allowed: true };
    },
  };
}

let limiter: RateLimiter = createMemoryRateLimiter();

export function setAiRateLimiter(next: RateLimiter): void {
  limiter = next;
}

export function checkAiRateLimit(key = "global"): RateLimitDecision {
  return limiter.check(key);
}

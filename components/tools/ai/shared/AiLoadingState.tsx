"use client";

import { useEffect, useMemo, useState } from "react";

const STEP_MS = 2800;

type AiLoadingStateProps = {
  context?: string;
  toolLabel?: string;
};

function buildSteps(context: string, toolLabel: string) {
  const place = context.trim();
  return [
    place
      ? `Planning your ${place} escape…`
      : `Running the ${toolLabel}…`,
    "Matching Delhi NCR weekend options…",
    "Sketching routes, stays and budgets…",
    "Almost ready — verify before you go.",
  ];
}

export function AiLoadingState({
  context = "",
  toolLabel = "AI planner",
}: AiLoadingStateProps) {
  const steps = useMemo(
    () => buildSteps(context, toolLabel),
    [context, toolLabel],
  );
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [steps.length]);

  const progress = ((stepIndex + 1) / steps.length) * 100;
  const activeLine = steps[stepIndex];

  return (
    <div
      className="ai-loading-card ai-form-card relative overflow-hidden px-8 py-12 sm:px-12 sm:py-14"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">
        {activeLine} Step {stepIndex + 1} of {steps.length}.
      </p>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.14), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(34,211,238,0.1), transparent 50%)",
        }}
      />
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue/15 to-teal/15 text-blue">
          <span className="inline-block size-6 animate-spin rounded-full border-2 border-blue/20 border-t-blue" />
        </div>
        <p className="ai-type-eyebrow mt-6 text-blue">Crafting your plan</p>
        <div className="mt-6 min-h-[4.5rem] w-full">
          <p
            key={stepIndex}
            className="ai-loading-line font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {activeLine}
          </p>
        </div>
        <div className="mt-10 w-full max-w-sm space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <span>Progress</span>
            <span className="tabular-nums text-blue">
              {stepIndex + 1} / {steps.length}
            </span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-surface-raised ring-1 ring-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue via-teal to-accent transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="ai-loading-shimmer pointer-events-none absolute inset-y-0 w-[45%] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {steps.map((_, index) => {
            const done = index < stepIndex;
            const current = index === stepIndex;
            return (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  done
                    ? "w-6 bg-teal"
                    : current
                      ? "w-8 bg-gradient-to-r from-blue to-teal"
                      : "w-1.5 bg-border"
                }`}
              />
            );
          })}
        </div>
        <p className="mt-10 max-w-xs text-xs leading-relaxed text-muted">
          A sketch you can verify — not live bookings or prices.
        </p>
      </div>
    </div>
  );
}

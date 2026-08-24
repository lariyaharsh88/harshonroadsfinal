"use client";

import type { FormEvent, ReactNode } from "react";
import { AiLoadingState } from "@/components/tools/ai/shared/AiLoadingState";

type AiPlannerFrameProps = {
  pending: boolean;
  loadingContext?: string;
  toolLabel?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export function AiPlannerFrame({
  pending,
  loadingContext,
  toolLabel,
  onSubmit,
  children,
}: AiPlannerFrameProps) {
  if (pending) {
    return (
      <div className="ai-tool-scope ai-form-shell mx-auto">
        <AiLoadingState context={loadingContext} toolLabel={toolLabel} />
      </div>
    );
  }

  if (onSubmit) {
    return (
      <div className="ai-tool-scope ai-form-shell mx-auto">
        <form id="ai-planner-form" onSubmit={onSubmit} className="ai-form-card group">
          {children}
        </form>
      </div>
    );
  }

  return (
    <div className="ai-tool-scope ai-form-shell mx-auto">
      <div className="ai-form-card group">{children}</div>
    </div>
  );
}

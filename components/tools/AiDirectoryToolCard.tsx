import Link from "next/link";
import { DoodlePlane, SpraySplatter } from "@/components/graphics/TravelGraphics";
import type { Tool } from "@/types/tool";

function AiSparkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.5 13.8 9l6.7 1.8-6.7 1.8L12 19.4l-1.8-6.8L3.5 10.8 10.2 9 12 2.5Zm0 4.2-.9 3.4-3.4.9 3.4.9.9 3.4.9-3.4 3.4-.9-3.4-.9L12 6.7Z" />
    </svg>
  );
}

export function AiDirectoryToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <div className="ai-form-card ai-directory-card relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
        <SpraySplatter className="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 text-accent/15 opacity-0 transition duration-300 group-hover:opacity-100" />
        <DoodlePlane className="travel-plane-drift pointer-events-none absolute top-4 right-4 h-5 w-9 text-blue/20 opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <span className="ai-directory-icon">
              <AiSparkIcon className="size-5" />
            </span>
            <span className="ai-trust-pill shrink-0 py-1">
              <span className="ai-trust-pill-dot" aria-hidden="true" />
              Free
            </span>
          </div>
          <p className="ai-type-eyebrow mt-5 text-blue">AI · One screen</p>
          <h3 className="ai-type-display mt-2 transition-colors group-hover:text-blue">
            {tool.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted">
            {tool.description}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground">
            Open planner
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-blue/10 to-teal/10 text-blue transition duration-200 group-hover:translate-x-0.5 group-hover:bg-blue group-hover:text-white">
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

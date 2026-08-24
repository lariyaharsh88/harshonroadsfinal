import { ShareButton } from "@/components/tools/ShareButton";
import { Badge } from "@/components/ui/Badge";
import { toolCategoryLabels } from "@/lib/tools/catalog";
import { absoluteUrl } from "@/lib/seo";
import { formatComingSoonLabel } from "@/lib/utils";
import type { ToolDefinition } from "@/types/tool";

export function ToolHeader({ tool }: { tool: ToolDefinition }) {
  return (
    <header className="border-b border-border bg-[radial-gradient(ellipse_at_top,_rgba(182,240,74,0.16),_transparent_55%)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge tone="muted">{toolCategoryLabels[tool.category]}</Badge>
          <Badge tone="blue">{formatComingSoonLabel(tool.status)}</Badge>
        </div>
        <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          {tool.heading ?? tool.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {tool.description}
        </p>
        <div className="mt-8">
          <ShareButton
            title={tool.name}
            url={absoluteUrl(`/tools/${tool.slug}`)}
            text={tool.description}
          />
        </div>
      </div>
    </header>
  );
}

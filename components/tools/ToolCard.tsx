import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { toolCategoryLabels } from "@/lib/tools/catalog";
import { formatComingSoonLabel } from "@/lib/utils";
import type { Tool } from "@/types/tool";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <Card className="lift flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Badge tone="muted">{toolCategoryLabels[tool.category]}</Badge>
          <Badge tone="blue">{formatComingSoonLabel(tool.status)}</Badge>
        </div>
        <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
          {tool.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
          {tool.description}
        </p>
        <p className="mt-6 text-sm font-bold text-foreground">
          Open tool
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {" "}
            →
          </span>
        </p>
      </Card>
    </Link>
  );
}

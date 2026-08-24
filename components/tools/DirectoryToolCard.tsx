import { DirectoryIconMark } from "@/components/tools/DirectoryIcon";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatComingSoonLabel } from "@/lib/utils";
import type { DirectoryTool } from "@/lib/tools/directory";
import Link from "next/link";

export function DirectoryToolCard({
  tool,
  featured = false,
}: {
  tool: DirectoryTool;
  featured?: boolean;
}) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <Card
        className={`lift flex h-full flex-col ${featured ? "border-blue/20 bg-blue-soft/30" : ""}`}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-2xl border border-border bg-surface-raised text-blue">
              <DirectoryIconMark name={tool.icon} className="size-4" />
            </span>
            <Badge tone="muted">{tool.groupLabel}</Badge>
          </span>
          <Badge tone="blue">{formatComingSoonLabel(tool.status)}</Badge>
        </div>
        <h3
          className={`font-display font-extrabold tracking-tight text-foreground ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
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

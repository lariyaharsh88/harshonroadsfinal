import { ToolCard } from "@/components/tools/ToolCard";
import type { Tool } from "@/types/tool";

export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool) => (
        <li key={tool.slug}>
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  );
}

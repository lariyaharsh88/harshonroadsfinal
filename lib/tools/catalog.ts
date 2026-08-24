import { toolDefinitions } from "@/lib/tools/definitions";
import type { Tool, ToolCategory } from "@/types/tool";

export const tools: Tool[] = toolDefinitions.map(
  ({ slug, name, description, category, status }) => ({
    slug,
    name,
    description,
    category,
    status,
  }),
);

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getPopularTools(limit = 6): Tool[] {
  const live = tools.filter((tool) => tool.status === "live");
  const rest = tools.filter((tool) => tool.status !== "live");
  return [...live, ...rest].slice(0, limit);
}

export function getRelatedTools(slugs: string[], excludeSlug?: string): Tool[] {
  const wanted = new Set(slugs.filter((slug) => slug !== excludeSlug));
  return tools.filter((tool) => wanted.has(tool.slug));
}

export function getToolsBySlugs(slugs: readonly string[]): Tool[] {
  return slugs.flatMap((slug) => {
    const tool = getToolBySlug(slug);
    return tool ? [tool] : [];
  });
}

export function getLiveTools(): Tool[] {
  return tools.filter((tool) => tool.status === "live");
}

export const toolCategoryLabels: Record<ToolCategory, string> = {
  fuel: "Fuel",
  budget: "Budget",
  planning: "Planning",
  packing: "Packing",
  india: "India",
};

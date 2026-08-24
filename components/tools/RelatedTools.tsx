import { ToolCard } from "@/components/tools/ToolCard";
import { getRelatedTools } from "@/lib/tools/catalog";

export function RelatedTools({
  slugs,
  excludeSlug,
}: {
  slugs: string[];
  excludeSlug: string;
}) {
  const related = getRelatedTools(slugs, excludeSlug);

  if (related.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Related tools
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <li key={tool.slug}>
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
    </section>
  );
}

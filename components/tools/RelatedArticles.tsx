import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { RelatedArticle } from "@/types/calculator";

export function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Related reading
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <li key={article.href}>
            <Link href={article.href} className="block h-full">
              <Card className="h-full transition-colors hover:border-foreground/20 hover:bg-surface-raised">
                <p className="font-display text-xl font-extrabold tracking-tight">
                  {article.title}
                </p>
                {article.description ? (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {article.description}
                  </p>
                ) : null}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

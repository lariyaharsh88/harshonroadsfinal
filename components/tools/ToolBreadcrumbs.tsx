import Link from "next/link";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function ToolBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <JsonLdScript data={data} />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span className="text-muted-strong" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-foreground">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

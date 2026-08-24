import { JsonLdScript } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import type { ToolDefinition } from "@/types/tool";

export function ToolWebApplicationSchema({ tool }: { tool: ToolDefinition }) {
  if (tool.status !== "live" || (!tool.calculatorId && !tool.interactiveKind)) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: absoluteUrl(`/tools/${tool.slug}`),
    description: tool.seoDescription ?? tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: tool.interactiveKind
      ? "Requires JavaScript for the interactive form"
      : "Requires JavaScript for interactive calculation",
    isAccessibleForFree: true,
    inLanguage: "en-IN",
    provider: {
      "@id": `${siteConfig.url}/#organization`,
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return <JsonLdScript data={data} />;
}

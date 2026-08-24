import { JsonLdScript } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FaqItem } from "@/types/calculator";

export function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section>
      <SectionHeader title="FAQ" />
      <JsonLdScript data={jsonLd} />
      <div className="mt-4 divide-y divide-border rounded-[1.25rem] border border-border bg-surface shadow-sm">
        {faqs.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="cursor-pointer list-none text-sm font-bold text-foreground marker:content-none">
              <span className="flex items-start justify-between gap-4">
                {item.question}
                <span className="text-muted group-open:hidden">+</span>
                <span className="hidden text-muted group-open:inline">–</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

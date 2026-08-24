import Link from "next/link";
import type { EducationSection } from "@/types/calculator";

export function ToolEducation({ sections }: { sections?: EducationSection[] }) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div id="how-to-calculate" className="space-y-12">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {section.title}
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-base leading-7 text-muted">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.links && section.links.length > 0 ? (
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-accent hover:text-accent-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}

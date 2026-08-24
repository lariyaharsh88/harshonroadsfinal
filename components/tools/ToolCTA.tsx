import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import type { ToolCtaContent } from "@/types/calculator";

export function ToolCTA({ cta }: { cta: ToolCtaContent }) {
  return (
    <Card className="bg-surface-raised">
      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {cta.title}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{cta.body}</p>
      <div className="mt-6">
        <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
      </div>
    </Card>
  );
}

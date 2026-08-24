import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";

export function NewsletterPlaceholder() {
  return (
    <Card interactive className="ai-panel border-blue/10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue">
        Newsletter
      </p>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
        Get your next weekend idea
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Occasional Delhi NCR weekend ideas, new tools and trip notes — when
        the list exists. No sign-up yet; this is a placeholder, not a form
        that collects email.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          disabled
          placeholder="Email sign-up coming soon"
          aria-label="Email address (coming soon)"
          className="min-h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-muted sm:max-w-sm"
        />
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="min-h-11 rounded-full bg-border px-6 text-sm font-semibold text-muted"
        >
          Get Weekend Trip Ideas
        </button>
      </div>
      <div className="mt-6">
        <ButtonLink href="/contact" variant="ghost">
          Or send a note →
        </ButtonLink>
      </div>
    </Card>
  );
}

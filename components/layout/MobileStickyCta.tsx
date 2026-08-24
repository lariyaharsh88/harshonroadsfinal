import { ButtonLink } from "@/components/ui/ButtonLink";

export function MobileStickyCta() {
  return (
    <div className="mobile-sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <ButtonLink
        href="/tools/weekend-trip-finder"
        className="w-full"
        variant="lime"
      >
        Find My Weekend
      </ButtonLink>
    </div>
  );
}

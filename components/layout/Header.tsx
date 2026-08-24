import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { Logo } from "@/components/navigation/Logo";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <ButtonLink href="/tools/weekend-trip-finder" variant="lime">
              Find My Trip
            </ButtonLink>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

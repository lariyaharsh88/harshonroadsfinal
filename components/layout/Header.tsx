import { HeaderScroll } from "@/components/layout/HeaderScroll";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { Logo } from "@/components/navigation/Logo";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Header() {
  return (
    <HeaderScroll>
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
    </HeaderScroll>
  );
}

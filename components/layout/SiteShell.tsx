import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

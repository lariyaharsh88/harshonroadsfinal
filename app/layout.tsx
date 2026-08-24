import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteShell } from "@/components/layout/SiteShell";
import { defaultOgImage, siteConfig } from "@/lib/seo";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "weekend trips from Delhi NCR",
    "weekend escapes from Delhi NCR",
    "HarshOnRoads",
  ],
  robots: {
    follow: true,
    googleBot: {
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [defaultOgImage.url],
  },
  category: "travel",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

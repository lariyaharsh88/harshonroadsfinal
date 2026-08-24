import type { Metadata } from "next";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = raw && raw.length > 0 ? raw : "https://harshonroads.com";
  return value.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "HarshOnRoads",
  shortName: "Harsh On Roads",
  tagline: "Weekend Escapes. Road Trips. India.",
  positioning:
    "Discover where to go, what to do, how much it costs, and how to plan your next escape from Delhi NCR.",
  description:
    "Discover the best weekend trips from Delhi NCR, travel ideas, itineraries, budgets and tools to plan your next escape.",
  defaultTitle: "HarshOnRoads | Weekend Escapes from Delhi NCR",
  url: resolveSiteUrl(),
  youtubeUrl: "https://www.youtube.com/@HarshOnRoads",
  locale: "en_IN",
  twitterHandle: "@harshonroads",
  themeColor: "#111318",
  backgroundColor: "#f6f7f9",
  robotsDisallow: ["/search/", "/admin/", "/login/", "/account/", "/api/"],
} as const;

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
} as const;

/** Path with a leading slash and no trailing slash, except `/`. */
export function canonicalPath(path = "/"): string {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash === "/") {
    return "/";
  }
  return withSlash.replace(/\/+$/, "") || "/";
}

export function absoluteUrl(path = "/"): string {
  const normalised = canonicalPath(path);
  if (normalised === "/") {
    return siteConfig.url;
  }
  return `${siteConfig.url}${normalised}`;
}

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  titleAbsolute?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  titleAbsolute = false,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const openGraphTitle = titleAbsolute
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
      },
    },
    openGraph: {
      title: openGraphTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      site: siteConfig.twitterHandle,
      images: [defaultOgImage.url],
    },
  };
}

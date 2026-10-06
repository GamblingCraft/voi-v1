import "server-only";
import type { Metadata } from "next";
import { localizePath, type Locale } from "@/i18n/config";
import { getLocalizedAlternates } from "@/i18n/metadata";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
);
export const isIndexable =
  process.env.SITE_INDEXABLE === "true" &&
  !["localhost", "127.0.0.1"].includes(siteUrl.hostname);
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: "ВОЙ",
      title,
      description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: localizePath(path, locale),
    },
    twitter: { card: "summary", title, description },
  };
}

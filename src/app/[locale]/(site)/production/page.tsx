import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getLandingContent } from "@/features/content/landing.content";
import { LandingPage } from "@/features/content/landing-page";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const content = getLandingContent("production");
  return pageMetadata(
    locale,
    "/production",
    content.seoTitle,
    content.description,
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <LandingPage locale={locale} slug="production" />;
}

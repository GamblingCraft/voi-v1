import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloudTransition } from "@/features/home/cloud-transition/cloud-transition";
import { Hero } from "@/features/home/hero/hero";
import { ProductStory } from "@/features/home/product-story/product-story";
import { productStoryContent } from "@/features/home/product-story/product-story.content";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";
import styles from "@/features/home/home.module.css";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: getLocalizedAlternates(locale),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <main id="top" className={styles.page}>
      <CloudTransition
        mode="clouds"
        smoothScroll
        hero={
          <Hero
            dictionary={dictionary.home.hero}
            introDictionary={dictionary.intro}
          />
        }
      >
        <ProductStory content={productStoryContent} />
      </CloudTransition>
    </main>
  );
}

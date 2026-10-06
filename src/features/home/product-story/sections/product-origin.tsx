"use client";

import { useCallback, useState } from "react";
import type { CatalogProduct } from "@/features/catalog/catalog-data";
import type { ProductStoryContent } from "../story.types";
import { ProductCarousel } from "../components/product-carousel";
import { MediaPlaceholder } from "../components/media-placeholder";
import { ScrollScene } from "../components/scroll-scene";
import { StoryHeading } from "../components/story-heading";
import shared from "../product-story.module.css";
import styles from "./product-origin.module.css";

export function ProductOrigin({
  content,
  products,
}: {
  content: ProductStoryContent["origin"];
  products: CatalogProduct[];
}) {
  const [compact, setCompact] = useState(false);
  const onProgress = useCallback((progress: number) => {
    setCompact(progress >= 0.4);
  }, []);
  return (
    <ScrollScene
      kind="origin"
      id="product-story"
      label={`${content.title.join(" ")} ${content.script}`}
      onProgress={onProgress}
      screenClassName={styles.screen}
    >
      <div className={styles.card}>
        <ProductCarousel products={products} compact={compact} />
      </div>
      <div className={styles.title}>
        <StoryHeading lines={content.title} script={content.script} />
        <p className={`${shared.copy} ${styles.note}`}>{content.note}</p>
      </div>
      <MediaPlaceholder className={styles.water} label={content.waterMedia} />
    </ScrollScene>
  );
}

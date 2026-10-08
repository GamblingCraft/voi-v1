"use client";

import Image from "next/image";
import type { CatalogProduct } from "@/features/catalog/catalog-data";
import type { ProductStoryContent } from "../story.types";
import { ProductCarousel } from "../components/product-carousel";
import { CloudTransition } from "../../cloud-transition/cloud-transition";
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
  return (
    <CloudTransition
      mode="clouds"
      id="product-story"
      hero={<ProductCarousel products={products} compact={false} />}
    >
      <div className={styles.baikalTrack}>
        <section
          className={styles.baikal}
          data-baikal-scene
          data-header-theme="light"
          aria-label={content.title.join(" ")}
        >
          <Image
            src="/media/cloud-transition/cloud-2-full.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.sceneCloudRear}
          />
          <Image
            src="/media/cloud-transition/cloud-1-cropped.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.sceneCloudRight}
          />
          <Image
            src="/media/baikal/bcksecondtest.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.landscape}
          />
          <div className={styles.title}>
            <StoryHeading
              lines={content.title.join(" ")}
              className={styles.heading}
            />
            <p className={`${shared.copy} ${styles.note}`}>{content.note}</p>
          </div>
        </section>
      </div>
    </CloudTransition>
  );
}

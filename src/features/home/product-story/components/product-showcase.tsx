"use client";

import { useRef } from "react";
import type { CatalogProduct } from "@/features/catalog/catalog-model";
import { useCloudTransition } from "../../cloud-transition/use-cloud-transition";
import { ProductCarousel } from "./product-carousel";
import styles from "../product-story.module.css";

export function ProductShowcase({ products }: { products: CatalogProduct[] }) {
  const sceneRef = useRef<HTMLElement>(null);
  useCloudTransition(sceneRef, "parallax", false, 1);

  return (
    <section ref={sceneRef} id="product-story" className={styles.products}
      data-header-theme="light" aria-label="Форматы льда">
      <div className={styles.productStage} data-cloud-stage>
        <div className={styles.productLayer}>
          <ProductCarousel products={products} compact={false} />
        </div>
      </div>
    </section>
  );
}

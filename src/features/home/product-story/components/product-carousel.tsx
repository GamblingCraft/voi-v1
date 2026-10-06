"use client";

import { useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import type { CatalogProduct } from "@/features/catalog/catalog-data";
import { CatalogCard } from "@/features/catalog/components/catalog-card";
import styles from "./product-carousel.module.css";

export function ProductCarousel({
  products,
  compact,
}: {
  products: CatalogProduct[];
  compact: boolean;
}) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const product = products[active];
  if (!product) return null;
  const change = (direction: number) =>
    setActive(
      (index) => (index + direction + products.length) % products.length,
    );
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("input, select, textarea"))
      return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      change(event.key === "ArrowRight" ? 1 : -1);
    }
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart !== null) {
      const delta = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(delta) > 45) change(delta < 0 ? 1 : -1);
    }
    setTouchStart(null);
  };
  return (
    <div
      className={styles.carousel}
      data-product-carousel
      data-compact={compact || undefined}
      inert={compact}
      role="region"
      aria-roledescription="карусель"
      aria-label="Товары из каталога ВОЙ"
      onKeyDown={onKeyDown}
    >
      <div className={styles.intro}>
        <h2>
          Lorem
          <br /> ipsum
        </h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div
        className={styles.visual}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => setTouchStart(null)}
      >
        <div className={styles.surface} />
        <Image
          className={styles.pack}
          src={product.packImage}
          alt="Упаковка барного льда ВОЙ"
          fill
          sizes="(max-width: 700px) 85vw, 52vw"
        />
        <div key={product.id} className={styles.ice}>
          <Image
            src={product.image}
            alt={product.form}
            fill
            sizes="(max-width: 700px) 40vw, 25vw"
          />
        </div>
      </div>
      <div className={styles.purchase}>
        <CatalogCard
          key={product.id}
          product={product}
          compact
          horizontalMobile
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.arrows}>
          <button
            type="button"
            onClick={() => change(-1)}
            aria-label="Предыдущий товар"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => change(1)}
            aria-label="Следующий товар"
          >
            →
          </button>
        </div>
      </div>
      <p className={styles.status} aria-live="polite" aria-atomic="true">
        {product.name}. {active + 1} из {products.length}
      </p>
    </div>
  );
}

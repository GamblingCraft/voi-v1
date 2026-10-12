"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import type { CatalogProduct } from "@/features/catalog/catalog-model";
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
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
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
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    gesture.current = null;
    if (
      compact ||
      event.touches.length !== 1 ||
      (event.target as HTMLElement).closest(
        "a, button, input, select, textarea",
      )
    )
      return;
    const touch = event.touches[0];
    gesture.current = {
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    };
  };
  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const start = gesture.current;
    const touch = Array.from(event.touches).find(
      (item) => item.identifier === start?.id,
    );
    if (!start || !touch) return;
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);
    // Once the user starts scrolling vertically, this gesture cannot change a product.
    if (event.touches.length !== 1 || (dy > 12 && dy > dx))
      gesture.current = null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    const touch = Array.from(event.changedTouches).find(
      (item) => item.identifier === start?.id,
    );
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      change(dx < 0 ? 1 : -1);
    }
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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => {
        gesture.current = null;
      }}
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
      <div className={styles.visual}>
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

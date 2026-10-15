"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/features/catalog/catalog-model";
import { CatalogCard } from "@/features/catalog/components/catalog-card";
import { iceFormats } from "@/features/catalog/ice-formats";
import cardStyles from "@/features/catalog/components/catalog-card.module.css";
import styles from "./product-carousel.module.css";

const formatDescriptions = {
  formed: "Для коктейлей и авторской подачи.",
  loose: "Для охлаждения, работы кухни и быстрого сервиса.",
  block: "Для ледяной резьбы, шоу и эффектной подачи.",
};

export function ProductCarousel({
  products,
  compact,
}: {
  products: CatalogProduct[];
  compact: boolean;
}) {
  const [active, setActive] = useState(0);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressImageClick = useRef(false);
  const format = iceFormats[active];
  const product =
    products.find(
      (item) => item.category === format.id && item.id === "sphere",
    ) ?? products.find((item) => item.category === format.id);
  const formatImage =
    format.id === "loose"
      ? "/media/products/loose-pack-cutout.png"
      : "/media/products/ice-blocks-cutout.png";
  const change = (direction: number) =>
    setActive(
      (index) => (index + direction + iceFormats.length) % iceFormats.length,
    );
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("input, select, textarea, nav"))
      return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      change(event.key === "ArrowRight" ? 1 : -1);
    }
  };
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    gesture.current = null;
    suppressImageClick.current = false;
    const target = event.target as HTMLElement;
    if (
      compact ||
      event.touches.length !== 1 ||
      target.closest("button, input, select, textarea, nav") ||
      (target.closest("a") && !target.closest("[data-format-image-link]"))
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
      suppressImageClick.current = true;
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
      aria-label="Форматы льда ВОЙ"
      data-active-format={format.id}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => {
        gesture.current = null;
      }}
    >
      <div className={styles.intro}>
        <h2>Создан для тех, кто открыт новым впечатлениям</h2>
        <div className={styles.formats}>
          <Link key={format.href} href={format.href} className={styles.format}>
            <h3>{format.name}</h3>
            <p>{formatDescriptions[format.id]}</p>
          </Link>
        </div>
      </div>
      <div key={format.id} className={styles.visual} data-format={format.id}>
        <div className={styles.surface} />
        {format.id !== "block" ? (
          <>
            <Image
              className={styles.pack}
              src={product?.packImage ?? formatImage}
              alt={
                product
                  ? "Упаковка барного льда ВОЙ"
                  : "Упаковка рассыпного льда «ЭТО ПРОСТО ЛЁД»"
              }
              fill
              sizes="(max-width: 700px) 85vw, 52vw"
            />
            <div className={styles.ice}>
              <Image
                src={
                  format.id === "formed"
                    ? (product?.image ?? "/media/products/sphere.png")
                    : "/media/products/cube.png"
                }
                alt={format.id === "formed" ? "Сфера льда" : "Кубик льда"}
                fill
                sizes="(max-width: 700px) 40vw, 25vw"
              />
            </div>
          </>
        ) : (
          <Image
            className={styles.formatImage}
            src={formatImage}
            alt={format.name}
            fill
            sizes="(max-width: 767px) 88vw, 45vw"
          />
        )}
        <Link
          className={styles.visualLink}
          data-format-image-link
          href={format.href}
          aria-label={`Открыть в каталоге: ${format.name}`}
          onClick={(event) => {
            if (suppressImageClick.current && event.detail !== 0) {
              event.preventDefault();
              suppressImageClick.current = false;
            }
          }}
        />
      </div>
      <div className={styles.purchase}>
        {product ? (
          <CatalogCard
            key={product.id}
            product={product}
            compact
            horizontalMobile
          />
        ) : (
          <article className={`${cardStyles.card} ${cardStyles.compactCard}`}>
            <h3>
              <Link href={format.href}>{format.name}</Link>
            </h3>
            <Link
              href={format.href}
              className={styles.formatCardImage}
              data-format={format.id}
              aria-label={`Подробнее: ${format.name}`}
            >
              <Image src={formatImage} alt={format.name} fill sizes="280px" />
            </Link>
            <Link data-ui-action className={styles.catalogLink} href={format.href}>
              В каталог
            </Link>
          </article>
        )}
      </div>
      <div className={styles.controls}>
        <div className={styles.arrows}>
          <button
            type="button"
            onClick={() => change(-1)}
            aria-label="Предыдущий формат"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => change(1)}
            aria-label="Следующий формат"
          >
            →
          </button>
        </div>
      </div>
      <p className={styles.status} aria-live="polite" aria-atomic="true">
        {format.name}. {active + 1} из {iceFormats.length}
      </p>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { useImageTrail } from "./use-image-trail";
import styles from "./image-trail-hero.module.css";

const images = [1, 2, 3, 4, 5, 6].map(
  (frame) => `/media/hero/opening/${frame}.png`,
);

type Props = {
  title: readonly string[];
  id?: string;
  media?: readonly string[];
};

/** Static text is available before hydration; only the decorative trail is interactive. */
export function ImageTrailHero({ title, id, media = images }: Props) {
  const root = useRef<HTMLElement>(null);
  const titleId = useId();
  useImageTrail(root, media);

  return (
    <>
      <section
        ref={root}
        id={id}
        className={styles.hero}
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className={styles.title}>
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <div className={styles.trail} aria-hidden="true">
          {[...media, ...media].map((src, index) => (
            <div
              className={styles.frame}
              data-trail-frame
              key={`${src}-${index}`}
            >
              <Image
                src={src}
                unoptimized={src.endsWith(".webp")}
                alt=""
                fill
                sizes="(max-width: 1199px) 64vw, 17.361111vw"
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
              />
            </div>
          ))}
        </div>
      </section>
      <div data-hero-following data-hero-theme="light" aria-hidden="true" />
    </>
  );
}

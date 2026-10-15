"use client";

import Image from "next/image";
import type { ProductStoryContent } from "../story.types";
import { StoryHeading } from "../components/story-heading";
import shared from "../product-story.module.css";
import styles from "./product-origin.module.css";

export function ProductOrigin({
  content,
}: {
  content: ProductStoryContent["origin"];
}) {
  return (
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
          <div className={styles.editorial}>
            <div className={styles.title}>
              <StoryHeading
                lines={content.title.join(" ")}
                className={styles.heading}
              />
              <p className={`${shared.copy} ${styles.note}`}>{content.note}</p>
            </div>
            <figure className={styles.quotation}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <blockquote className={styles.quote}>
                <p>{content.quote.text}</p>
              </blockquote>
              <figcaption className={styles.author}>
                {content.quote.author}
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
  );
}

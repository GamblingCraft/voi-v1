import type { CSSProperties } from "react";
import type { ProductStoryContent } from "../story.types";
import { MediaPlaceholder } from "../components/media-placeholder";
import { ScrollScene } from "../components/scroll-scene";
import { StoryHeading } from "../components/story-heading";
import shared from "../product-story.module.css";
import styles from "./production-story.module.css";

export function ProductionStory({
  content,
}: {
  content: ProductStoryContent["production"];
}) {
  return (
    <ScrollScene
      kind="production"
      itemCount={content.steps.length}
      id="production-story"
      label={content.eyebrow}
      screenClassName={styles.screen}
    >
      <div className={styles.left}>
        <p className={styles.sectionCaption}>{content.eyebrow}</p>
        {content.steps.map((step, index) => (
          <article
            key={step.id}
            className={styles.step}
            style={
              {
                "--step-opacity": `var(--step-${index}-opacity, 1)`,
                "--step-y": `var(--step-${index}-y, 0px)`,
              } as CSSProperties
            }
          >
            <svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true">
              {index === 0 ? (
                <path d="M32 7C24 21 12 32 12 43a20 20 0 0 0 40 0C52 32 40 21 32 7Z M21 43q0 10 10 10" />
              ) : index === 1 ? (
                <path d="M32 8v48M11 20l42 24M11 44l42-24M25 13l7 7 7-7M25 51l7-7 7 7M13 28l10-3-3-10M44 49l-3-10 10-3" />
              ) : (
                <path d="M10 24 32 13l22 11-22 11Z M10 24v27l22 11 22-11V24 M32 35v27" />
              )}
            </svg>
            <StoryHeading lines={step.title} className={styles.heading} />
            <p className={`${shared.copy} ${styles.description}`}>
              {step.description}
            </p>
          </article>
        ))}
      </div>
      <div className={styles.right}>
        {content.steps.map((step, index) => (
          <div
            key={step.id}
            className={styles.media}
            style={
              {
                "--step-opacity": `var(--step-${index}-opacity, 1)`,
              } as CSSProperties
            }
          >
            <MediaPlaceholder label={step.media} className={styles.mediaFill} />
          </div>
        ))}
      </div>
    </ScrollScene>
  );
}

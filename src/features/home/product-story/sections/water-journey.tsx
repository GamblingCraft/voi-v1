import type { ProductStoryContent } from "../story.types";
import { MediaPlaceholder } from "../components/media-placeholder";
import { ScrollScene } from "../components/scroll-scene";
import { StoryHeading } from "../components/story-heading";
import shared from "../product-story.module.css";
import styles from "./water-journey.module.css";

export function WaterJourney({
  content,
}: {
  content: ProductStoryContent["journey"];
}) {
  const { baikal, water, production, form, glass } = content;
  return (
    <ScrollScene
      kind="journey"
      id="water-journey"
      label={content.ariaLabel}
      screenClassName={styles.screen}
    >
      <div className={styles.track} data-story-track>
        <div className={styles.introBlock}>
          <StoryHeading
            className={styles.title}
            lines={content.title}
            script={content.script}
          />
          <p className={`${shared.copy} ${styles.intro}`}>
            {baikal.description}
          </p>
        </div>
        <MediaPlaceholder
          className={`${styles.photo} ${styles.product}`}
          label={baikal.media}
        />
        <MediaPlaceholder
          className={`${styles.photo} ${styles.production}`}
          label={water.media}
        />
        <div className={styles.detail}>
          <h3>
            {water.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <p className={shared.copy}>{water.description}</p>
        </div>
        <MediaPlaceholder
          className={`${styles.photo} ${styles.shape}`}
          label={production.media}
        />
        <div className={styles.productionBlock}>
          <StoryHeading
            className={styles.secondTitle}
            lines={production.title}
            script={production.script}
          />
          <p className={`${shared.copy} ${styles.note}`}>
            {production.description}
          </p>
        </div>
        <MediaPlaceholder
          className={`${styles.photo} ${styles.drink}`}
          label={production.teamMedia}
        />
        <MediaPlaceholder
          className={`${styles.photo} ${styles.final}`}
          label={form.media}
        />
        <div className={styles.formBlock}>
          <StoryHeading className={styles.thirdTitle} lines={form.title} />
          <p className={`${shared.copy} ${styles.formNote}`}>
            {form.description}
          </p>
        </div>
        <MediaPlaceholder
          className={`${styles.photo} ${styles.formPhoto}`}
          label={form.detailMedia}
        />
        <div className={styles.glassBlock}>
          <StoryHeading className={styles.fourthTitle} lines={glass.title} />
          <p className={`${shared.copy} ${styles.glassNote}`}>
            {glass.description}
          </p>
        </div>
        <MediaPlaceholder
          className={`${styles.photo} ${styles.glassPhoto}`}
          label={glass.media}
        />
        <svg
          className={styles.line}
          viewBox="0 0 5000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 220C200 220 230 0 410 140S630 290 800 170S1040 260 1210 180S1420 70 1580 130S1800 310 2000 150S2290 80 2450 150S2740 280 3000 160S3290 60 3500 160S3790 290 4000 160S4290 60 4500 170S4790 280 5000 160" />
        </svg>
      </div>
    </ScrollScene>
  );
}

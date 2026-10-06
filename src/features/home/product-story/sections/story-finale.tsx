import type { ProductStoryContent } from "../story.types";
import { MediaPlaceholder } from "../components/media-placeholder";
import { StoryHeading } from "../components/story-heading";
import shared from "../product-story.module.css";
import styles from "./story-finale.module.css";

export function StoryFinale({
  content,
}: {
  content: ProductStoryContent["finale"];
}) {
  return (
    <section
      className={styles.section}
      aria-label={`${content.title.join(" ")} ${content.script}`}
      data-header-theme="light"
    >
      <StoryHeading
        className={styles.title}
        lines={content.title}
        script={content.script}
      />
      <MediaPlaceholder label={content.media} className={styles.city} />
      <p className={`${shared.copy} ${styles.note}`}>{content.note}</p>
    </section>
  );
}

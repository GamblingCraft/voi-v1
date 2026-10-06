import type { ProductStoryContent } from "../story.types";
import { ScrollScene } from "../components/scroll-scene";
import { StoryHeading } from "../components/story-heading";
import styles from "./serving-ritual.module.css";

export function ServingRitual({
  content,
}: {
  content: ProductStoryContent["ritual"];
}) {
  return (
    <ScrollScene
      kind="ritual"
      id="serving-ritual"
      label={`${content.title} ${content.script}`}
    >
      <StoryHeading
        className={styles.title}
        lines={content.title}
        script={content.script}
      />
      <div className={styles.media}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Подача напитков со льдом ВОЙ"
        >
          <source src="/media/start/section_start.mp4" type="video/mp4" />
        </video>
      </div>
    </ScrollScene>
  );
}

import type { ProductStoryContent } from "../story.types";
import styles from "./story-text.module.css";

export function StoryText({
  content,
}: {
  content: ProductStoryContent["text"];
}) {
  return (
    <section
      className={styles.section}
      id="story-text"
      aria-labelledby="story-text-title"
      data-header-theme="light"
    >
      <h2 id="story-text-title">{content.title}</h2>
      <div className={styles.copy}>
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

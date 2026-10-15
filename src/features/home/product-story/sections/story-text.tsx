import Image from "next/image";
import { StoryEyebrow } from "../components/story-eyebrow";
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
      <div className={styles.heading}>
        <StoryEyebrow>О льде ВОЙ</StoryEyebrow>
        <h2 id="story-text-title">{content.title}</h2>
      </div>
      <div className={styles.layout}>
        <div className={styles.mainImage}>
          <Image
            src="/media/cooperation/2.webp"
            alt="Прозрачные кубы льда на производственной линии"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className={styles.detail}>
          <div className={styles.copy}>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.detailImage}>
            <Image
              src="/media/cooperation/7.webp"
              alt="Подача кубиков льда в бокал"
              fill
              sizes="(max-width: 800px) 80vw, 36vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

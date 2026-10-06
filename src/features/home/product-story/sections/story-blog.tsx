import type { ProductStoryContent } from "../story.types";
import { MediaPlaceholder } from "../components/media-placeholder";
import styles from "./story-blog.module.css";

export function StoryBlog({
  content,
}: {
  content: ProductStoryContent["blog"];
}) {
  return (
    <section
      id="story-blog"
      className={styles.section}
      aria-labelledby="story-blog-title"
      data-header-theme="light"
    >
      <div className={styles.heading}>
        <h2 id="story-blog-title">{content.title}</h2>
        <p>{content.description}</p>
      </div>
      <div className={styles.layout}>
        {content.items.map((item, index) => (
          <article
            key={item.id}
            className={index === 0 ? styles.feature : styles.article}
          >
            <div className={styles.content}>
              <MediaPlaceholder label={item.media} className={styles.media} />
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

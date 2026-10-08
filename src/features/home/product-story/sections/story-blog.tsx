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
            aria-labelledby={`story-blog-${item.id}-title`}
          >
            <MediaPlaceholder label={item.media} className={styles.media} />
            <div className={styles.content}>
              <ul className={styles.tags} aria-label="Темы статьи">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <h3 id={`story-blog-${item.id}-title`}>{item.title}</h3>
              <p className={styles.excerpt}>{item.excerpt}</p>
              <div className={styles.metadata}>
                <span className={styles.readingTime}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5h4" />
                  </svg>
                  {item.readingMinutes} мин чтения
                </span>
                <time dateTime={item.date}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="3" />
                    <path d="M7 3v4m10-4v4M3 10h18" />
                  </svg>
                  {item.dateLabel}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

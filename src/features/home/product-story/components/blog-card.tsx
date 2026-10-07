import clsx from "clsx";
import { MediaPlaceholder } from "./media-placeholder";
import styles from "./blog-card.module.css";

type BlogCardProps = {
  article: {
    id: string;
    title: string;
    excerpt: string;
    media: string;
    readingMinutes: number;
    tags: readonly string[];
  };
  actionLabel: string;
  className?: string;
};

export function BlogCard({ article, actionLabel, className }: BlogCardProps) {
  const titleId = `story-blog-${article.id}-title`;

  return (
    <article className={clsx(styles.card, className)} aria-labelledby={titleId}>
      <MediaPlaceholder label={article.media} className={styles.media} />
      <div className={styles.body}>
        <div className={styles.meta}>
          <ul className={styles.tags} aria-label="Теги статьи">
            {article.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span className={styles.readingTime}>
            {article.readingMinutes} мин чтения
          </span>
        </div>
        <h3 id={titleId} className={styles.title}>
          {article.title}
        </h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <button
          type="button"
          className={styles.action}
          disabled
          aria-describedby={titleId}
        >
          {actionLabel}
        </button>
      </div>
    </article>
  );
}

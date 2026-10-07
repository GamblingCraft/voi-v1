import type { ProductStoryContent } from "../story.types";
import { BlogCard } from "../components/blog-card";
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
          <BlogCard
            key={item.id}
            article={item}
            actionLabel={content.actionLabel}
            className={index === 0 ? styles.feature : styles.article}
          />
        ))}
      </div>
    </section>
  );
}

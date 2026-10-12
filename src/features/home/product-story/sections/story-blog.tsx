import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/features/blog/articles";
import { ArticleMeta } from "@/features/blog/components/article-meta";
import styles from "./story-blog.module.css";

export function StoryBlog() {
  const articles = getArticles().slice(0, 5);
  return (
    <section
      id="story-blog"
      className={styles.section}
      aria-labelledby="story-blog-title"
      data-header-theme="light"
    >
      <div className={styles.heading}>
        <h2 id="story-blog-title">Журнал ВОЙ</h2>
        <div>
          <p>
            Лёд, рецепты и культура подачи. Практика для бара и вашего
            следующего события.
          </p>
          <Link className={styles.allArticles} href="/blog">
            Все статьи
          </Link>
        </div>
      </div>
      <div className={styles.layout}>
        {articles.map((article, index) => (
          <article
            key={article.slug}
            className={index === 0 ? styles.feature : styles.article}
          >
            <Link
              href={`/blog/${article.slug}`}
              className={styles.media}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={article.image}
                alt=""
                fill
                sizes={
                  index === 0
                    ? "(max-width: 700px) 90vw, 60vw"
                    : "(max-width: 700px) 90vw, 30vw"
                }
              />
            </Link>
            <div className={styles.content}>
              <ul className={styles.tags} aria-label="Темы статьи">
                {[...new Set([article.topic, ...article.tags])].map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <h3>
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <ArticleMeta article={article} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

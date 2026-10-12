import Link from "next/link";
import { articleDate } from "../blog-model";
import type { Article } from "../blog.types";
import styles from "../blog.module.css";
export function BlogNews({ articles }: { articles: Article[] }) {
  return (
    <aside className={styles.news} aria-labelledby="news-title">
      <h2 id="news-title">Новое в журнале</h2>
      {articles.slice(1, 4).map((article) => (
        <Link href={`/blog/${article.slug}`} key={article.slug}>
          <span>{article.title}</span>
          <time dateTime={article.date}>{articleDate(article.date)}</time>
        </Link>
      ))}
      <Link className={styles.newsAll} href="#articles">
        Все материалы
      </Link>
    </aside>
  );
}

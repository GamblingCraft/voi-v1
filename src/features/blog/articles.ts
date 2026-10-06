import "server-only";
import { selectProductArticles, type BlogArticle } from "./article-relations";

// Replace this source with the blog CMS repository when articles are connected.
const articles: BlogArticle[] = [];
export function getProductArticles(product: {
  id: string;
  tags: readonly string[];
}) {
  return selectProductArticles(articles, product);
}

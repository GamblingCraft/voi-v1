import test from "node:test";
import assert from "node:assert/strict";
import { selectProductArticles } from "../src/features/blog/article-relations.ts";
const article = (slug, overrides = {}) => ({
  slug,
  title: slug,
  excerpt: "",
  kind: "recipe",
  status: "published",
  tags: [],
  productIds: [],
  ...overrides,
});
test("Product references take priority over matching tags; drafts and unrelated posts are excluded", () => {
  const rows = [
    article("tag", { tags: ["cocktails"] }),
    article("draft", { status: "draft", productIds: ["cube"] }),
    article("other"),
    article("direct", { productIds: ["cube"] }),
    article("both", { tags: ["cocktails"], productIds: ["cube"] }),
  ];
  assert.deepEqual(
    selectProductArticles(rows, { id: "cube", tags: ["cocktails"] }).map(
      (a) => a.slug,
    ),
    ["direct", "both", "tag"],
  );
  assert.equal(rows[0].slug, "tag");
});
test("Products without references or shared tags get an empty list", () => {
  assert.deepEqual(
    selectProductArticles([article("sphere", { productIds: ["sphere"] })], {
      id: "cube",
      tags: [],
    }),
    [],
  );
});

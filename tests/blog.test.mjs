import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { selectArticles } from "../src/features/blog/blog-model.ts";
import { blogArticles } from "../src/features/blog/blog.content.ts";
import { articleStructuredData } from "../src/features/blog/article-schema.ts";
import {
  blogTopicHref,
  blogTopicSlugs,
} from "../src/features/blog/blog-topics.ts";

test("topic URLs use unique Latin slugs and preserve search when switching tabs", () => {
  const slugs = new Set();
  for (const article of blogArticles) {
    const slug = blogTopicSlugs[article.topic];
    assert.match(slug, /^[a-z]+(?:-[a-z]+)*$/);
    const url = new URL(
      blogTopicHref(article.topic, "лёд & бар"),
      "https://example.com",
    );
    assert.equal(url.searchParams.get("topic"), slug);
    assert.equal(url.searchParams.get("q"), "лёд & бар");
    assert.equal(url.hash, "#articles");
    slugs.add(slug);
  }
  assert.equal(slugs.size, Object.keys(blogTopicSlugs).length);
  const all = new URL(blogTopicHref("", "лёд"), "https://example.com");
  assert.equal(all.searchParams.has("topic"), false);
  assert.equal(all.searchParams.get("q"), "лёд");
  assert.equal(blogTopicHref(""), "/blog#articles");
});

test("journal search combines topic and Russian text, excludes drafts and preserves source order", () => {
  const rows = blogArticles;
  const query = selectArticles(rows, "  БУРБОН  ", "Рецепты");
  assert.deepEqual(
    query.map((item) => item.slug),
    ["viski-sauer"],
  );
  assert.equal(selectArticles(rows, "бурбон", "События").length, 0);
  assert.equal(
    selectArticles([{ ...rows[0], status: "draft" }], "", "").length,
    0,
  );
  assert.equal(rows[0].slug, "viski-sauer");
});

test("recipe schema uses the same ingredients and anchored steps as the visible recipe", () => {
  const article = blogArticles.find((item) => item.slug === "viski-sauer");
  const schema = articleStructuredData(article, new URL("https://example.com"));
  const recipe = schema["@graph"].find((item) => item["@type"] === "Recipe");
  assert.deepEqual(recipe.recipeIngredient, article.recipe.ingredients);
  assert.deepEqual(
    recipe.recipeInstructions.map((step) => step.text),
    article.recipe.steps.map((step) => step.text),
  );
  assert.ok(
    recipe.recipeInstructions.every((step, index) =>
      step.url.endsWith(`#${article.recipe.steps[index].id}`),
    ),
  );
  assert.equal(recipe.aggregateRating, undefined);
  assert.equal(
    recipe.image,
    undefined,
    "a generic sphere cover must not be presented as the finished cocktail",
  );
});

test("published article routes, anchors and media are valid, embedded products are included in relations", () => {
  const slugs = new Set();
  for (const article of blogArticles) {
    assert.ok(!slugs.has(article.slug));
    slugs.add(article.slug);
    assert.ok(
      existsSync(new URL(`../public${article.image}`, import.meta.url)),
    );
    const anchors = new Set();
    for (const section of article.sections) {
      assert.ok(!anchors.has(section.id));
      anchors.add(section.id);
      if (section.productId)
        assert.ok(article.productIds.includes(section.productId));
    }
  }
});

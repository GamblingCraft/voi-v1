import test from "node:test";
import assert from "node:assert/strict";
import { productSlug } from "../src/features/catalog/product-slug.ts";
test("Russian product title becomes the requested readable URL", () => {
  assert.equal(
    productSlug("Формованный лёд Куб 1 кг"),
    "formovannyj-lyod-kub-1-kg",
  );
  assert.equal(productSlug("  Лёд «ВОЙ» — 2 кг! "), "lyod-voj-2-kg");
});

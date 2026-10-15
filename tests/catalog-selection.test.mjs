import test from "node:test";
import assert from "node:assert/strict";
import {
  selectCatalogProducts,
  catalogFilterHref,
} from "../src/features/catalog/catalog-selection.ts";

const products = [
  {
    id: "sphere",
    name: "Сфера",
    form: "Сфера",
    usage: ["spirits"],
    serving: "Для виски",
    description: "Широкий бокал",
  },
  {
    id: "cube",
    name: "Куб",
    form: "Куб",
    usage: ["spirits", "cocktails"],
    serving: "Для коктейлей",
    description: "Низкий бокал",
  },
];
const usages = [
  { id: "all", label: "Любая подача" },
  { id: "spirits", label: "Крепкие напитки" },
];

test("filters combine and Russian search ignores case and outer spaces", () => {
  const result = selectCatalogProducts(products, usages, {
    shape: "cube",
    usage: "spirits",
    q: " НИЗКИЙ ",
  });
  assert.deepEqual(
    result.products.map((item) => item.id),
    ["cube"],
  );
  assert.equal(result.q, "НИЗКИЙ");
  assert.deepEqual(
    result.filters.map((filter) => filter.key),
    ["shape", "usage", "q"],
  );
});

test("unrecognized filters use defaults and sorting leaves the source order intact", () => {
  const result = selectCatalogProducts(products, usages, {
    shape: "unknown",
    usage: "unknown",
    sort: "name",
  });
  assert.equal(result.shape, "all");
  assert.equal(result.usage, "all");
  assert.deepEqual(
    result.products.map((item) => item.id),
    ["cube", "sphere"],
  );
  assert.deepEqual(
    products.map((item) => item.id),
    ["sphere", "cube"],
  );
});

test("removing one filter preserves and safely encodes the other selections", () => {
  const href = catalogFilterHref(
    { shape: "cube", usage: "spirits", q: "Куб & лёд", sort: "name" },
    "shape",
  );
  const url = new URL(href, "https://example.com");
  assert.equal(url.pathname, "/catalog/formed");
  assert.equal(url.hash, "#discover");
  assert.equal(url.searchParams.has("shape"), false);
  assert.equal(url.searchParams.get("q"), "Куб & лёд");
  assert.equal(url.searchParams.get("usage"), "spirits");
});

test("removing a filter stays in the loose or block category", () => {
  for (const category of ["loose", "block"]) {
    const href = catalogFilterHref(
      { shape: category, usage: "all", q: "лёд", sort: "name" },
      "shape",
      `/catalog/${category}`,
    );
    const url = new URL(href, "https://example.com");
    assert.equal(url.pathname, `/catalog/${category}`);
    assert.equal(url.searchParams.has("shape"), false);
    assert.equal(url.searchParams.get("q"), "лёд");
  }
});

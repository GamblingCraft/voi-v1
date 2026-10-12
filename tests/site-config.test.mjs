import test from "node:test";
import assert from "node:assert/strict";
import { resolveSiteConfig } from "../src/lib/site-config.ts";

test("indexing requires an explicit public URL and opt-in", () => {
  for (const url of [
    undefined,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://[::1]:3000",
    "http://preview.localhost",
  ]) {
    assert.equal(
      resolveSiteConfig({ url, indexable: "true" }).isIndexable,
      false,
    );
  }
  assert.equal(
    resolveSiteConfig({ url: "https://example.com" }).isIndexable,
    false,
  );
  assert.equal(
    resolveSiteConfig({ url: "https://example.com", indexable: "true" })
      .isIndexable,
    true,
  );
});
test("invalid or non-HTTP public URLs fail configuration early", () => {
  for (const url of [
    "not a url",
    "file:///tmp/site",
    "https://user:pass@example.com",
  ]) {
    assert.throws(() => resolveSiteConfig({ url }));
  }
});

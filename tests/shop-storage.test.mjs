import test from "node:test";
import assert from "node:assert/strict";
import { decodeShopState } from "../src/features/cart/shop-storage.ts";
const decode = (value) =>
  decodeShopState(
    value,
    (id) => ["cube", "sphere", "cylinder"].includes(id),
    [1, 2, 3],
  );

test("stored cart drops corrupt, unknown, duplicate and out-of-range entries", () => {
  const valid = { productId: "cube", weight: 1, quantity: 2 };
  const result = decode(
    JSON.stringify({
      items: [
        null,
        valid,
        valid,
        { ...valid, productId: "unknown" },
        { ...valid, weight: 5 },
        { ...valid, quantity: 100 },
        { ...valid, quantity: 1.5 },
        { ...valid, quantity: "2" },
      ],
      viewed: ["sphere", "sphere", "unknown", null],
    }),
  );
  assert.deepEqual(result, { items: [valid], viewed: ["sphere"] });
});
test("a corrupt history does not discard an otherwise valid cart", () => {
  const items = [{ productId: "cylinder", weight: 2, quantity: 1 }];
  assert.deepEqual(decode(JSON.stringify({ items, viewed: "broken" })), {
    items,
    viewed: [],
  });
});
test("invalid JSON, empty storage and primitive values are safe", () => {
  for (const input of [null, "{", "null", "true", "42"])
    assert.deepEqual(decode(input), { items: [], viewed: [] });
});

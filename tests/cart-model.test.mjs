import test from "node:test";
import assert from "node:assert/strict";
import {
  addCartItem,
  setCartQuantity,
  cartQuantity,
} from "../src/features/cart/cart-model.ts";

test("same product and weight merge, different weights remain separate", () => {
  let items = addCartItem([], "cube", 1);
  items = addCartItem(items, "cube", 1);
  items = addCartItem(items, "cube", 2);
  assert.equal(items.length, 2);
  assert.equal(items[0].quantity, 2);
  assert.equal(items[1].weight, 2);
  assert.equal(cartQuantity(items), 3);
});
test("quantity edits affect only the selected variant and zero removes it", () => {
  const items = addCartItem(addCartItem([], "cube", 1), "cube", 3);
  const changed = setCartQuantity(items, "cube", 1, 4);
  assert.equal(cartQuantity(changed), 5);
  assert.deepEqual(setCartQuantity(changed, "cube", 1, 0), [
    { productId: "cube", weight: 3, quantity: 1 },
  ]);
  assert.equal(items[0].quantity, 1);
});
test("quantity is bounded and invalid input leaves state unchanged", () => {
  const items = [{ productId: "sphere", weight: 2, quantity: 99 }];
  assert.equal(addCartItem(items, "sphere", 2)[0].quantity, 99);
  assert.equal(setCartQuantity(items, "sphere", 2, 1000)[0].quantity, 99);
  assert.strictEqual(setCartQuantity(items, "sphere", 2, NaN), items);
});

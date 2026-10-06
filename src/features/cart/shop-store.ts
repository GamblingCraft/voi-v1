"use client";
import { useEffect, useSyncExternalStore } from "react";
import {
  getCatalogProducts,
  productWeights,
  previewPackPrice,
  type ProductId,
  type ProductWeight,
} from "../catalog/catalog-data";
import {
  addCartItem,
  setCartQuantity,
  cartQuantity,
  type CartLine,
} from "./cart-model";

type ShopState = { items: CartLine[]; viewed: ProductId[] };
const empty: ShopState = { items: [], viewed: [] };
let state = empty;
let hydrated = false;
const key = "voi-shop-v1";
const listeners = new Set<() => void>();
const ids = new Set(getCatalogProducts().map((item) => item.id));
function decode(raw: string | null): ShopState {
  try {
    const data = JSON.parse(raw ?? "null");
    if (!data || !Array.isArray(data.items) || !Array.isArray(data.viewed))
      return empty;
    const items: CartLine[] = [];
    for (const line of data.items.slice(0, 30)) {
      if (
        ids.has(line?.productId) &&
        productWeights.includes(line.weight) &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0 &&
        line.quantity <= 99 &&
        !items.some(
          (item) =>
            item.productId === line.productId && item.weight === line.weight,
        )
      )
        items.push({
          productId: line.productId,
          weight: line.weight,
          quantity: line.quantity,
        });
    }
    const viewed = [
      ...new Set<ProductId>(data.viewed.filter((id: ProductId) => ids.has(id))),
    ].slice(0, 8);
    return { items, viewed };
  } catch {
    return empty;
  }
}
function emit() {
  listeners.forEach((listener) => listener());
}
function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    state = decode(localStorage.getItem(key));
  } catch {
    state = empty;
  }
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) {
      state = decode(event.key === null ? null : event.newValue);
      emit();
    }
  });
  emit();
}
function commit(next: ShopState) {
  state = next;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    /* The cart remains usable if storage is unavailable. */
  }
  emit();
}
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
export function useShop() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => state,
    () => empty,
  );
  useEffect(hydrate, []);
  return snapshot;
}
export function addToCart(productId: ProductId, weight: ProductWeight) {
  hydrate();
  commit({ ...state, items: addCartItem(state.items, productId, weight) });
}
export function changeQuantity(
  productId: ProductId,
  weight: ProductWeight,
  quantity: number,
) {
  hydrate();
  commit({
    ...state,
    items: setCartQuantity(state.items, productId, weight, quantity),
  });
}
export function rememberProduct(productId: ProductId) {
  hydrate();
  if (state.viewed[0] !== productId)
    commit({
      ...state,
      viewed: [
        productId,
        ...state.viewed.filter((id) => id !== productId),
      ].slice(0, 8),
    });
}
export function cartTotal(items: CartLine[]) {
  return cartQuantity(items) * previewPackPrice;
}
export { cartQuantity };

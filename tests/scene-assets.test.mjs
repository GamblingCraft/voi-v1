import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));

test("every scene manifest asset and compressed-texture decoder is present in public", () => {
  const urls = new Set([
    "/media/product/media/optimized/basis-r151/basis_transcoder.js",
    "/media/product/media/optimized/basis-r151/basis_transcoder.wasm",
  ]);
  function walk(value) {
    if (typeof value === "string" && value.startsWith("/media/"))
      urls.add(value);
    else if (value && typeof value === "object")
      for (const [key, entry] of Object.entries(value)) {
        walk(key);
        walk(entry);
      }
  }
  for (const file of fs.readdirSync(path.join(root, "src/lib/three/data"))) {
    if (file.endsWith(".json"))
      walk(
        JSON.parse(
          fs.readFileSync(path.join(root, "src/lib/three/data", file), "utf8"),
        ),
      );
  }
  for (const url of urls)
    assert.ok(
      fs.existsSync(path.join(root, "public", url)),
      `Missing runtime asset: ${url}`,
    );
});

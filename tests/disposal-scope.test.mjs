import test from "node:test";
import assert from "node:assert/strict";
import { createDisposalScope } from "../src/lib/disposal-scope.ts";

test("initialization failure and unmount release resources only once in reverse order", () => {
  const calls = [];
  const scope = createDisposalScope();
  scope.add(() => calls.push("motion"));
  scope.add(() => calls.push("backgrounds"));
  scope.add(() => calls.push("renderer"));
  scope.dispose();
  scope.dispose();
  assert.deepEqual(calls, ["renderer", "backgrounds", "motion"]);
});

test("late asynchronous acquisition after unmount is released immediately", () => {
  const scope = createDisposalScope();
  let released = 0;
  scope.dispose();
  scope.add(() => released++);
  scope.dispose();
  assert.equal(released, 1);
});

test("one failing cleanup does not leak remaining resources", (t) => {
  t.mock.method(console, "error", () => {});
  const scope = createDisposalScope();
  let released = false;
  scope.add(() => {
    released = true;
  });
  scope.add(() => {
    throw new Error("context lost");
  });
  scope.dispose();
  assert.equal(released, true);
  assert.equal(console.error.mock.callCount(), 1);
});

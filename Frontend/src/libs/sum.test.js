import { describe, it } from "vitest";

// The two tests marked with concurrent will be run in parallel
describe("suite", () => {
  it.concurrent("concurrent test 1", async ({ expect }) => {
    expect(1).toBe(1);
  });
  it.concurrent("concurrent test 2", async ({ expect }) => {
    expect(2).toBe(2);
  });
});
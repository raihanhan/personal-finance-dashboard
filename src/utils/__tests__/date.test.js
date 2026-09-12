import { describe, it, expect } from "vitest";
import { parseLocalDate } from "../date";

describe("parseLocalDate", () => {
  it("parses a valid date string to a local Date", () => {
    const date = parseLocalDate("2026-09-13");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(8); // September = 8
    expect(date.getDate()).toBe(13);
  });

  it("returns null for empty string", () => {
    expect(parseLocalDate("")).toBeNull();
  });

  it("returns null for null input", () => {
    expect(parseLocalDate(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(parseLocalDate(undefined)).toBeNull();
  });

  it("does not shift by timezone (local midnight)", () => {
    const date = parseLocalDate("2026-01-01");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
    expect(date.getHours()).toBe(0);
  });

  it("handles month boundaries correctly", () => {
    const dec = parseLocalDate("2026-12-31");
    expect(dec.getMonth()).toBe(11);
    expect(dec.getDate()).toBe(31);

    const jan = parseLocalDate("2026-01-01");
    expect(jan.getMonth()).toBe(0);
    expect(jan.getDate()).toBe(1);
  });

  it("handles leap year dates", () => {
    const date = parseLocalDate("2028-02-29");
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(29);
  });
});

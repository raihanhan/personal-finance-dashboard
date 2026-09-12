import { describe, it, expect } from "vitest";
import { formatCurrency } from "../currency";

describe("formatCurrency", () => {
  it("formats a number as IDR", () => {
    const result = formatCurrency(1000000);
    expect(result).toContain("Rp");
    expect(result).toContain("1.000.000");
  });

  it("formats zero", () => {
    const result = formatCurrency(0);
    expect(result).toContain("Rp");
    expect(result).toContain("0");
  });

  it("formats string numbers", () => {
    const result = formatCurrency("2500000");
    expect(result).toContain("2.500.000");
  });

  it("handles null/undefined gracefully", () => {
    expect(formatCurrency(null)).toContain("Rp");
    expect(formatCurrency(undefined)).toContain("Rp");
  });

  it("handles large numbers", () => {
    const result = formatCurrency(100000000);
    expect(result).toContain("Rp");
    expect(result).toContain("100.000.000");
  });

  it("rounds to whole Rupiah (no decimals)", () => {
    const result = formatCurrency(1234567.89);
    expect(result).not.toContain(",");
  });
});

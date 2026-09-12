import { describe, it, expect } from "vitest";
import { calculateBudgetSpent } from "../dashboard";

describe("calculateBudgetSpent", () => {
  const makeTransaction = (overrides) => ({
    id: crypto.randomUUID(),
    type: "expense",
    amount: 100000,
    category_id: "cat-1",
    transaction_date: "2026-09-15",
    ...overrides,
  });

  const makeBudget = (overrides) => ({
    id: crypto.randomUUID(),
    category_id: "cat-1",
    amount: 500000,
    month: 9,
    year: 2026,
    ...overrides,
  });

  // ── Basic functionality ──────────────────────────────

  it("sums expense transactions matching category and month", () => {
    const budgets = [makeBudget({ category_id: "cat-1" })];
    const transactions = [
      makeTransaction({ category_id: "cat-1", amount: 100000 }),
      makeTransaction({ category_id: "cat-1", amount: 200000 }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(300000);
  });

  it("returns 0 spent when no transactions match", () => {
    const budgets = [makeBudget({ category_id: "cat-1" })];
    const transactions = [
      makeTransaction({ category_id: "cat-other", amount: 100000 }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(0);
  });

  it("returns 0 spent for empty transactions array", () => {
    const budgets = [makeBudget()];
    const result = calculateBudgetSpent(budgets, []);
    expect(result[0].spent).toBe(0);
  });

  it("returns empty array for empty budgets", () => {
    const result = calculateBudgetSpent([], [makeTransaction()]);
    expect(result).toEqual([]);
  });

  // ── Type filtering ───────────────────────────────────

  it("ignores income transactions", () => {
    const budgets = [makeBudget({ category_id: "cat-1" })];
    const transactions = [
      makeTransaction({
        type: "income",
        category_id: "cat-1",
        amount: 500000,
      }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(0);
  });

  // ── Date filtering ───────────────────────────────────

  it("filters by month and year correctly", () => {
    const budgets = [makeBudget({ month: 9, year: 2026 })];
    const transactions = [
      makeTransaction({
        category_id: "cat-1",
        transaction_date: "2026-09-15",
        amount: 100000,
      }),
      makeTransaction({
        category_id: "cat-1",
        transaction_date: "2026-08-15",
        amount: 200000,
      }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(100000);
  });

  it("handles date range budgets (start_date / end_date)", () => {
    const budgets = [
      makeBudget({
        month: null,
        year: null,
        start_date: "2026-09-01",
        end_date: "2026-09-30",
      }),
    ];
    const transactions = [
      makeTransaction({
        category_id: "cat-1",
        transaction_date: "2026-09-15",
        amount: 100000,
      }),
      makeTransaction({
        category_id: "cat-1",
        transaction_date: "2026-10-01",
        amount: 200000,
      }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(100000);
  });

  it("handles budgets with only start_date (no end_date)", () => {
    const budgets = [
      makeBudget({
        month: null,
        year: null,
        start_date: "2026-09-01",
        end_date: null,
      }),
    ];
    const transactions = [
      makeTransaction({
        category_id: "cat-1",
        transaction_date: "2026-09-15",
        amount: 100000,
      }),
      makeTransaction({
        category_id: "cat-1",
        transaction_date: "2026-08-15",
        amount: 200000,
      }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(100000);
  });

  // ── Multiple budgets ─────────────────────────────────

  it("handles multiple budgets independently", () => {
    const budgets = [
      makeBudget({ id: "b1", category_id: "cat-1", amount: 300000 }),
      makeBudget({ id: "b2", category_id: "cat-2", amount: 200000 }),
    ];
    const transactions = [
      makeTransaction({ category_id: "cat-1", amount: 100000 }),
      makeTransaction({ category_id: "cat-1", amount: 50000 }),
      makeTransaction({ category_id: "cat-2", amount: 200000 }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(150000);
    expect(result[1].spent).toBe(200000);
  });

  // ── Preserves budget properties ──────────────────────

  it("preserves all budget properties and adds spent", () => {
    const budget = makeBudget({
      id: "b1",
      category_id: "cat-1",
      amount: 500000,
      month: 9,
      year: 2026,
    });
    const transactions = [
      makeTransaction({ amount: 100000 }),
    ];

    const result = calculateBudgetSpent([budget], transactions);
    expect(result[0]).toEqual({
      ...budget,
      spent: 100000,
    });
  });

  // ── Edge cases ───────────────────────────────────────

  it("handles null/undefined amount in transaction gracefully", () => {
    const budgets = [makeBudget()];
    const transactions = [
      makeTransaction({ amount: undefined }),
      makeTransaction({ amount: null }),
    ];

    const result = calculateBudgetSpent(budgets, transactions);
    expect(result[0].spent).toBe(0);
  });
});

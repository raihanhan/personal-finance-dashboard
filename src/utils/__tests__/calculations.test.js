import { describe, it, expect } from "vitest";
import {
  calculateTotalBalance,
  getSignedAmount,
  filterTransactionsByMonth,
  calculateSummary,
  calculateMonthlySummary,
  calculateSavingsRate,
  calculateBudgetPercentage,
  calculateGoalProgress,
  groupExpensesByCategory,
} from "../calculations";

// ── calculateTotalBalance ──────────────────────────────

describe("calculateTotalBalance", () => {
  it("sums all account balances", () => {
    const accounts = [
      { balance: 1000000 },
      { balance: 500000 },
      { balance: 2500000 },
    ];
    expect(calculateTotalBalance(accounts)).toBe(4000000);
  });

  it("returns 0 for empty accounts", () => {
    expect(calculateTotalBalance([])).toBe(0);
  });

  it("handles string balances", () => {
    const accounts = [{ balance: "1000000" }, { balance: "500000" }];
    expect(calculateTotalBalance(accounts)).toBe(1500000);
  });

  it("handles null/undefined balances gracefully", () => {
    const accounts = [
      { balance: 1000000 },
      { balance: null },
      { balance: undefined },
    ];
    expect(calculateTotalBalance(accounts)).toBe(1000000);
  });

  it("handles negative balances", () => {
    const accounts = [{ balance: 1000000 }, { balance: -200000 }];
    expect(calculateTotalBalance(accounts)).toBe(800000);
  });
});

// ── getSignedAmount ────────────────────────────────────

describe("getSignedAmount", () => {
  it("returns positive for income", () => {
    expect(
      getSignedAmount({ type: "income", amount: 500000 })
    ).toBe(500000);
  });

  it("returns negative for expense", () => {
    expect(
      getSignedAmount({ type: "expense", amount: 300000 })
    ).toBe(-300000);
  });

  it("handles string amounts", () => {
    expect(
      getSignedAmount({ type: "income", amount: "750000" })
    ).toBe(750000);
  });

  it("handles zero amount", () => {
    const result = getSignedAmount({ type: "expense", amount: 0 });
    expect(result === 0).toBe(true);
  });

  it("always returns absolute value of amount", () => {
    expect(
      getSignedAmount({ type: "income", amount: -100 })
    ).toBe(100);
  });
});

// ── filterTransactionsByMonth ──────────────────────────

describe("filterTransactionsByMonth", () => {
  const tx = (date) => ({ transaction_date: date });

  it("filters transactions to the specified month", () => {
    const transactions = [
      tx("2026-09-01"),
      tx("2026-09-15"),
      tx("2026-08-31"),
      tx("2026-10-01"),
    ];

    const result = filterTransactionsByMonth(transactions, 2026, 9);
    expect(result).toHaveLength(2);
  });

  it("returns empty array when no matches", () => {
    const transactions = [tx("2026-01-01")];
    const result = filterTransactionsByMonth(transactions, 2026, 12);
    expect(result).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    expect(
      filterTransactionsByMonth([], 2026, 9)
    ).toEqual([]);
  });

  it("handles month 12 (December)", () => {
    const transactions = [tx("2026-12-31"), tx("2026-11-30")];
    const result = filterTransactionsByMonth(transactions, 2026, 12);
    expect(result).toHaveLength(1);
  });
});

// ── calculateSummary ───────────────────────────────────

describe("calculateSummary", () => {
  it("calculates income, expense, and balance", () => {
    const transactions = [
      { type: "income", amount: 5000000 },
      { type: "income", amount: 2000000 },
      { type: "expense", amount: 1500000 },
      { type: "expense", amount: 500000 },
    ];

    const result = calculateSummary(transactions);
    expect(result.income).toBe(7000000);
    expect(result.expense).toBe(2000000);
    expect(result.balance).toBe(5000000);
  });

  it("returns zeros for empty transactions", () => {
    const result = calculateSummary([]);
    expect(result).toEqual({ income: 0, expense: 0, balance: 0 });
  });

  it("handles only income transactions", () => {
    const transactions = [{ type: "income", amount: 3000000 }];
    const result = calculateSummary(transactions);
    expect(result.income).toBe(3000000);
    expect(result.expense).toBe(0);
    expect(result.balance).toBe(3000000);
  });

  it("handles only expense transactions", () => {
    const transactions = [{ type: "expense", amount: 1000000 }];
    const result = calculateSummary(transactions);
    expect(result.income).toBe(0);
    expect(result.expense).toBe(1000000);
    expect(result.balance).toBe(-1000000);
  });
});

// ── calculateMonthlySummary ────────────────────────────

describe("calculateMonthlySummary", () => {
  it("returns summary for the specified month", () => {
    const transactions = [
      { type: "income", amount: 5000000, transaction_date: "2026-09-01" },
      { type: "expense", amount: 1000000, transaction_date: "2026-09-15" },
      { type: "income", amount: 3000000, transaction_date: "2026-08-15" },
    ];

    const result = calculateMonthlySummary(transactions, 2026, 9);
    expect(result.income).toBe(5000000);
    expect(result.expense).toBe(1000000);
    expect(result.balance).toBe(4000000);
  });

  it("returns zeros when no transactions in month", () => {
    const transactions = [
      { type: "income", amount: 5000000, transaction_date: "2026-08-01" },
    ];

    const result = calculateMonthlySummary(transactions, 2026, 9);
    expect(result).toEqual({ income: 0, expense: 0, balance: 0 });
  });
});

// ── calculateSavingsRate ───────────────────────────────

describe("calculateSavingsRate", () => {
  it("calculates correct savings rate", () => {
    // income 5M, expense 3M → savings 2M → rate 40%
    expect(calculateSavingsRate(5000000, 3000000)).toBe(40);
  });

  it("returns 0 when income is 0", () => {
    expect(calculateSavingsRate(0, 1000000)).toBe(0);
  });

  it("returns 0 when income is negative", () => {
    expect(calculateSavingsRate(-1000000, 500000)).toBe(0);
  });

  it("returns negative rate when expenses exceed income", () => {
    // income 3M, expense 5M → savings -2M → rate -66.67%
    const rate = calculateSavingsRate(3000000, 5000000);
    expect(rate).toBeCloseTo(-66.67, 1);
  });

  it("returns 100% when expenses are 0", () => {
    expect(calculateSavingsRate(5000000, 0)).toBe(100);
  });
});

// ── calculateBudgetPercentage ──────────────────────────

describe("calculateBudgetPercentage", () => {
  it("calculates correct percentage", () => {
    // spent 300K of 500K → 60%
    expect(calculateBudgetPercentage(300000, 500000)).toBe(60);
  });

  it("returns 0 when budget amount is 0", () => {
    expect(calculateBudgetPercentage(100000, 0)).toBe(0);
  });

  it("returns 0 when budget amount is null", () => {
    expect(calculateBudgetPercentage(100000, null)).toBe(0);
  });

  it("returns 0 when budget amount is undefined", () => {
    expect(calculateBudgetPercentage(100000, undefined)).toBe(0);
  });

  it("returns over 100% when overspent", () => {
    // spent 600K of 500K → 120%
    expect(calculateBudgetPercentage(600000, 500000)).toBe(120);
  });

  it("handles string inputs", () => {
    expect(calculateBudgetPercentage("300000", "500000")).toBe(60);
  });
});

// ── calculateGoalProgress ──────────────────────────────

describe("calculateGoalProgress", () => {
  it("calculates correct progress", () => {
    // saved 3M of 10M → 30%
    expect(calculateGoalProgress(3000000, 10000000)).toBe(30);
  });

  it("returns 0 when target is 0", () => {
    expect(calculateGoalProgress(1000000, 0)).toBe(0);
  });

  it("returns 0 when target is null", () => {
    expect(calculateGoalProgress(1000000, null)).toBe(0);
  });

  it("returns 100% when goal is achieved", () => {
    expect(calculateGoalProgress(10000000, 10000000)).toBe(100);
  });

  it("returns over 100% when over-achieved", () => {
    expect(calculateGoalProgress(12000000, 10000000)).toBe(120);
  });

  it("handles string inputs", () => {
    expect(calculateGoalProgress("5000000", "10000000")).toBe(50);
  });
});

// ── groupExpensesByCategory ────────────────────────────

describe("groupExpensesByCategory", () => {
  it("groups expense transactions by category name", () => {
    const transactions = [
      {
        type: "expense",
        amount: 100000,
        categories: { name: "Food" },
      },
      {
        type: "expense",
        amount: 200000,
        categories: { name: "Food" },
      },
      {
        type: "expense",
        amount: 50000,
        categories: { name: "Transport" },
      },
    ];

    const result = groupExpensesByCategory(transactions);
    expect(result).toHaveLength(2);

    const food = result.find((r) => r.name === "Food");
    expect(food.value).toBe(300000);

    const transport = result.find((r) => r.name === "Transport");
    expect(transport.value).toBe(50000);
  });

  it("ignores income transactions", () => {
    const transactions = [
      {
        type: "income",
        amount: 5000000,
        categories: { name: "Salary" },
      },
    ];

    const result = groupExpensesByCategory(transactions);
    expect(result).toHaveLength(0);
  });

  it("labels uncategorized expenses", () => {
    const transactions = [
      { type: "expense", amount: 100000, categories: null },
      { type: "expense", amount: 50000, categories: {} },
    ];

    const result = groupExpensesByCategory(transactions);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Uncategorized");
    expect(result[0].value).toBe(150000);
  });

  it("returns empty array for no expenses", () => {
    const transactions = [
      { type: "income", amount: 1000, categories: { name: "X" } },
    ];
    expect(groupExpensesByCategory(transactions)).toEqual([]);
  });
});

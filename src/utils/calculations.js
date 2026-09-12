/**
 * Financial calculation utilities.
 *
 * Pure functions — no side effects, no Supabase calls.
 * Every function takes plain data and returns a result.
 */

/**
 * Sum all account balances.
 * @param {Array<{balance: number|string}>} accounts
 * @returns {number}
 */
export const calculateTotalBalance = (accounts) =>
  accounts.reduce(
    (total, account) => total + Number(account.balance || 0),
    0
  );

/**
 * Return the signed amount of a transaction.
 * Income → positive, Expense → negative.
 * @param {{type: string, amount: number|string}} transaction
 * @returns {number}
 */
export const getSignedAmount = (transaction) => {
  const amount = Math.abs(Number(transaction.amount));
  return transaction.type === "income" ? amount : -amount;
};

/**
 * Filter transactions to a specific calendar month.
 * @param {Array<{transaction_date: string}>} transactions
 * @param {number} year  e.g. 2026
 * @param {number} month 1-12
 * @returns {Array} filtered transactions
 */
export const filterTransactionsByMonth = (transactions, year, month) =>
  transactions.filter((transaction) => {
    const date = new Date(`${transaction.transaction_date}T00:00:00`);
    return (
      date.getMonth() + 1 === Number(month) &&
      date.getFullYear() === Number(year)
    );
  });

/**
 * Calculate income, expense, and balance for a set of transactions.
 * @param {Array<{type: string, amount: number|string}>} transactions
 * @returns {{income: number, expense: number, balance: number}}
 */
export const calculateSummary = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);
    if (transaction.type === "income") income += amount;
    if (transaction.type === "expense") expense += amount;
  });

  return { income, expense, balance: income - expense };
};

/**
 * Calculate monthly summary for a given year/month.
 * @param {Array} transactions
 * @param {number} year
 * @param {number} month
 * @returns {{income: number, expense: number, balance: number}}
 */
export const calculateMonthlySummary = (transactions, year, month) => {
  const monthly = filterTransactionsByMonth(transactions, year, month);
  return calculateSummary(monthly);
};

/**
 * Calculate savings rate as a percentage.
 * @param {number} income
 * @param {number} expense
 * @returns {number} percentage (0-100+)
 */
export const calculateSavingsRate = (income, expense) => {
  if (income <= 0) return 0;
  return ((income - expense) / income) * 100;
};

/**
 * Calculate budget usage percentage.
 * @param {number} spent
 * @param {number} amount budget limit
 * @returns {number} percentage (0-100+)
 */
export const calculateBudgetPercentage = (spent, amount) => {
  if (!amount || Number(amount) <= 0) return 0;
  return (Number(spent) / Number(amount)) * 100;
};

/**
 * Calculate goal progress percentage.
 * @param {number} saved
 * @param {number} target
 * @returns {number} percentage (0-100+)
 */
export const calculateGoalProgress = (saved, target) => {
  if (!target || Number(target) <= 0) return 0;
  return (Number(saved) / Number(target)) * 100;
};

/**
 * Group expense transactions by category name.
 * @param {Array<{type: string, amount: number|string, categories?: {name?: string}}>} transactions
 * @returns {Array<{name: string, value: number}>}
 */
export const groupExpensesByCategory = (transactions) => {
  const map = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      const name = transaction.categories?.name || "Uncategorized";
      if (!map[name]) map[name] = 0;
      map[name] += Number(transaction.amount || 0);
    });

  return Object.entries(map).map(([name, value]) => ({ name, value }));
};

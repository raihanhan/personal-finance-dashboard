export const calculateBudgetSpent = (budgets, transactions) =>
  budgets.map((budget) => {
    const spent = transactions
      .filter((transaction) => {
        if (
          transaction.type !== "expense" ||
          transaction.category_id !== budget.category_id
        ) {
          return false;
        }

        const date = transaction.transaction_date;

        if (budget.month && budget.year) {
          const transactionDate = new Date(`${date}T00:00:00`);

          if (
            transactionDate.getMonth() + 1 !== Number(budget.month) ||
            transactionDate.getFullYear() !== Number(budget.year)
          ) {
            return false;
          }
        }

        if (!budget.month && budget.start_date && date < budget.start_date) {
          return false;
        }

        if (!budget.month && budget.end_date && date > budget.end_date) {
          return false;
        }

        return true;
      })
      .reduce(
        (total, transaction) => total + Number(transaction.amount || 0),
        0
      );

    return { ...budget, spent };
  });
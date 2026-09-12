import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Search,
  Filter,
  Pencil,
  Trash2,
} from "lucide-react";

import Modal from "../components/ui/Modal";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import TransactionForm from "../components/forms/TransactionForm";
import {
  useState,
  useEffect,
} from "react";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

import {
  getAccounts,
  adjustAccountBalance,
} from "../services/accountService";

import {
  getCategories,
} from "../services/categoryService";

import {
  useAuth,
} from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { getUserFriendlyError } from "../utils/errors";
import { formatCurrency } from "../utils/currency";
import { getSignedAmount, calculateSummary } from "../utils/calculations";
import { TransactionListSkeleton } from "../components/ui/Skeletons";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";


function Transactions() {

const [transactions, setTransactions] =
  useState([]);

const [accounts, setAccounts] =
  useState([]);

const [categories, setCategories] =
  useState([]);

const [loading, setLoading] =
  useState(true);

const [errorMessage, setErrorMessage] =
  useState("");

const [isModalOpen, setIsModalOpen] =
  useState(false);

const [selectedTransaction, setSelectedTransaction] =
  useState(null);

const [deleteTarget, setDeleteTarget] =
  useState(null);

const [deleteLoading, setDeleteLoading] =
  useState(false);

  const [editLoading, setEditLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formKey, setFormKey] =
    useState(0);

  const { user } = useAuth();
  const { showSuccess, showError, showWarning } = useToast();

const handleAddTransaction = async (
  transaction
) => {

  if (!user) return;


  const {
    data,
    error,
  } =
    await createTransaction({

      ...transaction,

      user_id: user.id,

    });


  if (error) {

    showError(getUserFriendlyError(error, "Failed to save transaction."));

    return;

  }

  try {
    const amount = Math.abs(Number(transaction.amount));

    const balanceChange =
      transaction.type === "income"
        ? amount
        : -amount;

    const { error: balanceError } = await adjustAccountBalance(
      transaction.account_id,
      balanceChange
    );

    if (balanceError) {
      showWarning(getUserFriendlyError(balanceError, "Transaction saved, but the account balance could not be updated."));
    }

    setTransactions((current) => [data, ...current]);
    setIsModalOpen(false);
    showSuccess("Transaction added successfully.");
  } catch {
    setTransactions((current) => [data, ...current]);
    setIsModalOpen(false);
    showWarning("Transaction saved, but an error occurred updating the balance.");
  }

};

const handleUpdateTransaction = async (
  transactionData
) => {
  if (!selectedTransaction) return;

  const { data, error } = await updateTransaction(
    selectedTransaction.id,
    transactionData
  );

  if (error) {
    showError(getUserFriendlyError(error, "Failed to update transaction."));
    return;
  }

  const oldSignedAmount = getSignedAmount(selectedTransaction);
  const newSignedAmount = getSignedAmount(transactionData);
  let balanceError;

  if (selectedTransaction.account_id === transactionData.account_id) {
    try {
      const result = await adjustAccountBalance(
        transactionData.account_id,
        newSignedAmount - oldSignedAmount
      );
      balanceError = result.error;
    } catch (err) {
      balanceError = err;
    }
  } else {
    let firstAdjusted = false;
    try {
      const oldResult = await adjustAccountBalance(
        selectedTransaction.account_id,
        -oldSignedAmount
      );
      if (oldResult.error) {
        balanceError = oldResult.error;
      } else {
        firstAdjusted = true;
        const newResult = await adjustAccountBalance(
          transactionData.account_id,
          newSignedAmount
        );
        balanceError = newResult.error;
      }
    } catch (err) {
      balanceError = err;
    }

    if (balanceError && firstAdjusted) {
      await adjustAccountBalance(
        selectedTransaction.account_id,
        oldSignedAmount
      ).catch(() => {});
    }
  }

  if (balanceError) {
    showWarning(getUserFriendlyError(balanceError, "Transaction updated, but the account balance could not be updated."));
  }

  setTransactions((current) =>
    current.map((item) => item.id === data.id ? data : item)
  );
  setSelectedTransaction(null);
  setIsModalOpen(false);
  showSuccess("Transaction updated successfully.");
};

const handleEditTransaction = (transaction) => {
  setSelectedTransaction(transaction);
  setFormKey((prev) => prev + 1);
  setIsModalOpen(true);
};
const handleDeleteTransaction = async (
  transaction
) => {
  const amount = Math.abs(Number(transaction.amount));

  const balanceChange =
    transaction.type === "income"
      ? -amount
      : amount;

  try {
    const { error: balanceError } = await adjustAccountBalance(
      transaction.account_id,
      balanceChange
    );

    if (balanceError) {
      showError("Failed to update account balance.");
      return;
    }

    const { error } = await deleteTransaction(transaction.id);

    if (error) {
      showError(getUserFriendlyError(error, "Failed to delete transaction."));
      return;
    }

    setTransactions((current) =>
      current.filter((item) => item.id !== transaction.id)
    );
    showSuccess("Transaction deleted successfully.");
  } catch {
    showError("An unexpected error occurred while deleting the transaction.");
  }
};

const requestDeleteTransaction = (transaction) => {
  setDeleteTarget(transaction);
};

const confirmDeleteTransaction = async () => {
  if (!deleteTarget) return;

  setDeleteLoading(true);
  await handleDeleteTransaction(deleteTarget);
  setDeleteLoading(false);
  setDeleteTarget(null);
};

  const loadData = async () => {

  setLoading(true);

  setErrorMessage("");


  const [
    transactionsResult,
    accountsResult,
    categoriesResult,
  ] =
    await Promise.all([

      getTransactions(),

      getAccounts(),

      getCategories(),

    ]);


  if (transactionsResult.error) {

    setErrorMessage(getUserFriendlyError(transactionsResult.error, "Unable to load transactions."));

  }


  if (accountsResult.error) {

    setErrorMessage(getUserFriendlyError(accountsResult.error, "Unable to load accounts."));

  }


  if (categoriesResult.error) {

    setErrorMessage(getUserFriendlyError(categoriesResult.error, "Unable to load categories."));

  }


  setTransactions(
    transactionsResult.data || []
  );


  setAccounts(
    accountsResult.data || []
  );


  setCategories(
    categoriesResult.data || []
  );


  setLoading(false);

};

useEffect(() => {

  if (user) {

    void Promise.resolve().then(loadData);

  }

}, [user]);

  const { income: totalIncome, expense: totalExpense } = calculateSummary(transactions);

  const filteredTransactions =
  transactions.filter(
    (transaction) => {

      const search =
        searchTerm.toLowerCase();


      const description =
        (
          transaction.description || ""
        ).toLowerCase();


      const category =
        (
          transaction.categories?.name || ""
        ).toLowerCase();


      const account =
        (
          transaction.accounts?.name || ""
        ).toLowerCase();


      return (

        description.includes(search) ||

        category.includes(search) ||

        account.includes(search)

      );

    }
  );

  if (loading) {

    return <TransactionListSkeleton />;

}

  return (
    <div>

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-white">
            Transactions
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your income and expenses.
          </p>

        </div>

          {errorMessage && (
            <ErrorState
              message={errorMessage}
              onRetry={() => void loadData()}
            />
          )}
        <button
          onClick={() => {
            setSelectedTransaction(null);
            setFormKey((prev) => prev + 1);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
        >

          <Plus size={18} />

          Add Transaction

        </button>

      </div>


      {/* SUMMARY CARDS */}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">


        {/* INCOME */}

        <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-emerald-500/10 p-3">

              <ArrowDownLeft className="text-emerald-400" />

            </div>


            <div>

              <p className="text-sm text-slate-400">
                Total Income
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">

                {formatCurrency(totalIncome)}

              </h2>

            </div>

          </div>

        </div>


        {/* EXPENSE */}

        <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-500/10 p-3">

              <ArrowUpRight className="text-red-400" />

            </div>


            <div>

              <p className="text-sm text-slate-400">
                Total Expense
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">

                {formatCurrency(totalExpense)}

              </h2>

            </div>

          </div>

        </div>


        {/* BALANCE */}

        <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

          <p className="text-sm text-slate-400">
            Net Balance
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">

            {formatCurrency(
              totalIncome - totalExpense
            )}

          </h2>

          <p className="mt-2 text-sm text-emerald-400">
            Available balance
          </p>

        </div>

      </div>


      {/* TRANSACTION LIST */}

      <div className="mt-6 rounded-2xl border border-slate-800 bg-[#111927]">


        {/* LIST HEADER */}

        <div className="flex flex-col gap-4 border-b border-slate-800 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-lg font-semibold text-white">
              All Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {transactions.length} transactions

            </p>

          </div>


          <div className="flex gap-3">


            {/* SEARCH */}

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-[#0d1420] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>


            {/* FILTER */}

            <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 text-sm text-slate-400 transition hover:text-white">

              <Filter size={17} />

              <span className="hidden sm:inline">
                Filter
              </span>

            </button>

          </div>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">

              <tr>

                <th className="px-6 py-4">
                  Transaction
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Account
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4 text-right">
                  Amount
                </th>

                <th className="px-6 py-4" />

              </tr>

            </thead>


            <tbody>

              {filteredTransactions.map(
                (transaction) => (

                  <tr
                    key={transaction.id}
                    className="border-b border-slate-800 last:border-0 transition hover:bg-slate-800/30"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className={`rounded-xl p-2 ${
                            transaction.type === "income"
                              ? "bg-emerald-500/10"
                              : "bg-red-500/10"
                          }`}
                        >

                          {transaction.type === "income" ? (

                            <ArrowDownLeft
                              size={17}
                              className="text-emerald-400"
                            />

                          ) : (

                            <ArrowUpRight
                              size={17}
                              className="text-red-400"
                            />

                          )}

                        </div>


                        <div>

                          <p className="font-medium text-white">

                            {transaction.description ||
                              "Transaction"}

                          </p>

                          <p className="text-xs text-slate-500">

                            {transaction.type}

                          </p>

                        </div>

                      </div>

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-400">

                      {transaction.categories?.name ||
                        "Uncategorized"}

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-400">

                      {transaction.accounts?.name ||
                      "Unknown Account"}

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-400">

                      {new Date(
                        transaction.transaction_date
                      ).toLocaleDateString("id-ID")}

                    </td>


                    <td
                      className={`px-6 py-4 text-right font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >

                      {transaction.type === "income"
                        ? "+"
                        : "-"}

                      {formatCurrency(
                          Number(transaction.amount)
                      )}

                    </td>


                    <td className="px-6 py-4">

                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        disabled={editLoading}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
                      >

                        <Pencil size={17} />

                      </button>

                      <button
                        onClick={() =>
                          requestDeleteTransaction(
                            transaction
                          )
                        }
                        disabled={editLoading}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                      >

                        <Trash2 size={17} />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* EMPTY STATE */}

        {filteredTransactions.length === 0 && (
          <EmptyState
            icon={ArrowLeftRight}
            title={transactions.length === 0 ? "No transactions yet." : "No matching transactions."}
            description={
              transactions.length === 0
                ? "Add your first transaction to start tracking your finances."
                : "Try a different search term to find a transaction."
            }
            actionText={transactions.length === 0 ? "Add Transaction" : undefined}
            onAction={transactions.length === 0 ? () => setIsModalOpen(true) : undefined}
          />

        )}

      </div>


      {/* MODAL */}

      <Modal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  }}
  title={selectedTransaction ? "Edit Transaction" : "Add Transaction"}
  isBusy={editLoading}
>

  <TransactionForm
    key={formKey}
    transaction={selectedTransaction}
    onSubmit={
      selectedTransaction
        ? async (data) => {
            setEditLoading(true);
            try {
              await handleUpdateTransaction(data);
            } finally {
              setEditLoading(false);
            }
          }
        : handleAddTransaction
    }
    onCancel={() => {
      setIsModalOpen(false);
      setSelectedTransaction(null);
    }}
    accounts={accounts}
    categories={categories}
    isEditing={Boolean(selectedTransaction)}
  />

</Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteTransaction}
        title="Delete Transaction?"
        description="This transaction will be permanently deleted and the account balance will be adjusted."
        loading={deleteLoading}
      />

    </div>

  );
}

export default Transactions;
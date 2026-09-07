import { useState } from "react";

import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";

import Modal from "../components/ui/Modal";
import TransactionForm from "../components/forms/TransactionForm";


const initialTransactions = [
  {
    id: 1,
    type: "income",
    amount: 8500000,
    category: "Salary",
    account: "BCA Savings",
    description: "Monthly Salary",
    date: "2026-09-08",
  },

  {
    id: 2,
    type: "expense",
    amount: 50000,
    category: "Food & Drinks",
    account: "BCA Savings",
    description: "Starbucks",
    date: "2026-09-08",
  },

  {
    id: 3,
    type: "expense",
    amount: 250000,
    category: "Shopping",
    account: "BCA Savings",
    description: "Tokopedia",
    date: "2026-09-07",
  },
];


const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};


function Transactions() {

  const [transactions, setTransactions] =
    useState(initialTransactions);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");


  const handleAddTransaction = (transaction) => {

    setTransactions([
      transaction,
      ...transactions,
    ]);

    setIsModalOpen(false);

  };


  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );


  const totalExpense = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );


  const filteredTransactions =
    transactions.filter((transaction) => {

      const search =
        searchTerm.toLowerCase();

      return (
        transaction.description
          .toLowerCase()
          .includes(search) ||

        transaction.category
          .toLowerCase()
          .includes(search) ||

        transaction.account
          .toLowerCase()
          .includes(search)
      );

    });


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


        <button
          onClick={() => setIsModalOpen(true)}
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

                      {transaction.category}

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-400">

                      {transaction.account}

                    </td>


                    <td className="px-6 py-4 text-sm text-slate-400">

                      {new Date(
                        transaction.date
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
                        transaction.amount
                      )}

                    </td>


                    <td className="px-6 py-4">

                      <button className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white">

                        <MoreHorizontal size={18} />

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

          <div className="p-10 text-center">

            <p className="text-slate-500">
              No transactions found.
            </p>

          </div>

        )}

      </div>


      {/* MODAL */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Transaction"
      >

        <TransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setIsModalOpen(false)}
        />

      </Modal>

    </div>

  );
}

export default Transactions;
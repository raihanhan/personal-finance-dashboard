import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Plus,
  Wallet,
} from "lucide-react";
import { useAccounts } from "../../hooks/useAccounts";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/currency";
import { calculateTotalBalance } from "../../utils/calculations";

function BalanceCard({
  onAddTransaction,
}) {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();
  const totalBalance = calculateTotalBalance(accounts);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyIncome = transactions
    .filter((transaction) => transaction.type === "income" && transaction.transaction_date?.startsWith(currentMonth))
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);
  const monthlyExpense = transactions
    .filter((transaction) => transaction.type === "expense" && transaction.transaction_date?.startsWith(currentMonth))
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#111927] p-6">

      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-2 text-slate-400">
              <Wallet size={18} />

              <span className="text-sm">
                Total Balance
              </span>
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              {formatCurrency(totalBalance)}
            </h2>

            <div className="mt-3 flex items-center gap-2">

              <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                <ArrowUpRight size={14} />

                {formatCurrency(monthlyIncome - monthlyExpense)}
              </div>

              <span className="text-sm text-slate-500">
                Net bulan ini
              </span>

            </div>

          </div>


          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <Wallet size={22} />
          </div>

        </div>


        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-xl border border-slate-800 bg-[#0d1420] p-4">

            <div className="flex items-center gap-2 text-sm text-slate-400">

              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <ArrowDownLeft size={16} />
              </div>

              Income

            </div>

            <p className="mt-3 text-lg font-semibold text-white">
              {formatCurrency(monthlyIncome)}
            </p>

          </div>


          <div className="rounded-xl border border-slate-800 bg-[#0d1420] p-4">

            <div className="flex items-center gap-2 text-sm text-slate-400">

              <div className="rounded-lg bg-red-500/10 p-2 text-red-400">
                <ArrowUpRight size={16} />
              </div>

              Expense

            </div>

            <p className="mt-3 text-lg font-semibold text-white">
              {formatCurrency(monthlyExpense)}
            </p>

          </div>

        </div>


        <div className="mt-6 flex flex-wrap gap-3">

          <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400">

            <Send size={16} />

            Transfer

          </button>


          <button
            onClick={() => onAddTransaction?.("income")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            <Plus size={16} />

            Add Income
          </button>


          <button
            onClick={() => onAddTransaction?.("expense")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            <Plus size={16} />

            Add Expense
          </button>

        </div>

      </div>

    </div>
  );
}

export default BalanceCard;
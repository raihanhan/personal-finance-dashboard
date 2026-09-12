import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Landmark,
} from "lucide-react";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/currency";
import { calculateSummary } from "../../utils/calculations";

function MoneyFlow() {
  const { transactions } = useTransactions();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthly = transactions.filter((transaction) =>
    transaction.transaction_date?.startsWith(currentMonth)
  );
  const { income, expense: expenses, balance: savings } = calculateSummary(monthly);
  const moneyData = [
    { title: "Income", amount: income, icon: TrendingUp, iconColor: "text-emerald-400", bgColor: "bg-emerald-500/10" },
    { title: "Expenses", amount: expenses, icon: TrendingDown, iconColor: "text-red-400", bgColor: "bg-red-500/10" },
    { title: "Savings", amount: savings, icon: PiggyBank, iconColor: "text-blue-400", bgColor: "bg-blue-500/10" },
    { title: "Investment", amount: monthly
      .filter((transaction) => transaction.categories?.name?.toLowerCase().includes("invest"))
      .reduce((total, transaction) => total + Number(transaction.amount || 0), 0), icon: Landmark, iconColor: "text-purple-400", bgColor: "bg-purple-500/10" },
  ];
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Money Flow
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Financial summary this month
          </p>
        </div>

        <select className="rounded-lg border border-slate-700 bg-[#0d1420] px-3 py-2 text-sm text-slate-300 outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>

      </div>


      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {moneyData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-[#0d1420] p-4"
            >

              <div className="flex items-center justify-between">

                <div
                  className={`rounded-lg p-2 ${item.bgColor}`}
                >
                  <Icon
                    size={18}
                    className={item.iconColor}
                  />
                </div>

                <span className="text-xs text-slate-500">
                  {formatCurrency(item.amount)}
                </span>

              </div>


              <p className="mt-4 text-sm text-slate-400">
                {item.title}
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {formatCurrency(item.amount)}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default MoneyFlow;
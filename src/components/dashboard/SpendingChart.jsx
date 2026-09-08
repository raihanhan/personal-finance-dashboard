import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

function SpendingChart() {
  const { transactions } = useTransactions();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const spendingByCategory = transactions
    .filter((transaction) => transaction.type === "expense" && transaction.transaction_date?.startsWith(currentMonth))
    .reduce((totals, transaction) => {
      const name = transaction.categories?.name || "Uncategorized";
      totals[name] = (totals[name] || 0) + Number(transaction.amount || 0);
      return totals;
    }, {});
  const data = Object.entries(spendingByCategory).map(([name, value]) => ({ name, value }));
  const totalExpense = data.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

      <div>

        <h2 className="text-lg font-semibold text-white">
          Spending This Month
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Expense by category
        </p>

      </div>


      <div className="relative mt-6 h-57.5">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>


            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
              contentStyle={{
                backgroundColor: "#111927",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

          </PieChart>

        </ResponsiveContainer>


        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-xs text-slate-500">
            Total Expense
          </span>

          <span className="mt-1 text-lg font-bold text-white">
            {formatCurrency(totalExpense)}
          </span>

        </div>

      </div>


      <div className="mt-4 space-y-3">

        {data.map((item, index) => {

          const percentage =
            ((item.value / totalExpense) * 100).toFixed(0);

          return (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-2">

                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                />

                <span className="text-sm text-slate-400">
                  {item.name}
                </span>

              </div>


              <div className="flex items-center gap-3">

                <span className="text-sm text-white">
                  {formatCurrency(item.value)}
                </span>

                <span className="w-8 text-right text-xs text-slate-500">
                  {percentage}%
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default SpendingChart;
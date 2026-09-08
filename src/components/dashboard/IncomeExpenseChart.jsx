import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions";

const formatCurrency = (value) => {
  return `${(value / 1000000).toFixed(1)}M`;
};

function IncomeExpenseChart() {
  const { transactions } = useTransactions();
  const data = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    const month = date.toISOString().slice(0, 7);

    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      income: transactions
        .filter((transaction) => transaction.type === "income" && transaction.transaction_date?.startsWith(month))
        .reduce((total, transaction) => total + Number(transaction.amount || 0), 0),
      expense: transactions
        .filter((transaction) => transaction.type === "expense" && transaction.transaction_date?.startsWith(month))
        .reduce((total, transaction) => total + Number(transaction.amount || 0), 0),
    };
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-semibold text-white">
            Income vs Expenses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly financial comparison
          </p>

        </div>


        <select className="rounded-lg border border-slate-700 bg-[#0d1420] px-3 py-2 text-sm text-slate-300 outline-none">

          <option>6 Months</option>
          <option>12 Months</option>
          <option>This Year</option>

        </select>

      </div>


      <div className="mt-8 h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tickFormatter={formatCurrency}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "#1e293b",
                opacity: 0.4,
              }}
              contentStyle={{
                backgroundColor: "#111927",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "#ffffff",
              }}
            />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default IncomeExpenseChart;
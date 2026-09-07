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

const data = [
  {
    month: "Jan",
    income: 7500000,
    expense: 4200000,
  },
  {
    month: "Feb",
    income: 8200000,
    expense: 4600000,
  },
  {
    month: "Mar",
    income: 7800000,
    expense: 3900000,
  },
  {
    month: "Apr",
    income: 9500000,
    expense: 5200000,
  },
  {
    month: "May",
    income: 8700000,
    expense: 4500000,
  },
  {
    month: "Jun",
    income: 10500000,
    expense: 5800000,
  },
];

const formatCurrency = (value) => {
  return `${(value / 1000000).toFixed(1)}M`;
};

function IncomeExpenseChart() {
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


      <div className="mt-8 h-[320px]">

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
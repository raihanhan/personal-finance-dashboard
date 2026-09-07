import {
  ArrowDownLeft,
  // eslint-disable-next-line no-unused-vars
  ArrowUpRight,
  Coffee,
  ShoppingBag,
  Film,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Monthly Salary",
    category: "Income",
    date: "Today, 09:30",
    amount: 8500000,
    type: "income",
    icon: ArrowDownLeft,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: 2,
    name: "Starbucks",
    category: "Food & Drinks",
    date: "Today, 08:15",
    amount: 50000,
    type: "expense",
    icon: Coffee,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    id: 3,
    name: "Tokopedia",
    category: "Shopping",
    date: "Yesterday",
    amount: 250000,
    type: "expense",
    icon: ShoppingBag,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: 4,
    name: "Netflix",
    category: "Entertainment",
    date: "Yesterday",
    amount: 65000,
    type: "expense",
    icon: Film,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    id: 5,
    name: "Freelance Project",
    category: "Income",
    date: "Sep 5, 2026",
    amount: 1500000,
    type: "income",
    icon: ArrowDownLeft,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111927]">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-slate-800 p-6">

        <div>

          <h2 className="text-lg font-semibold text-white">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest financial activity
          </p>

        </div>


        <button className="flex items-center gap-1 text-sm text-blue-400 transition hover:text-blue-300">

          View All

          <ChevronRight size={16} />

        </button>

      </div>


      {/* TRANSACTIONS */}

      <div className="divide-y divide-slate-800">

        {transactions.map((transaction) => {

          const Icon = transaction.icon;

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-5 transition hover:bg-slate-800/30"
            >

              <div className="flex items-center gap-4">

                {/* ICON */}

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${transaction.bg}`}
                >

                  <Icon
                    size={19}
                    className={transaction.color}
                  />

                </div>


                {/* INFO */}

                <div>

                  <p className="font-medium text-white">
                    {transaction.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">

                    <span>
                      {transaction.category}
                    </span>

                    <span>•</span>

                    <span>
                      {transaction.date}
                    </span>

                  </div>

                </div>

              </div>


              {/* AMOUNT */}

              <div className="flex items-center gap-4">

                <p
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-400"
                      : "text-white"
                  }`}
                >

                  {transaction.type === "income"
                    ? "+"
                    : "-"}

                  {formatCurrency(transaction.amount)}

                </p>


                <button className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white">

                  <MoreHorizontal size={18} />

                </button>

              </div>

            </div>
          );
        })}

      </div>


      {/* FOOTER */}

      <div className="border-t border-slate-800 p-4">

        <button className="w-full rounded-xl border border-slate-700 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-white">

          View All Transactions

        </button>

      </div>

    </div>
  );
}

export default RecentTransactions;
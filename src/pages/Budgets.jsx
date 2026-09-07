import { Plus, Utensils, Car, ShoppingBag } from "lucide-react";

function Budgets() {
  const budgets = [
    {
      name: "Food & Drinks",
      icon: Utensils,
      spent: 1200000,
      budget: 2000000,
    },
    {
      name: "Transportation",
      icon: Car,
      spent: 600000,
      budget: 1000000,
    },
    {
      name: "Shopping",
      icon: ShoppingBag,
      spent: 900000,
      budget: 1500000,
    },
  ];

  return (
    <div>

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Budgets
          </h1>

          <p className="mt-2 text-slate-400">
            Control your spending and manage your budgets.
          </p>
        </div>


        <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white">

          <Plus size={18} />

          Create Budget

        </button>

      </div>


      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {budgets.map((budget) => {

          const Icon = budget.icon;

          const percentage =
            (budget.spent / budget.budget) * 100;

          return (
            <div
              key={budget.name}
              className="rounded-2xl border border-slate-800 bg-[#111927] p-6"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-500/10 p-3">
                  <Icon
                    size={20}
                    className="text-blue-400"
                  />
                </div>

                <h2 className="font-semibold text-white">
                  {budget.name}
                </h2>

              </div>


              <div className="mt-8 flex justify-between">

                <span className="text-sm text-slate-400">
                  Spent
                </span>

                <span className="text-sm text-white">
                  Rp {budget.spent.toLocaleString("id-ID")}
                  {" / "}
                  Rp {budget.budget.toLocaleString("id-ID")}
                </span>

              </div>


              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>


              <p className="mt-3 text-sm text-slate-500">
                {percentage.toFixed(0)}% of budget used
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Budgets;
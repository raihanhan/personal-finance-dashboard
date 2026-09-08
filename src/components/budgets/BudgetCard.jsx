import {

  Pencil,

  Trash2,

  AlertTriangle,

  CheckCircle2,

} from "lucide-react";


function BudgetCard({

  budget,

  spent,

  onEdit,

  onDelete,

}) {


  const amount =
    Number(budget.amount);


  const percentage =
    amount > 0

      ? Math.min(
          (spent / amount) * 100,
          100
        )

      : 0;


  const actualPercentage =
    amount > 0

      ? (spent / amount) * 100

      : 0;


  const remaining =
    amount - spent;


  const isOverBudget =
    spent > amount;


  const isNearLimit =
    actualPercentage >= 80 &&
    !isOverBudget;


  const formatCurrency = (
    value
  ) => {

    return new Intl.NumberFormat(
      "id-ID",
      {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0,

      }

    ).format(value);

  };


  const getStatus = () => {


    if (isOverBudget) {

      return {

        label:
          "Over Budget",

        color:
          "text-red-400",

        background:
          "bg-red-500",

        icon: (
          <AlertTriangle
            size={15}
          />
        ),

      };

    }


    if (isNearLimit) {

      return {

        label:
          "Near Limit",

        color:
          "text-yellow-400",

        background:
          "bg-yellow-500",

        icon: (
          <AlertTriangle
            size={15}
          />
        ),

      };

    }


    return {

      label:
        "On Track",

      color:
        "text-emerald-400",

      background:
        "bg-emerald-500",

      icon: (
        <CheckCircle2
          size={15}
        />
      ),

    };

  };


  const status =
    getStatus();


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      {/* HEADER */}

      <div className="flex items-start justify-between">


        <div className="flex items-center gap-3">


          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{

              backgroundColor:
                `${budget.categories?.color || "#64748b"}20`,

              color:
                budget.categories?.color ||
                "#64748b",

            }}
          >

            <span className="h-4 w-4 rounded-full bg-current" />

          </div>


          <div>

            <h3 className="font-semibold text-white">

              {budget.categories?.name ||
                "Unknown Category"}

            </h3>


            <div
              className={`mt-1 flex items-center gap-1 text-xs ${status.color}`}
            >

              {status.icon}

              {status.label}

            </div>


          </div>


        </div>


        <div className="flex gap-1">


          <button
            onClick={() =>
              onEdit(budget)
            }
            className="rounded-lg p-2 text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"
          >

            <Pencil size={16} />

          </button>


          <button
            onClick={() =>
              onDelete(budget)
            }
            className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
          >

            <Trash2 size={16} />

          </button>


        </div>


      </div>


      {/* AMOUNT */}

      <div className="mt-6 grid grid-cols-2 gap-4">


        <div>

          <p className="text-xs text-slate-500">

            Budget

          </p>


          <p className="mt-1 text-sm font-semibold text-white">

            {formatCurrency(
              amount
            )}

          </p>

        </div>


        <div>

          <p className="text-xs text-slate-500">

            Spent

          </p>


          <p className="mt-1 text-sm font-semibold text-white">

            {formatCurrency(
              spent
            )}

          </p>

        </div>


      </div>


      {/* PROGRESS */}

      <div className="mt-5">


        <div className="mb-2 flex justify-between text-xs">


          <span className="text-slate-500">

            Spending Progress

          </span>


          <span
            className={`font-medium ${status.color}`}
          >

            {actualPercentage.toFixed(1)}%

          </span>


        </div>


        <div className="h-2 overflow-hidden rounded-full bg-slate-800">


          <div
            className={`h-full rounded-full transition-all ${status.background}`}
            style={{

              width:
                `${percentage}%`,

            }}
          />

        </div>


      </div>


      {/* REMAINING */}

      <div className="mt-5 border-t border-slate-800 pt-4">


        <div className="flex items-center justify-between">


          <span className="text-sm text-slate-400">

            {isOverBudget

              ? "Over by"

              : "Remaining"

            }

          </span>


          <span
            className={`text-sm font-semibold ${
              isOverBudget

                ? "text-red-400"

                : "text-emerald-400"
            }`}
          >

            {formatCurrency(

              Math.abs(
                remaining
              )

            )}

          </span>


        </div>

      </div>


    </div>

  );

}


export default BudgetCard;
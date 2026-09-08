import {

  Wallet,

  TrendingDown,

  CircleDollarSign,

} from "lucide-react";


function BudgetSummary({

  totalBudget,

  totalSpent,

}) {


  const remaining =
    totalBudget -
    totalSpent;


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


  return (

    <div className="grid gap-5 md:grid-cols-3">


      {/* TOTAL BUDGET */}

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <div className="flex items-center gap-4">


          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

            <Wallet size={21} />

          </div>


          <div>

            <p className="text-sm text-slate-400">

              Total Budget

            </p>


            <p className="mt-1 text-xl font-bold text-white">

              {formatCurrency(
                totalBudget
              )}

            </p>

          </div>


        </div>


      </div>


      {/* TOTAL SPENT */}

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <div className="flex items-center gap-4">


          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">

            <TrendingDown
              size={21}
            />

          </div>


          <div>

            <p className="text-sm text-slate-400">

              Total Spent

            </p>


            <p className="mt-1 text-xl font-bold text-white">

              {formatCurrency(
                totalSpent
              )}

            </p>

          </div>


        </div>


      </div>


      {/* REMAINING */}

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <div className="flex items-center gap-4">


          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">

            <CircleDollarSign
              size={21}
            />

          </div>


          <div>

            <p className="text-sm text-slate-400">

              Remaining

            </p>


            <p
              className={`mt-1 text-xl font-bold ${
                remaining >= 0

                  ? "text-white"

                  : "text-red-400"
              }`}
            >

              {formatCurrency(
                Math.abs(
                  remaining
                )
              )}

            </p>

          </div>


        </div>


      </div>


    </div>

  );

}


export default BudgetSummary;
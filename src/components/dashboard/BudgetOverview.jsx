import {

  AlertTriangle,

  WalletCards,

} from "lucide-react";

import { formatCurrency } from "../../utils/currency";


function BudgetOverview({

  budgets,

}) {


  if (
    budgets.length === 0
  ) {


    return (

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <div className="flex items-center gap-3">


          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">

            <WalletCards size={20} />

          </div>


          <div>

            <h2 className="font-semibold text-white">

              Budget Overview

            </h2>

            <p className="text-sm text-slate-500">

              No active budgets

            </p>

          </div>


        </div>


      </div>

    );


  }


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="flex items-center justify-between">


        <div>


          <h2 className="font-semibold text-white">

            Budget Overview

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Current budget progress

          </p>


        </div>


        <WalletCards
          size={21}
          className="text-orange-400"
        />


      </div>


      <div className="mt-6 space-y-5">


        {budgets
          .slice(0, 5)
          .map(
            (budget) => {


              const percentage =

                Number(budget.amount) > 0

                  ? (
                      budget.spent /
                      Number(budget.amount)
                    ) * 100

                  : 0;


              const isDanger =

                percentage >= 100;


              const isWarning =

                percentage >= 80 &&
                percentage < 100;


              return (

                <div
                  key={budget.id}
                >

                  <div className="flex items-center justify-between gap-4">


                    <div className="min-w-0">


                      <div className="flex items-center gap-2">


                        <div

                          className="h-3 w-3 rounded-full"

                          style={{

                            backgroundColor:

                              budget.categories
                                ?.color ||

                              "#64748b",

                          }}

                        />


                        <p className="truncate text-sm font-medium text-white">

                          {

                            budget.categories
                              ?.name ||

                            "Budget"

                          }

                        </p>


                      </div>


                    </div>


                    <div className="flex items-center gap-2">


                      {isDanger && (

                        <AlertTriangle

                          size={16}

                          className="text-red-400"

                        />

                      )}


                      {isWarning && (

                        <AlertTriangle

                          size={16}

                          className="text-orange-400"

                        />

                      )}


                      <p className="text-xs text-slate-400">

                        {percentage.toFixed(0)}%

                      </p>


                    </div>


                  </div>


                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">


                    <div

                      className={`h-full rounded-full ${
                        isDanger

                          ? "bg-red-500"

                          : isWarning

                          ? "bg-orange-500"

                          : "bg-blue-500"
                      }`}

                      style={{

                        width:

                          `${Math.min(
                            percentage,
                            100
                          )}%`,

                      }}

                    />


                  </div>


                  <div className="mt-2 flex justify-between text-xs text-slate-500">


                    <span>

                      {formatCurrency(
                        budget.spent
                      )}

                    </span>


                    <span>

                      {formatCurrency(
                        Number(budget.amount)
                      )}

                    </span>


                  </div>


                </div>

              );


            }

          )}


      </div>


    </div>

  );


}


export default BudgetOverview;
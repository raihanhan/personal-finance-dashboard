import {

  Target,

  CheckCircle2,

} from "lucide-react";

import { formatCurrency } from "../../utils/currency";


function GoalOverview({

  goals,

}) {


  if (
    goals.length === 0
  ) {


    return (

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <div className="flex items-center gap-3">


          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">

            <Target size={20} />

          </div>


          <div>

            <h2 className="font-semibold text-white">

              Financial Goals

            </h2>

            <p className="text-sm text-slate-500">

              No goals created yet

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

            Financial Goals

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Your savings progress

          </p>


        </div>


        <Target
          size={21}
          className="text-purple-400"
        />


      </div>


      <div className="mt-6 space-y-5">


        {goals
          .slice(0, 4)
          .map(
            (goal) => {


              const currentAmount =

                Number(

                  goal.current_amount || 0

                );


              const targetAmount =

                Number(

                  goal.target_amount || 0

                );


              const percentage =

                targetAmount > 0

                  ? (
                      currentAmount /
                      targetAmount
                    ) * 100

                  : 0;


              const completed =

                percentage >= 100;


              return (

                <div
                  key={goal.id}
                >


                  <div className="flex justify-between gap-4">


                    <div className="flex items-center gap-2">


                      {completed ? (

                        <CheckCircle2

                          size={17}

                          className="text-emerald-400"

                        />

                      ) : (

                        <div

                          className="h-3 w-3 rounded-full"

                          style={{

                            backgroundColor:

                              goal.color ||

                              "#8b5cf6",

                          }}

                        />

                      )}


                      <p className="text-sm font-medium text-white">

                        {goal.name}

                      </p>


                    </div>


                    <p className="text-xs text-slate-400">

                      {percentage.toFixed(0)}%

                    </p>


                  </div>


                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">


                    <div

                      className="h-full rounded-full bg-purple-500"

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
                        currentAmount
                      )}

                    </span>


                    <span>

                      {formatCurrency(
                        targetAmount
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


export default GoalOverview;
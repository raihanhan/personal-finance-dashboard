import {

  Pencil,

  Trash2,

  Plus,

  CalendarDays,

  CheckCircle2,

  Clock,

  AlertTriangle,

} from "lucide-react";

import { formatCurrency } from "../../utils/currency";
import { calculateGoalProgress } from "../../utils/calculations";


function GoalCard({

  goal,

  contributions,

  onEdit,

  onDelete,

  onAddMoney,

}) {


  const currentAmount =

    contributions.reduce(

      (total, contribution) =>

        total +

        Number(
          contribution.amount
        ),

      0

    );


  const targetAmount =

    Number(
      goal.target_amount
    );


  const percentage = calculateGoalProgress(currentAmount, targetAmount);


  const progress =

    Math.min(
      percentage,
      100
    );


  const remaining =

    Math.max(

      targetAmount -
      currentAmount,

      0

    );


  const isCompleted =

    currentAmount >=
    targetAmount;


  /*
  ============================

  DAYS REMAINING

  ============================
  */

  let daysRemaining = null;


  if (
    goal.target_date
  ) {


    const today =
      new Date();


    const targetDate =
      new Date(
        `${goal.target_date}T00:00:00`
      );


    const difference =

      targetDate -
      today;


    daysRemaining =
      Math.ceil(

        difference /

        (
          1000 *
          60 *
          60 *
          24
        )

      );


  }


  /*
  ============================

  MONTHLY SAVING NEEDED

  ============================
  */

  let monthlySavingNeeded =
    null;


  if (

    remaining > 0 &&

    goal.target_date

  ) {


    const today =
      new Date();


    const targetDate =
      new Date(
        `${goal.target_date}T00:00:00`
      );


    const monthsRemaining =

      Math.max(

        1,

        (
          targetDate.getFullYear() -
          today.getFullYear()
        ) * 12 +

        (
          targetDate.getMonth() -
          today.getMonth()
        )

      );


    monthlySavingNeeded =

      remaining /
      monthsRemaining;


  }


  const getStatus = () => {


    if (
      isCompleted
    ) {

      return {

        label:
          "Completed",

        className:
          "text-emerald-400 bg-emerald-500/10",

        icon:
          CheckCircle2,

      };

    }


    if (

      daysRemaining !== null &&

      daysRemaining < 0

    ) {

      return {

        label:
          "Target Date Passed",

        className:
          "text-red-400 bg-red-500/10",

        icon:
          AlertTriangle,

      };

    }


    return {

      label:
        "In Progress",

      className:
        "text-blue-400 bg-blue-500/10",

      icon:
        Clock,

    };


  };


  const status =
    getStatus();


  const StatusIcon =
    status.icon;


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">


        <div className="flex items-start gap-3">


          <div

            className="mt-1 h-4 w-4 shrink-0 rounded-full"

            style={{

              backgroundColor:
                goal.color,

            }}

          />


          <div>


            <h3 className="font-semibold text-white">

              {goal.name}

            </h3>


            {goal.description && (

              <p className="mt-1 text-sm text-slate-500">

                {goal.description}

              </p>

            )}


          </div>


        </div>


        <div className="flex gap-1">


          <button

            onClick={() =>
              onEdit(goal)
            }

            className="rounded-lg p-2 text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"

          >

            <Pencil size={16} />

          </button>


          <button

            onClick={() =>
              onDelete(goal)
            }

            className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"

          >

            <Trash2 size={16} />

          </button>


        </div>


      </div>


      {/* STATUS */}

      <div className="mt-4">


        <span

          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium ${status.className}`}

        >

          <StatusIcon size={14} />

          {status.label}

        </span>


      </div>


      {/* AMOUNT */}

      <div className="mt-5">


        <div className="flex items-end justify-between gap-4">


          <div>


            <p className="text-2xl font-bold text-white">

              {formatCurrency(
                currentAmount
              )}

            </p>


            <p className="mt-1 text-sm text-slate-500">

              of {formatCurrency(
                targetAmount
              )}

            </p>


          </div>


          <span className="text-lg font-semibold text-slate-300">

            {percentage.toFixed(1)}%

          </span>


        </div>


      </div>


      {/* PROGRESS */}

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">


        <div

          className="h-full rounded-full transition-all"

          style={{

            width:
              `${progress}%`,

            backgroundColor:
              goal.color,

          }}

        />


      </div>


      {/* DETAILS */}

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-800 pt-5">


        <div>


          <p className="text-xs text-slate-500">

            Remaining

          </p>


          <p className="mt-1 text-sm font-semibold text-white">

            {formatCurrency(
              remaining
            )}

          </p>


        </div>


        <div>


          <p className="text-xs text-slate-500">

            Contributions

          </p>


          <p className="mt-1 text-sm font-semibold text-white">

            {contributions.length}

          </p>


        </div>


      </div>


      {/* TARGET DATE */}

      {goal.target_date && (

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">


          <CalendarDays size={16} />


          <span>

            {new Intl.DateTimeFormat(

              "id-ID",

              {

                day: "numeric",

                month: "short",

                year: "numeric",

              }

            ).format(

              new Date(
                `${goal.target_date}T00:00:00`
              )

            )}

          </span>


          {daysRemaining !== null && (

            <span className="text-slate-600">

              •

            </span>

          )}


          {daysRemaining !== null && (

            <span

              className={

                daysRemaining < 0

                  ? "text-red-400"

                  : "text-slate-500"

              }

            >

              {daysRemaining < 0

                ? `${Math.abs(daysRemaining)} days overdue`

                : `${daysRemaining} days left`

              }

            </span>

          )}


        </div>

      )}


      {/* MONTHLY NEEDED */}

      {!isCompleted &&

        monthlySavingNeeded && (

          <div className="mt-4 rounded-xl bg-slate-900/60 p-3">


            <p className="text-xs text-slate-500">

              Estimated monthly saving needed

            </p>


            <p className="mt-1 text-sm font-semibold text-blue-400">

              {formatCurrency(
                monthlySavingNeeded
              )}

            </p>


          </div>

        )}


      {/* ADD MONEY */}

      <button

        onClick={() =>
          onAddMoney(goal)
        }

        disabled={isCompleted}

        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"

      >

        <Plus size={17} />

        {isCompleted

          ? "Goal Completed"

          : "Add Money"

        }

      </button>


    </div>

  );


}


export default GoalCard;
import {

  Lightbulb,

  TrendingUp,

  TrendingDown,

  AlertTriangle,

} from "lucide-react";


function QuickInsights({

  income,

  expense,

  budgets,

}) {


  const insights = [];


  if (
    income > 0
  ) {


    const savings =

      income -
      expense;


    const savingsRate =

      (
        savings /
        income
      ) * 100;


    if (

      savingsRate >= 20

    ) {


      insights.push({

        title:
          "Great savings",

        description:

          `You saved ${savingsRate.toFixed(
            0
          )}% of your income this month.`,

        icon:
          TrendingUp,

        color:
          "text-emerald-400",

      });


    }


    else if (

      savingsRate < 0

    ) {


      insights.push({

        title:
          "Expenses are too high",

        description:

          "Your expenses are higher than your income.",

        icon:
          TrendingDown,

        color:
          "text-red-400",

      });


    }


  }


  const dangerousBudget =

    budgets.find(

      (budget) => {


        const percentage =

          Number(budget.amount) > 0

            ? (

                budget.spent /

                Number(budget.amount)

              ) * 100

            : 0;


        return percentage >= 80;


      }

    );


  if (
    dangerousBudget
  ) {


    insights.push({

      title:
        "Budget alert",

      description:

        `${dangerousBudget.categories?.name || "A budget"} is almost exhausted.`,

      icon:
        AlertTriangle,

      color:
        "text-orange-400",

    });


  }


  if (
    insights.length === 0
  ) {


    insights.push({

      title:
        "Keep tracking",

      description:

        "Add more transactions to unlock useful financial insights.",

      icon:
        Lightbulb,

      color:
        "text-blue-400",

    });


  }


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="flex items-center gap-2">


        <Lightbulb
          size={20}
          className="text-yellow-400"
        />


        <div>


          <h2 className="font-semibold text-white">

            Quick Insights

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Your financial highlights

          </p>


        </div>


      </div>


      <div className="mt-6 space-y-4">


        {insights.map(

          (
            insight,
            index
          ) => {


            const Icon =
              insight.icon;


            return (

              <div

                key={index}

                className="flex gap-3 rounded-xl bg-slate-900/50 p-4"

              >


                <Icon

                  size={20}

                  className={
                    insight.color
                  }

                />


                <div>


                  <p className="text-sm font-medium text-white">

                    {insight.title}

                  </p>


                  <p className="mt-1 text-sm text-slate-500">

                    {insight.description}

                  </p>


                </div>


              </div>

            );


          }

        )}


      </div>


    </div>

  );


}


export default QuickInsights;
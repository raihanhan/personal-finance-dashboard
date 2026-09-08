import {

  Lightbulb,

  TrendingUp,

  TrendingDown,

  AlertCircle,

} from "lucide-react";


function FinancialInsights({

  income,

  savingsRate,

  topCategory,

}) {


  const insights = [];


  if (
    income > 0
  ) {


    if (
      savingsRate >= 30
    ) {


      insights.push({

        icon:
          TrendingUp,

        title:
          "Excellent savings rate",

        description:

          `You saved ${savingsRate.toFixed(1)}% of your income.`,

        color:
          "text-emerald-400",

      });


    }


    else if (
      savingsRate >= 20
    ) {


      insights.push({

        icon:
          TrendingUp,

        title:
          "Healthy savings rate",

        description:

          `You saved ${savingsRate.toFixed(1)}% of your income.`,

        color:
          "text-blue-400",

      });


    }


    else if (
      savingsRate > 0
    ) {


      insights.push({

        icon:
          AlertCircle,

        title:
          "Savings can be improved",

        description:

          `Your current savings rate is ${savingsRate.toFixed(1)}%.`,

        color:
          "text-orange-400",

      });


    }


    else {


      insights.push({

        icon:
          TrendingDown,

        title:
          "Expenses exceed income",

        description:

          "You spent more money than you earned during this period.",

        color:
          "text-red-400",

      });


    }


  }


  if (
    topCategory
  ) {


    insights.push({

      icon:
        AlertCircle,

      title:
        "Highest spending category",

      description:

        `${topCategory.name} is your largest expense category.`,

      color:
        "text-purple-400",

    });


  }


  if (
    insights.length === 0
  ) {


    insights.push({

      icon:
        Lightbulb,

      title:
        "Not enough data",

      description:

        "Add more transactions to generate financial insights.",

      color:
        "text-slate-400",

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

            Financial Insights

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Insights based on your financial activity

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

                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4"

              >


                <div

                  className={`${insight.color} mt-0.5`}

                >

                  <Icon
                    size={20}
                  />

                </div>


                <div>


                  <h3 className="text-sm font-medium text-white">

                    {insight.title}

                  </h3>


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


export default FinancialInsights;
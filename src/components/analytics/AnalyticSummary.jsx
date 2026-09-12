import {

  TrendingUp,

  TrendingDown,

  Wallet,

  PiggyBank,

} from "lucide-react";

import { formatCurrency } from "../../utils/currency";


function AnalyticsSummary({

  income,

  expense,

  balance,

  savingsRate,

}) {


  const items = [

    {

      title:
        "Total Income",

      value:
        formatCurrency(
          income
        ),

      icon:
        TrendingUp,

      color:
        "text-emerald-400 bg-emerald-500/10",

    },

    {

      title:
        "Total Expense",

      value:
        formatCurrency(
          expense
        ),

      icon:
        TrendingDown,

      color:
        "text-red-400 bg-red-500/10",

    },

    {

      title:
        "Net Cash Flow",

      value:
        formatCurrency(
          balance
        ),

      icon:
        Wallet,

      color:
        balance >= 0

          ? "text-blue-400 bg-blue-500/10"

          : "text-orange-400 bg-orange-500/10",

    },

    {

      title:
        "Savings Rate",

      value:
        `${savingsRate.toFixed(1)}%`,

      icon:
        PiggyBank,

      color:
        "text-purple-400 bg-purple-500/10",

    },

  ];


  return (

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


      {items.map(
        (item) => {


          const Icon =
            item.icon;


          return (

            <div

              key={item.title}

              className="rounded-2xl border border-slate-800 bg-[#111927] p-5"

            >


              <div className="flex items-center gap-4">


                <div

                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}

                >

                  <Icon size={21} />

                </div>


                <div>


                  <p className="text-sm text-slate-500">

                    {item.title}

                  </p>


                  <p className="mt-1 text-lg font-bold text-white">

                    {item.value}

                  </p>


                </div>


              </div>


            </div>

          );


        }

      )}


    </div>

  );


}


export default AnalyticsSummary;
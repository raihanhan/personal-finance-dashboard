import {

  Wallet,

  TrendingUp,

  TrendingDown,

  Landmark,

} from "lucide-react";


function DashboardSummary({

  balance,

  income,

  expense,

  accountCount,

}) {


  const formatCurrency =
    (value) => {


      return new Intl.NumberFormat(

        "id-ID",

        {

          style: "currency",

          currency: "IDR",

          maximumFractionDigits: 0,

        }

      ).format(value);


    };


  const cards = [

    {

      title:
        "Total Balance",

      value:
        formatCurrency(balance),

      icon:
        Wallet,

      iconClass:
        "bg-blue-500/10 text-blue-400",

    },

    {

      title:
        "Monthly Income",

      value:
        formatCurrency(income),

      icon:
        TrendingUp,

      iconClass:
        "bg-emerald-500/10 text-emerald-400",

    },

    {

      title:
        "Monthly Expense",

      value:
        formatCurrency(expense),

      icon:
        TrendingDown,

      iconClass:
        "bg-red-500/10 text-red-400",

    },

    {

      title:
        "Active Accounts",

      value:
        accountCount,

      icon:
        Landmark,

      iconClass:
        "bg-purple-500/10 text-purple-400",

    },

  ];


  return (

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


      {cards.map(
        (card) => {


          const Icon =
            card.icon;


          return (

            <div

              key={card.title}

              className="rounded-2xl border border-slate-800 bg-[#111927] p-5"

            >


              <div className="flex items-center justify-between">


                <div>


                  <p className="text-sm text-slate-500">

                    {card.title}

                  </p>


                  <h3 className="mt-2 text-xl font-bold text-white">

                    {card.value}

                  </h3>


                </div>


                <div

                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}

                >

                  <Icon size={21} />

                </div>


              </div>


            </div>

          );


        }

      )}


    </div>

  );


}


export default DashboardSummary;
import {

  Target,

  CheckCircle2,

  Wallet,

  TrendingUp,

} from "lucide-react";


function GoalSummary({

  totalGoals,

  completedGoals,

  totalSaved,

  totalTarget,

}) {


  const totalRemaining =

    Math.max(

      totalTarget -
      totalSaved,

      0

    );


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


  const items = [

    {

      title:
        "Total Goals",

      value:
        totalGoals,

      icon:
        Target,

      className:
        "text-blue-400 bg-blue-500/10",

    },

    {

      title:
        "Completed",

      value:
        completedGoals,

      icon:
        CheckCircle2,

      className:
        "text-emerald-400 bg-emerald-500/10",

    },

    {

      title:
        "Total Saved",

      value:
        formatCurrency(
          totalSaved
        ),

      icon:
        Wallet,

      className:
        "text-purple-400 bg-purple-500/10",

    },

    {

      title:
        "Remaining",

      value:
        formatCurrency(
          totalRemaining
        ),

      icon:
        TrendingUp,

      className:
        "text-orange-400 bg-orange-500/10",

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

                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.className}`}

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


export default GoalSummary;
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign,
} from "lucide-react";


function StatCard({
  title,
  value,
  icon,
  trend,
  trendText,
}) {


  const icons = {

    balance: (
      <Wallet size={21} />
    ),

    income: (
      <TrendingUp size={21} />
    ),

    expense: (
      <TrendingDown size={21} />
    ),

    cashflow: (
      <DollarSign size={21} />
    ),

  };


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="flex items-start justify-between">


        <div>

          <p className="text-sm text-slate-400">

            {title}

          </p>


          <h3 className="mt-3 text-xl font-bold text-white lg:text-2xl">

            {value}

          </h3>

        </div>


        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

          {icons[icon]}

        </div>


      </div>


      {trendText && (

        <div className="mt-4 flex items-center gap-2">


          <span
            className={`text-xs font-medium ${
              trend >= 0

                ? "text-emerald-400"

                : "text-red-400"
            }`}
          >

            {trend >= 0
              ? "+"
              : ""}

            {trend}%

          </span>


          <span className="text-xs text-slate-500">

            {trendText}

          </span>

        </div>

      )}


    </div>

  );

}


export default StatCard;
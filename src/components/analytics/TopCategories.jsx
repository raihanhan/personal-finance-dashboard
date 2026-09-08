import {

  Trophy,

} from "lucide-react";


function TopCategories({

  data,

}) {


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


  const totalExpense =

    data.reduce(

      (
        total,
        item
      ) =>

        total +
        item.amount,

      0

    );


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="flex items-center gap-2">


        <Trophy

          size={19}

          className="text-yellow-400"

        />


        <div>


          <h2 className="font-semibold text-white">

            Top Spending Categories

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Your biggest expenses

          </p>


        </div>


      </div>


      {data.length === 0 ? (


        <div className="flex h-65 items-center justify-center text-sm text-slate-500">

          No expense data available

        </div>


      ) : (


        <div className="mt-6 space-y-5">


          {data
            .slice(0, 5)
            .map(

              (
                category,
                index
              ) => {


                const percentage =

                  totalExpense > 0

                    ? (
                        category.amount /
                        totalExpense
                      ) * 100

                    : 0;


                return (

                  <div
                    key={
                      category.name
                    }
                  >


                    <div className="flex items-center justify-between gap-4">


                      <div className="flex min-w-0 items-center gap-3">


                        <span className="w-5 text-sm font-bold text-slate-600">

                          {index + 1}

                        </span>


                        <div

                          className="h-3 w-3 rounded-full"

                          style={{

                            backgroundColor:
                              category.color,

                          }}

                        />


                        <p className="truncate text-sm text-slate-300">

                          {category.name}

                        </p>


                      </div>


                      <div className="text-right">


                        <p className="text-sm font-medium text-white">

                          {formatCurrency(
                            category.amount
                          )}

                        </p>


                        <p className="text-xs text-slate-500">

                          {percentage.toFixed(
                            1
                          )}%

                        </p>


                      </div>


                    </div>


                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">


                      <div

                        className="h-full rounded-full"

                        style={{

                          width:
                            `${percentage}%`,

                          backgroundColor:
                            category.color,

                        }}

                      />


                    </div>


                  </div>

                );


              }

            )}


        </div>


      )}


    </div>

  );


}


export default TopCategories;
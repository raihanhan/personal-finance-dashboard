import {

  ResponsiveContainer,

  PieChart,

  Pie,

  Cell,

  Tooltip,

} from "recharts";


function ExpenseChart({
  data,
}) {


  const totalExpense =
    data.reduce(

      (total, item) =>
        total + item.value,

      0

    );


  const formatCurrency = (
    amount
  ) => {

    return new Intl.NumberFormat(
      "id-ID",
      {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0,

        notation:
          "compact",

      }

    ).format(amount);

  };


  if (data.length === 0) {

    return (

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <h2 className="font-semibold text-white">

          Expense Breakdown

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Expenses by category

        </p>


        <div className="flex h-75 items-center justify-center">

          <p className="text-sm text-slate-500">

            No expense data yet.

          </p>

        </div>


      </div>

    );

  }


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <h2 className="font-semibold text-white">

        Expense Breakdown

      </h2>


      <p className="mt-1 text-sm text-slate-500">

        Expenses by category

      </p>


      <div className="relative mt-4 h-55">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <PieChart>


            <Pie

              data={data}

              dataKey="value"

              nameKey="name"

              cx="50%"

              cy="50%"

              innerRadius={55}

              outerRadius={85}

              paddingAngle={4}

            >

              {data.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      entry.color
                    }
                  />

                )
              )}

            </Pie>


            <Tooltip

              contentStyle={{

                backgroundColor:
                  "#111927",

                border:
                  "1px solid #334155",

                borderRadius:
                  "12px",

              }}

              formatter={(value) =>
                formatCurrency(value)
              }

            />


          </PieChart>


        </ResponsiveContainer>


        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-xs text-slate-500">

            Total

          </span>


          <span className="mt-1 text-sm font-bold text-white">

            {formatCurrency(
              totalExpense
            )}

          </span>

        </div>


      </div>


      {/* LEGEND */}

      <div className="mt-4 space-y-3">


        {data.slice(0, 5).map(
          (item) => (

            <div
              key={item.name}
              className="flex items-center justify-between"
            >


              <div className="flex items-center gap-2">


                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{

                    backgroundColor:
                      item.color,

                  }}
                />


                <span className="text-sm text-slate-400">

                  {item.name}

                </span>


              </div>


              <span className="text-sm font-medium text-white">

                {formatCurrency(
                  item.value
                )}

              </span>


            </div>

          )
        )}


      </div>


    </div>

  );

}


export default ExpenseChart;
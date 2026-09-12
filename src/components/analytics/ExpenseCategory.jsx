import {

  ResponsiveContainer,

  PieChart,

  Pie,

  Cell,

  Tooltip,

  Legend,

} from "recharts";

import { formatCurrency } from "../../utils/currency";


function ExpenseCategoryChart({

  data,

}) {


  const COLORS = [

    "#3b82f6",

    "#ef4444",

    "#10b981",

    "#f59e0b",

    "#8b5cf6",

    "#ec4899",

    "#06b6d4",

    "#f97316",

  ];


  if (
    data.length === 0
  ) {


    return (

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <h2 className="font-semibold text-white">

          Expense by Category

        </h2>


        <div className="flex h-80 items-center justify-center text-sm text-slate-500">

          No expense data available

        </div>


      </div>

    );


  }


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="mb-4">


        <h2 className="font-semibold text-white">

          Expense by Category

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Where your money goes

        </p>


      </div>


      <div className="h-80">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <PieChart>


            <Pie

              data={data}

              dataKey="amount"

              nameKey="name"

              cx="50%"

              cy="50%"

              innerRadius={65}

              outerRadius={100}

              paddingAngle={3}

            >


              {data.map(

                (
                  entry,
                  index
                ) => (

                  <Cell

                    key={
                      `cell-${index}`
                    }

                    fill={

                      entry.color ||

                      COLORS[
                        index %
                        COLORS.length
                      ]

                    }

                  />

                )

              )}


            </Pie>


            <Tooltip

              contentStyle={{

                background:
                  "#111927",

                border:
                  "1px solid #334155",

                borderRadius:
                  "12px",

              }}

              formatter={

                (
                  value
                ) =>

                  formatCurrency(
                    value
                  )

              }

            />


            <Legend />


          </PieChart>


        </ResponsiveContainer>


      </div>


    </div>

  );


}


export default ExpenseCategoryChart;
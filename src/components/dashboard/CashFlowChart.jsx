import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

  Legend,

} from "recharts";


function CashFlowChart({

  data,

}) {


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div>


        <h2 className="font-semibold text-white">

          Cash Flow

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Income and expenses over time

        </p>


      </div>


      <div className="mt-6 h-80">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <BarChart
            data={data}
          >


            <CartesianGrid

              strokeDasharray="3 3"

              stroke="#1e293b"

              vertical={false}

            />


            <XAxis

              dataKey="month"

              stroke="#64748b"

              tickLine={false}

              axisLine={false}

            />


            <YAxis

              stroke="#64748b"

              tickLine={false}

              axisLine={false}

            />


            <Tooltip

              contentStyle={{

                background:
                  "#111927",

                border:
                  "1px solid #334155",

                borderRadius:
                  "12px",

              }}

            />


            <Legend />


            <Bar

              dataKey="income"

              name="Income"

              fill="#10b981"

              radius={[6, 6, 0, 0]}

            />


            <Bar

              dataKey="expense"

              name="Expense"

              fill="#ef4444"

              radius={[6, 6, 0, 0]}

            />


          </BarChart>


        </ResponsiveContainer>


      </div>


    </div>

  );


}


export default CashFlowChart;
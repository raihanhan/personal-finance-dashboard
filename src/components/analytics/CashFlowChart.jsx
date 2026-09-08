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


  const formatCurrency = (
    value
  ) => {

    if (
      value >= 1000000
    ) {

      return `${(
        value / 1000000
      ).toFixed(1)}M`;

    }


    if (
      value >= 1000
    ) {

      return `${(
        value / 1000
      ).toFixed(0)}K`;

    }


    return value;

  };


  const tooltipFormatter = (
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


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="mb-6">


        <h2 className="font-semibold text-white">

          Income vs Expense

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Monthly cash flow comparison

        </p>


      </div>


      <div className="h-80">


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

              fontSize={12}

              tickLine={false}

              axisLine={false}

            />


            <YAxis

              stroke="#64748b"

              fontSize={12}

              tickLine={false}

              axisLine={false}

              tickFormatter={
                formatCurrency
              }

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

              labelStyle={{

                color:
                  "#ffffff",

              }}

              formatter={
                tooltipFormatter
              }

            />


            <Legend />


            <Bar

              dataKey="income"

              name="Income"

              fill="#10b981"

              radius={[
                6,
                6,
                0,
                0,
              ]}

            />


            <Bar

              dataKey="expense"

              name="Expense"

              fill="#ef4444"

              radius={[
                6,
                6,
                0,
                0,
              ]}

            />


          </BarChart>


        </ResponsiveContainer>


      </div>


    </div>

  );


}


export default CashFlowChart;
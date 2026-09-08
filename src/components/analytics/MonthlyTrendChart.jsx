import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from "recharts";


function MonthlyTrendChart({

  data,

}) {


  const formatCurrency = (
    value
  ) => {

    if (
      Math.abs(value) >= 1000000
    ) {

      return `${(
        value / 1000000
      ).toFixed(1)}M`;

    }


    if (
      Math.abs(value) >= 1000
    ) {

      return `${(
        value / 1000
      ).toFixed(0)}K`;

    }


    return value;

  };


  const formatFullCurrency = (
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

          Monthly Cash Flow Trend

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Net cash flow over time

        </p>


      </div>


      <div className="h-80">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <LineChart
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

              formatter={

                (
                  value
                ) =>

                  formatFullCurrency(
                    value
                  )

              }

            />


            <Line

              type="monotone"

              dataKey="net"

              name="Net Cash Flow"

              stroke="#3b82f6"

              strokeWidth={3}

              dot={{

                r: 4,

                fill:
                  "#3b82f6",

              }}

              activeDot={{

                r: 6,

              }}

            />


          </LineChart>


        </ResponsiveContainer>


      </div>


    </div>

  );


}


export default MonthlyTrendChart;
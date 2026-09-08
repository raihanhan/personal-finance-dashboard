import {

  CalendarDays,

} from "lucide-react";


function AnalyticsFilters({

  dateRange,

  setDateRange,

}) {


  const handlePreset = (
    value
  ) => {


    const today =
      new Date();


    let startDate =
      new Date();


    if (
      value === "7days"
    ) {

      startDate.setDate(
        today.getDate() - 7
      );

    }


    if (
      value === "30days"
    ) {

      startDate.setDate(
        today.getDate() - 30
      );

    }


    if (
      value === "3months"
    ) {

      startDate.setMonth(
        today.getMonth() - 3
      );

    }


    if (
      value === "6months"
    ) {

      startDate.setMonth(
        today.getMonth() - 6
      );

    }


    if (
      value === "1year"
    ) {

      startDate.setFullYear(
        today.getFullYear() - 1
      );

    }


    if (
      value === "all"
    ) {

      setDateRange({

        start: "",

        end: "",

      });


      return;

    }


    const formatDate = (
      date
    ) => {

      return date
        .toISOString()
        .split("T")[0];

    };


    setDateRange({

      start:
        formatDate(startDate),

      end:
        formatDate(today),

    });


  };


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">


        <div>


          <div className="flex items-center gap-2">


            <CalendarDays

              size={19}

              className="text-blue-400"

            />


            <h2 className="font-semibold text-white">

              Date Range

            </h2>


          </div>


          <div className="mt-4 flex flex-wrap gap-2">


            <button
              onClick={() =>
                handlePreset("7days")
              }
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-white"
            >
              7 Days
            </button>


            <button
              onClick={() =>
                handlePreset("30days")
              }
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-white"
            >
              30 Days
            </button>


            <button
              onClick={() =>
                handlePreset("3months")
              }
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-white"
            >
              3 Months
            </button>


            <button
              onClick={() =>
                handlePreset("6months")
              }
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-white"
            >
              6 Months
            </button>


            <button
              onClick={() =>
                handlePreset("1year")
              }
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-white"
            >
              1 Year
            </button>


            <button
              onClick={() =>
                handlePreset("all")
              }
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:border-blue-500 hover:text-white"
            >
              All
            </button>


          </div>


        </div>


        <div className="grid gap-3 sm:grid-cols-2">


          <div>


            <label className="mb-2 block text-xs text-slate-500">

              Start Date

            </label>


            <input

              type="date"

              value={
                dateRange.start
              }

              onChange={
                (event) =>

                  setDateRange(
                    (current) => ({

                      ...current,

                      start:
                        event.target.value,

                    })
                  )

              }

              className="rounded-xl border border-slate-700 bg-[#0d1420] px-3 py-2 text-sm text-white outline-none focus:border-blue-500"

            />


          </div>


          <div>


            <label className="mb-2 block text-xs text-slate-500">

              End Date

            </label>


            <input

              type="date"

              value={
                dateRange.end
              }

              onChange={
                (event) =>

                  setDateRange(
                    (current) => ({

                      ...current,

                      end:
                        event.target.value,

                    })
                  )

              }

              className="rounded-xl border border-slate-700 bg-[#0d1420] px-3 py-2 text-sm text-white outline-none focus:border-blue-500"

            />


          </div>


        </div>


      </div>


    </div>

  );


}


export default AnalyticsFilters;
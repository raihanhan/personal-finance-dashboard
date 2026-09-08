import {

  ArrowUpRight,

  ArrowDownRight,

  Utensils,

  CircleDollarSign,

} from "lucide-react";

import {
  parseLocalDate,
} from "../../utils/date";

function RecentTransactions({
  transactions,
}) {


  const formatCurrency = (
    amount
  ) => {

    return new Intl.NumberFormat(
      "id-ID",
      {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0,

      }

    ).format(amount);

  };


  const formatDate = (
    date
  ) => {

    return new Intl.DateTimeFormat(
      "id-ID",
      {

        day: "numeric",

        month: "short",

        year: "numeric",

      }

    ).format(
      parseLocalDate(date)
    );

  };


  if (
    !transactions ||
    transactions.length === 0
  ) {

    return (

      <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">


        <h2 className="font-semibold text-white">

          Recent Transactions

        </h2>


        <div className="flex h-62.5 items-center justify-center">

          <p className="text-sm text-slate-500">

            No transactions yet.

          </p>

        </div>


      </div>

    );

  }


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927]">


      <div className="flex items-center justify-between border-b border-slate-800 p-5">


        <div>

          <h2 className="font-semibold text-white">

            Recent Transactions

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Your latest financial activity

          </p>

        </div>


      </div>


      <div className="divide-y divide-slate-800">


        {transactions.map(
          (transaction) => {

            const isIncome =
              transaction.type ===
              "income";


            return (

              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 transition hover:bg-slate-800/30"
              >


                <div className="flex items-center gap-3">


                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isIncome

                        ? "bg-emerald-500/10 text-emerald-400"

                        : "bg-red-500/10 text-red-400"
                    }`}
                  >

                    {isIncome

                      ? (
                        <CircleDollarSign
                          size={19}
                        />
                      )

                      : (
                        <Utensils
                          size={19}
                        />
                      )

                    }

                  </div>


                  <div>


                    <p className="text-sm font-medium text-white">

                      {transaction.description ||
                        transaction.categories
                          ?.name ||
                        "Transaction"}

                    </p>


                    <p className="mt-1 text-xs text-slate-500">

                      {transaction.categories
                        ?.name ||
                        "Uncategorized"}

                      {" • "}

                      {formatDate(
                        transaction.transaction_date
                      )}

                    </p>


                  </div>


                </div>


                <div className="text-right">


                  <div
                    className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                      isIncome

                        ? "text-emerald-400"

                        : "text-red-400"
                    }`}
                  >

                    {isIncome

                      ? (
                        <ArrowUpRight
                          size={15}
                        />
                      )

                      : (
                        <ArrowDownRight
                          size={15}
                        />
                      )

                    }


                    {isIncome
                      ? "+"
                      : "-"}

                    {formatCurrency(
                      transaction.amount
                    )}

                  </div>


                  <p className="mt-1 text-xs text-slate-500">

                    {transaction.accounts
                      ?.name ||
                      "Unknown Account"}

                  </p>


                </div>


              </div>

            );

          }
        )}


      </div>


    </div>

  );

}


export default RecentTransactions;
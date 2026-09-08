import {

  useEffect,

  useMemo,

  useState,

} from "react";


import {

  BarChart3,

} from "lucide-react";


import AnalyticsSummary from
  "../components/analytics/AnalyticSummary";

import AnalyticsFilters from
  "../components/analytics/AnalyticsFilters";

import CashFlowChart from
  "../components/analytics/CashFlowChart";

import ExpenseCategoryChart from
  "../components/analytics/ExpenseCategory";

import MonthlyTrendChart from
  "../components/analytics/MonthlyTrendChart";

import TopCategories from
  "../components/analytics/TopCategories";

import FinancialInsights from
  "../components/analytics/FinancialInsights";


import {

  getAnalyticsTransactions,

} from "../services/analyticService";


import {

  useAuth,

} from "../hooks/useAuth";

import ErrorState from "../components/ui/ErrorState";
import { getUserFriendlyError } from "../utils/errors";


function Analytics() {


  const { user } =
    useAuth();


  const [

    transactions,

    setTransactions,

  ] =
    useState([]);


  const [

    dateRange,

    setDateRange,

  ] =
    useState({

      start: "",

      end: "",

    });


  const [

    loading,

    setLoading,

  ] =
    useState(true);


  const [

    errorMessage,

    setErrorMessage,

  ] =
    useState("");

  const [retryKey, setRetryKey] = useState(0);


  /*
  ==============================

  LOAD DATA

  ==============================
  */

  useEffect(() => {


    const loadAnalytics =
      async () => {


        setLoading(true);


        const {

          data,

          error,

        } =
          await getAnalyticsTransactions();


        if (error) {


          setErrorMessage(getUserFriendlyError(error, "Unable to load analytics."));


          setLoading(false);


          return;


        }


        setTransactions(
          data || []
        );


        setLoading(false);


      };


    if (user) {

      void Promise.resolve().then(loadAnalytics);

    }


  }, [user, retryKey]);


  /*
  ==============================

  FILTER DATA

  ==============================
  */

  const filteredTransactions =
    useMemo(() => {


      return transactions.filter(
        (
          transaction
        ) => {


          const date =
            transaction.transaction_date;


          if (

            dateRange.start &&

            date <
            dateRange.start

          ) {

            return false;

          }


          if (

            dateRange.end &&

            date >
            dateRange.end

          ) {

            return false;

          }


          return true;


        }

      );


    }, [

      transactions,

      dateRange,

    ]);


  /*
  ==============================

  FINANCIAL SUMMARY

  ==============================
  */

  const financialSummary =
    useMemo(() => {


      let income = 0;


      let expense = 0;


      filteredTransactions.forEach(

        (
          transaction
        ) => {


          const amount =
            Number(
              transaction.amount
            );


          if (

            transaction.type ===
            "income"

          ) {

            income +=
              amount;

          }


          if (

            transaction.type ===
            "expense"

          ) {

            expense +=
              amount;

          }


        }

      );


      const balance =

        income -
        expense;


      const savingsRate =

        income > 0

          ? (
              balance /
              income
            ) * 100

          : 0;


      return {

        income,

        expense,

        balance,

        savingsRate,

      };


    }, [

      filteredTransactions,

    ]);


  /*
  ==============================

  MONTHLY DATA

  ==============================
  */

  const monthlyData =
    useMemo(() => {


      const monthlyMap =
        {};


      filteredTransactions.forEach(

        (
          transaction
        ) => {


          const date =
            new Date(

              `${transaction.transaction_date}T00:00:00`

            );


          const key =

            `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(
              2,
              "0"
            )}`;


          if (
            !monthlyMap[key]
          ) {


            monthlyMap[key] = {

              monthKey:
                key,

              month:

                new Intl.DateTimeFormat(

                  "id-ID",

                  {

                    month:
                      "short",

                    year:
                      "2-digit",

                  }

                ).format(date),

              income:
                0,

              expense:
                0,

              net:
                0,

            };


          }


          const amount =
            Number(
              transaction.amount
            );


          if (

            transaction.type ===
            "income"

          ) {


            monthlyMap[
              key
            ].income +=
              amount;


          }


          if (

            transaction.type ===
            "expense"

          ) {


            monthlyMap[
              key
            ].expense +=
              amount;


          }


        }

      );


      return Object
        .values(
          monthlyMap
        )

        .map(
          (item) => ({

            ...item,

            net:

              item.income -
              item.expense,

          })
        )

        .sort(

          (
            first,
            second
          ) =>

            first.monthKey.localeCompare(
              second.monthKey
            )

        );


    }, [

      filteredTransactions,

    ]);


  /*
  ==============================

  EXPENSE BY CATEGORY

  ==============================
  */

  const categoryData =
    useMemo(() => {


      const categoryMap =
        {};


      filteredTransactions

        .filter(

          (
            transaction
          ) =>

            transaction.type ===
            "expense"

        )

        .forEach(

          (
            transaction
          ) => {


            const category =

              transaction.categories;


            const categoryName =

              category?.name ||

              "Uncategorized";


            const categoryColor =

              category?.color ||

              "#64748b";


            if (

              !categoryMap[
                categoryName
              ]

            ) {


              categoryMap[
                categoryName
              ] = {

                name:
                  categoryName,

                amount:
                  0,

                color:
                  categoryColor,

              };


            }


            categoryMap[
              categoryName
            ].amount +=

              Number(
                transaction.amount
              );


          }

        );


      return Object

        .values(
          categoryMap
        )

        .sort(

          (
            first,
            second
          ) =>

            second.amount -
            first.amount

        );


    }, [

      filteredTransactions,

    ]);


  const topCategory =
    categoryData[0] ||
    null;


  /*
  ==============================

  LOADING

  ==============================
  */

  if (
    loading
  ) {


    return (

      <div className="flex min-h-[60vh] items-center justify-center">


        <div className="text-center">


          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />


          <p className="mt-4 text-sm text-slate-400">

            Loading analytics...

          </p>


        </div>


      </div>

    );


  }


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex items-center gap-3">


        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">

          <BarChart3 size={21} />

        </div>


        <div>


          <h1 className="text-2xl font-bold text-white">

            Analytics

          </h1>


          <p className="mt-1 text-sm text-slate-400">

            Understand your financial habits and spending patterns.

          </p>


        </div>


      </div>


      {/* ERROR */}

      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => setRetryKey((current) => current + 1)}
        />
      )}


      {/* FILTER */}

      <AnalyticsFilters

        dateRange={
          dateRange
        }

        setDateRange={
          setDateRange
        }

      />


      {/* SUMMARY */}

      <AnalyticsSummary

        income={
          financialSummary.income
        }

        expense={
          financialSummary.expense
        }

        balance={
          financialSummary.balance
        }

        savingsRate={
          financialSummary.savingsRate
        }

      />


      {/* CASH FLOW CHART */}
        {monthlyData.length === 0 ? (

  <div className="rounded-2xl border border-slate-800 bg-[#111927] p-12 text-center">

    <BarChart3
      size={36}
      className="mx-auto text-slate-600"
    />

    <h2 className="mt-4 font-semibold text-white">

      No analytics data yet

    </h2>

    <p className="mt-2 text-sm text-slate-500">

      Add transactions to start seeing
      your financial analytics.

    </p>

  </div>

) : (

  <CashFlowChart
    data={monthlyData}
  />

)}
     

      {/* CATEGORY + TOP CATEGORY */}

      <div className="grid gap-6 xl:grid-cols-2">


        <ExpenseCategoryChart

          data={
            categoryData
          }

        />


        <TopCategories

          data={
            categoryData
          }

        />


      </div>


      {/* TREND */}

      <MonthlyTrendChart

        data={
          monthlyData
        }

      />


      {/* INSIGHTS */}

      <FinancialInsights

        income={
          financialSummary.income
        }

        expense={
          financialSummary.expense
        }

        savingsRate={
          financialSummary.savingsRate
        }

        topCategory={
          topCategory
        }

      />


    </div>

  );


}


export default Analytics;
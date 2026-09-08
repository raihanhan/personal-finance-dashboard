import {

  useEffect,

  useMemo,

  useState,
  useCallback,

} from "react";


import {

  LayoutDashboard,
  WalletCards,

} from "lucide-react";
import { useNavigate } from "react-router-dom";


import {

  useAuth,

} from "../hooks/useAuth";


import {

  supabase,

} from "../lib/supabase";


import {

  getDashboardData,

} from "../services/dashboardService";


import DashboardSummary from
  "../components/dashboard/DashboardSummary";

import CashFlowChart from
  "../components/dashboard/CashFlowChart";

import ExpenseChart from
  "../components/dashboard/ExpenseChart";

import RecentTransactions from
  "../components/dashboard/RecentTransactions";

import AccountSummary from
  "../components/dashboard/AccountSummary";

import BudgetOverview from
  "../components/dashboard/BudgetOverview";

import GoalOverview from
  "../components/dashboard/GoalOverview";

import QuickInsights from
  "../components/dashboard/QuickInsight";
import { DashboardSkeleton } from "../components/ui/Skeletons";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import { getUserFriendlyError } from "../utils/errors";


import {

  calculateBudgetSpent,

} from "../utils/dashboard";


function Dashboard() {
  const navigate = useNavigate();
  const { user } =
    useAuth();


  const [

    data,

    setData,

  ] =
    useState({

      accounts: [],

      transactions: [],

      budgets: [],

      goals: [],

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


  /*
  =========================

  LOAD DASHBOARD

  =========================
  */

  const loadDashboard = useCallback(
    async () => {


      setLoading(true);


      const {

        data:

          dashboardData,

        error,

      } =
        await getDashboardData();


      if (
        error
      ) {


        setErrorMessage(getUserFriendlyError(error, "Unable to load dashboard data."));


        setLoading(false);


        return;


      }


      setData(
        dashboardData
      );


      setErrorMessage(
        ""
      );


      setLoading(false);


    }, []);


  useEffect(() => {


    if (
      user
    ) {

      void Promise.resolve().then(loadDashboard);

    }


  }, [user, loadDashboard]);


  /*
  =========================

  REALTIME SUBSCRIPTIONS

  =========================
  */

  useEffect(() => {


    if (
      !user
    ) {

      return;

    }


    const channel =

      supabase

        .channel(

          "dashboard-realtime"

        )


        .on(

          "postgres_changes",

          {

            event:
              "*",

            schema:
              "public",

            table:
              "transactions",

          },

          () => {

            loadDashboard();

          }

        )


        .on(

          "postgres_changes",

          {

            event:
              "*",

            schema:
              "public",

            table:
              "accounts",

          },

          () => {

            loadDashboard();

          }

        )


        .on(

          "postgres_changes",

          {

            event:
              "*",

            schema:
              "public",

            table:
              "budgets",

          },

          () => {

            loadDashboard();

          }

        )


        .on(

          "postgres_changes",

          {

            event:
              "*",

            schema:
              "public",

            table:
              "financial_goals",

          },

          () => {

            loadDashboard();

          }

        )


        .subscribe();


    return () => {


      supabase.removeChannel(
        channel
      );


    };


  }, [user, loadDashboard]);


  /*
  =========================

  CURRENT MONTH

  =========================
  */

  const currentMonthTransactions =
    useMemo(() => {


      const now =
        new Date();


      const currentMonth =
        now.getMonth();


      const currentYear =
        now.getFullYear();


      return data.transactions.filter(

        (
          transaction
        ) => {


          const date =
            new Date(

              `${transaction.transaction_date}T00:00:00`

            );


          return (

            date.getMonth() ===
              currentMonth &&

            date.getFullYear() ===
              currentYear

          );


        }

      );


    }, [

      data.transactions,

    ]);


  /*
  =========================

  TOTAL BALANCE

  =========================
  */

  const totalBalance =
    useMemo(() => {


      return data.accounts.reduce(

        (
          total,
          account
        ) => {


          return (

            total +

            Number(

              account.balance || 0

            )

          );


        },

        0

      );


    }, [

      data.accounts,

    ]);


  /*
  =========================

  MONTHLY SUMMARY

  =========================
  */

  const monthlySummary =
    useMemo(() => {


      let income = 0;

      let expense = 0;


      currentMonthTransactions.forEach(

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


            income += amount;

          }


          if (

            transaction.type ===
            "expense"

          ) {


            expense += amount;

          }


        }

      );


      return {

        income,

        expense,

      };


    }, [

      currentMonthTransactions,

    ]);


  /*
  =========================

  BUDGET CALCULATION

  =========================
  */

  const budgetsWithSpent =
    useMemo(() => {


      return calculateBudgetSpent(

        data.budgets,

        data.transactions

      );


    }, [

      data.budgets,

      data.transactions,

    ]);


  /*
  =========================

  DASHBOARD CHART DATA

  =========================
  */

  const monthlyChartData =
    useMemo(() => {


      const map = {};


      data.transactions.forEach(

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
            !map[key]
          ) {


            map[key] = {

              month:

                new Intl.DateTimeFormat(

                  "id-ID",

                  {

                    month:
                      "short",

                  }

                ).format(date),

              income:
                0,

              expense:
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


            map[key].income +=
              amount;

          }


          if (

            transaction.type ===
            "expense"

          ) {


            map[key].expense +=
              amount;

          }


        }

      );


      return Object.values(
        map
      ).slice(-6);


    }, [

      data.transactions,

    ]);


  /*
  =========================

  EXPENSE CATEGORY DATA

  =========================
  */

  const expenseCategoryData =
    useMemo(() => {


      const map = {};


      currentMonthTransactions

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


            const name =

              category?.name ||

              "Uncategorized";


            if (
              !map[name]
            ) {


              map[name] = {

                name,

                value:
                  0,

                color:

                  category?.color ||

                  "#64748b",

              };


            }


            map[name].value +=

              Number(
                transaction.amount
              );


          }

        );


      return Object.values(
        map
      );


    }, [

      currentMonthTransactions,

    ]);


  /*
  =========================

  RECENT TRANSACTIONS

  =========================
  */

  const recentTransactions = useMemo(() => {


      return [

        ...data.transactions,

      ]

        .sort(

          (
            first,
            second
          ) =>


            new Date(
              second.transaction_date
            ) -

            new Date(
              first.transaction_date
            )

        )

        .slice(
          0,
          6
        );


    }, [

      data.transactions,

    ]);


  /*
  =========================

  LOADING

  =========================
  */

  if (loading) {
    return <DashboardSkeleton />;
  }

  const hasFinancialData =
    data.accounts.length > 0 ||
    data.transactions.length > 0 ||
    data.budgets.length > 0 ||
    data.goals.length > 0;

  if (!hasFinancialData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <LayoutDashboard size={21} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Financial Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">Welcome back. Let&apos;s set up your finances.</p>
          </div>
        </div>

        {errorMessage && (
          <ErrorState
            message={errorMessage}
            onRetry={() => void loadDashboard()}
          />
        )}

        <EmptyState
          icon={WalletCards}
          title="Your financial dashboard is ready."
          description="Create your first account to start tracking balances, transactions, budgets, and goals."
          actionText="Create Account"
          onAction={() => navigate("/accounts")}
        />
      </div>
    );
  }


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex items-center gap-3">


        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

          <LayoutDashboard
            size={21}
          />

        </div>


        <div>


          <h1 className="text-2xl font-bold text-white">

            Financial Dashboard

          </h1>


          <p className="mt-1 text-sm text-slate-400">

            Welcome back. Here's your financial overview.

          </p>


        </div>


      </div>


      {/* ERROR */}

      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => void loadDashboard()}
        />
      )}


      {/* SUMMARY */}

      <DashboardSummary

        balance={
          totalBalance
        }

        income={
          monthlySummary.income
        }

        expense={
          monthlySummary.expense
        }

        accountCount={
          data.accounts.length
        }

      />


      {/* CHARTS */}

      <div className="grid gap-6 xl:grid-cols-3">


        <div className="xl:col-span-2">


          <CashFlowChart

            data={
              monthlyChartData
            }

          />


        </div>


        <ExpenseChart

          data={
            expenseCategoryData
          }

        />


      </div>


      {/* BUDGET + GOALS */}

      <div className="grid gap-6 xl:grid-cols-2">


        <BudgetOverview

          budgets={
            budgetsWithSpent
          }

        />


        <GoalOverview

          goals={
            data.goals
          }

        />


      </div>


      {/* RECENT TRANSACTIONS + INSIGHTS */}

      <div className="grid gap-6 xl:grid-cols-3">


        <div className="xl:col-span-2">


          <RecentTransactions

            transactions={
              recentTransactions
            }

          />


        </div>


        <QuickInsights

          income={
            monthlySummary.income
          }

          expense={
            monthlySummary.expense
          }

          budgets={
            budgetsWithSpent
          }

        />


      </div>


      {/* ACCOUNTS */}

      <AccountSummary

        accounts={
          data.accounts
        }

      />


    </div>

  );


}


export default Dashboard;
import BalanceCard from "../components/dashboard/BalanceCard";
import FinancialHealth from "../components/dashboard/FinancialHealth";
import MoneyFlow from "../components/dashboard/MoneyFlow";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import AccountsCard from "../components/dashboard/AccountsCard";

function Dashboard() {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-white">
          Overview
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back! Here's your financial overview.
        </p>

      </div>


      {/* TOP SECTION */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <BalanceCard />
        </div>

        <FinancialHealth />

      </div>


      {/* MONEY FLOW */}

      <div className="mt-6">
        <MoneyFlow />
      </div>


      {/* CHARTS */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <IncomeExpenseChart />
        </div>

        <SpendingChart />

      </div>


      {/* TRANSACTIONS & ACCOUNTS */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <RecentTransactions />

        </div>


        <AccountsCard />

      </div>

    </div>
  );
}

export default Dashboard;
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import SpendingChart from "../components/dashboard/SpendingChart";

function Analytics() {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-slate-400">
          Analyze your financial activity.
        </p>

      </div>


      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <IncomeExpenseChart />
        </div>

        <SpendingChart />

      </div>

    </div>
  );
}

export default Analytics;
import {
  ShieldCheck,
  TrendingUp,
  PiggyBank,
  Wallet,
} from "lucide-react";

function FinancialHealth() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111927] p-6">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2 text-slate-400">

            <ShieldCheck
              size={18}
              className="text-blue-400"
            />

            <span className="text-sm">
              Financial Health
            </span>

          </div>

          <h2 className="mt-2 text-xl font-semibold text-white">
            Your financial status
          </h2>

        </div>


        <div className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          GOOD
        </div>

      </div>


      <div className="mt-8 flex justify-center">

        <div className="relative flex h-40 w-40 items-center justify-center rounded-full">

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#3b82f6 0deg 281deg, #1e293b 281deg 360deg)",
            }}
          />

          <div className="absolute inset-3 rounded-full bg-[#111927]" />

          <div className="relative text-center">

            <p className="text-4xl font-bold text-white">
              78
            </p>

            <p className="mt-1 text-xs text-slate-500">
              out of 100
            </p>

          </div>

        </div>

      </div>


      <div className="mt-8 grid grid-cols-3 gap-3">

        <div className="rounded-xl border border-slate-800 bg-[#0d1420] p-3 text-center">

          <PiggyBank
            size={18}
            className="mx-auto text-blue-400"
          />

          <p className="mt-2 text-xs text-slate-500">
            Savings
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            85%
          </p>

        </div>


        <div className="rounded-xl border border-slate-800 bg-[#0d1420] p-3 text-center">

          <TrendingUp
            size={18}
            className="mx-auto text-emerald-400"
          />

          <p className="mt-2 text-xs text-slate-500">
            Growth
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            72%
          </p>

        </div>


        <div className="rounded-xl border border-slate-800 bg-[#0d1420] p-3 text-center">

          <Wallet
            size={18}
            className="mx-auto text-purple-400"
          />

          <p className="mt-2 text-xs text-slate-500">
            Budget
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            78%
          </p>

        </div>

      </div>


      <div className="mt-6 border-t border-slate-800 pt-4">

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            Overall Progress
          </span>

          <span className="font-medium text-white">
            78%
          </span>

        </div>


        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: "78%" }}
          />

        </div>

      </div>

    </div>
  );
}

export default FinancialHealth;
import {
  Building2,
  Smartphone,
  Wallet,
  CreditCard,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useAccounts } from "../../hooks/useAccounts";
import { AccountSummarySkeleton } from "../ui/Skeletons";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

function AccountsCard() {
  const { accounts, loading } = useAccounts();

  const accountStyles = [
    [Building2, "text-blue-400", "bg-blue-500/10"],
    [Smartphone, "text-emerald-400", "bg-emerald-500/10"],
    [Wallet, "text-orange-400", "bg-orange-500/10"],
    [CreditCard, "text-purple-400", "bg-purple-500/10"],
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111927]">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-slate-800 p-6">

        <div>

          <h2 className="text-lg font-semibold text-white">
            My Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your connected accounts
          </p>

        </div>


        <button className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white">

          <Plus size={18} />

        </button>

      </div>


      {/* ACCOUNTS */}

      <div className="divide-y divide-slate-800">

        {loading ? (
          <AccountSummarySkeleton />
        ) : accounts.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">No accounts yet.</p>
        ) : accounts.map((account, index) => {

          const [Icon, color, bg] =
            accountStyles[index % accountStyles.length];

          return (
            <button
              key={account.id}
              className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-800/30"
            >

              <div className="flex items-center gap-3">

                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
                >

                  <Icon
                    size={18}
                    className={color}
                  />

                </div>


                <div>

                  <p className="text-sm font-medium text-white">
                    {account.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {account.type}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-2">

                <p className="text-sm font-semibold text-white">

                  {formatCurrency(account.balance)}

                </p>

                <ChevronRight
                  size={16}
                  className="text-slate-600"
                />

              </div>

            </button>
          );
        })}

      </div>


      {/* FOOTER */}

      <div className="p-4">

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-white">

          Manage Accounts

          <ChevronRight size={16} />

        </button>

      </div>

    </div>
  );
}

export default AccountsCard;
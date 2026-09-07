import {
  Building2,
  Smartphone,
  Wallet,
  Plus,
} from "lucide-react";

function Accounts() {
  const accounts = [
    {
      name: "BCA Savings",
      type: "Bank Account",
      balance: "Rp 12.500.000",
      icon: Building2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      name: "GoPay",
      type: "E-Wallet",
      balance: "Rp 750.000",
      icon: Smartphone,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Cash",
      type: "Cash",
      balance: "Rp 350.000",
      icon: Wallet,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div>

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Accounts
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your financial accounts.
          </p>
        </div>


        <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white">

          <Plus size={18} />

          Add Account

        </button>

      </div>


      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {accounts.map((account) => {

          const Icon = account.icon;

          return (
            <div
              key={account.name}
              className="rounded-2xl border border-slate-800 bg-[#111927] p-6"
            >

              <div className="flex items-center justify-between">

                <div className={`rounded-xl p-3 ${account.bg}`}>

                  <Icon
                    className={account.color}
                    size={22}
                  />

                </div>

                <span className="text-xs text-slate-500">
                  {account.type}
                </span>

              </div>


              <h2 className="mt-6 text-lg font-semibold text-white">
                {account.name}
              </h2>

              <p className="mt-2 text-2xl font-bold text-white">
                {account.balance}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Accounts;
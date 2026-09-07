import {
  LayoutDashboard,
  WalletCards,
  ArrowLeftRight,
  CreditCard,
  TrendingUp,
  Shield,
  BarChart3,
  Activity,
  Settings,
  Target,
  PieChart,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Accounts",
    icon: WalletCards,
    path: "/accounts",
  },
  {
    name: "Transactions",
    icon: ArrowLeftRight,
    path: "/transactions",
  },
  {
    name: "Cards",
    icon: CreditCard,
    path: "/cards",
  },
  {
    name: "Investments",
    icon: TrendingUp,
    path: "/investments",
  },
  {
    name: "Budgets",
    icon: PieChart,
    path: "/budgets",
  },
  {
    name: "Goals",
    icon: Target,
    path: "/goals",
  },
];

const insightItems = [
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Activity",
    icon: Activity,
    path: "/activity",
  },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-[#0d1420] p-4">

      {/* LOGO */}

      <NavLink
        to="/"
        className="mb-10 flex items-center gap-3 px-2"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 font-bold text-white">
          F
        </div>

        <h1 className="text-lg font-bold text-white">
          FinTrack
        </h1>
      </NavLink>


      {/* MENU */}

      <p className="mb-3 px-3 text-xs font-medium tracking-widest text-slate-500">
        MENU
      </p>


      <nav className="space-y-1">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  isActive
                    ? "border border-blue-500/30 bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>


      {/* INSIGHTS */}

      <p className="mb-3 mt-8 px-3 text-xs font-medium tracking-widest text-slate-500">
        INSIGHTS
      </p>


      <nav className="space-y-1">

        {insightItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  isActive
                    ? "border border-blue-500/30 bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>


      {/* BOTTOM */}

      <div className="mt-auto">

        <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">

          <div className="flex items-center gap-2 text-sm font-medium text-white">

            <Shield
              size={16}
              className="text-blue-400"
            />

            Financial Health

          </div>

          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Your financial data is securely protected.
          </p>

        </div>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
              isActive
                ? "bg-blue-500/10 text-blue-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Settings size={18} />

          Settings
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;
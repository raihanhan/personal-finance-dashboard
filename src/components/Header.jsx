import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 px-8">

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search transactions, categories..."
          className="w-full rounded-xl border border-slate-800 bg-[#111927] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
        />

      </div>

      <div className="ml-8 flex items-center gap-4">

        <button className="hidden items-center gap-3 rounded-xl border border-slate-800 bg-[#111927] px-4 py-2 text-sm text-slate-300 md:flex">

          <div className="h-2 w-2 rounded-full bg-emerald-400" />

          <div className="text-left">

            <p className="text-xs text-slate-500">
              Total Balance
            </p>

            <p className="text-sm font-medium text-white">
              Rp 24.500.000
            </p>

          </div>

          <ChevronDown size={16} />

        </button>

        <button className="rounded-lg border border-slate-800 bg-[#111927] p-2.5 text-slate-400 transition hover:text-white">
          <Sun size={17} />
        </button>

        <button className="rounded-lg border border-slate-800 bg-[#111927] p-2.5 text-slate-400 transition hover:text-white">
          <Moon size={17} />
        </button>

        <button className="relative rounded-lg border border-slate-800 bg-[#111927] p-2.5 text-slate-400 transition hover:text-white">

          <Bell size={17} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="hidden items-center gap-3 lg:flex">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 font-semibold text-white">
            H
          </div>

          <div>

            <p className="text-sm font-medium text-white">
              Habib
            </p>

            <p className="text-xs text-slate-500">
              Personal Account
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;
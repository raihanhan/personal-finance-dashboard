import {
  Target,
  Plus,
  Home,
  Plane,
  Laptop,
} from "lucide-react";

function Goals() {
  const goals = [
    {
      name: "Emergency Fund",
      target: 30000000,
      current: 18500000,
      icon: Home,
    },
    {
      name: "Vacation",
      target: 10000000,
      current: 4500000,
      icon: Plane,
    },
    {
      name: "New Laptop",
      target: 15000000,
      current: 9000000,
      icon: Laptop,
    },
  ];

  return (
    <div>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-white">
            Financial Goals
          </h1>

          <p className="mt-2 text-slate-400">
            Track your financial goals and progress.
          </p>

        </div>


        <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white">

          <Plus size={18} />

          Create Goal

        </button>

      </div>


      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {goals.map((goal) => {

          const Icon = goal.icon;

          const percentage =
            (goal.current / goal.target) * 100;

          return (
            <div
              key={goal.name}
              className="rounded-2xl border border-slate-800 bg-[#111927] p-6"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-blue-500/10 p-3">

                  <Icon
                    size={22}
                    className="text-blue-400"
                  />

                </div>


                <Target
                  size={20}
                  className="text-slate-600"
                />

              </div>


              <h2 className="mt-6 text-lg font-semibold text-white">
                {goal.name}
              </h2>


              <div className="mt-5 flex justify-between text-sm">

                <span className="text-slate-400">
                  Rp {goal.current.toLocaleString("id-ID")}
                </span>

                <span className="text-white">
                  Rp {goal.target.toLocaleString("id-ID")}
                </span>

              </div>


              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>


              <div className="mt-3 flex justify-between">

                <span className="text-xs text-slate-500">
                  Progress
                </span>

                <span className="text-xs font-medium text-blue-400">
                  {percentage.toFixed(0)}%
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Goals;
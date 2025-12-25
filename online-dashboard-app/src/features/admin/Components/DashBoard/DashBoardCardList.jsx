import React from "react";
import { Users, Briefcase, CreditCard, Sparkles } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Customers",
    count: "120",
    icon: Users,
    subtitle: "Active this month",
    tone: "from-indigo-500 to-blue-500",
  },
  {
    id: 2,
    title: "Projects",
    count: "45",
    icon: Sparkles,
    subtitle: "In progress & delivered",
    tone: "from-purple-500 to-fuchsia-500",
  },
  {
    id: 3,
    title: "Payments",
    count: "230",
    icon: CreditCard,
    subtitle: "Completed transactions",
    tone: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "New Requests",
    count: "15",
    icon: Briefcase,
    subtitle: "Awaiting review",
    tone: "from-amber-500 to-orange-500",
  },
];

const DashBoardCardList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-4">
      {data.map(({ id, title, count, icon: Icon, subtitle, tone }) => (
        <div
          key={id}
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div
            className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`}
          />
          <div className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {count}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl text-white bg-gradient-to-br ${tone} shadow`}
            >
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashBoardCardList;

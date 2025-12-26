import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GitMerge,
  MessageSquare,
  FileText,
  CalendarClock,
  UploadCloud,
} from "lucide-react";

const items = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/admin/jobs", label: "Jobs", Icon: Briefcase },
  { to: "/admin/bulk-jobs", label: "Bulk Jobs", Icon: UploadCloud },
  { to: "/admin/projects", label: "Projects", Icon: GitMerge },
  { to: "/admin/companyqa", label: "Company Q/A", Icon: MessageSquare },
  { to: "/admin/materials", label: "Materials", Icon: FileText },
  { to: "/admin/slots", label: "Test Slots", Icon: CalendarClock },
];

const SidebarFixed = () => {
  return (
    <div className="fixed hidden lg:block w-56 h-full bg-white dark:bg-gray-950 top-14 border-r border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex flex-col py-3">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 border-r-4 border-indigo-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarFixed;

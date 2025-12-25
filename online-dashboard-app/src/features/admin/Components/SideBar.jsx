import React, { useEffect, useRef, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GitMerge,
  MessageSquare,
  FileText,
  CalendarClock,
  X,
} from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/admin/jobs", label: "Jobs", Icon: Briefcase },
  { to: "/admin/projects", label: "Projects", Icon: GitMerge },
  { to: "/admin/companyqa", label: "Company Q/A", Icon: MessageSquare },
  { to: "/admin/materials", label: "Materials", Icon: FileText },
  { to: "/admin/slots", label: "Test Slots", Icon: CalendarClock },
];

const SideBar = forwardRef(function SideBar({ toggleSidebar }, sidebarRef) {
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef?.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarRef, toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-950 shadow-xl z-50 flex flex-col border-r border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Admin
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {navItems.map(({ to, label, Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={toggleSidebar}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  active
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
});

export default SideBar;

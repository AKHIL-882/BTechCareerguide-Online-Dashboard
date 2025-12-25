import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { breadcrumbMap } from "../../utils/breadcrumbs";
import { breadcrumbIcons } from "../../utils/breadcrumbs";
import NotificationBell from "./NotificationBell";
import UserProfile from "./UserProfile";

const Header = ({ handleLogout, isCollapsed }) => {
  const [breadcrumb, setBreadcrumb] = useState({ label: "Home", icon: null });
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || "dashboard";

    const label =
      breadcrumbMap[lastPart] ||
      lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

    const Icon = breadcrumbIcons[lastPart] || null;

    setBreadcrumb({ label, icon: Icon });
  }, [location]);

  const Icon = breadcrumb.icon;

  return (
    <header className="flex justify-between items-center px-6 md:py-2 py-3 w-full h-14 fixed top-0 left-0 right-0 z-10 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 border-b border-gray-200 dark:border-gray-800">
      <h1
        className={`hidden md:flex font-sans font-medium text-md justify-center items-center gap-2 ${
          isCollapsed ? "ml-12" : "ml-52 pl-1"
        } text-violet-800 dark:text-violet-400 px-2 rounded-lg`}
      >
        {Icon && <Icon size={18} />}
        {breadcrumb.label}
      </h1>

      <div className="flex items-center space-x-6">
        <NotificationBell />
        <UserProfile handleLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;

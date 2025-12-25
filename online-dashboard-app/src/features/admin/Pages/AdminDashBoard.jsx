import React, { useState } from "react";
import DashBoardCardList from "../Components/DashBoard/DashBoardCardList";
import UserProjectsPage from "./UserProjectsPage";
import { createUserAndAdminRolesApi } from "@/api/adminApi";
import { toast } from "react-toastify";
import Spinner from "@/shared/components/atoms/Spinner";
import { Link } from "react-router-dom";
import { Briefcase, GitMerge, CalendarClock, FileText } from "lucide-react";

const AdminDashBoard = () => {
  const [roleLoading, setRoleLoading] = useState(false);

  const handleCreateRoles = async () => {
    const token = JSON.parse(localStorage.getItem("data") || "{}")?.access_token;

    setRoleLoading(true);
    try {
      const response = await createUserAndAdminRolesApi(token);
      const payload = response.data || response;
      toast.success(payload?.message || "User/Admin roles ensured.");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Could not create user/admin roles. Please try again.";
      toast.error(msg);
    } finally {
      setRoleLoading(false);
    }
  };

  return (
    <div className="py-20 px-4 lg:pl-60 w-screen space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-lg px-6 py-6">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#fff_0,_transparent_40%),radial-gradient(circle_at_bottom_right,_#fff_0,_transparent_35%)]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">
              Admin Control Center
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">Welcome back</h1>
            <p className="text-sm text-white/80 max-w-2xl">
              Keep your roles aligned, track workloads, and jump into key admin
              actions from one place.
            </p>
          </div>
          <button
            onClick={handleCreateRoles}
            disabled={roleLoading}
            className="px-4 py-2 rounded-md bg-white/15 border border-white/20 text-white font-semibold backdrop-blur hover:bg-white/25 disabled:opacity-60 flex items-center gap-2"
          >
            {roleLoading && <Spinner loading={true} color="#fff" size={16} />}
            <span>{roleLoading ? "Creating..." : "Create user & admin roles"}</span>
          </button>
        </div>
      </div>

      <DashBoardCardList />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            to: "/admin/jobs",
            title: "Manage Jobs",
            desc: "Post, edit, or archive openings.",
            Icon: Briefcase,
          },
          {
            to: "/admin/projects",
            title: "Projects",
            desc: "Oversee delivery and status.",
            Icon: GitMerge,
          },
          {
            to: "/admin/slots",
            title: "Test Slots",
            desc: "Configure or adjust interview slots.",
            Icon: CalendarClock,
          },
          {
            to: "/admin/materials",
            title: "Materials",
            desc: "Update resources and FAQs.",
            Icon: FileText,
          },
        ].map(({ to, title, desc, Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200">
                <Icon size={18} />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-indigo-500">
                Open
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {desc}
            </p>
          </Link>
        ))}
      </div>

      <UserProjectsPage isDashboard={true} />
    </div>
  );
};

export default AdminDashBoard;

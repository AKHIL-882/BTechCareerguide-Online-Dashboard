import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/shared/components/organisms/Footer";
import Sidebar from "./Sidebar";
import ScrollToTopButton from "@/shared/components/molecules/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
// import GithubCheckWrapper from "../../wrappers/GithubCheckWrapper";
import Header from "./Header";
import { useLogout } from "@/hooks/useAuth";

const UserMainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, loading } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <>
      {/* <GithubCheckWrapper /> */}
      <ScrollToTopButton colorCode="bg-violet-800" />

      <div className="flex bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          handleLogout={handleLogout}
        />
        <Header handleLogout={handleLogout} isCollapsed={isCollapsed} logoutLoading={loading} />
        <div className={`w-full ${isCollapsed ? "lg:pl-[60px]" : "lg:pl-56"}`}>
          <Outlet />
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default UserMainLayout;

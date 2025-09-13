import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Admin/Components/Footer";
import Sidebar from "./Sidebar";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
// import GithubCheckWrapper from "../../wrappers/GithubCheckWrapper";
import Header from "./Header";
import { logoutUser } from "../../hooks/useAuth";

const UserMainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;

    if (!accessToken) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const isLoggedOut = await logoutUser(accessToken);
      if (isLoggedOut) {
        localStorage.removeItem("data");
        alert("You have logged out successfully!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <>
      {/* <GithubCheckWrapper /> */}
      <ScrollToTopButton colorCode="bg-violet-800" />

      <div className="flex bg-slate-50">
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          handleLogout={handleLogout}
        />
        <Header handleLogout={handleLogout} isCollapsed={isCollapsed} />
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

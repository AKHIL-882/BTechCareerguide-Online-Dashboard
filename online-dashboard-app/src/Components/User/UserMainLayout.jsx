import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "../Admin/Components/Footer";
import Sidebar from "./Sidebar";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";
import { logoutUser } from "../../Api";
import { ToastContainer } from "react-toastify";
import GithubId from "./GithubId";

const UserMainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log("Data from localStorage:", data);

    const accessToken = data ? data.access_token : null;
    if (!accessToken) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const isLoggedOut = await logoutUser(accessToken);
      console.log("Logout status:", isLoggedOut);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const handleGithubSubmit = (githubId) => {
    console.log("GitHub ID submitted:", githubId);
    // Save to API or localStorage
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <GithubId
          onClose={() => setShowPopup(false)}
          onSubmit={handleGithubSubmit}
        />
      )}
      <ScrollToTopButton colorCode="bg-violet-800" />
      <Header
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen} // Pass isSidebarOpen to Header
      />
      <div className="flex bg-slate-50">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
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

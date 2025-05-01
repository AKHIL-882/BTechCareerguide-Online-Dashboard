import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "../Admin/Components/Footer";
import Sidebar from "./Sidebar";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";
import { logoutUser } from "../../Api";
import { ToastContainer } from "react-toastify";

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

  return (
    <>
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
        />
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default UserMainLayout;

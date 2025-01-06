import React,{useState,useEffect} from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "../Admin/Components/Footer";
import Sidebar from "./Sidebar";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";

const UserMainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        const data = JSON.parse(localStorage.getItem("data"));
        const accessToken = data ? data.access_token : null;
    
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
        } catch {
          alert("An error occurred while logging out. Please try again.");
        }
      };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
    <>
      <ScrollToTopButton colorCode="bg-blue-600"/>
      <Header handleLogout={handleLogout} toggleSidebar={toggleSidebar} />
      <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default UserMainLayout;

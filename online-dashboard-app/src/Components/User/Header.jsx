import React, { useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Header = ({ handleLogout, toggleSidebar }) => {
  // Local state to track whether sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar and change the icon
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar(); // Optionally call the parent's toggleSidebar function
  };

  return (
    <header className="flex justify-between items-center px-6 md:py-2 py-3  bg-white shadow w-full z-50 fixed">
      {/* Hamburger Icon for Mobile (Left side) */}
      <div className="flex items-center ">
        <button
          onClick={handleToggleSidebar}
          className="block lg:hidden text-xl text-gray-600 pr-2"
        >
          {/* Conditionally render hamburger or cross icon */}
          {isSidebarOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
        <img src="logo.PNG" alt="Logo" className="lg:h-10 lg:w-40 h-7 w-28 " />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white md:px-4 md:py-2 px-2 py-1 rounded hover:bg-red-600 transition"
      >
        <span className="hidden md:flex justify-center items-center">
          <FaSignOutAlt />
          <p className="pl-1">Logout</p>
        </span>
        <span className="sm:hidden">
          <FaSignOutAlt />
        </span>
      </button>
    </header>
  );
};

export default Header;


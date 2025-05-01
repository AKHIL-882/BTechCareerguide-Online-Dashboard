import React from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import NotificationBell from "./NotificationBell";

const Header = ({ handleLogout, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center px-6 md:py-3 py-3 bg-white shadow w-full z-50 fixed">
      {/* Hamburger Icon for Mobile (Left side) */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="block lg:hidden text-xl text-violet-500"
        >
          {/* Conditionally render hamburger or cross icon */}
          {isSidebarOpen ? (
            <FaTimes className="text-2xl font-sans" />
          ) : (
            <FaBars className="text-2xl font-sans" />
          )}
        </button>
        <h1 className="text-violet-600 text-2xl font-bold font-display">
          PROJPORT
        </h1>
      </div>

      {/* Logout Button */}
      <div className="flex justify-between items-center space-x-2">
        <NotificationBell />
        <button
          onClick={handleLogout}
          className="text-violet-500 md:px-4 px-2 rounded hover:text-violet-700 transition"
        >
          <span className="flex justify-center items-center font-display ">
            <FaSignOutAlt size={20} />
            <p className="pl-1 font-semibold hidden sm:block font-display">
              Logout
            </p>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;

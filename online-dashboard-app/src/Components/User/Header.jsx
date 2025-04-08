import React from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Header = ({ handleLogout, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center px-6 md:py-2 py-3 bg-violet-800 shadow w-full z-50 fixed">
      {/* Hamburger Icon for Mobile (Left side) */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="block lg:hidden text-xl text-white"
        >
          {/* Conditionally render hamburger or cross icon */}
          {isSidebarOpen ? (
            <FaTimes className="text-2xl font-sans" />
          ) : (
            <FaBars className="text-2xl font-sans" />
          )}
        </button>
        <h1 className="text-white text-2xl font-bold font-display">ProjPort</h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="text-white md:px-4 md:py-2 px-2 py-1 rounded hover:text-gray-100 transition"
      >
        <span className="flex justify-center items-center font-display ">
          <FaSignOutAlt size={20} />
          <p className="pl-1 font-semibold hidden sm:block font-display">
            Logout
          </p>
        </span>
      </button>
    </header>
  );
};

export default Header;

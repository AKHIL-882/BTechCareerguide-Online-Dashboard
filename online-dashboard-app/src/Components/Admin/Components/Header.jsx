import React, { useState, useEffect, useRef } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { FaLockOpen } from "react-icons/fa";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="fixed bg-white shadow-md p-2 flex justify-between items-center w-full z-50">
        <div className="flex items-center space-x-2">
          <HamburgerMenu toggleSidebar={toggleSidebar} />
          <Logo />
        </div>

        <div className="lg:flex items-center space-x-6">
          <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
            <span className="hidden md:block">Logout</span>
            <span className="sm:hidden">
              <FaLockOpen />
            </span>
          </button>
        </div>
      </nav>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
    </>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import SideBar from "./SideBar";
import { FaLockOpen } from "react-icons/fa";

const Header = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <HamburgerMenu toggleSidebar={toggleSidebar} />
          <div className="flex items-center gap-2">
            <Logo />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Admin
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Control Center
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500 text-white text-sm font-semibold shadow hover:bg-rose-600 transition"
            onClick={onLogout}
          >
            <FaLockOpen />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
      {isSidebarOpen && <SideBar ref={sidebarRef} toggleSidebar={toggleSidebar} />}
    </>
  );
};

export default Header;

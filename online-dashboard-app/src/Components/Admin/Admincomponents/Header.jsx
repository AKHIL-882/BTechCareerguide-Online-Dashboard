import React, { useState, useEffect, useRef } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Sidebar from "./Sidebar";
import { FaBriefcase, FaTasks, FaRegComments } from "react-icons/fa";

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
      <nav className="bg-white shadow-md p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HamburgerMenu toggleSidebar={toggleSidebar} />
          <Logo />
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <NavLink to={"/admin"} icon={<FaBriefcase />} label="Jobs" />
          <NavLink to={"/admin/projects"} icon={<FaTasks />} label="Projects" />
          <NavLink to={"/admin/companyqa"} icon={<FaRegComments />} label="Company Q/A" />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
            Logout
          </button>
        </div>
      </nav>

      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
    </>
  );
};

export default Header;

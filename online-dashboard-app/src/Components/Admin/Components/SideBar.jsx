import React, { useEffect, useRef } from "react";
import {
  FaBriefcase,
  FaTasks,
  FaRegComments,
  FaTachometerAlt,
  FaSubscript,
} from "react-icons/fa";
import Logo from "./Logo"; // Assuming you have a separate Logo component
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const Sidebar = ({ toggleSidebar }) => {
  const sidebarRef = useRef(null);

  // Detect click outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close the sidebar if clicked outside
      }
    };

    // Adding event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleaning up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className="lg:hidden fixed inset-y-0 left-0 w-1/2 bg-blue-50 shadow-lg z-50 flex flex-col"
    >
      {/* Top Section with Logo and Close Button */}
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links directly below the Logo and Close Button */}
      <div className="flex flex-col p-4 space-y-4">
        <Link
          to="/admin"
          className="flex items-center hover:bg-blue-200 p-2 rounded cursor-pointer"
        >
          <FaTachometerAlt />
          <span className="pl-2">DashBoard</span>
        </Link>
        <Link
          to="/admin/jobs"
          className="flex items-center hover:bg-blue-200 p-2 rounded cursor-pointer"
        >
          <FaBriefcase />
          <span className="pl-2">Jobs</span>
        </Link>
        <Link
          to="/admin/projects"
          className="flex items-center hover:bg-blue-200 p-2 rounded cursor-pointer"
        >
          <FaTasks />
          <span className="pl-2">Projects</span>
        </Link>
        <Link
          to="/admin/companyqa"
          className="flex items-center hover:bg-blue-200 p-2 rounded cursor-pointer"
        >
          <FaRegComments />
          <span className="pl-2">Company Q/A</span>
        </Link>
        <Link
          to="/admin/materials"
          className="flex items-center hover:bg-blue-200 p-2 rounded cursor-pointer"
        >
          <FaRegComments />
          <span className="pl-2">Materials</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

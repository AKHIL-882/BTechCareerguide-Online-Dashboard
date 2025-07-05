import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  handleLogout,
  isCollapsed,
  setIsCollapsed,
}) => {
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`h-full pt-[58px] fixed top-0 left-0 bg-gradient-to-b from-violet-500 to-violet-400 transform transition-transform duration-300 ease-in-out z-20
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "lg:w-[60px]" : "lg:w-56"} 
        w-1/2 md:w-56 lg:translate-x-0 lg:z-10 border border-r-gray-200 transition-[width,transform] duration-300 ease-in-out`}
    >
      {/* Mobile close button */}
      <button
        className="lg:hidden absolute top-4 right-4 text-3xl text-gray-600"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>

      <nav>
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-2"
            } w-full px-4 py-3 sm:m-1 ${
              isActive
                ? "bg-slate-50 text-gray-600 rounded-l-none rounded-lg sm:rounded-l-lg sm:rounded-none"
                : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
          end
        >
          <i className="fa fa-tachometer pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/user/resume-ai"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-2"
            } w-full px-4 py-3 m-1 ${
              isActive ? "bg-slate-50 text-gray-600 rounded-l-lg" : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-heartbeat pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Scan Resume</span>}
        </NavLink>

        <NavLink
          to="/user/jobs"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-1"
            } w-full px-4 py-3 m-1 ${
              isActive ? "bg-slate-50 text-gray-600 rounded-l-lg" : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-graduation-cap pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Jobs</span>}
        </NavLink>

        <NavLink
          to="/user/projects"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-2"
            } w-full px-4 py-3 m-1 ${
              isActive ? "bg-slate-50 text-gray-600 rounded-l-lg" : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-trophy pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Projects</span>}
        </NavLink>

        <NavLink
          to="/user/calender"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-2"
            } w-full px-4 py-3 m-1 ${
              isActive ? "bg-slate-50 text-gray-600 rounded-l-lg" : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-heartbeat pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Test Assistance</span>}
        </NavLink>

        {/* <NavLink
          to="/user/company-qa"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-2"
            } w-full px-4 py-3 m-1 ${
              isActive ? "bg-slate-50 text-gray-600 rounded-l-lg" : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-question-circle pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Company Q/A</span>}
        </NavLink> */}

        {/* <NavLink
          to="/user/testimonials"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : "space-x-2"
            } w-full px-4 py-3 m-1 ${
              isActive ? "bg-slate-50 text-gray-600 rounded-l-lg" : "text-white"
            } font-display font-semibold cursor-pointer hover:bg-slate-50 hover:text-gray-600 hover:rounded-l-lg transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-comments-o pl-2" aria-hidden="true"></i>
          {!isCollapsed && <span>Feedback</span>}
        </NavLink> */}
      </nav>

      {/* Expand/Collapse Button for Desktop Only */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute bottom-4 right-[-12px] transform -translate-y-1/2 w-6 h-6 rounded-full bg-violet-600 border border-white text-white items-center justify-center shadow hover:bg-violet-700 transition z-50"
        title={isCollapsed ? "Expand" : "Collapse"}
      >
        {isCollapsed ? (
          <FaChevronRight size={12} />
        ) : (
          <FaChevronLeft size={12} />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;

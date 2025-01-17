import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside
    className={`h-full pt-[58px] fixed top-0 left-0 w-1/2 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-10 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:fixed lg:h-screen md:w-56 lg:translate-x-0 lg:z-10`}
  >
    {/* Close button for mobile */}
    <button
      className="lg:hidden absolute top-4 right-4 text-3xl text-gray-600"
      onClick={toggleSidebar}
      aria-label="Close Sidebar"
    >
      <i className="fa fa-times" aria-hidden="true"></i>
    </button>

    <nav className="space-y-2">
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-2 ${
              isActive ? "bg-blue-200 text-blue-900" : "text-gray-700"
            } font-semibold cursor-pointer hover:bg-blue-100 hover:text-blue-500 transition duration-300 ease-in-out`
          }
          end
        >
          <i className="fa fa-tachometer pl-2" aria-hidden="true"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/user/jobs"
          className={({ isActive }) =>
            `flex items-center space-x-1 w-full px-4 py-2 ${
              isActive ? "bg-blue-200 text-blue-900" : "text-gray-700"
            } font-semibold cursor-pointer hover:bg-blue-100 hover:text-blue-500 transition duration-300 ease-in-out`
          }
        >
          <i className="fa fa-graduation-cap pl-2" aria-hidden="true"></i>
          <span>Jobs</span>
        </NavLink>

        <NavLink
          to="/user/projects"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-2 ${
              isActive ? "bg-blue-200 text-blue-900" : "text-gray-700"
            } font-semibold cursor-pointer hover:bg-blue-100 hover:text-blue-500 transition duration-300 ease-in-out`
          }
        >
          <i className="fa fa-trophy pl-2" aria-hidden="true"></i>
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/user/company-qa"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-2 ${
              isActive ? "bg-blue-200 text-blue-900" : "text-gray-700"
            } font-semibold cursor-pointer hover:bg-blue-100 hover:text-blue-500 transition duration-300 ease-in-out`
          }
        >
          <i className="fa fa-question-circle pl-2" aria-hidden="true"></i>
          <span>Company Q/A</span>
        </NavLink>
    </nav>
  </aside>
);

export default Sidebar;

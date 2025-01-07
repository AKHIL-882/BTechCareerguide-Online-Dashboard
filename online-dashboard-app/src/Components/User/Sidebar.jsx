import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside
    className={`h-full pt-16 fixed top-0 left-0 w-1/2 bg-white shadow-md p-5 transform transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:fixed lg:h-screen lg:w-1/6 lg:translate-x-0 lg:z-10`}
  >
    {/* Close button for mobile */}
    <button
      className="lg:hidden absolute top-4 right-4 text-3xl text-gray-600"
      onClick={toggleSidebar}
      aria-label="Close Sidebar"
    >
      <i className="fa fa-times" aria-hidden="true"></i>
    </button>

    <nav>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2">
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${
                isActive ? "text-blue-500" : "text-gray-700"
              } font-semibold cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out`
            }
            end
          >
            <i className="fa fa-tachometer" aria-hidden="true"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="flex items-center space-x-2">
          <NavLink
            to="/user/jobs"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive ? "text-blue-500" : "text-gray-700"
              } font-semibold cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out`
            }
          >
            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
            <span>Jobs</span>
          </NavLink>
        </li>
        <li className="flex items-center space-x-2">
          <NavLink
            to="/user/projects"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${
                isActive ? "text-blue-500" : "text-gray-700"
              } font-semibold cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out`
            }
          >
            <i className="fa fa-trophy" aria-hidden="true"></i>
            <span>Projects</span>
          </NavLink>
        </li>
        <li className="flex items-center space-x-2">
          <NavLink
            to="/user/company-qa"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${
                isActive ? "text-blue-500" : "text-gray-700"
              } font-semibold cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out`
            }
          >
            <i className="fa fa-question-circle" aria-hidden="true"></i>
            <span>Company Q/A</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

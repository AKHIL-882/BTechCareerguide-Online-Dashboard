import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { FaBriefcase, FaTasks, FaRegComments, FaTachometerAlt } from "react-icons/fa";

const SidebarFixed = () => {
  return (
    <div className="fixed hidden lg:block w-2/12 h-full bg-blue-50 top-14">
      <NavLink 
        to="/admin"
        end
        className={({ isActive }) =>
          isActive ? "flex items-center p-3 text-blue-800 bg-blue-200" : "flex items-center p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-800"
        }
      >
        <FaTachometerAlt className="mr-2" /> DashBoard
      </NavLink>

      <NavLink 
        to="/admin/jobs" 
        className={({ isActive }) =>
          isActive ? "flex items-center p-3 text-blue-800 bg-blue-200" : "flex items-center p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-800"
        }
      >
        <FaBriefcase className="mr-2" /> Jobs
      </NavLink>

      <NavLink 
        to="/admin/projects" 
        className={({ isActive }) =>
          isActive ? "flex items-center p-3 text-blue-800 bg-blue-200 " : "flex items-center p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-800"
        }
      >
        <FaTasks className="mr-2" /> Projects
      </NavLink>

      <NavLink 
        to="/admin/companyqa" 
        className={({ isActive }) =>
          isActive ? "flex items-center p-3 text-blue-800 bg-blue-200" : "flex items-center p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-800"
        }
      >
        <FaRegComments className="mr-2" /> Company Q/A
      </NavLink>
    </div>
  );
};

export default SidebarFixed;

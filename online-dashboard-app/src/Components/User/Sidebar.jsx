import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  // Function to handle link click
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`h-full pt-[58px] fixed top-0 left-0 w-1/2 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:fixed lg:h-screen md:w-56 lg:translate-x-0 lg:z-10 border border-r-gray-200`}
    >
      {/* Close button for mobile */}
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
            `flex items-center space-x-2 w-full px-4 py-3 ${
              isActive ? "bg-violet-200 text-blue-950" : "text-gray-700"
            } font-display font-semibold cursor-pointer hover:bg-violet-200 hover:text-blue-950 transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
          end
        >
          <i className="fa fa-tachometer pl-2" aria-hidden="true"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/user/jobs"
          className={({ isActive }) =>
            `flex items-center space-x-1 w-full px-4 py-3 ${
              isActive ? "bg-violet-200 text-blue-950" : "text-gray-700"
            } font-display font-semibold cursor-pointer hover:bg-violet-200 hover:text-blue-950 transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-graduation-cap pl-2" aria-hidden="true"></i>
          <span>Jobs</span>
        </NavLink>

        <NavLink
          to="/user/projects"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-3 ${
              isActive ? "bg-violet-200 text-blue-950" : "text-gray-700"
            } font-display font-semibold cursor-pointer hover:bg-violet-200 hover:text-blue-950 transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-trophy pl-2" aria-hidden="true"></i>
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/user/calender"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-3 ${
              isActive ? "bg-violet-200 text-blue-950" : "text-gray-700"
            } font-display font-semibold cursor-pointer hover:bg-violet-200 hover:text-blue-950 transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-heartbeat pl-2" aria-hidden="true"></i>
          <span>Test Assistance</span>
        </NavLink>

        <NavLink
          to="/user/company-qa"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-3 ${
              isActive ? "bg-violet-200 text-blue-950" : "text-gray-700"
            } font-display font-semibold cursor-pointer hover:bg-violet-200 hover:text-blue-950 transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
          <i className="fa fa-question-circle pl-2" aria-hidden="true"></i>
          <span>Company Q/A</span>
        </NavLink>
        <NavLink
          to="/user/testimonials"
          className={({ isActive }) =>
            `flex items-center space-x-2 w-full px-4 py-3 ${
              isActive ? "bg-violet-200 text-blue-950" : "text-gray-700"
            } font-display font-semibold cursor-pointer hover:bg-violet-200 hover:text-blue-950 transition duration-300 ease-in-out`
          }
          onClick={handleLinkClick}
        >
         <i class="fa fa-comments-o pl-2" aria-hidden="true"></i>
          <span>Feedback</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

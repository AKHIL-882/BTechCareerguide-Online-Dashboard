import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "../../assets/logo.png";
import NotificationBell from "./NotificationBell";
import UserProfile from "./UserProfile";
import { LayoutDashboard, Briefcase, GitCompareArrows, SquareDashedBottomCode } from "lucide-react";


const Sidebar = ({ isCollapsed, setIsCollapsed,handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && isOpen) toggleSidebar();
  };

  const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/jobs", icon: Briefcase, label: "Jobs" },
  { to: "/projects", icon: GitCompareArrows, label: "Projects" },
  { to: "/calendar", icon: SquareDashedBottomCode, label: "Test Assistance" },
];

  return (
    <>
      {/* Mobile/Tablet Topbar with Hamburger + Logo */}
      {/* Mobile/Tablet Topbar with Hamburger + Logo + Notification + Profile */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-14 bg-white shadow flex items-center justify-between px-2 sm:px-4 z-40">
        {/* Left: Hamburger + Logo + Title */}
        <div className="flex items-center">
          <button
            className="text-xl md:text-2xl text-violet-500 mr-2"
            onClick={toggleSidebar}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <img src={logo} alt="Logo" className="h-6 w-6 md:h-7 md:w-7" />
          <span className="font-bold text-violet-600 text-xl ml-1">PROJPORT</span>
        </div>

        {/* Right: Notification + Profile */}
        <div className="flex items-center space-x-3">
          <NotificationBell />
          <UserProfile handleLogout={handleLogout} />
        </div>
      </div>

      {/* Sidebar / Slider */}
      <aside
        className={`h-full fixed top-0 left-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "lg:w-[60px]" : "lg:w-56"} 
          w-1/2 md:w-56 lg:translate-x-0 lg:z-40 border border-r-gray-200`}
      >
        {/* Logo + Company Name (Inside Sidebar — always visible in slider + desktop) */}
        <div className="flex items-center justify-between px-3 h-14">
          {/* Logo + Title */}
          <div className="flex items-center font-bold font-sans text-xl text-violet-600">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className={`${isCollapsed ? "hidden" : "inline"} ml-2`}>
              PROJPORT
            </span>
          </div>

          {/* Mobile close button */}
          <button
            className="lg:hidden text-2xl text-gray-600"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col h-full relative mt-2 lg:mt-0">
          {navItems.map((item) => (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.to)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center w-full h-12 
     ${isCollapsed ? "justify-center" : "px-4"} 
     ${isActive
                    ? "bg-violet-50 text-gray-700 rounded-lg"
                    : "text-gray-600"
                  } font-display font-semibold cursor-pointer 
       hover:bg-slate-50 hover:text-gray-600 
       transition duration-300 ease-in-out mb-1`
                }
                onClick={handleLinkClick}
              >
                {/* Icon with fixed width for alignment */}
                <item.icon className="w-5 h-5" />

                {/* Label always aligns properly now */}
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>
              {/* Tooltip for collapsed sidebar */}
              {isCollapsed && hoveredItem === item.to && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded shadow-lg whitespace-nowrap z-50">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Expand/Collapse Button (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute bottom-4 right-[-12px] transform -translate-y-1/2 w-6 h-6 rounded-full bg-violet-600 border border-white text-white items-center justify-center shadow hover:bg-violet-700 transition z-50"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;

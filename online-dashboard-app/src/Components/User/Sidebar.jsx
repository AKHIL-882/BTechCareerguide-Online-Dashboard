import React from "react";
import { Link } from "react-router-dom";
const Sidebar = ({ handleLogout }) => (
    <aside className="w-1/6 bg-indigo-50 p-5">
        <nav>
            <ul className="space-y-4">
                <li className="flex items-center space-x-2 text-indigo-600 font-semibold cursor-pointer hover:text-indigo-800 transition">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <i className="fa fa-tachometer" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="flex items-center space-x-2 cursor-pointer hover:text-indigo-800 transition">
                    <Link to="/jobs" className="flex items-center space-x-2">
                        <i className="fa fa-graduation-cap"></i>
                        <span>Jobs</span>
                    </Link>
                </li>
                <li className="flex items-center space-x-2 cursor-pointer hover:text-indigo-800 transition">
                    <Link to="/projects" className="flex items-center space-x-2">
                        <i className="fa fa-trophy"></i>
                        <span>Projects</span>
                    </Link>
                </li>
                <li className="flex items-center space-x-2 cursor-pointer hover:text-indigo-800 transition">
                    <Link to="/company-qa" className="flex items-center space-x-2">
                        <i className="fa fa-question-circle"></i>
                        <span>Company Q/A</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </aside>
);

export default Sidebar;

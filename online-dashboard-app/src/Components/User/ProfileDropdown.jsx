import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdFeedback, MdDarkMode } from "react-icons/md";
import { useTheme } from "../ThemeContext";

const ProfileDropdown = ({
  onViewProfile,
  handleLogout,
  onClose,
  onSendFeedback,
}) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-3 z-30 text-gray-800 dark:text-gray-100">
      {/* Profile Info */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-800 dark:text-gray-100">John Doe</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">johndoe@email.com</p>
      </div>

      {/* Menu Options */}
      <ul className="py-2">
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg"
          onClick={onViewProfile}
        >
          <FaUserCircle /> View Profile
        </li>

        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg"
          onClick={() => {
            onSendFeedback(); // 🔹 open feedback popup
            onClose();
          }}
        >
          <MdFeedback /> Send Feedback
        </li>

        {/* Dark Mode Toggle */}
        <li
          className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg"
          onClick={() => {
            toggleTheme();
          }}
        >
          <span className="flex items-center gap-2">
            <MdDarkMode /> Dark Mode
          </span>
          <button
            aria-label="Toggle dark mode"
            className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
              isDark ? "bg-violet-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow transition-all duration-200 ${
                isDark ? "right-1" : "left-1"
              }`}
            />
          </button>
        </li>

        <li
          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40 cursor-pointer rounded-lg"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Sign Out
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;

import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdFeedback, MdDarkMode } from "react-icons/md";

const ProfileDropdown = ({ onViewProfile, handleLogout, onClose, onSendFeedback }) => {
  return (
    <div className="absolute right-0 top-12 w-64 bg-white shadow-lg rounded-xl border border-gray-200 p-3 z-30">
      {/* Profile Info */}
      <div className="p-3 border-b border-gray-200">
        <p className="font-semibold text-gray-800">John Doe</p>
        <p className="text-sm text-gray-500">johndoe@email.com</p>
      </div>

      {/* Menu Options */}
      <ul className="py-2">
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
          onClick={onViewProfile}
        >
          <FaUserCircle /> View Profile
        </li>

        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
          onClick={() => {
            onSendFeedback(); // 🔹 open feedback popup
            onClose();
          }}
        >
          <MdFeedback /> Send Feedback
        </li>

        {/* Dark Mode Toggle (Placeholder) */}
        <li
          className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
          onClick={() => {
            alert("Dark Mode toggle coming soon!");
            onClose();
          }}
        >
          <span className="flex items-center gap-2">
            <MdDarkMode /> Dark Mode
          </span>
          <div className="w-10 h-5 bg-gray-300 rounded-full relative">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow" />
          </div>
        </li>

        <li
          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer rounded-lg"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Sign Out
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;

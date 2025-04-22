import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    { text: "Welcome to the dashboard!", seen: false },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Count unseen notifications
  const unseenCount = notifications.filter((n) => !n.seen).length;

//   // Simulate receiving a new notification every 15s (can be removed in real use)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newNotification = {
//         text: `New update at ${new Date().toLocaleTimeString()}`,
//         seen: false,
//       };
//       setNotifications((prev) => [newNotification, ...prev]);
//     }, 15000);

//     return () => clearInterval(interval);
//   }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);

    // Mark all as seen when dropdown is opened
    if (!showDropdown) {
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          seen: true,
        }))
      );
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={toggleDropdown}
        className="relative text-violet-500 text-xl focus:outline-none"
      >
        <FaBell />
        {unseenCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 rounded-full">
            {unseenCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50">
          <div className="max-h-60 overflow-y-auto p-2">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-700 px-4 py-2 hover:bg-gray-100"
                >
                  {note.text}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 px-4 py-2">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

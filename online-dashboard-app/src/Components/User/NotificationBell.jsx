import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import RelativeTime from "./RelativeTIme";
import { useFetchNotifications } from "../../Api";
import { useMarkNotificationAsRead } from "../../Api";

const NotificationBell = () => {
  const {
    notifications,
    setNotifications,
    unreadCount,
    loading,
    error,
    setUnreadCount,
  } = useFetchNotifications();

  const { markAsRead, loading: notifioading } = useMarkNotificationAsRead();

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("unseen");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleNotificationClick = async (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, is_read: 1 } : n,
    );
    setNotifications(updated);
    setSelectedNotification(updated.find((n) => n.id === id));
    const clicked = notifications.find((n) => n.id === id);

    if (clicked && clicked.is_read === 0) {
      await markAsRead(id);
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }
  };

  const closePopup = () => setSelectedNotification(null);

  const filteredNotifications = notifications.filter(
    (n) =>
      (activeTab === "unseen" && n.is_read === 0) ||
      (activeTab === "seen" && n.is_read === 1),
  );

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative text-violet-500 text-xl focus:outline-none"
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg overflow-hidden z-50">
          <div className="flex border-b text-sm">
            <button
              className={`w-1/2 px-3 py-2 ${
                activeTab === "unseen"
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("unseen")}
            >
              Unseen
            </button>
            <button
              className={`w-1/2 px-3 py-2 ${
                activeTab === "seen"
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("seen")}
            >
              Seen
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto p-2">
            {loading ? (
              <div className="text-sm text-gray-500 px-4 py-2">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500 px-4 py-2">{error}</div>
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center gap-2 text-sm text-gray-700 px-4 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNotificationClick(n.id)}
                >
                  <img
                    src={n.notification_image}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{n.company_name}</span>
                    <span className="text-xs text-gray-500">
                      <RelativeTime createdAt={n.created_at} />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 px-4 py-2">
                No {activeTab} notifications
              </div>
            )}
          </div>
        </div>
      )}

      {selectedNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={closePopup}
            >
              <IoMdClose size={20} />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <img
                src={selectedNotification.notification_image}
                alt="avatar"
                className="w-6 h-6 rounded-full object-cover"
              />
              <h2 className="text-lg text-violet-600">
                {selectedNotification.company_name}
              </h2>
            </div>
            <p className="text-gray-800 text-sm">
              {selectedNotification.update}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

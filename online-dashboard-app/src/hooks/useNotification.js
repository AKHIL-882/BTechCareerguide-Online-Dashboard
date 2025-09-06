import { useEffect, useState } from "react";
import { fetchNotificationsApi, markAsReadApi } from "../api/notificationApi";

export const useFetchNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;
    const fetchNotifications = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      try {
        const response = await fetchNotificationsApi(accessToken);
        const result = response.data.data;
        setNotifications(result.notifications || []);
        setUnreadCount(result.unread_count || 0);
        setError(null);
      } catch (err) {
        setError("Failed to fetch notifications. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchNotifications();

    // Set interval to fetch every 1 minute
    intervalId = setInterval(fetchNotifications, 2 * 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    setNotifications,
    setUnreadCount,
  };
};

export const useMarkNotificationAsRead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const markAsRead = async (notificationId) => {
    setLoading(true);
    setError(null);

    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    try {
      await markAsReadApi(notificationId, accessToken);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Failed to mark notification as read.");
    } finally {
      setLoading(false);
    }
  };

  return { markAsRead, loading, error };
};

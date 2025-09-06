import { get, post } from "./apiConfig";

export const fetchNotificationsApi = (accessToken) =>
  get("/notifications", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const markAsReadApi = (notificationId, accessToken) =>
  post(
    "/mark-as-read",
    {
      notification_id: notificationId,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

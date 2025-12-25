import { get, post } from "./apiConfig";

export const fetchProfileApi = (accessToken) =>
  get("/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const updateProfileApi = (payload, accessToken) =>
  post("/profile", payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

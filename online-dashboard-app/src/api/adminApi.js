import { get } from "./apiConfig";

export const createUserAndAdminRolesApi = (accessToken) =>
  get("/create-user-admin-role", {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });

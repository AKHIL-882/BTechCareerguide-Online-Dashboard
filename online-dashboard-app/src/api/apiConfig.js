import axios from "axios";
import { logoutAndRedirect, getStoredAccessToken } from "@/utils/auth";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const attachAuthToken = (config) => {
  const hasAuthHeader =
    config?.headers &&
    (config.headers.Authorization || config.headers.authorization);

  if (!hasAuthHeader) {
    const token = getStoredAccessToken();
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
};

const handleAuthError = (error) => {
  const status = error?.response?.status;
  if ([401, 403, 419].includes(status)) {
    logoutAndRedirect();
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use(attachAuthToken, (error) =>
  Promise.reject(error),
);
apiClient.interceptors.response.use(
  (response) => response,
  handleAuthError,
);

axios.interceptors.request.use(attachAuthToken, (error) =>
  Promise.reject(error),
);
axios.interceptors.response.use((response) => response, handleAuthError);

// Helper functions
export const get = (url, config = {}) => apiClient.get(url, config);
export const post = (url, data, config = {}) =>
  apiClient.post(url, data, config);
export const put = (url, data, config = {}) => apiClient.put(url, data, config);
export const del = (url, config = {}) => apiClient.delete(url, config);

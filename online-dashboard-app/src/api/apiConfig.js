import axios from "axios";

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

// Helper functions
export const get = (url, config = {}) => apiClient.get(url, config);
export const post = (url, data, config = {}) =>
  apiClient.post(url, data, config);
export const put = (url, data, config = {}) => apiClient.put(url, data, config);
export const del = (url, config = {}) => apiClient.delete(url, config);

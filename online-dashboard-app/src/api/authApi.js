// src/api/authApi.js

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const loginApi = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
};

export const signupApi = async (formData) => {
  return axios.post(`${API_BASE_URL}/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const logoutApi = async (accessToken) => {
  return axios.post(`${API_BASE_URL}/logout`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

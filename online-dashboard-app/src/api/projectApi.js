// src/api/projectApi.js

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchProjectsApi = async (accessToken) => {
  return axios.get(`${API_BASE_URL}/admin_projects`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const createProjectApi = async (accessToken, projectData) => {
  return axios.post(`${API_BASE_URL}/admin_projects/create`, projectData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const  paymentInitiator = async (accessToken) => {
  return axios.post(`${API_BASE_URL}/create-order`, { amount:500 }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

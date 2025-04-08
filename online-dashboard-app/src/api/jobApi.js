// src/api/jobApi.js

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchJobsApi = async (accessToken) => {
  return axios.get(`${API_BASE_URL}/jobs`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const createJobApi = async (accessToken, jobData) => {
  return axios.post(`${API_BASE_URL}/jobs/create`, jobData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const updateJobApi = async (accessToken, jobId, jobData) => {
  return axios.put(`${API_BASE_URL}/jobs/${jobId}/update`, jobData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteJobApi = async (accessToken, jobId) => {
  return axios.delete(`${API_BASE_URL}/jobs/${jobId}/delete`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

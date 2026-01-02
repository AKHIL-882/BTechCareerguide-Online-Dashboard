import { get, post, put, del, API_BASE_URL } from "./apiConfig";

// Fetch projects
export const fetchProjectsApi = (accessToken) =>
  get("/admin_projects", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Fetch admin projects (dash variant with hyphenated path)
export const fetchAdminProjectsList = (accessToken) =>
  get("/admin-projects", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Create project
export const createProjectApi = (formData, accessToken) =>
  post(
    "/admin_projects/create",
    {
      company_name: formData.project_name,
      youtube_video_link: formData.youtube_link,
      payment_link: formData.payment_link,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

// Update project
export const saveProjectApi = (project, accessToken) =>
  put(
    `/admin_projects/${project.id}/update`,
    {
      company_name: project.company_name,
      payment_link: project.payment_link,
      youtube_video_link: project.youtube_link,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

// Delete project
export const deleteProjectApi = (id, accessToken) =>
  del(`/admin_projects/${id}/delete`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Search projects
export const searchProjectsApi = (searchValue, accessToken) =>
  post(
    "/user-projects/search",
    {
      search_item: searchValue,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

// Update project status
export const updateProjectStatusApi = (
  projectId,
  newStatus,
  accessToken,
  paymentAmount,
) =>
  post(
    "/admin_projects/update-project-status",
    {
      project_id: projectId,
      project_status: newStatus,
      payment_amount: paymentAmount,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

import axios from "axios";

export const paymentInitiator = async (accessToken, { amount, projectId, projectStatus }) => {
  const normalizedAmount = Number(amount);
  const normalizedProjectId = Number(projectId);

  return axios.post(
    `${API_BASE_URL}/create-order`,
    {
      amount: normalizedAmount,
      project_id: normalizedProjectId,
      ...(projectStatus !== undefined ? { project_status: projectStatus } : {}),
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
};

export const verifyPaymentApi = async (accessToken, payload) => {
  return axios.post(`${API_BASE_URL}/verify-payment`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

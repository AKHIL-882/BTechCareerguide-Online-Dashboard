import { get, post, put, del } from "./apiConfig";

// Get job listings
export const fetchJobsApi = (accessToken) =>
  get("/jobs", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Update a job
export const saveJobApi = (job, accessToken) =>
  put(`/jobs/${job.id}/update`, {
    company_name: job.company_name,
    role: job.role,
    degree: job.degree.join(","),  // backend expects string
    batch: job.batch.join(","),
    apply_link: job.apply_link,
  }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Create a job
export const createJobApi = (formData, accessToken) =>
  post("/jobs/create", {
    company_name: formData.companyName,
    role: formData.role,
    degree: formData.degree.sort().join(","),
    batch: formData.batches.sort().join(","),
    apply_link: formData.url,
  }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Delete a job
export const deleteJobApi = (id, accessToken) =>
  del(`/jobs/${id}/delete`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Report a job
export const reportJobApi = (jobId, reason, message, accessToken) =>
  post(`/jobs/${jobId}/report`, { reason, message }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

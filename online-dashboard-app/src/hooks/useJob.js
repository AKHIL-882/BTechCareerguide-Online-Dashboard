// src/hooks/useJob.js

import { useEffect, useState } from "react";
import {
  fetchJobsApi,
  createJobApi,
  updateJobApi,
  deleteJobApi,
} from "../api/jobApi";
import { toast } from "react-toastify";

export const useFetchJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;

    fetchJobsApi(accessToken)
      .then((res) => setJobListings(res.data.data.reverse()))
      .catch((err) => {
        setError("Failed to fetch jobs");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { jobListings, setJobListings, loading, error };
};

export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createJob = async (formData, setFormData, addJob) => {
    const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;
    try {
      setLoading(true);
      const { data } = await createJobApi(accessToken, {
        company_name: formData.companyName,
        role: formData.role,
        qualification: formData.qualifications.sort().join(","),
        batch: formData.batches.sort().join(","),
        apply_link: formData.url,
      });

      addJob({ id: data.job_id, ...formData });
      toast.success("Job Added Successfully");
    } catch (err) {
      setError("Failed to upload data");
    } finally {
      setLoading(false);
    }
  };

  return { createJob, loading, error };
};

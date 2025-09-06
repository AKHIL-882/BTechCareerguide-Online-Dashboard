import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  fetchJobsApi,
  saveJobApi,
  createJobApi,
  deleteJobApi,
  reportJobApi,
} from "../api/jobApi";

// GET JOBS
export const useFetchJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data?.access_token;

      try {
        const response = await fetchJobsApi(accessToken);
        setJobListings(response.data.data.reverse());
      } catch (err) {
        localStorage.clear();
        setError("Session Expired! Relogin Again!!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return { jobListings, setJobListings, loading, error };
};

// SAVE JOB
export const useSaveJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveJob = async (
    updatedJob,
    setJobListings,
    jobListings,
    setSelectedJob,
  ) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await saveJobApi(updatedJob, accessToken);

      const updatedJobData = {
        id: updatedJob.id,
        company_name: updatedJob.company_name,
        role: updatedJob.role,
        degree: updatedJob.degree.sort().join(","),
        batch: updatedJob.batch.sort().join(","),
        apply_link: updatedJob.apply_link,
      };

      setJobListings(
        jobListings.map((job) =>
          job.id === updatedJob.id ? updatedJobData : job,
        ),
      );

      toast.success("Job Edited Successfully");
      setSelectedJob(null);
    } catch (err) {
      setError("Failed to save the job. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveJob, loading, error };
};

// CREATE JOB
export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createJob = async (formData, setFormData, addJob) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await createJobApi(formData, accessToken);

      const newJob = {
        id: response.data.job_id,
        company_name: formData.companyName,
        role: formData.role,
        degree: formData.degree.sort().join(","),
        batch: formData.batches.sort().join(","),
        apply_link: formData.url,
      };

      addJob(newJob);
      setFormData({
        companyName: "",
        role: "",
        degree: [],
        batches: [],
        url: "",
      });
      toast.success("Job Added successfully");
    } catch (err) {
      setError("Failed to upload data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { createJob, loading, error };
};

// DELETE JOB
export const useDeleteJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteJob = async (
    id,
    jobListings,
    setJobListings,
    setShowDeletePopup,
    setJobToDelete,
  ) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await deleteJobApi(id, accessToken);

      setJobListings(jobListings.filter((job) => job.id !== id));
      setShowDeletePopup(false);
      setJobToDelete(null);
      toast.success("Job deleted successfully");
    } catch (err) {
      setError("Failed to delete the job. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteJob, loading, error };
};

// REPORT JOB
export const useReportJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reportJob = async (jobId, reason, message, onClose) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      toast.error("Access token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await reportJobApi(jobId, reason, message, accessToken);

      if (response.status === 200) {
        toast.success("Reported successfully");
        setTimeout(onClose, 1000);
      } else {
        toast.error("Failed to submit report");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return { reportJob, loading, error };
};

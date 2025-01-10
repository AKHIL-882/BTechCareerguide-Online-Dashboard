import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000/api";

//userlogin
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/user"); // Redirect to dashboard
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};


export const signup = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/signup`,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (accessToken) => {
  try {
    console.log(accessToken);
    const response = await axios.post(`${API_BASE_URL}/logout`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Logout API Error:", error);
    throw error;
  }
};

//joblisting
export const useFetchJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setJobListings(response.data.data.reverse());
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobListings, setJobListings, loading, error };
};

//editjob
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
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);

      // API call to update the job
      const response = await axios.put(
        `${API_BASE_URL}/jobs/${updatedJob.id}/update`,
        {
          company_name: updatedJob.company_name,
          role: updatedJob.role,
          qualification: updatedJob.qualification.join(","),
          batch: updatedJob.batch.join(","),
          apply_link: updatedJob.apply_link,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // Update the job in the UI
      const updatedJobData = {
        id: updatedJob.id,
        company_name: updatedJob.company_name,
        role: updatedJob.role,
        qualification: updatedJob.qualification.sort().join(","),
        batch: updatedJob.batch.sort().join(","),
        apply_link: updatedJob.apply_link,
      };

      setJobListings(
        jobListings.map((job) =>
          job.id === updatedJob.id ? updatedJobData : job,
        ),
      );
      toast.success("Job Edited Successfully");
      setSelectedJob(null); // Close the popup after saving
    } catch (err) {
      setError("Failed to save the job. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveJob, loading, error };
};

//add job
export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createJob = async (formData, setFormData, addJob) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        `${API_BASE_URL}/jobs/create`,
        {
          company_name: formData.companyName,
          role: formData.role,
          qualification: formData.qualifications.sort().join(","),
          batch: formData.batches.sort().join(","),
          apply_link: formData.url,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const newJob = {
        id: response.data.job_id,
        company_name: formData.companyName,
        role: formData.role,
        qualification: formData.qualifications.sort().join(","),
        batch: formData.batches.sort().join(","),
        apply_link: formData.url,
      };
      addJob(newJob);
      setFormData({
        companyName: "",
        role: "",
        qualifications: [],
        batches: [],
        url: "",
      });
      toast.success("Job Added successfully");
    } catch (err) {
      setError("Failed to upload data");
      console.error("Error uploading data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createJob };
};

//delete job
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
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/jobs/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setJobListings(jobListings.filter((job) => job.id !== id));
      setShowDeletePopup(false);
      setJobToDelete(null);
      toast.success("Job deleted successfully");
    } catch (err) {
      setError("Failed to delete the job. Please try again later.");
      console.error("Error deleting job:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteJob, loading, error };
};


import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const TOKEN_REFRESH_LIMIT = 3;
const REFRESH_THRESHOLD = 30 * 1000;

export const useTokenManager = () => {
  const navigate = useNavigate();
  const scheduleTokenRefresh = (accessTokenExpiry, refreshToken) => {
    const timeUntilRefresh = accessTokenExpiry - Date.now() - REFRESH_THRESHOLD;

    if (timeUntilRefresh > 0) {
      setTimeout(async () => {
        const refreshCount =
          parseInt(localStorage.getItem("refreshCount")) || 0;

        if (refreshCount >= TOKEN_REFRESH_LIMIT) {
          console.warn("Refresh token limit reached. Logging out.");
          localStorage.clear();
          navigate("/login");
          return;
        }

        try {
          const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token, expires_in } = response.data;

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem(
            "accessTokenExpiry",
            Date.now() + expires_in * 1000,
          );

          localStorage.setItem("refreshCount", refreshCount + 1);
          scheduleTokenRefresh(Date.now() + expires_in * 1000, refresh_token);
        } catch (error) {
          console.error("Error refreshing token:", error);
          localStorage.clear();
          navigate("/login");
        }
      }, timeUntilRefresh);
    } else {
      console.warn("Token refresh time has passed or is too short.");
    }
  };

  const initializeTokenManagement = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const expiresIn = data ? parseInt(data.expires_in) : null;
    const refreshToken = data ? data.refresh_token : null;

    if (expiresIn && refreshToken) {
      scheduleTokenRefresh(expiresIn, refreshToken);
    } else {
      console.warn(
        "Access token expiry or refresh token not found. Redirecting to login.",
      );
      navigate("/#login");
    }
  };

  return { initializeTokenManagement };
};

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
        const { roles, access_token, refresh_token } = data;
        // todo:: get all the data outside the scope of storage
        // Save necessary data in localStorage
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("roles", roles);

        // Redirect based on roles
        if (roles === "admin") {
          navigate("/admin");
        } else if (roles === "user") {
          navigate("/user");
        } else {
          alert("Role not recognized.");
        }
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
    localStorage.setItem("isLoggedIn", false);
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

//projects listing
export const useFetchProjects = () => {
  const [projectsListings, setProjectsListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      console.log(accessToken);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/admin_projects
          `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setProjectsListings(response.data.data);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projectsListings, setProjectsListings, loading, error };
};

//add project
export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = async (formData, setFormData, addProject) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin_projects/create`,
        {
          company_name: formData.project_name,
          youtube_video_link: formData.youtube_link,
          payment_link: formData.payment_link,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const newProject = {
        id: formData.id,
        company_name: formData.project_name,
        youtube_video_link: formData.youtube_link,
        payment_link: formData.payment_link,
      };
      addProject(newProject);
      setFormData({
        project_name: "",
        payment_link: "",
        youtube_link: "",
      });
      toast.success("Project Added successfully");
    } catch (err) {
      setError("Failed to upload data");
      console.error("Error uploading data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createProject };
};

//editproject
export const useSaveProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveProject = async (
    updatedProject,
    setProjectsListings,
    projectsListings,
    setSelectedProject,
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
        `${API_BASE_URL}/admin_projects/${updatedProject.id}/update`,
        {
          company_name: updatedProject.company_name,
          payment_link: updatedProject.payment_link,
          youtube_video_link: updatedProject.youtube_link,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // Update the job in the UI
      const updatedProjectData = {
        id: updatedProject.id,
        company_name: updatedProject.company_name,
        payment_link: updatedProject.payment_link,
        youtube_video_link: updatedProject.youtube_link,
      };

      setProjectsListings(
        projectsListings.map((project) =>
          project.id === updatedProject.id ? updatedProjectData : project,
        ),
      );
      toast.success("Project Edited Successfully");
      setSelectedProject(null); // Close the popup after saving
    } catch (err) {
      setError("Failed to save the Project. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveProject, loading, error };
};

//deleteproject
export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProject = async (
    id,
    projectsListings,
    setProjectsListings,
    setShowDeletePopup,
    setProjectToDelete,
  ) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/admin_projects/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProjectsListings(
        projectsListings.filter((project) => project.id !== id),
      );
      setShowDeletePopup(false);
      setProjectToDelete(null);
      toast.success("Project deleted successfully");
    } catch (err) {
      setError("Failed to delete the project. Please try again later.");
      console.error("Error deleting project:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, loading, error };
};

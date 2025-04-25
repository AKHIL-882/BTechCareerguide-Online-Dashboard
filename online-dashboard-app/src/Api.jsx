import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000/api";

//userlogin
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData, setValidationError) => {
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

        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("roles", roles);

        if (roles === "admin") {
          navigate("/admin");
        } else if (roles === "user") {
          navigate("/user");
        } else {
          alert("Role not recognized.");
        }
      } else {
        setValidationError(data.message || "Login failed");
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

//usersignup
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (formData, setValidationError,setIsLogin) => {
    setLoading(true);
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
      if (response.data.message === "Account Created Successfully") {
        toast.success("Account created successfully!");
        setIsLogin(true);
      } else {
        setValidationError(
          response.data.message || "Signup failed. Try again!",
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        const errorMessage =
          errors &&
          Object.keys(errors)
            .map((key) => errors[key].join(", "))
            .join(" ");
        setValidationError(
          errorMessage || "Validation failed. Please check your inputs.",
        );
      } else {
        setValidationError("An error occurred. Please try again.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
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
          degree: updatedJob.degree.join(","),
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
          degree: formData.degree.sort().join(","),
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
export const useFetchProjects = (isDashboard) => {
  const [projectsListings, setProjectsListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      try {
        const response = await axios.get(`${API_BASE_URL}/admin_projects`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const responseData = response.data;
        const projectsData = Array.isArray(responseData.data)
          ? responseData.data
          : [];
        setProjectsListings(
          isDashboard ? projectsData.slice(0, 3) : projectsData,
        );
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isDashboard]);

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

//searchProjects
export const useSearchProjects = () => {
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProject = async (searchValue, setProjects) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    // setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user-projects/search`,
        {
          search_item: searchValue,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const responseData = await response;
      const projectsData = Array.isArray(responseData.data)
        ? responseData.data
        : [responseData.data.data];
      setProjects(projectsData);
    } catch (err) {
      setError("Failed to search item");
      console.error("Error while searching data:", err);
    } finally {
      // setLoading(false);
    }
  };

  return { error, searchProject };
};

export const handleStatusChange = async (projectId, newStatus) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const accessToken = data ? data.access_token : null;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin_projects/update-project-status`,
      {
        project_id: projectId,
        project_status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = response.data;

    if (response.status === 200) {
      alert("Status updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update status: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("An error occurred while updating the status.");
  }
};

export const getUserDetails = async (accessToken) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user-details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user details");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const postTestimonial = async (formData, accessToken) => {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit testimonial");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

//jobreport
export const useReportJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reportJob = async (jobId, reason, message, onClose) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      toast.error("Access token is missing. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/jobs/${jobId}/report`,
        { reason, message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Reported successfully");
        setTimeout(onClose, 1000);
      } else {
        toast.error("Failed to submit report");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Report submission error:", err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, reportJob };
};

//forgot password sentreset
export const useSendResetCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendResetCode = async (email, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${API_BASE_URL}/reset-password`,
        { email }
      );
      toast.success("Reset code sent to your email!");
      onSuccess?.();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send reset code";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, sendResetCode };
};

//forgot passwordupdate
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resetPassword = async ({ code, password }, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${API_BASE_URL}/update-password`,
        { code, password }
      );
      toast.success("Password reset successfully!");
      onSuccess?.();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to reset password";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, resetPassword };
};

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  fetchProjectsApi,
  createProjectApi,
  saveProjectApi,
  deleteProjectApi,
  searchProjectsApi,
  updateProjectStatusApi,
} from "../api/projectApi";
import {
  getStatusLabel,
  normalizeProjectStatus,
} from "@/constants/projectStatus";

const getStatusValue = (status) => normalizeProjectStatus(status);

// FETCH PROJECTS
export const useFetchProjects = (isDashboard) => {
  const [projectsListings, setProjectsListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef({});

  useEffect(() => {
    const fetchKey = isDashboard ? "dashboard" : "full";
    if (fetchedRef.current[fetchKey]) {
      return;
    }
    fetchedRef.current[fetchKey] = true;

    let cancelled = false;

    const fetchProjects = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data?.access_token;

      try {
        const response = await fetchProjectsApi(accessToken);
        const responseData = response.data;
        const projectsData = Array.isArray(responseData.data)
          ? responseData.data.map((project) => ({
              ...project,
              project_status: getStatusValue(project.project_status),
            }))
          : [];
        if (!cancelled) {
          setProjectsListings(
            isDashboard ? projectsData.slice(0, 3) : projectsData,
          );
        }
      } catch (err) {
        localStorage.clear();
        if (!cancelled) {
          setError("Session Expired! Relogin Again!!");
        }
        console.error(err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [isDashboard]);

  return { projectsListings, setProjectsListings, loading, error };
};

// CREATE PROJECT
export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = async (formData, setFormData, addProject) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      await createProjectApi(formData, accessToken);

      const newProject = {
        id: formData.id,
        company_name: formData.project_name,
        youtube_video_link: formData.youtube_link,
        payment_link: formData.payment_link,
      };
      addProject(newProject);

      setFormData({ project_name: "", payment_link: "", youtube_link: "" });
      toast.success("Project Added successfully");
    } catch (err) {
      setError("Failed to upload data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading, error };
};

// SAVE PROJECT
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
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await saveProjectApi(updatedProject, accessToken);

      const updatedProjectData = {
        id: updatedProject.id,
        company_name: updatedProject.company_name,
        payment_link: updatedProject.payment_link,
        youtube_video_link: updatedProject.youtube_link,
      };

      setProjectsListings(
        projectsListings.map((p) =>
          p.id === updatedProject.id ? updatedProjectData : p,
        ),
      );
      toast.success("Project Edited Successfully");
      setSelectedProject(null);
    } catch (err) {
      setError("Failed to save the Project. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveProject, loading, error };
};

// DELETE PROJECT
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
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      await deleteProjectApi(id, accessToken);

      setProjectsListings(projectsListings.filter((p) => p.id !== id));
      setShowDeletePopup(false);
      setProjectToDelete(null);
      toast.success("Project deleted successfully");
    } catch (err) {
      setError("Failed to delete the project. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, loading, error };
};

// SEARCH PROJECTS
export const useSearchProjects = () => {
  const [error, setError] = useState(null);

  const searchProject = async (searchValue, setProjects) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      return;
    }

    try {
      const response = await searchProjectsApi(searchValue, accessToken);
      const responseData = response.data;
      const projectsData = Array.isArray(responseData.data)
        ? responseData.data
        : [responseData.data.data];
      setProjects(projectsData);
    } catch (err) {
      setError("Failed to search item");
      console.error(err);
    }
  };

  return { searchProject, error };
};

// UPDATE STATUS (not hook, simple fn)
export const handleStatusChange = async (
  projectId,
  newStatus,
  paymentAmount,
) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const accessToken = data?.access_token;

  try {
    const response = await updateProjectStatusApi(
      projectId,
      Number(newStatus),
      accessToken,
      paymentAmount,
    );
    if (response.status === 200) {
      const updatedProject = response.data.project;
      const normalizedProject = {
        ...updatedProject,
        project_status: getStatusValue(updatedProject?.project_status),
      };
      toast.success(
        `Status updated to ${getStatusLabel(normalizedProject.project_status)}`,
      );
      return normalizedProject;
    } else {
      toast.error(response.data.message || "Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("An error occurred while updating the status.");
  }
};

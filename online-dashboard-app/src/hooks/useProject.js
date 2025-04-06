// src/hooks/useProject.js

import { useEffect, useState } from "react";
import { fetchProjectsApi, createProjectApi } from "../api/projectApi";
import { toast } from "react-toastify";

export const useFetchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;
    fetchProjectsApi(accessToken)
      .then((res) => setProjects(res.data.data.reverse()))
      .catch((err) => {
        toast.error("Failed to fetch projects");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
};

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);

  const createProject = async (projectData, addProject) => {
    const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;

    try {
      setLoading(true);
      const response = await createProjectApi(accessToken, projectData);

      if (response.status === 200) {
        addProject({ id: response.data.project_id, ...projectData });
        toast.success("Project created successfully!");
      }
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading };
};

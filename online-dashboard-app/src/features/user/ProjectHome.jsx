import React, { useState, useEffect, useCallback, useMemo } from "react";
import Projects from "./Projects.jsx";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";
import ProjectCards from "./ProjectCards";
import ProjectEditModal from "./ProjectEditModal";
import { API_BASE_URL } from "../../api/apiConfig";
import { toast } from "react-toastify";
import {
  STATUS_TOASTS,
  PROJECT_STATUS,
  normalizeProjectStatus,
} from "@/constants/projectStatus";

const PROJECT_SECTIONS = [
  {
    key: "discover",
    title: "Show Projects",
    helper: "Browse admin posted walkthroughs and code drops",
  },
  {
    key: "request",
    title: "Request Project",
    helper: "Submit a project request and attach your brief",
  },
  {
    key: "yours",
    title: "Your Projects",
    helper: "Track statuses, payments, and delivery",
  },
];

const ProjectHome = () => {
  const [projects, setProjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeSection, setActiveSection] = useState("discover");
  const [formData, setFormData] = useState({
    project_name: "",
    days_to_complete: "",
    technical_skills: "",
    project_description: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [editFormData, setEditFormData] = useState({
    project_name: "",
    days_to_complete: "",
    technical_skills: "",
    project_description: "",
  });
  const [editFile, setEditFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    const userData = JSON.parse(localStorage.getItem("data"));
    const userId = userData ? userData.user_id : null;
    formPayload.append("project_name", formData.project_name);
    formPayload.append("days_to_complete", formData.days_to_complete);
    formPayload.append("technical_skills", formData.technical_skills);
    formPayload.append("project_description", formData.project_description);
    formPayload.append("user_id", userId);
    if (selectedFile) formPayload.append("file", selectedFile);

    try {
      const accessToken = userData ? userData.access_token : null;
      if (!accessToken) {
        toast.error("No token found. Please log in again.");
        return;
      }
      await axios.post(`${API_BASE_URL}/user-projects/create`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success(
        STATUS_TOASTS[PROJECT_STATUS.PENDING] ||
          "Your project has been submitted and is pending review",
      );
      setActiveSection("yours");
      setFormData({
        project_name: "",
        days_to_complete: "",
        technical_skills: "",
        project_description: "",
      });
      setSelectedFile(null);
      fetchProjects();
    } catch (error) {
      if (error.response) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to submit project request. Please check your input.",
        );
      } else {
        toast.error("Failed to submit project request. Please try again later.");
      }
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFileChange = (e) => setEditFile(e.target.files[0]);

  const openEditProject = (project) => {
    setEditingProject(project);
    setEditFormData({
      project_name: project.project_name || "",
      days_to_complete: project.days_to_complete ?? "",
      technical_skills: project.technical_skills || "",
      project_description: project.project_description || "",
    });
    setEditFile(null);
  };

  const closeEditProject = () => {
    setEditingProject(null);
    setEditFile(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editFile) {
      toast.error("Please upload the updated document to save changes.");
      return;
    }

    const status = normalizeProjectStatus(
      editingProject.project_status ?? editingProject.status,
    );
    if (status !== PROJECT_STATUS.PENDING) {
      toast.error("This project is no longer editable.");
      closeEditProject();
      return;
    }

    const userData = JSON.parse(localStorage.getItem("data"));
    const accessToken = userData ? userData.access_token : null;
    if (!accessToken) {
      toast.error("No token found. Please log in again.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("project_name", editFormData.project_name);
    formPayload.append("days_to_complete", editFormData.days_to_complete);
    formPayload.append("technical_skills", editFormData.technical_skills);
    formPayload.append("project_description", editFormData.project_description);
    formPayload.append("file", editFile);
    formPayload.append("_method", "PUT");

    try {
      setIsUpdating(true);
      await axios.post(
        `${API_BASE_URL}/user-projects/${editingProject.id}/update`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      toast.success("Project updated successfully");
      closeEditProject();
      fetchProjects();
    } catch (error) {
      if (error.response) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to update the project. Please check your input.",
        );
      } else {
        toast.error("Failed to update the project. Please try again later.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const processStatusToasts = useCallback((nextProjects) => {
    const userData = JSON.parse(localStorage.getItem("data"));
    const userId = userData?.user_id ?? "guest";
    const cacheKey = `projectStatus:${userId}`;
    const cachedStatuses = JSON.parse(localStorage.getItem(cacheKey) || "{}");
    const updatedCache = { ...cachedStatuses };

    nextProjects.forEach((project) => {
      const normalizedStatus = normalizeProjectStatus(
        project.project_status ?? project.status,
      );
      if (normalizedStatus === null) return;

      const previousStatus = cachedStatuses[project.id];

      if (previousStatus !== undefined && previousStatus !== normalizedStatus) {
        const message = STATUS_TOASTS[normalizedStatus];
        if (message) {
          toast.info(message);
        }
      }

      updatedCache[project.id] = normalizedStatus;
    });

    Object.keys(updatedCache).forEach((key) => {
      const exists = nextProjects.some(
        (project) => String(project.id) === String(key),
      );
      if (!exists) {
        delete updatedCache[key];
      }
    });

    localStorage.setItem(cacheKey, JSON.stringify(updatedCache));
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      if (!accessToken) {
        toast.error("No token found. Please log in again.");
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/user-projects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const incomingProjects = response.data.data || [];
      const normalizedProjects = incomingProjects.map((project) => ({
        ...project,
        project_status: normalizeProjectStatus(
          project.project_status ?? project.status,
        ),
      }));
      setProjects(normalizedProjects);
      processStatusToasts(normalizedProjects);
    } catch (error) {
      localStorage.clear();
      toast.error("Session Expired! Re-Login Please");
      console.error("Failed to fetch projects:", error);
    }
  }, [processStatusToasts]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (activeSection === "yours") {
      fetchProjects();
    }
  }, [activeSection, fetchProjects]);

  const handlePaymentSuccess = () => {
    setActiveSection("yours");
    fetchProjects();
  };

  const projectStats = useMemo(() => {
    const stats = {
      pending: 0,
      awaitingPayment: 0,
      delivered: 0,
      inProgress: 0,
    };

    projects.forEach((project) => {
      const status = normalizeProjectStatus(
        project.project_status ?? project.status,
      );

      if (status === PROJECT_STATUS.PENDING) stats.pending += 1;
      if (status === PROJECT_STATUS.AWAITING_PAYMENT) stats.awaitingPayment += 1;
      if (status === PROJECT_STATUS.DELIVERED) stats.delivered += 1;
      if (
        status === PROJECT_STATUS.ACCEPTED ||
        status === PROJECT_STATUS.BUILDING
      ) {
        stats.inProgress += 1;
      }
    });

    return stats;
  }, [projects]);

  const renderSection = () => {
    if (activeSection === "request") {
      return (
        <ProjectForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          onCancel={() => setActiveSection("discover")}
        />
      );
    }

    if (activeSection === "yours") {
      return (
        <>
          <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 text-white rounded-2xl p-6 shadow-xl border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                  Your Projects
                </p>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight font-display">
                  Track statuses, payments, and delivery from one place
                </h2>
                <p className="text-sm text-white/80">
                  Stay aligned on handoffs, invoices, and admin reviews. Upload new scopes while a request is pending.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <div className="bg-white/10 rounded-xl px-3 py-2 shadow-inner border border-white/20">
                  <p className="text-[11px] uppercase tracking-wide text-white/70">Pending</p>
                  <p className="text-xl font-bold">{projectStats.pending}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2 shadow-inner border border-white/20">
                  <p className="text-[11px] uppercase tracking-wide text-white/70">Awaiting Payment</p>
                  <p className="text-xl font-bold">{projectStats.awaitingPayment}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2 shadow-inner border border-white/20">
                  <p className="text-[11px] uppercase tracking-wide text-white/70">In Progress</p>
                  <p className="text-xl font-bold">{projectStats.inProgress}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2 shadow-inner border border-white/20">
                  <p className="text-[11px] uppercase tracking-wide text-white/70">Delivered</p>
                  <p className="text-xl font-bold">{projectStats.delivered}</p>
                </div>
              </div>
            </div>
          </div>
          <ProjectTable
            projects={projects}
            onPaymentSuccess={handlePaymentSuccess}
            onEditProject={openEditProject}
          />
          <ProjectCards
            projects={projects}
            onPaymentSuccess={handlePaymentSuccess}
            onEditProject={openEditProject}
          />
        </>
      );
    }

    return <Projects />;
  };

  return (
    <main className="m-3 flex-1 pt-12 lg:relative py-4 min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
      <div className="mt-4 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[16rem,1fr] gap-6 items-start">
          <aside className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-4 space-y-2 sticky top-16">
            {PROJECT_SECTIONS.map((section) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border font-semibold transition ${
                    isActive
                      ? "border-violet-600 text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40"
                      : "border-gray-200 dark:border-gray-800 hover:border-violet-400 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <div className="text-sm">{section.title}</div>
                  <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {section.helper}
                  </div>
                </button>
              );
            })}
          </aside>
          <section className="flex-1 min-w-0 space-y-4">{renderSection()}</section>
        </div>
      </div>
      <ProjectEditModal
        project={editingProject}
        formData={editFormData}
        onClose={closeEditProject}
        onChange={handleEditInputChange}
        onFileChange={handleEditFileChange}
        onSubmit={handleUpdateSubmit}
        isSubmitting={isUpdating}
      />
    </main>
  );
};

export default ProjectHome;

import React, { useState, useEffect } from "react";
import Projects from "./Projects.jsx";
import { FaProjectDiagram, FaList, FaMoneyCheckAlt } from "react-icons/fa";
import axios from "axios";
import PaymentComponent from "../PaymentComponent.jsx";
import SectionHeading from "./SectionHeading.jsx";
import ProjectForm from "./ProjectForm";
import PaymentForm from "./PaymentForm";
import ProjectTable from "./ProjectTable";
import ProjectCards from "./ProjectCards";

const STATUS_MAP = {
  0: "Accepted",
  1: "Pending",
  2: "Building",
  3: "Success",
  4: "Rejected",
  5: "Payment Success",
  6: "Refund",
  7: "Completed",
};

const ProjectHome = ({ handleLogout }) => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [formData, setFormData] = useState({
    project_name: "",
    days_to_complete: "",
    technical_skills: "",
    project_description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

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
        alert("No token found. Please log in again.");
        return;
      }
      await axios.post(
        "http://127.0.0.1:8000/api/user-projects/create",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      alert("Project request submitted successfully!");
      setShowForm(false);
      setShowProjects(true);
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
        alert("Failed to submit project request. Please check your input.");
      } else {
        alert("Failed to submit project request. Please try again later.");
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      if (!accessToken) {
        alert("No token found. Please log in again.");
        return;
      }
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user-projects",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setProjects(response.data.data);
    } catch (error) {
      localStorage.clear();
      alert("Session Expired! Re-Login Please");
    }
  };

  // Handlers for nav
  const handleUploadPaymentClick = () => {
    setShowPaymentForm(true);
    setShowForm(false);
    setShowProjects(false);
  };

  const handleShowProjectsClick = () => {
    setActiveTab("projects");
    setShowProjects(true);
    setShowForm(false);
    setShowPaymentForm(false);
    fetchProjects();
  };

  const handleShowRequestNewProject = () => {
    setActiveTab("request");
    setShowForm(true);
    setShowProjects(false);
    setShowPaymentForm(false);
  };

  return (
    <main className="m-3 flex-1 pt-12 lg:relative py-4 min-h-screen bg-slate-50">
      <div className="mt-4 mb-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={handleShowProjectsClick}
            className={`py-2 px-6 text-sm font-medium rounded-t-md transition-all duration-300
        ${activeTab === "projects"
                ? "bg-violet-600 text-white shadow"
                : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
              }`}
          >
            Show Projects
          </button>
          <button
            onClick={handleShowRequestNewProject}
            className={`py-2 px-6 text-sm font-medium rounded-t-md transition-all duration-300
        ${activeTab === "request"
                ? "bg-violet-600 text-white shadow"
                : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
              }`}
          >
            Request Project
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8">
          <ProjectForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            setShowProjects={setShowProjects}
          />
          <ProjectTable projects={projects} />
          <ProjectCards projects={projects} />
        </div>
      )}
      {showProjects && (
        <Projects />
      )}
    </main>
  );
};

export default ProjectHome;

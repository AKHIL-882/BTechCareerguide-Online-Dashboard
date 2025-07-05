import React, { useState, useEffect } from "react";
import Projects from "./Projects.jsx";
import { FaProjectDiagram, FaList, FaMoneyCheckAlt } from "react-icons/fa";
import axios from "axios";
import PaymentComponent from "../PaymentComponent.jsx";
import SectionHeading from "./SectionHeading.jsx";

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
  const [formData, setFormData] = useState({
    project_name: "",
    days_to_complete: "",
    technical_skills: "",
    project_description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form fields with correct backend names
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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

    if (selectedFile) {
      formPayload.append("file", selectedFile);
    }

    try {
      const accessToken = userData ? userData.access_token : null;

      if (!accessToken) {
        alert("No token found. Please log in again.");
        return;
      }
      const response = await axios.post(
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
      // Reset form and state
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
        console.error("Backend error data:", error.response.data);
        alert("Failed to submit project request. Please check your input.");
      } else {
        console.error(error);
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
      console.error("Error fetching projects:", error);
      alert("Session Expired! Re-Login Please");
    }
  };

  const handleUploadPaymentClick = () => {
    setShowPaymentForm(true);
    setShowForm(false);
    setShowProjects(false);
  };

  const handleShowProjectsClick = () => {
    setShowProjects(true);
    setShowForm(false);
    setShowPaymentForm(false);
    fetchProjects();
  };

  const handleShowRequestNewProject = () => {
    setShowForm(true);
    setShowProjects(false);
    setShowPaymentForm(false);
  };

  return (
    <main className="m-3 flex-1 pt-12 lg:relative py-4 min-h-screen bg-slate-50">
      <div className="mt-4 md:flex justify-between mb-4">
        <div className="md:flex md:space-x-4 mb-1 md:mb-0">
          <button
            className="font-semibold bg-violet-700 text-white py-2 px-4 rounded-md hover:bg-violet-500 w-full md:w-auto mb-1 md:mb-0 flex justify-between items-center font-display"
            onClick={handleShowRequestNewProject}
          >
            Request New Project
            <FaProjectDiagram size={18} className="md:ml-2" />
          </button>
          <button
            className="font-semibold bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full md:w-auto flex justify-between items-center font-display"
            onClick={handleShowProjectsClick}
          >
            Show Projects
            <FaList size={18} className="md:ml-2" />
          </button>
        </div>
        <div className="flex">
          <button
            className="font-semibold bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 w-full md:w-auto flex justify-between items-center font-display"
            onClick={handleUploadPaymentClick}
          >
            Upload Payment Screenshot
            <FaMoneyCheckAlt size={18} className="md:ml-2" />
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 border p-4 rounded-lg bg-white shadow-lg mx-auto w-full">
          <h2 className="text-lg font-semibold text-violet-800 font-display">
            Submission Request
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Row for Project Title and Days to Complete */}
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-sans">
                  Project Title
                </label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
                  placeholder="Project Title"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-sans">
                  Days to Complete
                </label>
                <select
                  name="days_to_complete"
                  value={formData.days_to_complete}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md w-4/6 lg:w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500 "
                  required
                >
                  <option value="">Select Days</option>
                  <option value="0">Asap</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="14">In a Week</option>
                  <option value="30">In a Month</option>
                </select>
              </div>
            </div>

            {/* Other fields */}
            <div className="mt-4">
              <label className="block text-gray-700 font-sans">
                Technology
              </label>
              <input
                type="text"
                name="technical_skills"
                value={formData.technical_skills}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Technologies"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-sans">
                Project Description
              </label>
              <textarea
                name="project_description"
                value={formData.project_description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
                rows="4"
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-sans">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                type="submit"
                className="bg-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-600 font-sans"
              >
                Submit Request
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 font-sans"
                onClick={() => {
                  setShowForm(false);
                  setShowProjects(true);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showPaymentForm && (
        <div className="mt-8 border p-6 rounded-lg bg-white shadow-lg">
          <h2 className="text-lg text-violet-800 font-sans">
            Upload Payment Screenshot
          </h2>
          <p className="text-sm text-gray-500 font-sans">
            Please select the project and upload your payment screenshot.
          </p>
          <div className="mt-4">
            <select className="border-violet-300 p-2 rounded-md lg:w-full mb-4 w-4/6 bg-violet-200 font-sans">
              <option>Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.project_name}>
                  {project.project_name}
                </option>
              ))}
            </select>
            <button className="bg-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-600 font-sans">
              Upload File
            </button>
            <button
              className="bg-red-300 text-gray-700 py-2 px-4 rounded-md hover:bg-red-400 ml-4 font-sans"
              onClick={() => {
                setShowPaymentForm(false);
                setShowProjects(true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showProjects && (
        <div className="mt-8">
          <Projects />
          {/* Table view for larger screens */}
          <div className="hidden lg:block mt-8">
            <SectionHeading text="Your projects" />
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-violet-200 text-violet-800 font-semibold whitespace-nowrap font-display">
                  <th className="border px-4 py-2">Project Name</th>
                  <th className="border px-4 py-2">Technical Skills</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 font-sans">
                      {project.project_name}
                    </td>
                    <td className="border px-4 py-2 font-sans">
                      {project.technical_skills}
                    </td>
                    <td className="border px-4 py-2 font-sans">
                      {project.project_description}
                    </td>
                    <td className="border px-4 py-2 font-sans">
                      <button
                        className={`px-4 py-2 rounded text-white font-sans ${
                          project.project_status === "Pending"
                            ? "bg-yellow-500"
                            : project.project_status === "Completed"
                              ? "bg-green-500"
                              : project.project_status === "In Progress"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                        }`}
                      >
                        {STATUS_MAP[project.project_status]}
                      </button>
                      {/* {project.project_status === 2 && ( */}
                      <td className="border p-2">
                        <button className="px-3 py-1 bg-green-500 text-white rounded">
                          <PaymentComponent amount={500} />
                        </button>
                      </td>
                      {/* )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile screens */}

          <div className="lg:hidden mt-8">
            <h2 className="text-lg text-blue-950 mb-2 relative flex items-center space-x-2 pb-2 font-display font-bold">
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1 h-4 bg-violet-600"></span>
                <span>YOUR PROJECTS</span>
              </div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 border border-1"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg font-display">
                      {project.project_name}
                    </h4>
                    <button
                      className={`px-4 py-1 rounded text-white font-sans ${
                        project.project_status === "Pending"
                          ? "bg-yellow-500"
                          : project.project_status === "Completed"
                            ? "bg-green-500"
                            : project.project_status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                      }`}
                    >
                      {STATUS_MAP[project.project_status]}
                    </button>
                  </div>
                  <p className="mt-2 text-sm font-sans">
                    {project.technical_skills}
                  </p>
                  <p className="mt-2 text-sm font-sans">
                    {project.project_description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectHome;

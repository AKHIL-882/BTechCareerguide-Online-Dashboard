import React, { useState, useEffect } from "react";
import Projects from "./Projects.jsx";
import axios from "axios";

const STATUS_MAP = {
  0: "Accepted",
  1: "Pending",
  2: "Building",
  3: "Success",
  4: "Rejected",
  5: "Payment Success",
  6: "Refund",
};

const ProjectHome = ({ handleLogout }) => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    days_to_complete: "",
    technical_skills: "",
    project_description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

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

    const data = JSON.parse(localStorage.getItem("data"));
    const userId = data ? data.user_id : null;

    formPayload.append("project_name", formData.title);
    formPayload.append("days_to_complete", formData.days);
    formPayload.append("technical_skills", formData.technology);
    formPayload.append("project_description", formData.description);
    formPayload.append("user_id", userId);

    if (selectedFile) {
      formPayload.append("file", selectedFile);
    }

    // Debugging: Log payload
    for (const [key, value] of formPayload.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;

      if (!accessToken) {
        setError("No token found. Please log in again.");
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
      console.log("Response:", response.data);

      // Reset form and state
      setShowForm(false);
      setShowProjects(true);
    } catch (error) {
      console.error("Error submitting project:", error);

      if (error.response) {
        console.log("Validation Errors:", error.response.data.errors); // Log server validation errors
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

      // Update the projects state with the fetched data
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Failed to fetch projects. Please try again later.");
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
    <main className="m-2 flex-1 pt-12 lg:relative lg:pl-56 py-2 min-h-screen ">
      {/* <div className="p-4"> */}
      <div className="mt-4 md:flex justify-between mb-4">
        <div className="md:flex md:space-x-4 mb-1 md:mb-0">
          <button
            className="font-semibold bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full md:w-auto mb-1 md:mb-0"
            onClick={handleShowRequestNewProject}
          >
            Request New Project
          </button>
          <button
            className="font-semibold bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full md:w-auto"
            onClick={handleShowProjectsClick}
          >
            Show Projects
          </button>
        </div>
        <div className="flex">
          <button
            className="font-semibold bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 w-full md:w-auto"
            onClick={handleUploadPaymentClick}
          >
            Upload Payment Screenshot
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 border p-4 rounded-lg bg-white shadow-lg mx-auto w-full">
          <h2 className="text-lg font-semibold">Submission Request</h2>
          <form onSubmit={handleSubmit}>
            {/* Row for Project Title and Days to Complete */}
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  placeholder="Project Title"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Days to Complete</label>
                <select
                  name="days"
                  value={formData.days}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md w-4/6 lg:w-full "
                  required
                >
                  <option value="">Select Days</option>
                  <option value="7">7</option>
                  <option value="14">14</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>

            {/* Other fields */}
            <div className="mt-4">
              <label className="block text-gray-700">Technology</label>
              <input
                type="text"
                name="technology"
                value={formData.technology}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Technologies"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
                rows="4"
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit Request
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showPaymentForm && (
        <div className="mt-8 border p-6 rounded-lg bg-white shadow-lg">
          <h2 className="text-lg font-semibold">Upload Payment Screenshot</h2>
          <p className="text-sm text-gray-500">
            Please select the project and upload your payment screenshot.
          </p>
          <div className="mt-4">
            <select className="border-gray-300 p-2 rounded-md lg:w-full mb-4 w-4/6 bg-green-50">
              <option>Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Upload File
            </button>
            <button
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 ml-4"
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
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <Projects />

          {/* Table view for larger screens */}
          <div className="hidden lg:block mt-8">
            <h3 className="text-md font-semibold mb-4">Requested Projects</h3>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100 whitespace-nowrap">
                  <th className="border px-4 py-2">Project Name</th>
                  <th className="border px-4 py-2">Technical Skills</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{project.project_name}</td>
                    <td className="border px-4 py-2">
                      {project.technical_skills}
                    </td>
                    <td className="border px-4 py-2">
                      {project.project_description}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className={`px-4 py-2 rounded text-white font-semibold ${
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile screens */}

          <div className="lg:hidden mt-8">
            <h3 className="text-lg font-semibold mb-4">Requested Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 border border-1"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">
                      {project.project_name}
                    </h4>
                    <button
                      className={`px-4 py-1 rounded text-white font-semibold ${
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
                  <p className="mt-2 text-sm">{project.technical_skills}</p>
                  <p className="mt-2 text-sm">{project.project_description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* </div> */}
    </main>
  );
};

export default ProjectHome;

import React, { useState } from "react";
import { useFetchProjects } from "../../../Api";

const UserProjectsPage = () => {
  const { projectsListings, loading, error } = useFetchProjects();
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDocument, setPreviewDocument] = useState(null); // State to manage document preview
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Track the selected project
  const itemsPerPage = 5;

  // Filter projects where is_admin_project is 0
  const filteredProjects = projectsListings.filter(
    (project) => project.is_admin_project === 0
  );

  // Sort the filtered projects in descending order by a field (e.g., project ID or creation date)
  const sortedProjects = filteredProjects.sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const currentItems = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDocumentPreview = (projectId, documentName) => {
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(projectId);
      setPreviewDocument(documentName);
    }
  };

  const handleStatusChange = (projectId, status) => {
    console.log(`Project ID: ${projectId}, New Status: ${status}`);
    // Add your status change logic here if required
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!filteredProjects.length) {
    return <div className="text-center mt-10">No projects found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">User Projects</h1>
        
        {/* Table for larger screens */}
        <div className="overflow-x-auto rounded-lg hidden sm:block">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Project Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Days to Complete</th>
                <th className="border border-gray-300 px-4 py-2">Technical Skills</th>
                <th className="border border-gray-300 px-4 py-2">Document</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((project, index) => (
                <React.Fragment key={project.id}>
                  <tr className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{project.project_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{project.project_description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{project.days_to_complete}</td>
                    <td className="border border-gray-300 px-4 py-2">{project.technical_skills}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {project.document_name ? (
                        <button
                          onClick={() => handleDocumentPreview(project.id, project.document_name)}
                          className="text-blue-600 underline"
                        >
                          View Document
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <select
                        value={project.project_status}
                        onChange={(e) =>
                          handleStatusChange(project.id, e.target.value)
                        }
                        className="border px-4 py-2"
                      >
                        <option value="0">Accepted</option>
                        <option value="1">Pending</option>
                        <option value="2">Building</option>
                        <option value="3">Success</option>
                        <option value="4">Rejected</option>
                        <option value="5">Payment Success</option>
                        <option value="6">Refund</option>
                      </select>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for smaller screens */}
        <div className="sm:hidden">
          {currentItems.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
              <h2 className="font-semibold text-lg mb-2">{project.project_name}</h2>
              <p className="text-sm text-gray-600">{project.project_description}</p>
              <p className="text-sm text-gray-600">Days to Complete: {project.days_to_complete}</p>
              <p className="text-sm text-gray-600">Technical Skills: {project.technical_skills}</p>
              {project.document_name ? (
                <button
                  onClick={() => handleDocumentPreview(project.id, project.document_name)}
                  className="text-blue-600 underline text-sm mt-2"
                >
                  View Document
                </button>
              ) : (
                <p className="text-sm text-gray-600">Document: N/A</p>
              )}
              <div className="mt-4">
                <select
                  value={project.project_status}
                  onChange={(e) =>
                    handleStatusChange(project.id, e.target.value)
                  }
                  className="border px-2 py-1 text-sm w-8/12"
                >
                  <option value="0">Accepted</option>
                  <option value="1">Pending</option>
                  <option value="2">Building</option>
                  <option value="3">Success</option>
                  <option value="4">Rejected</option>
                  <option value="5">Payment Success</option>
                  <option value="6">Refund</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProjectsPage;

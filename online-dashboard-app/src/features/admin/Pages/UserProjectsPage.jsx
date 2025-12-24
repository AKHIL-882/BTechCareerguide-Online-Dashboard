import React, { useState } from "react";
import {
  useFetchProjects,
  handleStatusChange,
} from "../../../hooks/useProject.js";

const UserProjectsPage = () => {
  const { projectsListings, loading } = useFetchProjects();
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDocument, setPreviewDocument] = useState(null); // State to manage document preview
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  const itemsPerPage = 5;

  // Filter projects where is_admin_project is 0
  const filteredProjects = projectsListings.filter(
    (project) => project.is_admin_project === 0,
  );

  // Sort the filtered projects in descending order
  const sortedProjects = filteredProjects.sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const currentItems = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDocumentPreview = (projectId, documentName) => {
    if (!documentName) return;

    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/userProjectFiles/${documentName}`;

    window.open(fileUrl, "_blank");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewDocument(null);
  };

  const [statusUpdates, setStatusUpdates] = useState({});

  const handleStatusSelect = (projectId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [projectId]: newStatus,
    }));
  };

  const handleStatusSave = (projectId) => {
    if (statusUpdates[projectId] !== undefined) {
      handleStatusChange(projectId, statusUpdates[projectId]);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!filteredProjects.length) {
    return <div className="text-center mt-10">No projects found.</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          User Projects
        </h1>

        {/* Table for larger screens */}
        <div className="overflow-x-auto rounded-lg hidden sm:block">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">
                  Project Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Days to Complete
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Technical Skills
                </th>
                <th className="border border-gray-300 px-4 py-2">Document</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((project, index) => (
                <tr key={project.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {project.project_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {project.project_description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {project.days_to_complete}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {project.technical_skills}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {project.document_name ? (
                      <button
                        onClick={() =>
                          handleDocumentPreview(
                            project.id,
                            project.document_name,
                          )
                        }
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
                      value={
                        statusUpdates[project.id] ?? project.project_status
                      }
                      onChange={(e) =>
                        handleStatusSelect(project.id, e.target.value)
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
                    <button
                      onClick={() => handleStatusSave(project.id)}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {/* Modal for document preview */}
      {isModalOpen && previewDocument && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Close
            </button>
            <h2 className="text-lg font-semibold mb-4">Document Preview</h2>
            <iframe
              src={previewDocument}
              className="w-full h-full border"
              title="Document Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProjectsPage;

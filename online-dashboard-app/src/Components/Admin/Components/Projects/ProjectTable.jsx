import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectTable = ({ currentProjects, handleEdit, openDeletePopup }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full bg-white border-none hidden sm:table">
        <thead className="bg-blue-50 text-violet-600">
          <tr>
            <th className="py-2 px-4 text-left">Project Name</th>
            <th className="py-2 px-4 text-left">Payment Url</th>
            <th className="py-2 px-4 text-left">Yotube Link</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => (
            <tr key={project.company_name} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{project.company_name}</td>
              <td className="py-2 px-4">{project.payment_link}</td>
              <td className="py-2 px-4">
                <a
                  href={project.youtube_video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Youtube Video
                </a>
              </td>
              <td className="py-2 px-4 flex space-x-6">
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(project.id)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                {/* Delete Button: Opens the delete confirmation popup */}
                <button
                  onClick={() => openDeletePopup(project)} // Open delete popup with the selected project
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectCard = ({ currentProjects, handleEdit, openDeletePopup }) => {
  return (
    <div className="block sm:hidden">
      {currentProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold">{project.company_name}</h2>
          <p className="text-gray-600">{project.payment_link}</p>
          <a
            href={project.youtube_video_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mt-2"
          >
            View Youtube Video
          </a>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleEdit(project.id)}
              className="text-yellow-500 hover:text-yellow-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => openDeletePopup(project)} // Open delete popup with the selected job
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;

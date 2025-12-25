import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const JobCard = ({ currentJobs, handleEdit, openDeletePopup }) => {
  return (
    <div className="block sm:hidden">
      {currentJobs.map((job) => (
        <div
          key={job.id}
          className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold">{job.company_name}</h2>
          <p className="text-gray-600">{job.role}</p>
          <p className="text-gray-500">Qualifications: {job.qualification}</p>
          <p className="text-gray-500">Batches: {job.batch}</p>
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mt-2"
          >
            View Job
          </a>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleEdit(job.id)}
              className="text-yellow-500 hover:text-yellow-700"
            >
              <FaEdit />
            </button>
            {/* <button
              onClick={() => handleDeleteClick(job.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button> */}
            <button
              onClick={() => openDeletePopup(job)} // Open delete popup with the selected job
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

export default JobCard;

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteJobPopup from "./DeleteJobPopup"; // Import DeleteJobPopup component

const JobCard = ({ currentJobs, handleEdit, handleDelete }) => {
  const [selectedJob, setSelectedJob] = useState(null); // State for the selected job to delete

  const handleDeleteClick = (jobId) => {
    setSelectedJob(currentJobs.find((job) => job.id === jobId)); // Set the job to delete
  };

  const handleCloseDeletePopup = () => {
    setSelectedJob(null); // Close the delete popup
  };

  return (
    <div className="block sm:hidden">
      {currentJobs.map((job) => (
        <div
          key={job.id}
          className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold">{job.companyName}</h2>
          <p className="text-gray-600">{job.role}</p>
          <p className="text-gray-500">Qualifications: {job.qualifications.join(", ")}</p>
          <p className="text-gray-500">Batches: {job.batches.join(", ")}</p>
          <p className="text-gray-500">Experience: {job.experience} years</p>
          <a
            href={job.url}
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
            <button
              onClick={() => handleDeleteClick(job.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Delete Job Popup Modal */}
      {selectedJob && (
        <DeleteJobPopup
          job={selectedJob}
          handleClose={handleCloseDeletePopup}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default JobCard;

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const JobTable = ({ currentJobs, handleEdit, openDeletePopup }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full bg-white border-none hidden sm:table">
        <thead className="bg-blue-50 text-violet-600">
          <tr>
            <th className="py-2 px-4 text-left">Company Name</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Qualifications</th>
            <th className="py-2 px-4 text-left">Batches</th>
            <th className="py-2 px-4 text-left">URL</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{job.company_name}</td>
              <td className="py-2 px-4">{job.role}</td>
              <td className="py-2 px-4">
                {job.qualification.split(",").join(", ")}
              </td>
              <td className="py-2 px-4">{job.batch.split(",").join(", ")}</td>
              <td className="py-2 px-4">
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Job
                </a>
              </td>
              <td className="py-2 px-4 flex space-x-6">
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(job.id)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                {/* Delete Button: Opens the delete confirmation popup */}
                <button
                  onClick={() => openDeletePopup(job)} // Open delete popup with the selected job
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

export default JobTable;

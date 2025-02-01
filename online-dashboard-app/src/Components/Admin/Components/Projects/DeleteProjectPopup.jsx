import React from "react";

const DeleteProjectPopup = ({ project, handleClose, handleDelete }) => {
  const handleDeleteClick = () => {
    handleDelete(project.id); // Pass the project ID to the parent to handle the deletion
    handleClose(); // Close the popup after deletion
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        {" "}
        {/* Increased width here */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">
          Delete Project
        </h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete the project posting for{" "}
          <strong>{project.company_name}</strong>?
        </p>
        <div className="flex justify-between space-x-2 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectPopup;

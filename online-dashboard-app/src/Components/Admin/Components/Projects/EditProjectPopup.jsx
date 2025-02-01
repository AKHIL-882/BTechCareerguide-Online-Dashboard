import React, { useState, useEffect } from "react";
import InputField from "../DashBoard/InputField";

const EditProjectPopup = ({ project, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    payment_link: "",
    youtube_link: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        company_name: project.company_name,
        payment_link: project.payment_link,
        youtube_link: project.youtube_video_link,
      });
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    // Pass the updated form data to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">
          Edit Project
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-blue-50 p-6 space-y-4 rounded-lg my-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="company_name"
              label="Company Name"
              type="text"
              value={formData.company_name}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              placeholder="Enter company name"
            />
            <InputField
              id="payment_link"
              label="payment link"
              type="url"
              value={formData.payment_link}
              onChange={(e) =>
                setFormData({ ...formData, payment_link: e.target.value })
              }
              placeholder="Enter Pyament_link"
            />

            <InputField
              id="youtube_link"
              label="youtube link"
              type="url"
              value={formData.youtube_link}
              onChange={(e) =>
                setFormData({ ...formData, youtube_link: e.target.value })
              }
              placeholder="Enter Project URL"
            />
          </div>
          <div className="flex justify-between space-x-2 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPopup;

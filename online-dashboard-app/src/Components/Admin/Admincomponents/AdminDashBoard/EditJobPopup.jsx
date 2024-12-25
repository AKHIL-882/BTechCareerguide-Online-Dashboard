import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import DropDownCheckBox from "./DropDownCheckBox";

const EditJobPopup = ({ job, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    qualifications: [],  // This will store the selected qualifications
    batches: [],
    experience: "",
    url: "",
  });
  const [showQualifications, setShowQualifications] = useState(false);
  const [showBatches, setShowBatches] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        role: job.role,
        qualifications: job.qualifications || [],  // Ensure qualifications are set correctly
        batches: job.batches || [],
        experience: job.experience,
        url: job.url,
      });
    }
  }, [job]);

  const handleChange = (e, field, value) => {
    const { checked } = e.target;
    setFormData((prev) => {
      let updatedValues;
      if (checked) {
        updatedValues = [...prev[field], value];
      } else {
        updatedValues = prev[field].filter((item) => item !== value);
      }
      return { ...prev, [field]: updatedValues };
    });
  };

  const handleExperienceChange = (e) => {
    const experience = e.target.value;
    setFormData({ ...formData, experience });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);  // Pass the updated form data to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Edit Job</h2>
        <form onSubmit={handleSubmit} className="w-full bg-blue-50 p-6 space-y-4 rounded-lg my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="companyName"
              label="Company Name"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Enter company name"
            />
            <InputField
              id="role"
              label="Role"
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Enter role"
            />
            {/* Qualifications Dropdown */}
            <DropDownCheckBox
              label="Qualifications"
              options={[
                { value: "Bachelor's", label: "Bachelor's" },
                { value: "Master's", label: "Master's" },
                { value: "PhD", label: "PhD" },
                { value: "Diploma", label: "Diploma" },
              ]}
              selectedValues={formData.qualifications}  // Ensure selected values are properly passed
              onChange={(e, value) => handleChange(e, "qualifications", value)}  // Properly update qualifications array
              showDropdown={showQualifications}
              toggleDropdown={() => setShowQualifications(!showQualifications)}
            />
            {/* Batches Dropdown */}
            <DropDownCheckBox
              label="Batches"
              options={[
                { value: "2022", label: "2022" },
                { value: "2023", label: "2023" },
                { value: "2024", label: "2024" },
                { value: "2025", label: "2025" },
              ]}
              selectedValues={formData.batches}
              onChange={(e, value) => handleChange(e, "batches", value)}
              showDropdown={showBatches}
              toggleDropdown={() => setShowBatches(!showBatches)}
            />
            <InputField
              id="experience"
              label="Experience (in years)"
              type="text"
              value={formData.experience}
              onChange={handleExperienceChange}
              placeholder="Enter experience in years"
            />
            <InputField
              id="url"
              label="URL"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="Enter job URL"
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

export default EditJobPopup;

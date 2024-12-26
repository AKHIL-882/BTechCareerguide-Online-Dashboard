import React, { useState } from "react";
import InputField from "./InputField";
import DropDownCheckBox from "./DropDownCheckBox";

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    qualifications: [],
    batches: [],
    experience: "",
    url: "",
  });
  const [showQualifications, setShowQualifications] = useState(false);
  const [showBatches, setShowBatches] = useState(false);

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
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-blue-50 p-6 space-y-4 rounded-lg my-4 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Add a Job</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="companyName"
          label="Company Name"
          type="text"
          value={formData.company_name}
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
        <DropDownCheckBox
          label="Qualifications"
          options={[
            { value: "bachelor", label: "Bachelor's" },
            { value: "master", label: "Master's" },
            { value: "phd", label: "PhD" },
            { value: "diploma", label: "Diploma" },
          ]}
          selectedValues={formData.qualifications}
          onChange={(e, value) => handleChange(e, "qualifications", value)}
          showDropdown={showQualifications}
          toggleDropdown={() => setShowQualifications(!showQualifications)}
        />
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition text-sm font-medium">
        Add Job
      </button>
    </form>
  );
};

export default AddJobForm;

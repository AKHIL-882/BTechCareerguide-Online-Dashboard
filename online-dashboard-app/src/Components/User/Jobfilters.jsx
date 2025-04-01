import React, { useState } from "react";
import { FaSlidersH, FaTimes } from "react-icons/fa";

const JobFilters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    selectedBranch: "",
    selectedBatch: "",
    selectedDegree: "",
    selectedJobType: "",
    selectedExperience: "",
  });

  // Check if at least one filter is selected
  const isFilterSelected = Object.values(formData).some((value) => value !== "");

  // Handle change for all select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative flex justify-center">
      {/* Filter Icon Button */}
      <button
        className="flex items-center space-x-2 text-gray-700 px-2 py-2 border border-gray-100 bg-white rounded-lg"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaSlidersH className="text-xl" />
      </button>

      {/* Filter Popup */}
      {showFilters && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative bg-white p-6 shadow-lg rounded-lg w-80 md:w-6/12">
            <button
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-lg text-blue-950 mb-2 relative flex items-center space-x-2 pb-2 font-sans">
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1 h-4 bg-violet-600"></span>
                <span>Select Your Preferences</span>
              </div>
            </h2>

            {/* Filter Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Branch Selection */}
              <div>
                <select
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="selectedBranch"
                  value={formData.selectedBranch}
                  onChange={handleInputChange}
                >
                  <option value="">Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>

              {/* Batch Selection */}
              <div>
                <select
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="selectedBatch"
                  value={formData.selectedBatch}
                  onChange={handleInputChange}
                >
                  <option value="">Batch</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              {/* Degree Selection */}
              <div>
                <select
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="selectedDegree"
                  value={formData.selectedDegree}
                  onChange={handleInputChange}
                >
                  <option value="">Degree</option>
                  <option value="Bachelors">Bachelor's</option>
                  <option value="Masters">Master's</option>
                </select>
              </div>

              {/* Job Type Selection */}
              <div>
                <select
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="selectedJobType"
                  value={formData.selectedJobType}
                  onChange={handleInputChange}
                >
                  <option value="">Job Type</option>
                  <option value="Internship">Internship</option>
                  <option value="Fulltime">Fulltime</option>
                </select>
              </div>

              {/* Experience Selection */}
              <div>
                <select
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="selectedExperience"
                  value={formData.selectedExperience}
                  onChange={handleInputChange}
                >
                  <option value="">Experience</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            {/* Apply Filters Button */}
            <button
              className={`w-full py-2 mt-4 rounded ${
                isFilterSelected
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => console.log(formData)}
              disabled={!isFilterSelected}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;

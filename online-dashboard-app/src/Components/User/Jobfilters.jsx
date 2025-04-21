import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import JobsTable from "./JobsTable";

const JobFilters = ({ setFilteredJobs }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    selectedBranch: "",
    selectedBatch: "",
    selectedDegree: "",
    selectedJobType: "",
    selectedExperience: "",
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dropdown options state
  const [dropdownOptions, setDropdownOptions] = useState({
    branches: {},
    degrees: [],
    job_types: [],
    batches: [],
  });

  const isFilterSelected = Object.values(formData).some(
    (value) => value !== "",
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch standard data on mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/standard-data",
        );
        setDropdownOptions(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const fetchFilteredJobs = async () => {
    if (!isFilterSelected) return;

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/jobs/filter",
        {
          params: {
            branch: formData.selectedBranch,
            batch: formData.selectedBatch,
            degree: formData.selectedDegree,
            job_type: formData.selectedJobType,
            experience: formData.selectedExperience,
          },
        },
      );
      setFilteredJobs(response.data.data); 
      setShowFilters(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };
  return (
    <div className="relative flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <button
          className="flex items-center space-x-2 text-gray-700 px-3 py-2 border border-gray-100 bg-white rounded-lg hover:shadow"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaSlidersH className="text-xl" />
          <span>Filters</span>
        </button>

        <button
          onClick={() => setFilteredJobs(null)}
          className="flex items-center space-x-2 text-red-500 px-3 py-2 border border-red-300 bg-white rounded-lg hover:shadow"
        >
          <FaTimes className="text-xl" />
          <span>Clear</span>
        </button>
      </div>

      {showFilters && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative bg-white p-6 shadow-lg rounded-lg w-80 md:w-6/12">
            <button
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-lg text-blue-950 mb-2 flex items-center space-x-2 pb-2 font-sans">
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1 h-4 bg-violet-600"></span>
                <span>Select Your Preferences</span>
              </div>
            </h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Branch */}
              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="selectedBranch"
                value={formData.selectedBranch}
                onChange={handleInputChange}
              >
                <option value="">Branch</option>
                {Object.entries(dropdownOptions.branches).map(
                  ([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ),
                )}
              </select>

              {/* Batch */}
              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="selectedBatch"
                value={formData.selectedBatch}
                onChange={handleInputChange}
              >
                <option value="">Batch</option>
                {dropdownOptions.batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>

              {/* Degree */}
              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="selectedDegree"
                value={formData.selectedDegree}
                onChange={handleInputChange}
              >
                <option value="">Degree</option>
                {dropdownOptions.degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>

              {/* Job Type */}
              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="selectedJobType"
                value={formData.selectedJobType}
                onChange={handleInputChange}
              >
                <option value="">Job Type</option>
                {dropdownOptions.job_types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Experience */}
              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="selectedExperience"
                value={formData.selectedExperience}
                onChange={handleInputChange}
              >
                <option value="">Experience</option>
                {[0, 1, 2, 3, 4, 5].map((exp) => (
                  <option key={exp} value={exp}>
                    {exp} {exp === 1 ? "year" : "years"}
                  </option>
                ))}
              </select>
            </div>

            {/* Apply Filters Button */}
            <button
              className={`w-full py-2 mt-4 rounded ${
                isFilterSelected
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={fetchFilteredJobs}
              disabled={!isFilterSelected || loading}
            >
              {loading ? "Loading..." : "Apply Filters"}
            </button>
          </div>
        </div>
      )}
      {Array.isArray(jobs) && jobs.length > 0 && <JobsTable jobs={jobs} />}
    </div>
  );
};

export default JobFilters;

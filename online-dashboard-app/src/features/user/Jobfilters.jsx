import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { useNavigate } from "react-router-dom";

const JobFilters = ({ setFilteredJobs, filteredJobs, allJobs = [] }) => {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const defaultFormData = {
    selectedBranch: "",
    selectedBatch: "",
    selectedDegree: "",
    selectedJobType: "",
    selectedExperience: "",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [resumeJobs, setResumeJobs] = useState([]);
  const [resumeJobsReady, setResumeJobsReady] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState({
    branches: {},
    degrees: [],
    job_types: [],
    batches: [],
  });

  const [categories] = useState([
    "All",
    "Jobs for You",
    "Fulltime",
    "Internship",
    "Walk-in",
    "B.Tech",
    "M.Tech",
    "MBA",
    "Remote",
    "Part-time",
    "Freshers",
    "Experienced",
    "High Salary",
    "Top Companies",
    "Government",
    "IT",
    "Non-IT",
  ]);
  const [activeCategory, setActiveCategory] = useState("All");

  const isFilterSelected = Object.values(formData).some((value) => value !== "");
  const isJobsForYouDisabled = !resumeJobsReady;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/standard-data");
        setDropdownOptions(response.data.data);
      } catch (error) {
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 1500);
        console.error("Session Expired! Relogin Again!!", error);
      }
    };
    fetchDropdownData();
  }, [navigate]);

  useEffect(() => {
    const syncResumeJobs = () => {
      const cachedReady = localStorage.getItem("resumeJobsReady") === "true";
      setResumeJobsReady(cachedReady);
      if (cachedReady) {
        try {
          const cached = JSON.parse(localStorage.getItem("resumeJobsCache") || "[]");
          setResumeJobs(Array.isArray(cached) ? cached : []);
        } catch (error) {
          setResumeJobs([]);
        }
      } else {
        setResumeJobs([]);
      }
    };

    syncResumeJobs();
    window.addEventListener("resumeJobsUpdated", syncResumeJobs);
    return () => window.removeEventListener("resumeJobsUpdated", syncResumeJobs);
  }, []);

  const normalizeText = (value) => String(value || "").toLowerCase();

  const includesValue = (jobValue, selectedValue) => {
    if (!selectedValue) return true;
    const jobTokens = normalizeText(jobValue)
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean);
    const selected = normalizeText(selectedValue);
    if (!jobTokens.length) return false;
    return jobTokens.some((token) => token === selected || token.includes(selected));
  };

  const matchesExperience = (jobValue, selectedValue) => {
    if (!selectedValue) return true;
    const selected = normalizeText(selectedValue);
    const selectedNumber = Number(selected);
    const jobText = normalizeText(jobValue);
    if (!jobText) return false;

    if (jobText.includes("-")) {
      const [minRaw, maxRaw] = jobText.split("-").map((value) => Number(value.trim()));
      if (!Number.isNaN(selectedNumber) && !Number.isNaN(minRaw) && !Number.isNaN(maxRaw)) {
        return selectedNumber >= minRaw && selectedNumber <= maxRaw;
      }
    }

    const jobNumber = Number(jobText);
    if (!Number.isNaN(selectedNumber) && !Number.isNaN(jobNumber)) {
      return selectedNumber === jobNumber;
    }

    return jobText.includes(selected);
  };

  const containsAny = (value, keywords) =>
    keywords.some((keyword) => normalizeText(value).includes(keyword));

  const parseHighSalary = (ctc) => {
    const text = normalizeText(ctc);
    if (!text) return false;
    const matches = text.match(/[\d.]+/g);
    if (!matches) return false;
    const value = Number(matches[0]);
    if (Number.isNaN(value)) return false;

    if (text.includes("lpa") || text.includes("lakh")) {
      return value >= 10;
    }

    if (text.includes("crore")) {
      return value >= 0.1;
    }

    if (value >= 1000000) {
      return true;
    }

    if (value >= 100000 && (text.includes("year") || text.includes("annual"))) {
      return true;
    }

    return false;
  };

  const topCompanies = [
    "tcs",
    "infosys",
    "wipro",
    "accenture",
    "ibm",
    "cognizant",
    "capgemini",
    "hcl",
    "tech mahindra",
    "deloitte",
    "amazon",
    "google",
    "microsoft",
    "oracle",
    "sap",
    "ey",
    "kpmg",
    "pwc",
  ];

  const itKeywords = [
    "developer",
    "engineer",
    "software",
    "data",
    "cloud",
    "devops",
    "qa",
    "tester",
    "frontend",
    "backend",
    "full stack",
    "security",
    "analyst",
    "it",
  ];

  const isITJob = (job) =>
    containsAny(`${job?.role} ${job?.job_type} ${job?.company_name}`, itKeywords);

  const matchesCategory = (job) => {
    switch (activeCategory) {
      case "Fulltime":
        return containsAny(job?.job_type, ["full"]);
      case "Internship":
        return containsAny(job?.job_type, ["intern"]);
      case "Walk-in":
        return containsAny(`${job?.job_type} ${job?.role}`, ["walk"]);
      case "B.Tech":
        return containsAny(job?.degree, ["b.tech", "btech", "b tech"]);
      case "M.Tech":
        return containsAny(job?.degree, ["m.tech", "mtech", "m tech"]);
      case "MBA":
        return containsAny(job?.degree, ["mba"]);
      case "Remote":
        return containsAny(job?.location, ["remote", "work from home", "wfh"]);
      case "Part-time":
        return containsAny(job?.job_type, ["part"]);
      case "Freshers":
        return containsAny(job?.experience, ["fresher", "0"]);
      case "Experienced": {
        const expNumber = Number(job?.experience);
        if (!Number.isNaN(expNumber)) {
          return expNumber > 0;
        }
        return containsAny(job?.experience, ["1", "2", "3", "4", "5", "+"]);
      }
      case "High Salary":
        return parseHighSalary(job?.ctc);
      case "Top Companies":
        return containsAny(job?.company_name, topCompanies);
      case "Government":
        return containsAny(`${job?.company_name} ${job?.role}`, ["gov", "government", "psu"]);
      case "IT":
        return isITJob(job);
      case "Non-IT":
        return !isITJob(job);
      case "Jobs for You":
      case "All":
      default:
        return true;
    }
  };

  const applyFilters = (closeModal = false) => {
    if (!isFilterSelected && activeCategory === "All") {
      setFilteredJobs(null);
      return;
    }

    const baseJobs = activeCategory === "Jobs for You" ? resumeJobs : allJobs;
    if (activeCategory === "Jobs for You" && baseJobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    setLoading(true);
    const filtered = (baseJobs || []).filter((job) => {
      const matchesFilters =
        includesValue(job?.branch, formData.selectedBranch) &&
        includesValue(job?.batch, formData.selectedBatch) &&
        includesValue(job?.degree, formData.selectedDegree) &&
        includesValue(job?.job_type, formData.selectedJobType) &&
        matchesExperience(job?.experience, formData.selectedExperience);

      const matchesCategoryFilter =
        activeCategory === "All" || activeCategory === "Jobs for You"
          ? true
          : matchesCategory(job);

      return matchesFilters && matchesCategoryFilter;
    });

    setFilteredJobs(filtered);
    if (closeModal) {
      setShowFilters(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeCategory === "All" && !isFilterSelected) {
      setFilteredJobs(null);
      return;
    }
    applyFilters(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    if (category === "Jobs for You" && isJobsForYouDisabled) return;
    setActiveCategory(category);
  };

  const handleClear = () => {
    setFilteredJobs(null);
    setActiveCategory("All");
    setFormData(defaultFormData);
  };

  const canApplyFilters = useMemo(
    () => isFilterSelected || activeCategory !== "All",
    [isFilterSelected, activeCategory],
  );

  const fetchFilteredJobs = () => {
    if (!canApplyFilters) return;
    setLoading(true);
    applyFilters(true);
    setLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center w-full text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                disabled={cat === "Jobs for You" && isJobsForYouDisabled}
                className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                } ${cat === "Jobs for You" && isJobsForYouDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-3 flex items-center space-x-3 flex-shrink-0">
          <button
            className="flex items-center space-x-2 text-gray-700 px-4 py-2 border border-gray-200 bg-white rounded-lg hover:shadow"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaSlidersH className="text-lg" />
            <span>Filters</span>
          </button>
          {filteredJobs && (
            <button
              onClick={handleClear}
              className="flex items-center space-x-2 text-red-500 px-4 py-2 border border-red-300 bg-white dark:bg-gray-900 rounded-lg hover:shadow"
            >
              <FaTimes className="text-lg" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white dark:bg-gray-900 p-6 shadow-lg rounded-lg w-80 md:w-6/12">
            <button
              className="absolute top-2 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes className="text-xl" />
            </button>
            <SectionHeading text="select your preferences" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700"
                name="selectedBranch"
                value={formData.selectedBranch}
                onChange={handleInputChange}
              >
                <option value="">Branch</option>
                {Object.entries(dropdownOptions.branches).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700"
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

              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700"
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

              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700"
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

              <select
                className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700"
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

            <button
              className={`w-full py-2 mt-4 rounded ${
                canApplyFilters
                  ? "bg-violet-500 text-white hover:bg-violet-700"
                  : "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
              onClick={fetchFilteredJobs}
              disabled={!canApplyFilters || loading}
            >
              {loading ? "Loading..." : "Apply Filters"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;

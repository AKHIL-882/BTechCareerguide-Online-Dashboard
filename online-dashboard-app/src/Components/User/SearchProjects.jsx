import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchProjects } from "../../hooks/useProject.js";
const SearchProjects = ({ setProjects, noSearchedProjectsfn }) => {
  const [searchValue, setSearchValue] = useState(""); // State for input value
  const [debouncedValue, setDebouncedValue] = useState(""); // Debounced value
  const { searchProject, error } = useSearchProjects(); // Use the custom hook

  // Debouncing logic: Delay updating debouncedValue by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);

    return () => clearTimeout(timer); // Clear timeout on cleanup or re-render
  }, [searchValue]);

  // Trigger API call only when debouncedValue changes
  useEffect(() => {
    if (debouncedValue.trim() === "") {
      handleClearSearch();
    } else {
      searchProject(debouncedValue, (data) => {
        setProjects(Array.isArray(data) ? data : []);
      });
    }
  }, [debouncedValue]); // Only runs when debouncedValue changes

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    noSearchedProjectsfn();
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 transition-all duration-300 overflow-hidden">
      <FaSearch className="text-violet-500 text-lg cursor-pointer flex-shrink-0" />
      <input
        type="text"
        placeholder="Search projects..."
        value={searchValue}
        onChange={handleSearchChange}
        className="bg-transparent outline-none text-sm px-2 flex-grow font-sans"
      />
      {searchValue && (
        <FaTimes
          onClick={handleClearSearch}
          className="text-white bg-violet-400 text-sm cursor-pointer rounded-full hover:bg-red-400 p-1 transition-all duration-300 font-sans"
        />
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default SearchProjects;

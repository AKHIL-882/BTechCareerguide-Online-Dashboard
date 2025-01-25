import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchProjects } from "../../Api"; // Import your custom hook

const SearchProjects = ({ setProjects }) => {
  const [searchValue, setSearchValue] = useState(""); // State for input value
  const { searchProject, error } = useSearchProjects(); // Use the custom hook
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() === "") {
      fetchProjects();
    } else {
      searchProject(value, (data) => {
        setProjects(Array.isArray(data) ? data : []);
      });
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 transition-all duration-300 overflow-hidden">
      <FaSearch className="text-violet-500 text-lg cursor-pointer flex-shrink-0" />
      <input
        type="text"
        placeholder="Search projects..."
        value={searchValue}
        onChange={handleSearchChange} // Use the handleSearchChange function
        className="bg-transparent outline-none text-sm px-2 flex-grow"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}{" "}
    </div>
  );
};

export default SearchProjects;

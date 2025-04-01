import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaSearch } from "react-icons/fa";

const JobsTable = ({ jobs, className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [pageNumbersToShow, setPageNumbersToShow] = useState(3);
  const [jumpPage, setJumpPage] = useState("");
  const [showJumpInput, setShowJumpInput] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setPageNumbersToShow(window.innerWidth < 640 ? 3 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setShowJumpInput(false);
      setJumpPage("");
    } else {
      alert("Invalid page number");
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = pageNumbersToShow;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-lg ${className} border border-gray-300 overflow-hidden`}
    >
      {/* Card View for Smaller Screens */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition hover:scale-105"
          >
            <h2
              className="text-lg font-semibold font-display text-violet-700 truncate"
              title={job.role}
            >
              {job.role}
            </h2>
            <p className="text-gray-800 font-sans">{job.company_name}</p>
            <p className="text-gray-600 mt-1 font-sans">
              Batch: {job.batch.replace(/,/g, ", ")}
            </p>
            <p className="text-gray-600 font-sans">
              Qualification: {job.qualification.replace(/,/g, ", ")}
            </p>
            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 bg-gradient-to-r from-violet-700 to-blue-500 text-white text-center py-2 px-4 rounded-md shadow-md hover:shadow-lg transition font-sans"
            >
              Apply
            </a>
          </div>
        ))}
      </div>

      {/* No Jobs Available */}
      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500 font-sans">
          No jobs available at the moment.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-violet-700 bg-gray-200 rounded-full disabled:text-gray-400 disabled:bg-gray-100 flex items-center font-sans"
          >
            <FaArrowAltCircleLeft className="mr-1" /> Prev
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-full font-sans ${currentPage === pageNumber ? "bg-violet-700 text-white" : "bg-gray-200 text-violet-700 hover:bg-gray-300"}`}
            >
              {pageNumber}
            </button>
          ))}
          {/* Ellipsis for Jump to Page */}
          {totalPages > pageNumbersToShow && !showJumpInput && (
            <button
              onClick={() => setShowJumpInput(true)}
              className="px-4 py-2 bg-gray-200 text-violet-700 rounded-full font-sans hover:bg-gray-300"
            >
              ...
            </button>
          )}
          {/* Jump to Page Input */}
          {showJumpInput && (
            <form onSubmit={handleJumpToPage} className="flex items-center">
              <input
                type="number"
                min="1"
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                className="px-1 py-0.5 border-2 border-violet-500 rounded-l-full text-violet-700 focus:outline-violet-700"
                placeholder="p.no"
              />
              <button
                type="submit"
                className="px-2 py-2 bg-violet-700 text-white rounded-r-full"
              >
                <FaSearch />
              </button>
            </form>
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-violet-700 bg-gray-200 rounded-full disabled:text-gray-400 disabled:bg-gray-100 flex items-center font-sans"
          >
            Next <FaArrowAltCircleRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsTable;


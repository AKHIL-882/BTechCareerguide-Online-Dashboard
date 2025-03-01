import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const JobsTable = ({ jobs, className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [pageNumbersToShow, setPageNumbersToShow] = useState(3);

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

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className={`bg-white shadow-lg rounded-lg ${className} border border-gray-300 overflow-hidden`}>
      {/* Card View for Smaller Screens */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition hover:scale-105">
            <h2 className="text-lg font-semibold font-display text-violet-700 truncate" title={job.role}>{job.role}</h2>
            <p className="text-gray-800 font-sans">{job.company_name}</p>
            <p className="text-gray-600 mt-1 font-sans">Batch: {job.batch.replace(/,/g, ", ")}</p>
            <p className="text-gray-600 font-sans">Qualification: {job.qualification.replace(/,/g, ", ")}</p>
            <a href={job.apply_link} target="_blank" rel="noopener noreferrer"
              className="block mt-3 bg-gradient-to-r from-violet-700 to-blue-500 text-white text-center py-2 px-4 rounded-md shadow-md hover:shadow-lg transition font-sans">
              Apply
            </a>
          </div>
        ))}
      </div>

      {/* No Jobs Available */}
      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500 font-sans">No jobs available at the moment.</div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-violet-700 bg-gray-200 rounded-full disabled:text-gray-400 disabled:bg-gray-100 flex items-center font-sans">
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
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-violet-700 bg-gray-200 rounded-full disabled:text-gray-400 disabled:bg-gray-100 flex items-center font-sans">
            Next <FaArrowAltCircleRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsTable;

import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const JobsTable = ({ jobs, className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
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
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-violet-700 text-white font-semibold">
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Batch</th>
              <th className="p-4 text-left">Qualification</th>
              <th className="p-4 text-left">Apply</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job) => (
              <tr key={job.id} className="border-t hover:bg-violet-100">
                <td className="p-4 text-gray-700">{job.company_name}</td>
                <td className="p-4 text-gray-700">{job.role}</td>
                <td className="p-4 text-gray-700">{job.batch.replace(/,/g, ", ")}</td>
                <td className="p-4 text-gray-700">{job.qualification.replace(/,/g, ", ")}</td>
                <td className="p-4">
                  <a href={job.apply_link} target="_blank" rel="noopener noreferrer"
                    className="bg-gradient-to-r from-violet-700 to-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition">
                    Apply
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for Smaller Screens */}
      <div className="block md:hidden p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-violet-700">{job.company_name}</h2>
            <p className="text-gray-800">{job.role}</p>
            <p className="text-gray-600 mt-1">Batch: {job.batch.replace(/,/g, ", ")}</p>
            <p className="text-gray-600">Qualification: {job.qualification.replace(/,/g, ", ")}</p>
            <a href={job.apply_link} target="_blank" rel="noopener noreferrer"
              className="block mt-3 bg-violet-700 text-white text-center py-2 px-4 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition">
              Apply
            </a>
          </div>
        ))}
      </div>

      {/* No Jobs Available */}
      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500">No jobs available at the moment.</div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-violet-700 bg-gray-200 rounded-full disabled:text-gray-400 disabled:bg-gray-100 flex items-center">
            <FaArrowAltCircleLeft className="mr-1" /> Prev
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded-full ${currentPage === pageNumber ? "bg-violet-700 text-white" : "bg-gray-200 text-violet-700 hover:bg-gray-300"}`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-violet-700 bg-gray-200 rounded-full disabled:text-gray-400 disabled:bg-gray-100 flex items-center">
            Next <FaArrowAltCircleRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsTable;

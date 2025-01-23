import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const JobsTable = ({ jobs, className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pageNumbersToShow, setPageNumbersToShow] = useState(3); // Default to 3 for smaller screens

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  // Adjust page number buttons dynamically based on window width
  useEffect(() => {
    const handleResize = () => {
      setPageNumbersToShow(window.innerWidth < 640 ? 3 : 7); // 3 for small screens, 7 for large screens
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the page numbers to display based on currentPage and pageNumbersToShow
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = pageNumbersToShow;

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Adjust startPage if there aren't enough pages to show
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
      className={`bg-white shadow-md rounded-t-lg ${className} border border-y-2 border-t-violet-800`}
    >
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="w-full table-auto border-collapse overflow-hidden rounded-lg shadow-md">
          <thead>
            <tr className="bg-violet-200 text-violet-800 font-semibold">
              <th className="p-3 text-left">Company Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Qualification</th>
              <th className="p-3 text-left">Apply Link</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job) => (
              <tr
                key={job.id}
                className="border-t transition hover:bg-violet-100 odd:bg-white even:bg-gray-50"
              >
                <td className="p-3 text-gray-700">{job.company_name}</td>
                <td className="p-3 text-gray-700">{job.role}</td>
                <td className="p-3 text-gray-700">
                  {job.batch.split(",").join(", ")}
                </td>
                <td className="p-3 text-gray-700">
                  {job.qualification.split(",").join(", ")}
                </td>
                <td className="p-3">
                  <button className="bg-gradient-to-r from-violet-800 to-blue-600 text-white py-2 px-4 rounded-md shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-violet-800">
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <span>Apply</span>
                    </a>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card view for smaller screens */}
      <div className="block md:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-xl transition hover:bg-violet-100 odd:bg-white even:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-indigo-600">
                {job.company_name}
              </h2>
              <p className="text-sm text-gray-900">{job.role}</p>
              <p className="mt-2 text-sm text-gray-800">
                {job.batch.split(",").join(", ")}
              </p>
              <p className="mt-2 text-sm text-gray-800">
                {job.qualification.split(",").join(", ")}
              </p>
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-gradient-to-r from-violet-800 to-blue-600 text-white py-2 px-4 rounded-md shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-violet-800"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* No Jobs Available */}
      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No jobs available at the moment.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 py-4 flex-wrap">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 bg-gray-100 text-violet-800 rounded-full  disabled:bg-gray-50 disabled:text-gray-300 text-sm sm:text-base flex justify-center items-center border border-gray-300"
          >
            <FaArrowAltCircleLeft />
            <span className="pl-1">Prev</span>
          </button>

          {/* Page Number Buttons */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 ${currentPage === pageNumber ? "bg-violet-800 text-gray-100" : ""} rounded-full text-sm hover:bg-gray-300 hover:border-gray-900`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 bg-gray-100 text-violet-800 rounded-full disabled:bg-gray-50 disabled:text-gray-300 text-sm sm:text-base flex justify-center items-center border border-gray-300"
          >
            <span className="pr-1">Next</span> <FaArrowAltCircleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsTable;

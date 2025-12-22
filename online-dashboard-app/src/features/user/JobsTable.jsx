import React, { useState, useEffect } from "react";
import ReportModal from "./ReportModal";
import RelativeTime from "./RelativeTIme";
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaSearch,
  FaMapMarkerAlt,
  FaRegFlag,
  FaRupeeSign,
  FaUserTie,
} from "react-icons/fa";

const JobsTable = ({ jobs, className = "", isJobshome }) => {
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

  const totalPages = Math.ceil((jobs?.length || 0) / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs?.slice(indexOfFirstJob, indexOfLastJob) || [];

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

  const [selectedJob, setSelectedJob] = useState(null);

  const openReportModal = (job) => setSelectedJob(job);
  const closeReportModal = () => setSelectedJob(null);

  return (
    <div
      className={`${!isJobshome ? "bg-white dark:bg-gray-900" : ""} rounded-lg ${className} ${!isJobshome ? "border border-gray-300 dark:border-gray-800" : ""} overflow-hidden text-slate-900 dark:text-slate-100`}
    >
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="w-full sm:w-auto border border-gray-200 dark:border-gray-800 rounded-lg p-4 py-8 shadow-sm flex flex-col justify-between bg-white dark:bg-gray-900"
          >
            <div className="flex items-center space-x-4">
              <img
                src={job.company_logo}
                alt={job.role}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex items-start justify-between w-full">
                <div>
                  <h3 className="text-lg font-sans">{job.role}</h3>
                  <p className="text-violet-600 dark:text-violet-400 text-sm font-sans flex items-center gap-1">
                    {job.company_name}
                  </p>
                </div>
                {!isJobshome && (
                  <button
                    onClick={() => openReportModal(job)}
                    className="ml-1 text-gray-500 dark:text-gray-400 hover:text-red-700"
                    title="Report Job"
                  >
                    <FaRegFlag size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 md:px-3 py-1 text-xs bg-green-100 text-green-500 rounded-full font-sans">
                {job.job_type}
              </span>
              <span className="px-2 md:px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full flex items-center gap-1">
                <FaRupeeSign size={12} /> {job.ctc}
              </span>
              <span className="px-2 md:px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full flex items-center gap-1">
                <FaMapMarkerAlt size={12} /> {job.location}
              </span>
              <span className="px-2 md:px-3 py-1 text-xs bg-lime-100 text-lime-600 rounded-full flex items-center gap-1">
                <FaUserTie size={12} />{" "}
                {job.experience == 0
                  ? "Fresher"
                  : `${job.experience == 1 ? `${job.experience} year` : `${job.experience} years`} Experience`}
              </span>
              {job?.branch.split(",").map((b, idx) => (
                <span
                  key={idx}
                  className="px-2 md:px-3 py-1 text-xs bg-fuchsia-100 text-fuchsia-600 rounded-full font-sans"
                >
                  {b.trim()}
                </span>
              ))}
              {job.batch.split(",").map((b, idx) => (
                <span
                  key={idx}
                  className="px-2 md:px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full font-sans"
                >
                  {b.trim()}
                </span>
              ))}
              {job.degree.split(",").map((d, idx) => (
                <span
                  key={idx}
                  className="px-2 md:px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full font-sans"
                >
                  {d.trim()}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm mt-4 text-gray-500 dark:text-gray-400">
              <span>
                <RelativeTime createdAt={job.created_at} />
              </span>
              <a
                href={job.apply_link}
                className="text-violet-600 dark:text-violet-400 font-medium hover:underline"
                target="_blank"
              >
                Apply
              </a>
            </div>
          </div>
        ))}

        {selectedJob && (
          <ReportModal job={selectedJob} onClose={closeReportModal} />
        )}
      </div>
      {/* No Jobs Available */}
      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400 font-sans">
          No jobs available at the moment.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-violet-700 dark:text-violet-300 bg-gray-200 dark:bg-gray-800 rounded-full disabled:text-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-800/60 flex items-center font-sans"
          >
            <FaArrowAltCircleLeft className="mr-1" /> Prev
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-full font-sans ${currentPage === pageNumber ? "bg-violet-700 text-white" : "bg-gray-200 dark:bg-gray-800 text-violet-700 dark:text-violet-300 hover:bg-gray-300 dark:hover:bg-gray-700"}`}
            >
              {pageNumber}
            </button>
          ))}
          {/* Ellipsis for Jump to Page */}
          {totalPages > pageNumbersToShow && !showJumpInput && (
            <button
              onClick={() => setShowJumpInput(true)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-violet-700 dark:text-violet-300 rounded-full font-sans hover:bg-gray-300 dark:hover:bg-gray-700"
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
                className="px-1 py-0.5 border-2 border-violet-500 rounded-l-full text-violet-700 dark:text-violet-300 bg-white dark:bg-gray-900 focus:outline-violet-700"
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
            className="px-4 py-2 text-violet-700 dark:text-violet-300 bg-gray-200 dark:bg-gray-800 rounded-full disabled:text-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-800/60 flex items-center font-sans"
          >
            Next <FaArrowAltCircleRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsTable;

import React, { useState } from "react";
import JobsTable from "./JobsTable";

const PaginatedJobs = ({ jobs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const displayedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div>
      <JobsTable jobs={displayedJobs} />
      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedJobs;

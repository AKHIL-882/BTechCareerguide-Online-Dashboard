import React, { useState } from "react";

const JobsTable = ({ jobs, className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this value based on how many items you want per page

  // Calculate the index of the first and last item to show on the current page
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-indigo-100 text-indigo-800 font-semibold">
            <th className="p-3 text-left">Company Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Batch</th>
            <th className="p-3 text-left">Qualification</th>
            <th className="p-3 text-left">Apply Link</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3">{job.company_name}</td>
              <td className="p-3">{job.role}</td>
              <td className="p-3">{job.batch}</td>
              <td className="p-3">{job.qualification}</td>
              <td className="p-3">
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Apply
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No jobs available at the moment.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-md`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsTable;

// import React from "react";

// const JobsTable = ({ jobs }) => (
//   <table className="table-auto w-full border-collapse border border-gray-300">
//     <thead>
//       <tr>
//         <th className="border border-gray-300 px-4 py-2">ID</th>
//         <th className="border border-gray-300 px-4 py-2">Company Name</th>
//         <th className="border border-gray-300 px-4 py-2">Role</th>
//         <th className="border border-gray-300 px-4 py-2">Batch</th>
//         <th className="border border-gray-300 px-4 py-2">Qualification</th>
//         <th className="border border-gray-300 px-4 py-2">Apply Link</th>
//       </tr>
//     </thead>
//     <tbody>
//       {jobs.map((job) => (
//         <tr key={job.id}>
//           <td className="border border-gray-300 px-4 py-2">{job.id}</td>
//           <td className="border border-gray-300 px-4 py-2">{job.company_name}</td>
//           <td className="border border-gray-300 px-4 py-2">{job.role}</td>
//           <td className="border border-gray-300 px-4 py-2">{job.batch}</td>
//           <td className="border border-gray-300 px-4 py-2">{job.qualification}</td>
//           <td className="border border-gray-300 px-4 py-2">
//             <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//               Apply
//             </a>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// export default JobsTable;


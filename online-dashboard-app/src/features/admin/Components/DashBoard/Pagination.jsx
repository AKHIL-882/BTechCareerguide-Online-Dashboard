import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  // Pagination logic for showing 3 page numbers at a time
  const getPaginationRange = () => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      end = Math.min(3, totalPages);
    } else if (currentPage === totalPages) {
      start = Math.max(totalPages - 2, 1);
    }

    return [start, end];
  };

  const [paginationStart, paginationEnd] = getPaginationRange();

  return (
    <div className="flex justify-center mt-4 overflow-x-auto">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 bg-violet-600 text-white rounded-md hover:bg-violet-500 disabled:opacity-50 text-sm"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {Array.from(
          { length: paginationEnd - paginationStart + 1 },
          (_, i) => i + paginationStart,
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 mx-1 rounded-md text-sm ${
              currentPage === page
                ? "bg-violet-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 bg-violet-600 text-white rounded-md hover:bg-violet-500 disabled:opacity-50 text-sm"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

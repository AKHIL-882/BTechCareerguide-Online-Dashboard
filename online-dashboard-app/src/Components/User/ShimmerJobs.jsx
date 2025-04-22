import React from "react";

const ShimmerJobs = ({ isDashBoard = false }) => {
  const count = isDashBoard ? 3 : 6;
  const shimmerCards = Array.from({ length: count });

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-auto border border-gray-200 rounded-lg p-4 py-8 shadow-sm flex flex-col justify-between bg-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full shimmer-line"></div>
            <div className="flex items-start justify-between w-full">
              <div>
                <div className="h-5 w-3/4 bg-gray-300 rounded shimmer-line"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded mt-2 shimmer-line"></div>
              </div>
              <button className="ml-1 text-gray-500 hover:text-red-700">
                <div className="w-4 h-4 bg-gray-300 rounded-full shimmer-line"></div>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <div className="h-8 w-24 bg-gray-300 rounded-md shimmer-line"></div>
            <div className="h-8 w-24 bg-gray-300 rounded-md shimmer-line"></div>
            <div className="h-8 w-24 bg-gray-300 rounded-md shimmer-line"></div>
            <div className="h-8 w-24 bg-gray-300 rounded-md shimmer-line"></div>
          </div>

          <div className="flex justify-between items-center text-sm mt-4 text-gray-500">
            <div className="w-20 h-4 bg-gray-300 rounded shimmer-line"></div>
            <div className="w-20 h-4 bg-gray-300 rounded shimmer-line"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerJobs;

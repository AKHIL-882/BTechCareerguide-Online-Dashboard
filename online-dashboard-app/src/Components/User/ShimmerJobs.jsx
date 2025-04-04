import React from "react";

const ShimmerJobs = ({ isDashBoard = false }) => {
  const count = isDashBoard ? 3 : 6;
  const shimmerCards = Array.from({ length: count });

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-md bg-white shimmer-card relative overflow-hidden"
        >
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-3 shimmer-line"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded mb-2 shimmer-line"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded mb-2 shimmer-line"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded mb-4 shimmer-line"></div>
          <div className="h-8 bg-gray-300 rounded-md shimmer-line"></div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerJobs;

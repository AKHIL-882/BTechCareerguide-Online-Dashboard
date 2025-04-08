import React from "react";

const ShimmerProjects = ({ isDashBoard = false }) => {
  const count = isDashBoard ? 3 : 6;
  const placeholders = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-1 shimmer-card relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-2/3 bg-gray-300 rounded shimmer-line"></div>
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-red-300 rounded-full shimmer-line"></div>
              <div className="h-10 w-10 bg-violet-300 rounded-full shimmer-line"></div>
            </div>
          </div>
          {isDashBoard && (
            <div className="w-full h-[220px] bg-gray-300 rounded-lg shimmer-line"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShimmerProjects;

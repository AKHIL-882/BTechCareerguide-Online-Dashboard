import React from "react";

const ShimmerProjects = ({ isDashBoard = false }) => {
  const count = isDashBoard ? 3 : 5;
  const placeholders = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden p-1 animate-pulse"
        >
          {isDashBoard ? (
            <>
              <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="bg-white rounded-b-lg pt-2 pb-2 px-4">
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
              </div>
            </>
          ) : (
            <div className="p-4 flex justify-between items-center">
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-red-300 rounded-full"></div>
                <div className="w-8 h-8 bg-violet-300 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShimmerProjects;

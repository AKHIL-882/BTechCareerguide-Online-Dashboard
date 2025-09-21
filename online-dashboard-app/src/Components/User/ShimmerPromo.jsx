import React from "react";

const ShimmerPromo = () => {
  return (
    <div className="bg-gradient-to-r from-purple-200 to-purple-100 rounded-2xl p-6 flex flex-col justify-between relative h-auto overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-6 h-full">
        {/* Text shimmer */}
        <div className="flex-1 space-y-4 w-full">
          <div className="h-6 w-3/4 bg-gray-300/60 rounded shimmer-line"></div>
          <div className="h-4 w-5/6 bg-gray-300/60 rounded shimmer-line"></div>
          <div className="h-10 w-32 bg-gray-300/60 rounded-full shimmer-line mt-4"></div>
        </div>

        {/* Image shimmer */}
        <div className="flex justify-center items-center w-full md:w-auto">
          <div className="h-32 w-64 max-w-[80%] bg-gray-300/60 rounded-lg shimmer-line mx-auto"></div>
        </div>
      </div>

      {/* Navigation dots shimmer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300/60 shimmer-line"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300/30 shimmer-line"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300/30 shimmer-line"></div>
      </div>
    </div>
  );
};

export default ShimmerPromo;

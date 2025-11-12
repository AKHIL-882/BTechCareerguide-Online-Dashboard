import React from "react";

const ShimmerPromo = () => {
  return (
    <div className="rounded-2xl p-6 flex flex-col justify-between relative h-auto overflow-hidden bg-gradient-to-r from-purple-200 to-purple-100 dark:from-violet-950/40 dark:to-violet-900/30">
      <div className="flex flex-col md:flex-row items-center gap-6 h-full">
        {/* Text shimmer */}
        <div className="flex-1 space-y-4 w-full">
          <div className="h-6 w-3/4 bg-gray-300/60 dark:bg-gray-700/60 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300/60 dark:bg-gray-700/60 rounded"></div>
          <div className="h-10 w-32 bg-gray-300/60 dark:bg-gray-700/60 rounded-full mt-4"></div>
        </div>

        {/* Image shimmer */}
        <div className="flex justify-center items-center w-full md:w-auto">
          <div className="h-32 w-64 max-w-[80%] bg-gray-300/60 dark:bg-gray-700/60 rounded-lg mx-auto"></div>
        </div>
      </div>

      {/* Navigation dots shimmer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300/60 dark:bg-gray-700/60"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300/30 dark:bg-gray-700/40"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300/30 dark:bg-gray-700/40"></div>
      </div>
    </div>
  );
};

export default ShimmerPromo;

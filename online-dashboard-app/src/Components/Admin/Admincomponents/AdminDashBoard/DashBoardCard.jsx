import React from "react";

const DashBoardCard = (
    {
        title,
        count
    }
) => {
  return <div className="w-full bg-blue-50 shadow-lg p-4 rounded-md md:w-3/12">
    <h1 className="font-bold">{title}</h1>  
    <p className="text-gray-600 font-bold">{count}</p>
  </div>;
};

export default DashBoardCard;

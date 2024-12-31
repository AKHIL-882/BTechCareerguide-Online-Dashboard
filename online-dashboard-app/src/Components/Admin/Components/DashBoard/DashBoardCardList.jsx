import React from "react";
import DashBoardCard from "./DashBoardCard";
const data = [
    {
      id: 1,
      title: "Customers",
      count: 120, // Count of customers
    },
    {
      id: 2,
      title: "Projects",
      count: 45, // Count of projects
    },
    {
      id: 3,
      title: "Payments",
      count: 230, // Count of payments
    },
    {
      id: 4,
      title: "New Requests",
      count: 15, // Count of new requests
    },
  ];
  
const DashBoardCardList = () => {
  return <div className="flex flex-col justify-between md:flex-row gap-4 py-4">
    {
        data.map((dashcard)=><DashBoardCard key={dashcard.id} {...dashcard}/>)
    }
  </div>;
};

export default DashBoardCardList;

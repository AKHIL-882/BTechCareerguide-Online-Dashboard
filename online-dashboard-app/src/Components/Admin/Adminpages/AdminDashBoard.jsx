import React from "react";
import DashBoardCardList from "../Admincomponents/AdminDashBoard/DashBoardCardList";
import AddJobForm from "../Admincomponents/AdminDashBoard/AddJobForm";
import JobListing from "../Admincomponents/AdminDashBoard/JobListing";

const AdminDashBoard = () => {
  return (
    <div className="py-5 px-4">
      <h1 className="text-2xl font-bold text-gray-700 pb-2">Dashboard</h1>
      <DashBoardCardList/>
      <AddJobForm/>
      <JobListing/>
    </div>
  );
};

export default AdminDashBoard;

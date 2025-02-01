import React from "react";
import DashBoardCardList from "../Components/DashBoard/DashBoardCardList";
import UserProjectsPage from "./UserProjectsPage";

const AdminDashBoard = () => {
  return (
    <div className="py-20 px-4 lg:pl-60 w-screen">
      <h1 className="lg:hidden font-bold text-white bg-gradient-to-r from-violet-600 pl-2 rounded-md">
        Dashboard
      </h1>
      <DashBoardCardList />
      <UserProjectsPage />
    </div>
  );
};

export default AdminDashBoard;

import React from "react";
import dummyJobs from "../Temp/DummyJobs.jsx"
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import JobsTable from "./JobsTable.jsx";
const Jobs = ({ handleLogout }) => (
  <div className="flex flex-col min-h-screen">
    <Header handleLogout={handleLogout} />
    <div className="flex flex-1">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>
          <JobsTable jobs={dummyJobs} />
      </main>
    </div>
  </div>
);

export default Jobs;

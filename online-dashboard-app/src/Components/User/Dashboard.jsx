import React, { useState, useEffect } from "react";
import { logoutUser } from "../../Api.jsx";
import dummyJobs from "../Temp/DummyJobs.jsx"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Projects from "./Projects";
import Jobs from "./Jobs";
import JobsTable from "./JobsTable.jsx";


const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const latestJobs = dummyJobs.slice(0, 4);

  const handleLogout = async () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const isLoggedOut = await logout(accessToken);
      if (isLoggedOut) {
        localStorage.removeItem("data");
        alert("You have logged out successfully!");
        window.location.href = "/";
      }
    } catch {
      alert("An error occurred while logging out. Please try again.");
    }
  };

  // const loadJobs = async (page) => {
  //   try {
  //     const data = await fetchJobs(page);
  //     setJobs(data.data);
  //     setTotalPages(data.totalPages);
  //   } catch {
  //     alert("Failed to load jobs. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   loadJobs(currentPage);
  // }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header handleLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar handleLogout={handleLogout} />
        <main className="flex-1">
        <div className="p-4">
            <Projects />
          </div>
          <div className="mt-2">
            {/* Add margin-top to create space */}
            <JobsTable jobs={latestJobs} className="p-4" />
          </div>
        </main>
      </div>
    </div>
  );
  
};

export default Dashboard;
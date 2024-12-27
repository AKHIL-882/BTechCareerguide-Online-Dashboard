import React, { useState, useEffect } from "react";
import { logoutUser } from "../../Api.jsx";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Projects from "./Projects";
import JobsTable from "./JobsTable.jsx";
import axios from "axios";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data ? data.access_token : null;

    if (!accessToken) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const isLoggedOut = await logoutUser(accessToken);
      if (isLoggedOut) {
        localStorage.removeItem("data");
        alert("You have logged out successfully!");
        window.location.href = "/";
      }
    } catch {
      alert("An error occurred while logging out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data"));
        const accessToken = data ? data.access_token : null;

        if (!accessToken) {
          setError("No token found. Please log in again.");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/jobs", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setJobs(response.data.data); // Assuming `data.data` contains the jobs array
      } catch (err) {
        setError("Failed to fetch jobs. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
            <h1 className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>
            {loading ? (
              <p className="text-center">Loading jobs...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <JobsTable jobs={jobs.slice(0, 4)} className="p-4" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

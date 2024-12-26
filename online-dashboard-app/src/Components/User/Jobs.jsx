import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import JobsTable from "./JobsTable.jsx";
import axios from "axios";

const Jobs = ({ handleLogout }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data ? data.access_token : null;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/jobs",{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setJobs(response.data.data); // Assuming the API response structure has "data" key
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
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
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>
          {loading ? (
            <p className="text-center">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <JobsTable jobs={jobs} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;

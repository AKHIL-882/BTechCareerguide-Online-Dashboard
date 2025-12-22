import Projects from "./Projects";
import JobsTable from "./JobsTable.jsx";
import { getUserDetails } from "../../Api";
import { useFetchJobs } from "../../hooks/useJob.js";
import ShimmerJobs from "./ShimmerJobs.jsx";
import SectionHeading from "./SectionHeading.jsx";
import WelcomeCard from "./WelcomeCard.jsx";
import { FaAngleRight } from "react-icons/fa";
import StatsOverlayCards from "./StatsOverlayCards.jsx";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { jobListings, loading, error } = useFetchJobs();

  const [firstName, setFirstName] = useState([]);

  const localData = localStorage.getItem("data");
  const accessToken = JSON.parse(localData)?.access_token;

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUserDetails(accessToken);
        if (response?.name) {
          setFirstName(response.name);
        }
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <main className="m-3 flex-1 pt-8 lg:relative py-2 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <StatsOverlayCards />
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <SectionHeading text="trending jobs" />
          <Link
            className="text-violet-500 mb-4"
            to="/user/jobs"
            title="view all jobs"
          >
            <FaAngleRight size={20} />
          </Link>
        </div>
        {loading ? (
          <ShimmerJobs isDashBoard={true} />
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <JobsTable jobs={jobListings.slice(0, 3)} />
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <SectionHeading text="latest projects" />
          <Link
            className="text-violet-500 mb-4"
            to="/user/projects"
            title="view all projects"
          >
            <FaAngleRight size={20} />
          </Link>
        </div>
        <Projects isDashBoard={true} />
      </div>
    </main>
  );
};

export default Dashboard;

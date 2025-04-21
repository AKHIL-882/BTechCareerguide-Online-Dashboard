import React, { useState } from "react";
import JobsTable from "./JobsTable.jsx";
import { useFetchJobs } from "../../Api.jsx";
import Jobfilters from "./Jobfilters.jsx";
import ShimmerJobs from "./ShimmerJobs.jsx";

const Jobs = ({ handleLogout }) => {
  const { jobListings, loading, error } = useFetchJobs();
  const [filteredJobs, setFilteredJobs] = useState(null); // <-- NEW
  const jobsToShow = filteredJobs || jobListings; // <-- prioritize filtered jobs

  return (
    <main className="m-3 flex-1 pt-14 lg:relative lg:pl-56 py-2 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-baseline">
        <h2 className="text-lg text-blue-950 mb-2 relative flex items-center space-x-2 pb-2 font-display font-bold">
          <div className="flex items-center justify-center space-x-1">
            <span className="w-1 h-4 bg-violet-600"></span>
            <span className="text-gray-600">AVAILABLE JOBS</span>
          </div>
        </h2>
        <Jobfilters setFilteredJobs={setFilteredJobs} />
      </div>
      {loading ? (
        <ShimmerJobs />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <JobsTable jobs={jobsToShow} />
      )}
    </main>
  );
};

export default Jobs;

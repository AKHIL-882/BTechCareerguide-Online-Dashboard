import React, { useState } from "react";
import JobsTable from "./JobsTable.jsx";
import { useFetchJobs } from "../../hooks/useJob.js";
import Jobfilters from "./Jobfilters.jsx";
import ShimmerJobs from "./ShimmerJobs.jsx";

const Jobs = () => {
  const { jobListings, loading, error } = useFetchJobs();
  const [filteredJobs, setFilteredJobs] = useState(null); // <-- NEW
  const jobsToShow = filteredJobs || jobListings; // <-- prioritize filtered jobs

  return (
    <main className="m-3 flex-1 pt-12 lg:relative py-2 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex justify-end items-baseline">
        <Jobfilters
          setFilteredJobs={setFilteredJobs}
          filteredJobs={filteredJobs}
        />
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

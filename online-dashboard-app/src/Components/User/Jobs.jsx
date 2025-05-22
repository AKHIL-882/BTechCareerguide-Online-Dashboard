import React, { useState } from "react";
import JobsTable from "./JobsTable.jsx";
import { useFetchJobs } from "../../Api.jsx";
import Jobfilters from "./Jobfilters.jsx";
import ShimmerJobs from "./ShimmerJobs.jsx";
import SectionHeading from "./SectionHeading.jsx";

const Jobs = ({ handleLogout }) => {
  const { jobListings, loading, error } = useFetchJobs();
  const [filteredJobs, setFilteredJobs] = useState(null); // <-- NEW
  const jobsToShow = filteredJobs || jobListings; // <-- prioritize filtered jobs

  return (
    <main className="m-3 flex-1 pt-12 lg:relative py-2 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-baseline">
        <SectionHeading text="AVAILABLE JOBS" />
        <Jobfilters setFilteredJobs={setFilteredJobs} filteredJobs={filteredJobs} />
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

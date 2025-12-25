import React from "react";
import AddJobForm from "../Components/DashBoard/AddJobForm";
import JobListing from "../Components/DashBoard/JobListing";
import { useFetchJobs } from "../../../hooks/useJob.js";
const AdminJobs = () => {
  const { jobListings, setJobListings, loading, error } = useFetchJobs();
  const addJob = (newJob) => {
    setJobListings((prevJobs) => [newJob, ...prevJobs]);
  };
  return (
    <div className="pt-16 pb-8 px-4 lg:pl-60 w-screen space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-lg px-6 py-6">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,_#fff_0,_transparent_35%),radial-gradient(circle_at_bottom_right,_#fff_0,_transparent_30%)]" />
        <div className="relative space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Admin · Jobs
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">Manage Jobs</h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Post new roles, update openings, and keep listings fresh for
            candidates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Add a new job
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Share role details, compensation, and the apply link.
            </p>
            <AddJobForm addJob={addJob} />
          </div>
        </div>
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                All job postings
              </h2>
              <span className="text-xs text-gray-500">
                {jobListings?.length || 0} total
              </span>
            </div>
            <JobListing
              jobListings={jobListings}
              setJobListings={setJobListings}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;

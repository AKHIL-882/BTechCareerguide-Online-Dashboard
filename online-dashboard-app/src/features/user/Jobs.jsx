import React, { useState } from "react";
import { Filter, Flame, Compass, Sparkles } from "lucide-react";
import JobsTable from "./JobsTable.jsx";
import { useFetchJobs } from "../../hooks/useJob.js";
import Jobfilters from "./Jobfilters.jsx";
import ShimmerJobs from "./ShimmerJobs.jsx";

const Jobs = () => {
  const { jobListings, loading, error } = useFetchJobs();
  const [filteredJobs, setFilteredJobs] = useState(null); // <-- NEW
  const jobsToShow = filteredJobs || jobListings; // <-- prioritize filtered jobs

  return (
    <main className="m-3 flex-1 pt-12 lg:relative pb-10 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 min-h-screen space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white shadow-xl px-6 py-7 border border-white/10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_15%_20%,_#fff_0,_transparent_30%),radial-gradient(circle_at_80%_10%,_#fff_0,_transparent_35%),radial-gradient(circle_at_70%_80%,_#fff_0,_transparent_30%)]" />
        <div className="relative flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] bg-white/15 rounded-full px-3 py-1 backdrop-blur">
            <Sparkles size={14} /> Curated jobs
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Discover roles tailored for freshers and early-career talent.
          </h1>
          <p className="text-white/80 max-w-3xl">
            Filter by degree, batch, location, and more. We refresh opportunities often—keep an eye on the latest drops.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-white/80">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur flex items-center gap-2">
              <Flame size={14} /> {jobListings?.slice(0, 6)?.length || 0} new this week
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur flex items-center gap-2">
              <Compass size={14} /> {jobListings?.length || 0} live roles
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-200">
                <Filter size={14} /> Smart filters
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Tune by degree, batch, branch, job type, and experience. Categories stay visible while you browse.
              </p>
            </div>
            <div className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
              Click “Filters” to open the panel; use categories for quick presets.
            </div>
          </div>
          <Jobfilters setFilteredJobs={setFilteredJobs} filteredJobs={filteredJobs} />
        </div>

        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-4">
          {loading ? (
            <ShimmerJobs />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <JobsTable jobs={jobsToShow} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Jobs;

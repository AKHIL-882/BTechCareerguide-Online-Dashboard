import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Rocket, Briefcase, CalendarClock, Sparkles, ArrowUpRight } from "lucide-react";
import { useFetchJobs } from "../../hooks/useJob.js";
import ShimmerJobs from "./ShimmerJobs.jsx";
// import StatsOverlayCards from "./StatsOverlayCards.jsx";
import RelativeTime from "./RelativeTIme";

const Dashboard = () => {
  const { jobListings, loading, error } = useFetchJobs();
  const highlightJobs = useMemo(
    () => (jobListings || []).slice(0, 6),
    [jobListings],
  );

  return (
    <main className="flex-1 pt-20 pb-10 px-3 sm:px-4 md:px-6 lg:pt-24 lg:relative bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-xl px-6 py-7 border border-white/10">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,_#fff_0,_transparent_25%),radial-gradient(circle_at_80%_30%,_#fff_0,_transparent_35%)]" />
          <div className="relative grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                <Sparkles size={14} /> Career cockpit
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                Welcome back! Shape your next move with curated jobs, projects, and mock interviews.
              </h1>
              <p className="text-white/80 max-w-3xl text-sm md:text-base">
                Track opportunities, ship practice projects, and lock in a mock interview slot - all from one dashboard.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:-translate-y-0.5 transition"
                >
                  <Briefcase size={16} /> Browse jobs
                </Link>
                <Link
                  to="/calendar"
                  className="inline-flex items-center gap-2 bg-indigo-500/40 text-white border border-white/30 px-4 py-2 rounded-xl hover:bg-indigo-500/60 transition"
                >
                  <CalendarClock size={16} /> Book mock interview
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 h-full border border-white/20 shadow-lg space-y-3">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Active jobs</span>
                  <span className="text-lg font-semibold text-white">
                    {jobListings?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>New this week</span>
                  <span className="text-lg font-semibold text-white">
                    {jobListings?.slice(0, 6)?.length || 0}
                  </span>
                </div>
                <div className="rounded-xl bg-black/20 text-white px-4 py-3 space-y-2">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Rocket size={16} /> Quick actions
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Link to="/projects" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition">
                      Explore projects
                    </Link>
                    <Link to="/resume-jobs" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition">
                      Resume jobs
                    </Link>
                    <Link to="/company-qa" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition">
                      Company Q/A
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-700 dark:text-indigo-200">
                Trending
              </p>
              <h2 className="text-xl font-semibold">Fresh roles picked for you</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quick snapshot of the latest openings - jump in before they fill up.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-indigo-700 dark:text-indigo-200 text-sm font-semibold"
            >
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 w-full">
            {loading ? (
              <ShimmerJobs isDashBoard />
            ) : error ? (
              <p className="text-center text-red-500 text-sm">{error}</p>
            ) : highlightJobs.length ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr w-full">
                {highlightJobs.map((job) => (
                  <div
                    key={job.id}
                    className="w-full md:h-full relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950/30 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300 truncate">
                          {job.company_name}
                        </p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {job.role}
                        </h3>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                        {job.job_type || "Full-time"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3 text-xs">
                      {job.location ? (
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-200">
                          {job.location}
                        </span>
                      ) : null}
                      {job.batch && (
                        <span className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-200">
                          {job.batch}
                        </span>
                      )}
                      {job.degree && (
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                          {job.degree}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        <RelativeTime createdAt={job.created_at} />
                      </span>
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-700 dark:text-indigo-200 font-semibold"
                      >
                        Apply now <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">No jobs available at the moment.</p>
            )}
          </div>
        </section>
      </div>

      {/* <section className="mt-2">
        <StatsOverlayCards />
      </section> */}
    </main>
  );
};

export default Dashboard;

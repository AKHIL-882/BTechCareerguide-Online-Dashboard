import React, { useState, useEffect, useMemo } from "react";
import ReportModal from "./ReportModal";
import RelativeTime from "./RelativeTIme";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Flag,
  MapPin,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Layers,
  Clock3,
} from "lucide-react";

const JobsTable = ({ jobs, className = "", isJobshome, horizontal = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [pageNumbersToShow, setPageNumbersToShow] = useState(3);
  const [jumpPage, setJumpPage] = useState("");
  const [showJumpInput, setShowJumpInput] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setPageNumbersToShow(window.innerWidth < 640 ? 3 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHorizontal = !!horizontal;
  const totalPages = isHorizontal
    ? 1
    : Math.ceil((jobs?.length || 0) / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs?.slice(indexOfFirstJob, indexOfLastJob) || [];

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setShowJumpInput(false);
      setJumpPage("");
    } else {
      alert("Invalid page number");
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = pageNumbersToShow;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const [selectedJob, setSelectedJob] = useState(null);

  const openReportModal = (job) => setSelectedJob(job);
  const closeReportModal = () => setSelectedJob(null);

  const safeSplit = (value) =>
    typeof value === "string"
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

  const formatExperience = (exp) => {
    if (exp === 0 || exp === "0") return "Fresher";
    if (!exp && exp !== 0) return "Experience: NA";
    return `${exp} ${exp === 1 ? "year" : "years"} experience`;
  };

  const fallbackLogo =
    "https://api.dicebear.com/7.x/shapes/svg?seed=role&backgroundColor=b5c7ff,c4b5fd";

  const renderJobs = isHorizontal ? jobs || [] : currentJobs;

  const pageLabel = useMemo(
    () => `Page ${currentPage} of ${totalPages || 1}`,
    [currentPage, totalPages],
  );

  return (
    <div className={`${className} ${!isJobshome ? "text-slate-900 dark:text-slate-100" : ""}`}>
      <div
        className={
          isHorizontal
            ? "flex gap-4 overflow-x-auto pb-3 min-w-[280px]"
            : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        }
      >
        {renderJobs.map((job) => {
          const branches = safeSplit(job?.branch);
          const batches = safeSplit(job?.batch);
          const degrees = safeSplit(job?.degree);
          return (
            <div
              key={job.id}
              className="min-w-[280px] relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={job.company_logo || fallbackLogo}
                    alt={job.role}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                          {job.company_name}
                        </p>
                        <h3 className="text-lg font-semibold truncate">{job.role}</h3>
                      </div>
                      {!isJobshome && (
                        <button
                          onClick={() => openReportModal(job)}
                          className="text-gray-400 hover:text-red-500 transition"
                          title="Report Job"
                        >
                          <Flag size={14} />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      {job.job_type ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                          <Briefcase size={12} /> {job.job_type}
                        </span>
                      ) : null}
                      {job.location ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-200">
                          <MapPin size={12} /> {job.location}
                        </span>
                      ) : null}
                      {job.ctc ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                          <IndianRupee size={12} /> {job.ctc}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                        <Clock3 size={12} /> <RelativeTime createdAt={job.created_at} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {branches.map((b, idx) => (
                    <span
                      key={`branch-${idx}`}
                      className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-200"
                    >
                      {b}
                    </span>
                  ))}
                  {batches.map((b, idx) => (
                    <span
                      key={`batch-${idx}`}
                      className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200"
                    >
                      {b}
                    </span>
                  ))}
                  {degrees.map((d, idx) => (
                    <span
                      key={`degree-${idx}`}
                      className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 inline-flex items-center gap-1"
                    >
                      <GraduationCap size={12} /> {d}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-200 inline-flex items-center gap-1">
                    <Layers size={12} /> {formatExperience(job?.experience)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job?.apply_link?.includes("http") ? "External apply" : "Apply now"}
                  </span>
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-200 hover:underline"
                  >
                    Apply <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {selectedJob && <ReportModal job={selectedJob} onClose={closeReportModal} />}
      </div>

      {(renderJobs?.length || 0) === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400 font-sans">
          No jobs available at the moment.
        </div>
      )}

      {!isHorizontal && totalPages > 1 && (
        <div className="flex flex-wrap justify-between items-center gap-3 py-4 mt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">{pageLabel}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-indigo-700 dark:text-indigo-200 bg-white dark:bg-gray-900 disabled:opacity-50"
            >
              <ArrowLeft size={14} /> Prev
            </button>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentPage === pageNumber
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            {totalPages > pageNumbersToShow && !showJumpInput && (
              <button
                onClick={() => setShowJumpInput(true)}
                className="px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-200"
              >
                ...
              </button>
            )}
            {showJumpInput && (
              <form onSubmit={handleJumpToPage} className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  className="w-16 px-2 py-1 rounded-l-lg border border-indigo-500 text-indigo-700 dark:text-indigo-200 bg-white dark:bg-gray-900 focus:outline-none"
                  placeholder="Page"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded-r-lg bg-indigo-600 text-white"
                >
                  Go
                </button>
              </form>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-indigo-700 dark:text-indigo-200 bg-white dark:bg-gray-900 disabled:opacity-50"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsTable;

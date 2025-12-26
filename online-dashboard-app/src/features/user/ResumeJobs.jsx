import React, { useMemo, useState } from "react";
import { fetchResumeJobsApi, markJobAppliedApi } from "@/api/jobApi";
import Spinner from "@/shared/components/atoms/Spinner";
import { toast } from "react-toastify";
import RelativeTime from "./RelativeTIme";

const ResumeJobs = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(null);

  const accessToken =
    JSON.parse(localStorage.getItem("data") || "{}")?.access_token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("Upload a PDF resume first.");
      return;
    }
    if (!accessToken) {
      toast.error("Session expired. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    setLoading(true);
    try {
      const response = await fetchResumeJobsApi(formData, accessToken);
      const list = response.data?.data || response.data || [];
      setJobs(list);
      toast.success("Matched jobs generated from your resume.");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Unable to analyze resume. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    if (!job.apply_link) {
      toast.error("Apply link missing for this job.");
      return;
    }
    window.open(job.apply_link, "_blank", "noopener,noreferrer");
    if (!accessToken) return;
    setApplying(job.id);
    try {
      await markJobAppliedApi(job.id, accessToken);
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id ? { ...j, applied: true } : j,
        ),
      );
    } catch (error) {
      console.error("Failed to mark applied", error);
    } finally {
      setApplying(null);
    }
  };

  const maxScore = useMemo(
    () => Math.max(...jobs.map((j) => j.match_score || 0), 1),
    [jobs],
  );

  return (
    <div className="p-4 md:p-6 space-y-6 mt-10">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
          Resume Based Jobs
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Upload your resume to see jobs posted in the last week that match your
          skills. Applying will mark the card as inactive for you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 items-start md:items-center"
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-700 dark:text-gray-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner loading={true} color="#fff" size={16} />
                Analyzing...
              </span>
            ) : (
              "Find Jobs"
            )}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-slate-900 dark:text-slate-100">
            Matched Jobs
          </h3>
          <span className="text-xs text-gray-500">
            Showing jobs posted in the last 7 days
          </span>
        </div>

        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Company</th>
              <th className="py-2 pr-4">Location</th>
              <th className="py-2 pr-4">Match</th>
              <th className="py-2 pr-4">Posted</th>
              <th className="py-2 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  Upload a resume to see recommendations.
                </td>
              </tr>
            )}
            {jobs.map((job) => {
              const percent = Math.round(
                ((job.match_score || 0) / maxScore) * 100,
              );
              return (
                <tr
                  key={job.id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">
                    {job.role}
                  </td>
                  <td className="py-3 pr-4">{job.company_name}</td>
                  <td className="py-3 pr-4">{job.location}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {percent}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <RelativeTime createdAt={job.created_at} />
                  </td>
                  <td className="py-3 pr-0 text-right">
                    <button
                      onClick={() => handleApply(job)}
                      disabled={job.applied || applying === job.id}
                      className={`px-3 py-1 rounded-md text-sm font-semibold ${job.applied
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                        } ${applying === job.id ? "opacity-70" : ""}`}
                    >
                      {job.applied ? "Applied" : "Apply"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumeJobs;

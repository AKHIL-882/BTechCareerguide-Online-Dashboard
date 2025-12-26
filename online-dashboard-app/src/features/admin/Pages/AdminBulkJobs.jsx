import React, { useMemo, useState } from "react";
import { useBulkUploadJobs } from "@/hooks/useJob";
import {
  FileUp,
  Info,
  ListChecks,
  Loader2,
  Sparkles,
  ClipboardPaste,
} from "lucide-react";

const SAMPLE_PAYLOAD = `Company: Nova Tech
Role: Backend Engineer
Batch: 2024,2025
Degree: Bachelor's
Apply Link: https://careers.novatech.com/backend
CTC: 18-22 LPA
Location: Remote

Company Name: Pixel Labs
Position: Data Analyst
Batch: 2023
Qualification: Bachelor's, Master's
Application Link: https://pixellabs.com/apply
Job Type: Full-time`;

const AdminBulkJobs = () => {
  const [jobsText, setJobsText] = useState("");
  const [localError, setLocalError] = useState("");
  const [lastUploadMessage, setLastUploadMessage] = useState("");

  const { uploadJobs, loading, error } = useBulkUploadJobs();

  const detectedEntries = useMemo(() => {
    if (!jobsText.trim()) return 0;
    return jobsText.trim().split(/\n{2,}/).filter(Boolean).length;
  }, [jobsText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = jobsText.trim();

    if (!payload) {
      setLocalError("Add at least one job entry before uploading.");
      return;
    }

    setLocalError("");
    setLastUploadMessage("");

    try {
      const response = await uploadJobs(payload);
      if (response?.message) {
        setLastUploadMessage(response.message);
      } else {
        setLastUploadMessage("Jobs created successfully.");
      }
    } catch {
      // Error handled in the hook toast and state
    }
  };

  const handleUseTemplate = () => {
    if (!jobsText.trim()) {
      setJobsText(SAMPLE_PAYLOAD);
    } else {
      setJobsText((prev) => `${prev.trim()}\n\n${SAMPLE_PAYLOAD}`);
    }
  };

  return (
    <div className="pt-16 pb-8 px-4 lg:pl-60 w-screen space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-lg px-6 py-6">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,_#fff_0,_transparent_35%),radial-gradient(circle_at_bottom_right,_#fff_0,_transparent_30%)]" />
        <div className="relative space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Admin Aú Jobs
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Bulk job upload
          </h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Paste multiple job descriptions at once. We will map common labels
            (Company, Role, Batch, Apply Link, etc.) and push them to the
            database in one go.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-5">
            <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200">
                  Input
                </p>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Paste raw job entries
                </h2>
                <p className="text-xs text-gray-500">
                  Separate jobs with a blank line. Each line must be{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Label: Value
                  </span>
                  .
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 px-3 py-2 rounded-full border border-indigo-100 dark:border-indigo-800">
                <ListChecks size={14} />
                <span>{detectedEntries} job entries detected</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleUseTemplate}
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <ClipboardPaste size={16} />
                  Use sample format
                </button>
                {lastUploadMessage ? (
                  <div className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800">
                    <Sparkles size={14} />
                    <span>{lastUploadMessage}</span>
                  </div>
                ) : null}
              </div>

              <div className="relative">
                <textarea
                  value={jobsText}
                  onChange={(e) => setJobsText(e.target.value)}
                  placeholder={`Company: Acme Corp
Role: Frontend Engineer
Batch: 2024
Degree: Bachelor's
Apply Link: https://acme.com/jobs/fe
CTC: 20 LPA
Location: Remote`}
                  className="w-full min-h-[320px] rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60 text-sm font-mono text-gray-800 dark:text-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500 resize-vertical"
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                  Plain text only
                </div>
              </div>

              {(localError || error) && (
                <p className="text-sm text-red-600">
                  {localError || error}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FileUp size={16} />
                      Upload jobs
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setJobsText("")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Clear input
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-200">
              <Info size={18} />
              <h3 className="text-sm font-semibold">Accepted labels</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              We map common labels automatically. Use any of these per line:
            </p>
            <ul className="text-sm text-gray-800 dark:text-gray-100 grid grid-cols-2 gap-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Company / Company Name / Name
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Role / Position / Job Title
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Batch
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Degree / Qualification / Education
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Apply Link / URL
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                CTC / Salary / Package
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Location
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Job Type
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Branch / Field
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Logo
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-200">
              <Sparkles size={18} />
              <h3 className="text-sm font-semibold">Format example</h3>
            </div>
            <pre className="text-xs font-mono bg-gray-50 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 rounded-xl p-3 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
{`Company: Nova Tech
Role: Backend Engineer
Batch: 2024,2025
Degree: Bachelor's
Apply Link: https://careers.novatech.com/backend
CTC: 18-22 LPA
Location: Remote

Company Name: Pixel Labs
Position: Data Analyst
Batch: 2023
Qualification: Bachelor's, Master's
Application Link: https://pixellabs.com/apply
Job Type: Full-time`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Leave a blank line between jobs. Use comma-separated values for
              lists (e.g., multiple batches or degrees).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkJobs;

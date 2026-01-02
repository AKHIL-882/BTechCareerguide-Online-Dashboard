import React from "react";
import {
  getStatusLabel,
  isPendingStatus,
  normalizeProjectStatus,
} from "@/constants/projectStatus";

const ProjectEditModal = ({
  project,
  formData,
  onClose,
  onChange,
  onFileChange,
  onSubmit,
  isSubmitting,
}) => {
  if (!project) return null;

  const status = normalizeProjectStatus(project.project_status ?? project.status);
  const isPending = isPendingStatus(status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full border border-violet-100 dark:border-gray-800">
        <div className="flex items-start justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
              Update request
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Edit “{project.project_name}”
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Replace the brief, timeline, or stack while the project is still pending. Upload a fresh document to keep admins in sync.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Project title
              </label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Days to complete
              </label>
              <select
                name="days_to_complete"
                value={formData.days_to_complete}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              >
                <option value="">Select Days</option>
                <option value="0">Asap</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="14">In a Week</option>
                <option value="30">In a Month</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Technology
            </label>
            <input
              type="text"
              name="technical_skills"
              value={formData.technical_skills}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Project description
            </label>
            <textarea
              name="project_description"
              value={formData.project_description}
              onChange={onChange}
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Upload revised document
            </label>
            <input
              type="file"
              name="file"
              onChange={onFileChange}
              className="mt-1 w-full rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Replaces the previous file for this request. Accepted: pdf, docx, png, jpg (max 5MB).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Current status:{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {getStatusLabel(status)}
              </span>
              . Editing closes once the request moves beyond pending.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isPending || isSubmitting}
                className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Updating..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditModal;

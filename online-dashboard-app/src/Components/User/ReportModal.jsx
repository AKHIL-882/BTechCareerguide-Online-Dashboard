import { useState } from "react";
import { useReportJob } from "../../hooks/useJob.js";
import SectionHeading from "./SectionHeading";

const ReportModal = ({ job, onClose }) => {
  const [reason, setReason] = useState("Fraud");
  const [message, setMessage] = useState("");
  const { reportJob, loading } = useReportJob();
  const handleSubmit = (e) => {
    e.preventDefault();
    reportJob(job.id, reason, message, onClose);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90%] max-w-3xl shadow-xl border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-slate-100">
        <SectionHeading text={`REPORT JOB - ${job.company_name}`} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-violet-500 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              required
            >
              <option value="Fraud">Fraud</option>
              <option value="Expiry">Expiry</option>
              <option value="Link Not Working">Link Not Working</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-violet-500 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              maxLength={1000}
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;

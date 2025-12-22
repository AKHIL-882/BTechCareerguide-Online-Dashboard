import React from "react";

const PaymentForm = ({ projects, setShowPaymentForm, setShowProjects }) => (
  <div className="mt-8 border p-6 rounded-lg bg-white dark:bg-gray-900 shadow-lg border-gray-200 dark:border-gray-800 text-slate-900 dark:text-slate-100">
    <h2 className="text-lg text-violet-800 dark:text-violet-400 font-sans">
      Upload Payment Screenshot
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
      Please select the project and upload your payment screenshot.
    </p>
    <div className="mt-4">
      <select className="border-violet-300 p-2 rounded-md lg:w/full mb-4 w-4/6 bg-violet-200 dark:bg-violet-950/40 dark:text-violet-200 font-sans">
        <option>Select Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.project_name}>
            {project.project_name}
          </option>
        ))}
      </select>
      <button className="bg-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-600 font-sans">
        Upload File
      </button>
      <button
        className="bg-red-300 dark:bg-red-900/40 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-red-400 dark:hover:bg-red-800 ml-4 font-sans"
        onClick={() => {
          setShowPaymentForm(false);
          setShowProjects(true);
        }}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default PaymentForm;

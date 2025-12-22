import React from "react";
import PaymentComponent from "@/shared/components/organisms/PaymentComponent.jsx";

// Use the same STATUS_MAP as above

const STATUS_MAP = {
  0: "Accepted",
  1: "Pending",
  2: "Building",
  3: "Success",
  4: "Rejected",
  5: "Payment Success",
  6: "Refund",
  7: "Completed",
};

const ProjectCards = ({ projects }) => (
  <div className="lg:hidden mt-8">
    <h2 className="text-lg text-blue-950 dark:text-blue-300 mb-2 relative flex items-center space-x-2 pb-2 font-display font-bold">
      <div className="flex items-center justify-center space-x-1">
        <span className="w-1 h-4 bg-violet-600 dark:bg-violet-400"></span>
        <span>YOUR PROJECTS</span>
      </div>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {projects.map((project, index) => {
        const statusText = STATUS_MAP[project.project_status];
        const showPayBtn = statusText === "Completed";
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-slate-100"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg font-display">
                {project.project_name}
              </h4>
              <button
                className={`px-4 py-1 rounded text-white font-sans ${
                  statusText === "Pending"
                    ? "bg-yellow-500"
                    : statusText === "Completed"
                      ? "bg-green-500"
                      : statusText === "Building"
                        ? "bg-blue-500"
                        : statusText === "Rejected"
                          ? "bg-red-400"
                          : "bg-gray-500"
                }`}
              >
                {statusText}
              </button>
            </div>
            <p className="mt-2 text-sm font-sans">{project.technical_skills}</p>
            <p className="mt-2 text-sm font-sans">
              {project.project_description}
            </p>
            {showPayBtn && (
              <div className="mt-2">
                <PaymentComponent amount={500} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default ProjectCards;

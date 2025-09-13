import React from "react";
import PaymentComponent from "../PaymentComponent.jsx";
import SectionHeading from "./SectionHeading.jsx";

// The same STATUS_MAP you use in main file (import if you have it centralized)
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

const ProjectTable = ({ projects }) => (
  <div className="hidden lg:block mt-8">
    <SectionHeading text="Your projects" />
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-violet-200 text-violet-800 font-semibold whitespace-nowrap font-display">
          <th className="border px-4 py-2">Project Name</th>
          <th className="border px-4 py-2">Technical Skills</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => {
          const statusText = STATUS_MAP[project.project_status];
          // Only show Razorpay button if status is "Completed"
          const showPayBtn = statusText === "Completed";
          return (
            <tr key={index}>
              <td className="border px-4 py-2 font-sans">
                {project.project_name}
              </td>
              <td className="border px-4 py-2 font-sans">
                {project.technical_skills}
              </td>
              <td className="border px-4 py-2 font-sans">
                {project.project_description}
              </td>
              <td className="border px-4 py-2 font-sans flex items-center gap-2">
                <button
                  className={`px-4 py-2 rounded text-white font-sans ${
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
                {/* Show Payment Button only for Completed */}
                {showPayBtn && (
                  <div className="ml-2">
                    <PaymentComponent amount={500} />
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ProjectTable;

import React from "react";
import PaymentComponent from "@/shared/components/organisms/PaymentComponent.jsx";
import {
  getStatusBadgeClass,
  getStatusLabel,
  isPayableStatus,
  isPendingStatus,
  normalizeProjectStatus,
} from "@/constants/projectStatus";

const ProjectCards = ({ projects, onPaymentSuccess, onEditProject }) => (
  <div className="lg:hidden mt-8">
    <h2 className="text-lg text-blue-950 dark:text-blue-300 mb-2 relative flex items-center space-x-2 pb-2 font-display font-bold">
      <div className="flex items-center justify-center space-x-1">
        <span className="w-1 h-4 bg-violet-600 dark:bg-violet-400"></span>
        <span>YOUR PROJECTS</span>
      </div>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {projects.map((project, index) => {
        const statusCode = normalizeProjectStatus(
          project.project_status ?? project.status,
        );
        const statusText = getStatusLabel(statusCode);
        const badgeColor = getStatusBadgeClass(statusCode);
        const payableAmount = Number(project.payment_amount);
        const showPayBtn = isPayableStatus(statusCode);
        const canShowPayment =
          showPayBtn && Number.isFinite(payableAmount) && payableAmount > 0;
        return (
          <div
            key={project.id ?? index}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-slate-100"
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <h4 className="font-semibold text-lg font-display leading-tight">
                  {project.project_name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">#{project.id}</p>
              </div>
              <button
                className={`px-4 py-1 rounded text-white font-sans ${badgeColor}`}
              >
                {statusText}
              </button>
            </div>
            <p className="mt-3 text-sm font-sans font-semibold text-slate-800 dark:text-slate-200">
              {project.technical_skills}
            </p>
            <p className="mt-2 text-sm font-sans text-slate-700 dark:text-slate-200">
              {project.project_description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {project.document_name && project.document_name !== "File Not Found" ? (
                <a
                  href={project.document_name}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-200"
                >
                  View file <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  No document uploaded
                </span>
              )}
              {isPendingStatus(statusCode) && (
                <button
                  type="button"
                  onClick={() => onEditProject?.(project)}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet-500/30"
                >
                  Update request
                </button>
              )}
            </div>
            {showPayBtn && (
              <div className="mt-2 space-y-2">
                <p className="text-sm font-semibold">
                  Payable amount: INR{" "}
                  {Number.isFinite(payableAmount) ? payableAmount : "TBD"}
                </p>
                {canShowPayment ? (
                    <PaymentComponent
                      projectId={project.id}
                      amount={payableAmount}
                      projectStatus={statusCode}
                      userId={project.user_id}
                      onPaymentSuccess={onPaymentSuccess}
                    />
                ) : (
                  <p className="text-xs text-red-500">
                    Payment amount not set. Please contact support.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default ProjectCards;

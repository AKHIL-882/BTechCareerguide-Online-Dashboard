import React from "react";
import PaymentComponent from "@/shared/components/organisms/PaymentComponent.jsx";
import SectionHeading from "./SectionHeading.jsx";
import {
  getStatusBadgeClass,
  getStatusLabel,
  isPayableStatus,
  isPendingStatus,
  normalizeProjectStatus,
} from "@/constants/projectStatus";

const ProjectTable = ({ projects, onPaymentSuccess, onEditProject }) => (
  <div className="hidden lg:block mt-8 overflow-x-auto">
    <SectionHeading text="Your projects" />
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
      <table className="min-w-[880px] w-full text-slate-900 dark:text-slate-100">
        <thead className="bg-gradient-to-r from-violet-100 via-indigo-100 to-blue-50 dark:from-violet-950/50 dark:via-indigo-950/40 dark:to-blue-950/40 font-semibold font-display">
          <tr className="text-left">
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Stack</th>
            <th className="px-4 py-3 w-2/6">Description</th>
            <th className="px-4 py-3">Document</th>
            <th className="px-4 py-3">Status & Payments</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const statusCode = normalizeProjectStatus(
              project.project_status ?? project.status,
            );
            const statusText = getStatusLabel(statusCode);
            const badgeColor = getStatusBadgeClass(statusCode);
            const showPayBtn = isPayableStatus(statusCode);
            const payableAmount = Number(project.payment_amount);
            const canShowPayment =
              showPayBtn && Number.isFinite(payableAmount) && payableAmount > 0;
            const hasDocument =
              project.document_name && project.document_name !== "File Not Found";

            return (
              <tr
                key={project.id ?? index}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-950 border-t border-gray-100 dark:border-gray-800 align-top"
              >
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {project.project_name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    #{project.id}
                  </p>
                </td>
                <td className="px-4 py-4 text-sm font-sans text-slate-700 dark:text-slate-200">
                  {project.technical_skills}
                </td>
                <td className="px-4 py-4 text-sm font-sans text-slate-700 dark:text-slate-200">
                  {project.project_description}
                </td>
                <td className="px-4 py-4 text-sm">
                  {hasDocument ? (
                    <a
                      href={project.document_name}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-200"
                    >
                      View file
                      <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Not uploaded
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex flex-col gap-2 min-w-[220px]">
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeColor}`}
                    >
                      {statusText}
                    </span>
                    {showPayBtn && (
                      <div className="space-y-2 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-3 py-2">
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
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
                </td>
                <td className="px-4 py-4 text-right text-sm">
                  {isPendingStatus(statusCode) ? (
                    <button
                      type="button"
                      onClick={() => onEditProject?.(project)}
                      className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/30 hover:opacity-95"
                    >
                      Update request
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Edits disabled once review starts
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProjectTable;

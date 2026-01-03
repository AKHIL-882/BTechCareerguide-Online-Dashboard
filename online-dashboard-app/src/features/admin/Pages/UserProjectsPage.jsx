import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useFetchProjects,
  handleStatusChange,
} from "../../../hooks/useProject.js";
import {
  fetchProjectAccessContextApi,
  grantProjectAccessApi,
} from "@/api/projectApi";
import {
  PROJECT_STATUS,
  getStatusLabel,
  isPayableStatus,
  normalizeProjectStatus,
} from "@/constants/projectStatus";
import { toast } from "react-toastify";
import {
  BadgeCheck,
  CreditCard,
  Hammer,
  Hourglass,
  Inbox,
} from "lucide-react";

const UserProjectsPage = ({ isDashboard = false }) => {
  const { projectsListings, setProjectsListings, loading } =
    useFetchProjects(isDashboard);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDocument, setPreviewDocument] = useState(null); // State to manage document preview
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [grantModal, setGrantModal] = useState({
    open: false,
    project: null,
    context: null,
    repo: "",
    loading: false,
    submitting: false,
  });

  const itemsPerPage = 5;

  // Filter projects where is_admin_project is 0
  const filteredProjects = projectsListings.filter(
    (project) => project.is_admin_project === 0,
  );

  // Sort the filtered projects in descending order
  const sortedProjects = filteredProjects.sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const currentItems = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDocumentPreview = (projectId, documentName) => {
    if (!documentName) return;

    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}/storage/userProjectFiles/${documentName}`;

    window.open(fileUrl, "_blank");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewDocument(null);
  };

  const [statusUpdates, setStatusUpdates] = useState({});
  const [paymentAmounts, setPaymentAmounts] = useState({});

  const handleStatusSelect = (projectId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [projectId]: Number(newStatus),
    }));
  };

  const handlePaymentAmountChange = (projectId, amount) => {
    setPaymentAmounts((prev) => ({
      ...prev,
      [projectId]: amount,
    }));
  };

  const openGrantModal = async (project) => {
    const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;
    if (!accessToken) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    setGrantModal({
      open: true,
      project,
      context: null,
      repo: "",
      loading: true,
      submitting: false,
    });

    try {
      const res = await fetchProjectAccessContextApi(project.id, accessToken);
      const payload = res.data?.data || res.data || {};
      setGrantModal((prev) => ({
        ...prev,
        context: payload,
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch access context", error);
      toast.error("Unable to load access details for this project.");
      setGrantModal({
        open: false,
        project: null,
        context: null,
        repo: "",
        loading: false,
        submitting: false,
      });
    }
  };

  const closeGrantModal = () => {
    setGrantModal({
      open: false,
      project: null,
      context: null,
      repo: "",
      loading: false,
      submitting: false,
    });
  };

  const handleGrantAccess = async () => {
    if (!grantModal.project) return;
    const repo = grantModal.repo.trim();
    if (!repo) {
      toast.error("Enter a GitHub repo (owner/repo or full URL).");
      return;
    }
    const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;
    if (!accessToken) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    setGrantModal((prev) => ({ ...prev, submitting: true }));

    try {
      await grantProjectAccessApi(grantModal.project.id, repo, accessToken);
      toast.success("Access granted and recorded.");
      setProjectsListings((prev) =>
        prev.map((p) =>
          p.id === grantModal.project.id
            ? { ...p, project_status: PROJECT_STATUS.DELIVERED }
            : p,
        ),
      );
      closeGrantModal();
    } catch (error) {
      console.error("Failed to grant access", error);
      toast.error(
        error?.response?.data?.message ||
          "Could not grant GitHub access. Please retry.",
      );
    } finally {
      setGrantModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleStatusSave = async (project) => {
    const nextStatus = normalizeProjectStatus(
      statusUpdates[project.id] ?? project.project_status,
    );

    if (nextStatus === null) {
      toast.error("Select a valid status before saving.");
      return;
    }
    const nextAmount =
      paymentAmounts[project.id] ?? project.payment_amount ?? null;
    const normalizedAmount =
      nextAmount === null || nextAmount === ""
        ? null
        : Number(nextAmount);

    if (
      nextStatus === PROJECT_STATUS.AWAITING_PAYMENT &&
      (!nextAmount || Number.isNaN(normalizedAmount))
    ) {
      toast.error("Set a valid payment amount before enabling payment.");
      return;
    }

    const updatedProject = await handleStatusChange(
      project.id,
      nextStatus,
      normalizedAmount,
    );

    const appliedProjectStatus = normalizeProjectStatus(
      updatedProject?.project_status ?? nextStatus,
    );
    const appliedPaymentAmount =
      updatedProject?.payment_amount ?? normalizedAmount ?? null;

    const appliedProject = {
      project_status: appliedProjectStatus,
      payment_amount: appliedPaymentAmount,
    };

    setProjectsListings((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? {
              ...p,
              project_status: appliedProject.project_status,
              payment_amount: appliedProject.payment_amount,
            }
          : p,
      ),
    );
    setStatusUpdates((prev) => {
      const next = { ...prev };
      delete next[project.id];
      return next;
    });
    setPaymentAmounts((prev) => ({
      ...prev,
      [project.id]: appliedProject.payment_amount,
    }));
  };

  const stats = [
    {
      label: "Total",
      value: filteredProjects.length,
      Icon: Inbox,
      tone: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200",
    },
    {
      label: "Awaiting Payment",
      value: filteredProjects.filter(
        (p) =>
          normalizeProjectStatus(p.project_status) ===
          PROJECT_STATUS.AWAITING_PAYMENT,
      ).length,
      Icon: CreditCard,
      tone: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
    },
    {
      label: "Building",
      value: filteredProjects.filter(
        (p) =>
          normalizeProjectStatus(p.project_status) === PROJECT_STATUS.BUILDING,
      ).length,
      Icon: Hammer,
      tone: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
    },
    {
      label: "Pending",
      value: filteredProjects.filter(
        (p) =>
          normalizeProjectStatus(p.project_status) === PROJECT_STATUS.PENDING,
      ).length,
      Icon: Hourglass,
      tone: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    },
    {
      label: "Delivered",
      value: filteredProjects.filter(
        (p) =>
          normalizeProjectStatus(p.project_status) === PROJECT_STATUS.DELIVERED,
      ).length,
      Icon: BadgeCheck,
      tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
    },
  ];

  const StatusBadge = ({ status }) => {
    const toneMap = {
      [PROJECT_STATUS.PENDING]:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
      [PROJECT_STATUS.ACCEPTED]:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
      [PROJECT_STATUS.BUILDING]:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
      [PROJECT_STATUS.AWAITING_PAYMENT]:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
      [PROJECT_STATUS.PAYMENT_SUCCESS]:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
      [PROJECT_STATUS.DELIVERED]:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
      [PROJECT_STATUS.REJECTED]:
        "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
      [PROJECT_STATUS.REFUNDED]:
        "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-200",
    };
    const normalized = normalizeProjectStatus(status);
    return (
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${toneMap[normalized] ?? "bg-gray-100 text-gray-700"}`}
      >
        {getStatusLabel(normalized)}
      </span>
    );
  };

  const EmptyOrLoading = () => {
    if (loading) return <div className="text-center mt-6">Loading...</div>;
    if (!filteredProjects.length)
      return <div className="text-center mt-6">No projects found.</div>;
    return null;
  };

  if (isDashboard) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent User Projects</h2>
          <Link
            to="/admin/user-projects"
            className="text-sm text-indigo-600 hover:underline"
          >
            View all
          </Link>
        </div>
        <EmptyOrLoading />
        {!loading && filteredProjects.length > 0 && (
          <div className="space-y-3">
            {currentItems.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{project.project_name}</div>
                  <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    {getStatusLabel(project.project_status)}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {project.project_description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center pt-16 pb-10 px-4 lg:pl-60 w-screen">
      <div className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl w-full max-w-6xl border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">User Projects</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Review submissions, set payment amounts, and update statuses.
            </p>
          </div>
          <Link
            to="/admin"
            className="text-sm text-indigo-600 hover:underline"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stats.map(({ label, value, Icon, tone }) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 ${tone}`}
            >
              <div className="p-2 rounded-lg bg-white/60 dark:bg-white/10 text-inherit">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide">{label}</p>
                <p className="text-lg font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <EmptyOrLoading />

        {!loading && filteredProjects.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg hidden sm:block">
              <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-800">
                <thead>
                  <tr className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100">
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">#</th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                      Project Name
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                      Description
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                      Days to Complete
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                      Technical Skills
                    </th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">Document</th>
                    <th className="border border-gray-200 dark:border-gray-800 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((project, index) => {
                    const resolvedStatus = normalizeProjectStatus(
                      statusUpdates[project.id] ?? project.project_status,
                    );
                    const amountValue =
                      paymentAmounts[project.id] ??
                      project.payment_amount ??
                      "";

                    return (
                      <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-center">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {project.project_name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {project.user?.email ?? ""}
                          </div>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-3">
                            {project.project_description}
                          </p>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-center">
                          {project.days_to_complete}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2">
                          {project.technical_skills}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-center">
                          {project.document_name ? (
                            <button
                              onClick={() =>
                                handleDocumentPreview(
                                  project.id,
                                  project.document_name,
                                )
                              }
                              className="text-indigo-600 hover:text-indigo-700 underline"
                            >
                              View Document
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-800 px-4 py-2 text-center">
                          {isPayableStatus(resolvedStatus) && (
                            <div className="mb-2">
                              <input
                                type="number"
                                min="1"
                                className="border px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Amount in INR"
                                value={amountValue}
                                onChange={(e) =>
                                  handlePaymentAmountChange(
                                    project.id,
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          )}
                          <select
                          value={String(resolvedStatus)}
                            onChange={(e) =>
                              handleStatusSelect(project.id, e.target.value)
                            }
                            className="border px-4 py-2"
                          >
                            <option value={PROJECT_STATUS.PENDING}>
                              {getStatusLabel(PROJECT_STATUS.PENDING)}
                            </option>
                            <option value={PROJECT_STATUS.ACCEPTED}>
                              {getStatusLabel(PROJECT_STATUS.ACCEPTED)}
                            </option>
                            <option value={PROJECT_STATUS.BUILDING}>
                              {getStatusLabel(PROJECT_STATUS.BUILDING)}
                            </option>
                            <option value={PROJECT_STATUS.AWAITING_PAYMENT}>
                              {getStatusLabel(PROJECT_STATUS.AWAITING_PAYMENT)}
                            </option>
                            <option value={PROJECT_STATUS.PAYMENT_SUCCESS}>
                              {getStatusLabel(PROJECT_STATUS.PAYMENT_SUCCESS)}
                            </option>
                            <option value={PROJECT_STATUS.DELIVERED}>
                              {getStatusLabel(PROJECT_STATUS.DELIVERED)}
                            </option>
                            <option value={PROJECT_STATUS.REJECTED}>
                              {getStatusLabel(PROJECT_STATUS.REJECTED)}
                            </option>
                            <option value={PROJECT_STATUS.REFUNDED}>
                              {getStatusLabel(PROJECT_STATUS.REFUNDED)}
                            </option>
                          </select>
                          <button
                            onClick={() => handleStatusSave(project)}
                            className="ml-2 px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                          >
                            Save
                          </button>
                          <div className="mt-2 flex justify-center">
                            <StatusBadge status={resolvedStatus} />
                          </div>
                          {resolvedStatus === PROJECT_STATUS.PAYMENT_SUCCESS && (
                            <button
                              onClick={() => openGrantModal(project)}
                              className="mt-2 inline-flex items-center justify-center w-full px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                            >
                              Grant GitHub access
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {grantModal.open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Grant GitHub access
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add the user as a collaborator after successful payment.
                </p>
              </div>
              <button
                onClick={closeGrantModal}
                className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>

            {grantModal.loading ? (
              <p className="text-sm text-gray-500">Loading payment details...</p>
            ) : (
              <>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Project</span>
                    <span className="font-semibold">
                      {grantModal.context?.project_name || grantModal.project?.project_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">User GitHub</span>
                    <span className="font-semibold">
                      {grantModal.context?.user?.github_username || "Missing"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment ID</span>
                    <span className="font-semibold">
                      {grantModal.context?.razorpay_payment_id || "—"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Repository (owner/repo or full URL)
                  </label>
                  <input
                    type="text"
                    value={grantModal.repo}
                    onChange={(e) =>
                      setGrantModal((prev) => ({ ...prev, repo: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. my-org/cool-project"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={closeGrantModal}
                    className="px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGrantAccess}
                    disabled={
                      grantModal.submitting ||
                      !grantModal.context?.user?.github_username ||
                      !grantModal.repo.trim()
                    }
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {grantModal.submitting ? "Granting..." : "Grant access"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal for document preview */}
      {isModalOpen && previewDocument && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Close
            </button>
            <h2 className="text-lg font-semibold mb-4">Document Preview</h2>
            <iframe
              src={previewDocument}
              className="w-full h-full border"
              title="Document Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProjectsPage;

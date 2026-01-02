export const PROJECT_STATUS = {
  ACCEPTED: 0,
  PENDING: 1,
  BUILDING: 2,
  DELIVERED: 3,
  REJECTED: 4,
  PAYMENT_SUCCESS: 5,
  REFUNDED: 6,
  AWAITING_PAYMENT: 8,
};

const STATUS_NAME_MAP = {
  accepted: PROJECT_STATUS.ACCEPTED,
  pending: PROJECT_STATUS.PENDING,
  building: PROJECT_STATUS.BUILDING,
  delivered: PROJECT_STATUS.DELIVERED,
  rejected: PROJECT_STATUS.REJECTED,
  payment_success: PROJECT_STATUS.PAYMENT_SUCCESS,
  paymentsuccess: PROJECT_STATUS.PAYMENT_SUCCESS,
  paymentsuccessful: PROJECT_STATUS.PAYMENT_SUCCESS,
  refunded: PROJECT_STATUS.REFUNDED,
  awaiting_payment: PROJECT_STATUS.AWAITING_PAYMENT,
  awaitingpayment: PROJECT_STATUS.AWAITING_PAYMENT,
  awaitingpaymentstatus: PROJECT_STATUS.AWAITING_PAYMENT,
  awaitingpaymentrequest: PROJECT_STATUS.AWAITING_PAYMENT,
};

export const STATUS_LABELS = {
  [PROJECT_STATUS.ACCEPTED]: "Accepted",
  [PROJECT_STATUS.PENDING]: "Pending",
  [PROJECT_STATUS.BUILDING]: "Building",
  [PROJECT_STATUS.DELIVERED]: "Delivered",
  [PROJECT_STATUS.REJECTED]: "Rejected",
  [PROJECT_STATUS.PAYMENT_SUCCESS]: "Payment Success",
  [PROJECT_STATUS.REFUNDED]: "Refunded",
  [PROJECT_STATUS.AWAITING_PAYMENT]: "Awaiting Payment",
};

export const STATUS_TOASTS = {
  [PROJECT_STATUS.PENDING]:
    "Your project has been submitted and is pending review",
  [PROJECT_STATUS.ACCEPTED]: "Your project has been accepted",
  [PROJECT_STATUS.BUILDING]:
    "Your project is currently under development",
  [PROJECT_STATUS.AWAITING_PAYMENT]:
    "Your project is ready. Please complete the payment to proceed",
  [PROJECT_STATUS.PAYMENT_SUCCESS]: "Payment received successfully",
  [PROJECT_STATUS.DELIVERED]:
    "Project access has been delivered via GitHub",
  [PROJECT_STATUS.REJECTED]: "Project rejected / stopped",
  [PROJECT_STATUS.REFUNDED]: "Payment refunded (if applicable)",
};

export const STATUS_BADGE_CLASS = {
  [PROJECT_STATUS.PENDING]: "bg-yellow-500",
  [PROJECT_STATUS.ACCEPTED]: "bg-emerald-600",
  [PROJECT_STATUS.BUILDING]: "bg-blue-500",
  [PROJECT_STATUS.AWAITING_PAYMENT]: "bg-amber-600",
  [PROJECT_STATUS.PAYMENT_SUCCESS]: "bg-green-600",
  [PROJECT_STATUS.DELIVERED]: "bg-indigo-600",
  [PROJECT_STATUS.REJECTED]: "bg-red-500",
  [PROJECT_STATUS.REFUNDED]: "bg-slate-500",
};

export const normalizeProjectStatus = (status) => {
  if (status === null || status === undefined) return PROJECT_STATUS.PENDING;

  if (typeof status === "object") {
    const possibleValue = status?.value ?? status?.id ?? status?.code;
    if (possibleValue !== undefined) {
      const numericValue = Number(possibleValue);
      if (!Number.isNaN(numericValue) && STATUS_LABELS.hasOwnProperty(numericValue)) {
        return numericValue;
      }
    }

    const possibleKey =
      status?.key ??
      status?.slug ??
      status?.name ??
      status?.label ??
      status?.status;
    if (typeof possibleKey === "string") {
      const normalizedFromKey = normalizeProjectStatus(possibleKey);
      if (normalizedFromKey !== PROJECT_STATUS.PENDING || possibleKey) {
        return normalizedFromKey;
      }
    }
  }

  const numeric = Number(status);
  if (!Number.isNaN(numeric) && STATUS_LABELS.hasOwnProperty(numeric)) {
    return numeric;
  }

  if (typeof status === "string") {
    const normalizedKey = status
      .trim()
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toLowerCase()
      .replace(/\s+/g, "_");
    if (STATUS_NAME_MAP[normalizedKey] !== undefined) {
      return STATUS_NAME_MAP[normalizedKey];
    }
  }

  return PROJECT_STATUS.PENDING;
};

export const isPayableStatus = (status) =>
  normalizeProjectStatus(status) === PROJECT_STATUS.AWAITING_PAYMENT;

export const isPendingStatus = (status) =>
  normalizeProjectStatus(status) === PROJECT_STATUS.PENDING;

export const getStatusLabel = (status) => {
  const normalized = normalizeProjectStatus(status);
  console.log("status in getStatusLabel:", status, "normalized:", normalized);
  return STATUS_LABELS[normalized] ?? "Unknown";
};

export const getStatusBadgeClass = (status) => {
  const normalized = normalizeProjectStatus(status);
  return STATUS_BADGE_CLASS[normalized] ?? "bg-slate-500";
};

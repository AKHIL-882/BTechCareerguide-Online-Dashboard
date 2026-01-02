import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { submitGithubId } from "@/Api";
import { paymentInitiator, verifyPaymentApi } from "@/api/projectApi";
import { getStoredAccessToken } from "@/utils/auth";

const isEmail = (value) => /\S+@\S+\.\S+/.test(value);
const isLikelyGithubUsername = (value) =>
  /^[a-zA-Z0-9-]{1,39}$/.test(value.trim());

const PaymentComponent = ({
  projectId,
  amount,
  projectStatus,
  onPaymentSuccess,
  userId: userIdProp,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [githubEmail, setGithubEmail] = useState("");
  const [hasGithubEmail, setHasGithubEmail] = useState(false);
  const [userId, setUserId] = useState(userIdProp ?? null);
  const displayAmount = Number(amount) || amount || 0;

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script?.remove();
    };
  }, []);

  useEffect(() => {
    if (userIdProp) {
      setUserId(userIdProp);
    }
  }, [userIdProp]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("data") || "{}");
    const emailCandidate =
      stored?.github_email ||
      stored?.github_username ||
      stored?.email ||
      "";
    setGithubEmail(emailCandidate);
    setHasGithubEmail(Boolean(emailCandidate));
    if (!userIdProp) {
      setUserId(stored?.user_id ?? null);
    }
  }, []);

  const ensureUserId = () => {
    if (userId) return userId;
    const stored = JSON.parse(localStorage.getItem("data") || "{}");
    const storedId =
      userIdProp ??
      stored?.user_id ??
      stored?.id ??
      stored?.user?.id ??
      stored?.user?.user_id ??
      stored?.data?.user_id ??
      stored?.data?.id ??
      null;
    if (storedId) setUserId(storedId);
    return storedId ?? null;
  };

  const validateGithubIdentity = async (value) => {
    const trimmed = value?.trim();
    if (!trimmed) return { ok: false, normalized: "" };

    if (isEmail(trimmed)) {
      return { ok: true, normalized: trimmed };
    }

    if (!isLikelyGithubUsername(trimmed)) {
      return { ok: false, normalized: "" };
    }

    // Try to validate via GitHub API; if it fails, still allow to avoid blocking purchase.
    try {
      const res = await fetch(`https://api.github.com/users/${trimmed}`);
      if (res.ok) {
        return { ok: true, normalized: trimmed };
      }
    } catch (err) {
      console.warn("GitHub validation skipped (network/error):", err);
    }
    // Fallback: accept username pattern even if validation failed (better UX).
    return { ok: true, normalized: trimmed };
  };

  const persistGithubEmail = async () => {
    if (hasGithubEmail) return true;

    const validation = await validateGithubIdentity(githubEmail);
    if (!validation.ok || !validation.normalized) {
      toast.error("Enter a valid GitHub email or username before paying.");
      return false;
    }

    const stored = JSON.parse(localStorage.getItem("data") || "{}");
    const accessToken = getStoredAccessToken();
    const ensuredUserId =
      userId || stored?.user_id || ensureUserId();

    if (!accessToken || !ensuredUserId) {
      toast.error("Session missing. Please log in again.");
      return false;
    }

    try {
      setIsSavingEmail(true);
      await submitGithubId(ensuredUserId, validation.normalized);
      setHasGithubEmail(true);
      localStorage.setItem(
        "data",
        JSON.stringify({
          ...stored,
          github_email: validation.normalized,
          github_username: isEmail(validation.normalized)
            ? undefined
            : validation.normalized,
        }),
      );
      toast.success("GitHub identity saved.");
      return true;
    } catch (error) {
      console.error("GitHub email save failed:", error);
      toast.error(
        error?.response?.data?.message ||
        "Could not save GitHub email. Please retry.",
      );
      return false;
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handlePayment = async () => {
    const normalizedAmount = Number(amount);
    const normalizedProjectId = Number(projectId);
    const normalizedStatus =
      typeof projectStatus === "number"
        ? projectStatus
        : undefined;

    if (
      !normalizedAmount ||
      Number.isNaN(normalizedAmount) ||
      normalizedAmount <= 0 ||
      !normalizedProjectId
    ) {
      toast.error("Payment cannot be initiated. Amount or project is missing.");
      return;
    }

    const accessToken = getStoredAccessToken();
    if (!accessToken) {
      toast.error("Session expired. Please login again.");
      return;
    }

    if (!hasGithubEmail) {
      const saved = await persistGithubEmail();
      if (!saved) return;
    }

    if (typeof window === "undefined" || !window.Razorpay) {
      toast.error("Payment gateway not loaded yet. Please retry in a moment.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await paymentInitiator(accessToken, {
        amount: normalizedAmount,
        projectId: normalizedProjectId,
        projectStatus: normalizedStatus,
      });

      const dataFromAPI = res.data.data;
      const prefillEmail = githubEmail || dataFromAPI?.prefill?.email || "";
      const options = {
        key: dataFromAPI.key,
        amount: normalizedAmount * 100,
        currency: dataFromAPI.currency ?? "INR",
        name: "Project Payment",
        description: "Complete your project payment",
        order_id: dataFromAPI.order_id,
        handler: async function (response) {
          try {
            await verifyPaymentApi(accessToken, {
              project_id: projectId,
              razorpay_payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id ?? dataFromAPI.order_id,
              amount: normalizedAmount,
              github_email: githubEmail,
            });
            onPaymentSuccess?.();
          } catch (verificationError) {
            console.error("Payment verification failed:", verificationError);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: dataFromAPI?.prefill?.name ?? "",
          email: prefillEmail,
          contact: dataFromAPI?.prefill?.contact ?? "",
        },
        theme: {
          color: "#7c3aed",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
          emi: true,
          paylater: true,
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response);
        toast.error("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err?.response?.data?.message || "Unable to start payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {!hasGithubEmail && (
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            GitHub email (required for repo access)
          </label>
          <input
            type="email"
            value={githubEmail}
            onChange={(e) => setGithubEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="you@users.noreply.github.com"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            We use this email to grant repository access after payment.
          </p>
        </div>
      )}
      <button
        onClick={handlePayment}
        disabled={isLoading || isSavingEmail}
        className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-md font-sans disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading
          ? "Processing..."
          : hasGithubEmail
            ? `Pay INR ${displayAmount}`
            : "Save email & pay"}
      </button>
    </div>
  );
};

export default PaymentComponent;

import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  resendVerificationApi,
  verifyEmailApi,
} from "@/api/authApi";
import Spinner from "@/shared/components/atoms/Spinner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailFromQuery = searchParams.get("email") || "";
  const tokenFromQuery = searchParams.get("token") || "";
  const codeFromQuery = searchParams.get("code") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [token, setToken] = useState(tokenFromQuery);
  const [otp, setOtp] = useState(codeFromQuery);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const isReadyToVerify = useMemo(
    () => Boolean(email && token && otp.length === 6),
    [email, token, otp],
  );

  const persistSession = (data) => {
    const { roles } = data;
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("roles", roles);

    if (roles === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    setLoading(true);

    try {
      const response = await verifyEmailApi({ email, otp, token });
      const payload = response.data || response;

      toast.success(payload?.message || "Email verified!");
      persistSession(payload);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Verification failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Enter your email to resend the code.");
      return;
    }

    setResending(true);
    try {
      const response = await resendVerificationApi(email);
      const payload = response.data || response;

      if (payload?.verification_token) {
        setToken(payload.verification_token);
      }

      toast.success("Verification email sent.");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Unable to resend verification email.";
      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  // Auto-submit when code arrives via magic link
  const autoVerifiedRef = React.useRef(false);
  React.useEffect(() => {
    if (!autoVerifiedRef.current && isReadyToVerify) {
      autoVerifiedRef.current = true;
      handleVerify();
    }
  }, [isReadyToVerify]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            Secure Sign-in
          </p>
          <h1 className="text-2xl font-display text-gray-900">
            Verify your email
          </h1>
          <p className="text-sm text-gray-600">
            We sent a 6-digit code and a magic link to your inbox. Enter the
            code to finish signing in.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              6-digit code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center tracking-[0.4em] font-mono text-lg"
              inputMode="numeric"
              pattern="\d{6}"
              placeholder="123456"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isReadyToVerify || loading}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner loading={loading} color="#fff" size={18} />
                Verifying...
              </span>
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Didn&apos;t get the email?</span>
          <button
            type="button"
            onClick={handleResend}
            className="text-indigo-600 font-semibold hover:text-indigo-800 disabled:opacity-60"
            disabled={resending}
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full text-sm text-center text-gray-500 hover:text-gray-700"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

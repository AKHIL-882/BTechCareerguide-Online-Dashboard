import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useResetPassword } from "../../Api";
import { useSendResetCode } from "../../Api";

const ForgotPasswordForm = ({ onBack,isError}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { loading: sending, error: sendError, sendResetCode } = useSendResetCode();
  const { loading: resetting, error: resetError, resetPassword } = useResetPassword();

  const handleSendCode = () => {
    if (!email) return isError("Email is required");
    isError("");
    sendResetCode(email, () => setStep(2));
  };

  const handleResetPassword = () => {
    if (!code) return isError("Code is required");
    if (!newPassword || !confirmPassword) return isError("Both fields are required");
    if (newPassword !== confirmPassword) return isError("Passwords do not match");
    isError("");
    resetPassword({ code, password: newPassword }, onBack);
  };

  return (
    <div className="relative w-full pt-6 flex flex-col">
      <div className="flex transition-transform duration-500 ease-in-out">
        {/* Step 1: Email */}
        {step === 1 && (
          <div className="w-full">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-1.5 border rounded mb-2 focus:outline-violet-500"
            />
            <button
              className="w-full bg-gradient-to-tr from-violet-500 to-pink-500 text-white py-1.5 rounded"
              onClick={handleSendCode}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Code"}
            </button>
          </div>
        )}

        {/* Step 2: Reset Password */}
        {step === 2 && (
          <div className="w-full px-2">
            <input
              type="text"
              placeholder="Enter the code sent to email"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2 focus:outline-violet-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2 focus:outline-green-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2 focus:outline-green-500"
            />
            <button
              className="w-full bg-gradient-to-tr from-green-500 to-violet-500 text-white py-2 rounded"
              onClick={handleResetPassword}
              disabled={resetting}
            >
              {resetting ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>

      {(sendError || resetError) && (
        isError(<p>{localError || sendError || resetError}</p>)
      )}

      <button
        className="text-sm text-blue-500 mt-6 flex items-center justify-center"
        onClick={onBack}
      >
        <FaArrowLeft className="mr-1" /> Back to Login
      </button>
    </div>
  );
};

export default ForgotPasswordForm;

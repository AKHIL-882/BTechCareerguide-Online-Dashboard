import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSendResetCode } from "../../Api";

const SendResetCodeForm = ({ onBack, isError }) => {
  const [email, setEmail] = useState("");
  const {
    loading: sending,
    error: sendError,
    sendResetCode,
  } = useSendResetCode();

  const handleSendCode = () => {
    if (!email) return isError("Email is required");
    isError("");
    sendResetCode(email, isError);
  };

  return (
    <div className="relative w-full pt-6 flex flex-col">
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
        {sending ? "Sending..." : "Send Reset Link"}
      </button>
      <button
        className="text-sm text-blue-500 mt-6 flex items-center justify-center"
        onClick={onBack}
      >
        <FaArrowLeft className="mr-1" /> Back to Login
      </button>
    </div>
  );
};

export default SendResetCodeForm;

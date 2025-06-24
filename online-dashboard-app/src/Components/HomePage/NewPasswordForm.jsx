import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../Api";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"; // for showing/hiding password

const NewPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, error, resetPassword } = useResetPassword();

  useEffect(() => {
    if (!token) setLocalError("Invalid or missing token");
  }, [token]);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setLocalError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError("");
    resetPassword(
      {
        token,
        password: newPassword,
      },
      () => navigate("/"), // Redirect to home after reset
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start sm:items-center">
      {/* Split layout: Left side with instructions and company name, Right side with the form */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row justify-center items-center rounded-lg shadow-lg bg-white">
        {/* Left Side - Company name and reset instructions */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-l-lg flex flex-col justify-between mb-6 lg:mb-0">
          <div>
            <h1 className="text-2xl font-semibold text-violet-600 mb-4 text-left">
              PROJPORT
            </h1>
            <p className="text-gray-600 mb-6 text-left">
              Follow the rules to create a secure password:
            </p>
            <ol className="text-sm text-gray-500 list-decimal ml-3">
              <li>Use at least one uppercase letter.</li>
              <li>Use at least one number.</li>
              <li>Use at least one special character.</li>
              <li>Use at least 8 characters.</li>
            </ol>
          </div>
        </div>

        {/* Right Side - Password reset form with gradient background */}
        <div className="w-full lg:w-1/2 p-6 bg-violet-500 text-white rounded-lg rounded-l-2xl flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Forgot Password
          </h2>
          {localError || error ? (
            <p className="text-red-500 text-sm mt-2 p-3 bg-slate-100 rounded-lg mb-6">
              {localError || error}
            </p>
          ) : (
            <p className="text-center mb-6">
              Enter your new password to change it
            </p>
          )}

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-green-500 text-gray-600"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
          </div>

          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-green-500 text-gray-600"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-tr from-orange-500 to-pink-500 text-white py-2 rounded"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {/* Back to home page link */}
          <div className="mt-4 text-center">
            <a
              href="/home"
              className="text-white hover:text-slate-50 text-sm flex justify-center items-center"
            >
              <FaArrowLeft />
              <span className="ml-2">Back to Home Page</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordForm;

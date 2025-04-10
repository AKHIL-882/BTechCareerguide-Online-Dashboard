import React, { useState, useEffect } from "react";
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Spinner from "../Admin/Components/Spinner";

const AuthForm = ({
  isLogin,
  setIsLogin,
  formData,
  handleChange,
  handleLoginSubmit,
  handleSignupSubmit,
  validationError,
  setValidationError,
  message,
  setMessage,
  loginLoading,
  signupLoading,
  giggleCounter,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGiggling, setIsGiggling] = useState(false);

  useEffect(() => {
    setIsGiggling(true);
    // Reset the giggle effect after the animation completes
    const timer = setTimeout(() => setIsGiggling(false), 500); // Match the animation duration
    return () => clearTimeout(timer);
  }, [giggleCounter]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (validationError) {
    setMessage(null);
  }
  if (message) {
    setValidationError(null);
  }
  return (
    <div
      className={`flex-1 w-full max-w-md p-6 border mt-2 border-gray-300 rounded-lg shadow-md bg-gray-900 bg-opacity-50 flex flex-col justify-center lg:mt-20 ${isGiggling ? "giggle-effect" : ""}`}
    >
      {validationError || message ? (
        <div className="p-4 text-white bg-gray-300 rounded-md bg-opacity-10 flex items-center border border-violet-800">
          {validationError && (
            <>
              <FaTimes
                onClick={() => setValidationError(null)}
                className="text-white mr-2 bg-red-400 text-lg cursor-pointer rounded-full hover:bg-red-800 p-1 transition-all duration-300"
              />
              <p className="text-red-500 font-sans">{validationError}</p>
            </>
          )}
          {message && (
            <>
              {" "}
              <FaCheck
                onClick={() => setMessage(null)}
                className="text-white mr-2 bg-green-400 text-lg cursor-pointer rounded-full hover:bg-red-800 p-1 transition-all duration-300 font-sans"
              />
              <p className="text-green-500 font-sans">{message}</p>
            </>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-center mb-2 text-slate-50 font-display">
            Hi there!
          </h2>
          <h3 className="text-center mb-1 text-slate-50 text-lg font-sans">
            Welcome to ProjPort, so happy to see you!
          </h3>
        </>
      )}
      <h2 className="text-2xl font-semibold text-center mb-4 text-slate-50 font-display">
        {isLogin ? "Login" : "Create Account"}
      </h2>
      <form
        className="space-y-4"
        onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
      >
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
        />
        {/* {!isLogin && (
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )} */}
        <div className="relative w-full mx-auto mt-10">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded hover:bg-blue-700 transition font-sans"
        >
          {(isLogin && loginLoading) || (!isLogin && signupLoading) ? (
            <p className="flex items-center justify-center">
              <Spinner
                loading={isLogin ? loginLoading : signupLoading}
                color={"#fff"}
                size={20}
              />
              <span className="pl-1 font-sans">
                {isLogin ? "Logging in..." : "Signing Up..."}
              </span>
            </p>
          ) : (
            <span>{isLogin ? "Login" : "Create Account"}</span>
          )}
        </button>
      </form>
      <div className="text-center mt-4">
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-gray-50 cursor-pointer hover:text-gray-200 font-sans"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </span>
      </div>
    </div>
  );
};

export default AuthForm;

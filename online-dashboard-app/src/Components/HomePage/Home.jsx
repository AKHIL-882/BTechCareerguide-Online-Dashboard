import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Api";
import Spinner from "../Admin/Components/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../../Api";
import ComapanyMarquee from "./ComapanyMarquee";
import OfferingSection from "./OfferingSection";
import Testimonials from "./Testimonials";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";
import StatsSection from "./StatasSection";
import Footer from "./Footer";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const { handleLogin, loading } = useLogin();
  const [isLogin, setIsLogin] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);

      if (response.data.success) {
        setMessage("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/dashboard");
      } else {
        setMessage(response.data.message || "Signup failed. Try again!");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        const errorMessage =
          errors &&
          Object.keys(errors)
            .map((key) => errors[key].join(", "))
            .join(" ");
        setMessage(
          errorMessage || "Validation failed. Please check your inputs."
        );
      } else {
        setMessage("An error occurred. Please try again.");
        console.error(error);
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopButton colorCode="bg-violet-800"/>
      <header className="flex justify-between items-center px-6 md:py-4 py-3  bg-violet-800 w-full z-50 fixed">
        <div className="text-2xl font-bold">
          {/* <img src="logo.PNG" alt="Logo" className="h-10 w-40" /> */}
          <h1 className="text-white">ProjPort</h1>
        </div>
        <a
          href="#login"
          onClick={() => setIsLogin(!isLogin)} // Toggle to login form
          className="text-slate-50 hover:text-white transition border-[2px] px-3 py-1 rounded-md border-gray-300 hover:border-gray-50"
        >
          {!isLogin ? "Login" : "Create Account"}
        </a>
        {/* Unlock Your Career [Potential/Passion/Future/Path] */}
      </header>
      <main className="flex flex-col lg:flex-row justify-center lg:space-x-16 items-center px-6 mt-8 md:mt-10 py-8 pb-16 bg-gradient-to-b from-violet-800 to-blue-200 lg:h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-6/12 h-full lg:pt-36 flex flex-col items-center text-center lg:items-start lg:text-left pb-4 md:pb-0">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-50">
              Unlock Your Career Potential
            </h1>
            <h1 className="text-2xl lg:text-3xl text-slate-50">
              Jobs, Projects, and Company Coding Q&A Await!
            </h1>
            <p className="text-gray-50 text-sm lg:text-base">
              Step into a world of opportunities where learning meets growth.
              Discover resources tailored to help you build skills and achieve
              your career dreams.
            </p>
            <button className="font-semibold text-violet-900 p-2 px-6 border-2 border-gray-300 hover:border-slate-50 hover:text-slate-50">
              Get Started
            </button>
            <button className="font-semibold text-slate-50 p-2 px-6 border-2 ml-2  border-gray-300 hover:border-slate-50 hover:text-slate-50">
              YouTube
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`flex-1 w-full max-w-md p-6 border mt-2 ${
            clicked ? "border-blue-500 md:border-2 border-1" : "border-gray-300"
          } rounded-lg shadow-md bg-gray-900 bg-opacity-50 flex flex-col justify-center`}
        >
          <h2 className="text-2xl font-semibold text-center mb-2 text-slate-50">
            Hi there!
          </h2>
          <h3 className="font-semibold text-center mb-1 text-slate-50 text-sm">
            Welcome to ProjPort, so happy to see you!
          </h3>
          <h2 className="text-2xl font-semibold text-center mb-4 text-slate-50">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          {message && (
            <div className="text-center text-sm text-red-500 mb-4">
              {message}
            </div>
          )}
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
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!isLogin && (
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <div className="relative w-full mx-auto mt-10">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
            </div>
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded hover:bg-blue-700 transition"
            >
              {loading ? (
                <p className="flex items-center justify-center">
                  <Spinner loading={loading} color={"#fff"} size={20} />
                  <span className="pl-1">
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
              className="text-sm text-gray-50 cursor-pointer hover:text-gray-200"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </span>
          </div>
        </div>
      </main>
      <OfferingSection />
      <StatsSection/>
      <Testimonials />
      <ComapanyMarquee />
      <Footer/>
      <footer className="text-center py-4 bg-violet-700  text-sm text-white mt-auto">
        &copy; {new Date().getFullYear()} All rights reserved - ProjPort
      </footer>
    </div>
  );
};

export default HomePage;

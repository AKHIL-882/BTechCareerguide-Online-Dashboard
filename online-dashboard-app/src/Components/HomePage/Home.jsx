import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Api";
import Spinner from "../Admin/Components/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the showPassword state
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
          errorMessage || "Validation failed. Please check your inputs.",
        );
      } else {
        setMessage("An error occurred. Please try again.");
        console.error(error);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/user"); // Redirect to dashboard
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 md:py-2 py-3  bg-white shadow w-full z-50 fixed">
        <div className="text-2xl font-bold">
          <img src="logo.PNG" alt="Logo" className="h-10 w-40" />
        </div>
        <a
          href="#login"
          onClick={() => setIsLogin(!isLogin)} // Toggle to login form
          className="text-lg text-black hover:text-yellow-500 transition border border-blue-500 rounded-full px-2"
        >
          {!isLogin ? "Login" : "Create Account"}
        </a>
      </header>

      <main className="flex flex-wrap flex-col-reverse lg:flex-row justify-between items-stretch px-6 py-10 gap-6 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 h-full">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-6 text-center shadow-md bg-white hover:scale-105 transform transition h-[240px]"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9fYpAwSjlhJtxH-zSeCBCHkH8VvettdaxCvQjpgEPI4Pyaii4GUKNsIBtZWyKdhNka0U&usqp=CAU"
                alt={`Job ${index + 1}`}
                className="w-20 h-14 mx-auto rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Job Title {index + 1}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Job description for card {index + 1} goes here.
              </p>
              <a
                href="#apply"
                className="inline-block mt-4 px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  window.scrollTo({
                    top: 0, // Scroll to the top of the page
                    behavior: "smooth", // Smooth scroll
                  });
                  setClicked(true); // Set the clicked state to true
                }}
              >
                Apply
              </a>
            </div>
          ))}
        </div>

        <div
          className={`flex-1 max-w-md p-6 border ${
            clicked ? "border-blue-500 md:border-2 border-1" : "border-gray-300"
          } rounded-lg shadow-md bg-gray-50 flex flex-col justify-center`}
        >
          {clicked && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
                Hi there!
              </h2>
              <h3 className="font-semibold text-center mb-1 text-gray-800 text-sm">
                Welcome to ProjPort, so happy to see you!
              </h3>
            </>
          )}
          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
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
              {/* Input field for password */}
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Button with eye icon to toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Change icon based on state */}
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
              className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
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
              className="text-sm text-blue-600 cursor-pointer hover:text-blue-700"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </span>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 bg-gray-100 border-t border-gray-300 text-sm text-gray-600 mt-auto">
        &copy; {new Date().getFullYear()} All rights reserved - ProjPort
      </footer>
    </div>
  );
};

export default HomePage;

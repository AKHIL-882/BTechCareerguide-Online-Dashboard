// src/hooks/useAuth.js

import { useState } from "react";
import { loginApi, signupApi, logoutApi } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (formData) => {
    setLoading(true);
    try {
      const data = await loginApi(formData);

      if (data.status === "success") {
        localStorage.setItem("data", JSON.stringify(data));
        toast.success("Login successful!");
        navigate(data.user.role === "admin" ? "/admin" : "/user");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await signupApi(formData);
      if (response.status === 200) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export const useLogout = () => {
  const logout = async () => {
    const token = JSON.parse(localStorage.getItem("data"))?.access_token;
    try {
      await logoutApi(token);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("data");
      window.location.href = "/";
    }
  };

  return { logout };
};

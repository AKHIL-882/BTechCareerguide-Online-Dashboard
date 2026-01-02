import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  loginApi,
  signupApi,
  logoutApi,
  sendResetCodeApi,
  resetPasswordApi,
} from "../api/authApi";
import { clearAuthStorage } from "@/utils/auth";

// LOGIN HOOK
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData, setValidationError) => {
    setLoading(true);
    try {
      const response = await loginApi(formData);
      const data = response.data || response; // axios vs fetch diff

      const { roles } = data;
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("roles", roles);

      if (roles === "admin") navigate("/admin");
      else if (roles === "user") navigate("/dashboard");
      else alert("Role not recognized.");
    } catch (error) {
      const resp = error.response?.data;

      if (resp?.requires_verification) {
        toast.info(resp.message || "Please verify your email to continue.");
        const params = new URLSearchParams({
          email: resp.email,
          token: resp.verification_token,
        });
        navigate(`/verify-email?${params.toString()}`);
        return;
      }

      setValidationError(resp?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};

// SIGNUP HOOK
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (formData, setValidationError, setIsLogin) => {
    setLoading(true);
    try {
      const response = await signupApi(formData);
      const payload = response.data || response;

      if (payload?.verification_required) {
        toast.success("Verification email sent. Check your inbox.");
        const params = new URLSearchParams({
          email: payload.email,
          token: payload.verification_token,
        });
        navigate(`/verify-email?${params.toString()}`);
        return;
      }

      if (payload?.message === "Account Created Successfully") {
        toast.success("Account created successfully!");
        setIsLogin(true);
      } else {
        setValidationError(payload?.message || "Signup failed.");
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const errorMessage = Object.keys(errors)
          .map((key) => errors[key].join(", "))
          .join(" ");
        setValidationError(errorMessage);
      } else {
        setValidationError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
};

// LOGOUT HOOK (shared across screens)
export const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const stored = JSON.parse(localStorage.getItem("data") || "{}");
      const accessToken = stored?.access_token;

      if (accessToken) {
        await logoutApi(accessToken);
      }
    } catch (error) {
      // Swallow errors to ensure user is still logged out locally.
      console.error("Logout API error:", error);
    } finally {
      clearAuthStorage();
      navigate("/", { replace: true });
      setLoading(false);
    }
  };

  return { logout, loading };
};

// LEGACY LOGOUT (kept for compatibility)
export const logoutUser = async (accessToken) => {
  try {
    await logoutApi(accessToken);
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    clearAuthStorage();
  }
};

// SEND RESET CODE HOOK
export const useSendResetCode = () => {
  const [loading, setLoading] = useState(false);

  const sendResetCode = async (email, isError) => {
    setLoading(true);
    try {
      await sendResetCodeApi(email);
      toast.success("Reset code sent to your email!");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send reset code";
      isError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendResetCode };
};

// RESET PASSWORD HOOK
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ token, password }, onSuccess) => {
    setLoading(true);
    try {
      await resetPasswordApi({ token, password });
      toast.success("Password reset successfully!");
      onSuccess?.();
    } catch (error) {
      const msg =
        error.response?.data?.errors?.password?.[0] ||
        error.response?.data?.message ||
        "Failed to reset password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

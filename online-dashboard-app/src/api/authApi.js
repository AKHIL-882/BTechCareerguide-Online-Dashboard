import { post } from "./apiConfig";

// Login
export const loginApi = (data) =>
  post("/login", {
    email: data.email,
    password: data.password,
  });

// Signup
export const signupApi = (data) =>
  post("/signup", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    password_confirmation: data.confirmPassword,
  }, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Logout
export const logoutApi = (accessToken) =>
  post("/logout", null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// Forgot Password (send reset code)
export const sendResetCodeApi = (email) =>
  post("/reset-password", { email });

// Reset Password (update password)
export const resetPasswordApi = (payload) =>
  post("/update-password", payload);

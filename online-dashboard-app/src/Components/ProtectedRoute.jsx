import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const storedAuth = JSON.parse(localStorage.getItem("data") || "{}");
  const userRole = localStorage.getItem("roles");

  if (!storedAuth?.access_token || !userRole) {
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRole && userRole !== allowedRole) {
    alert("Unauthorized access. Logging out.");
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

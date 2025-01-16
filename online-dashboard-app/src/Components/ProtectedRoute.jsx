import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("roles");
  const location = useLocation();

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== allowedRole) {
    alert("Cannot access this resource. Logging out.");
    localStorage.clear(); // Clear session
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

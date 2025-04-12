import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useContext(AuthContext);
  const storedAuth = JSON.parse(localStorage.getItem("data"));
  const userRole = localStorage.getItem("roles");
  const location = useLocation();

  if (!storedAuth.access_token || !userRole) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== allowedRole) {
    alert("Unauthorized access. Logging out.");
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

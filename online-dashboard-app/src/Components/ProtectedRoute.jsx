import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("data") && JSON.parse(localStorage.getItem("data")).access_token;
  const { auth } = useContext(AuthContext);

  if (!isAuthenticated || !auth.token || auth.expiresAt <= Date.now()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

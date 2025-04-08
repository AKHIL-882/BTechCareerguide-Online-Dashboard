import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  const userRole = localStorage.getItem("roles"); // Ideally should come from context too
  console.log(userRole);
  const location = useLocation();

  if (!auth.access_token || !userRole) {
    console.log("sd");
    return <Navigate to="/" replace />;
  }
  console.log(userRole);
  console.log(allowedRole);
  if (userRole !== allowedRole) {
    alert("Unauthorized access. Logging out.");
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

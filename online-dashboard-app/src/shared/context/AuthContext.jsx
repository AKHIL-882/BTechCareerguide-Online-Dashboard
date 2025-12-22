import React, { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("data");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { token: null, expiresIn: null };
  });

  const logout = useCallback(() => {
    setAuth({ token: null, expiresIn: null });
    localStorage.removeItem("data");
    localStorage.removeItem("roles"); // Also remove role if stored separately
    navigate("/", { replace: true });
  }, [navigate]);

  const login = (token, expiresIn) => {
    const expirationTime = Date.now() + expiresIn * 1000;
    const authData = { token, expiresIn: expirationTime };
    setAuth(authData);
    localStorage.setItem("data", JSON.stringify(authData));
  };

  // Check token expiration on every route change
  useEffect(() => {
    if (auth?.expiresIn && Date.now() >= auth.expiresIn) {
      logout();
    }
  }, [location, auth?.expiresIn, logout]);

  // Auto-logout on exact token expiry
  useEffect(() => {
    if (auth.token && auth.expiresIn) {
      const timeoutDuration = auth.expiresIn - Date.now();

      if (timeoutDuration > 0) {
        const timer = setTimeout(logout, timeoutDuration);
        return () => clearTimeout(timer);
      } else {
        logout(); // Expired already
      }
    }
  }, [auth.token, auth.expiresIn, logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

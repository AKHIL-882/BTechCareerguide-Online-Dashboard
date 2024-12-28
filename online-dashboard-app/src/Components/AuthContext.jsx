import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [auth, setAuth] = useState(() => {
    // Initialize auth state from localStorage
    const storedAuth = localStorage.getItem("data");
    return storedAuth ? JSON.parse(storedAuth) : { token: null, expiresAt: null };
  });

  const navigate = useNavigate();

  const login = (token, expiresIn) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    const authData = { token, expiresAt };
    setAuth(authData);
    localStorage.setItem("data", JSON.stringify(authData));
  };

  const logout = () => {
    setAuth({ token: null, expiresAt: null });
    localStorage.removeItem("data");
    navigate("/"); // Redirect to home page on logout
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("data");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth.expiresAt > Date.now()) {
        setAuth(parsedAuth);
      } else {
        setAuth({ token: null, expiresAt: null });
      }
    }
  }, [location]);

  useEffect(() => {
    if (auth.token) {
      const timeout = auth.expiresAt - Date.now();
      if (timeout > 0) {
        const timer = setTimeout(logout, timeout);
        return () => clearTimeout(timer);
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

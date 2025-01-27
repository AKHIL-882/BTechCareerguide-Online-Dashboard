import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [auth, setAuth] = useState(() => {
    // Initialize auth state from localStorage
    const storedAuth = localStorage.getItem("data");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { token: null, expiresIn: null };
  });

  const navigate = useNavigate();

  const login = (token) => {
    const expiresIn = Date.now() + expiresIn * 1000;
    const authData = { token, expiresIn };
    setAuth(authData);
    localStorage.setItem("data", JSON.stringify(authData));
  };

  const logout = () => {
    setAuth({ token: null, expiresIn: null });
    localStorage.removeItem("data");
    navigate("/"); // Redirect to home page on logout
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("data");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth.expiresIn < Date.now()) {
        setAuth(parsedAuth);
        localStorage.removeItem("data");
        navigate("/");
      } else {
        setAuth({ token: null, expiresIn: null });
        // localStorage.removeItem("data");
        // navigate("/")
      }
    }
  }, [location]);

  useEffect(() => {
    if (auth.token) {
      const timeout = auth.expiresIn - Date.now();
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

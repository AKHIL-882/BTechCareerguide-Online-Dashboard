import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, expiresAt: null });
  const navigate = useNavigate();

  const login = (token, expiresIn) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    setAuth({ token, expiresAt });
    localStorage.setItem("data", JSON.stringify({ token, expiresAt }));
  };

  const logout = () => {
    setAuth({ token: null, expiresAt: null });
    localStorage.removeItem("data");
    navigate("/"); // Redirect to home page on logout
  };

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("data"));
    console.log(storedAuth);
    if (storedAuth && storedAuth.expiresAt > Date.now()) {
      setAuth(storedAuth);
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      const timeout = auth.expiresAt - Date.now();
      const timer = setTimeout(logout, timeout);
      return () => clearTimeout(timer); 
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

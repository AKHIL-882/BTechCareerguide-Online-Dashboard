import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("data");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { token: null, expiresIn: null };
  });

  /**
   * Login function
   * Accepts token and expiresIn (in seconds).
   */
  const login = (token, expiresIn) => {
    const expirationTime = Date.now() + expiresIn * 1000; // Calculate expiration time
    const authData = { token, expiresIn: expirationTime };
    setAuth(authData);
    localStorage.setItem("data", JSON.stringify(authData)); // Store in localStorage
  };

  /**
   * Logout function
   * Clears auth state and localStorage, redirects user to "/".
   */
  const logout = () => {
    setAuth({ token: null, expiresIn: null });
    localStorage.removeItem("data");
    navigate("/"); // Redirect to home on logout
  };

  /**
   * Check token expiration on location change.
   */
  useEffect(() => {
    const storedAuth = localStorage.getItem("data");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);

      // Check if token is expired
      if (parsedAuth.expiresIn < Date.now()) {
        logout(); // Expired, log out immediately
      } else {
        setAuth(parsedAuth); // Valid token, set to state
      }
    }
  }, [location]); // Run whenever location changes

  /**
   * Set timeout to automatically log out user when token expires.
   */
  useEffect(() => {
    if (auth.token) {
      const timeout = auth.expiresIn - Date.now(); // Time until expiration

      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
        }, timeout);

        // Clean up timer
        return () => clearTimeout(timer);
      } else {
        logout(); // Immediate logout if token already expired
      }
    }
  }, [auth]); // Run whenever auth changes

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

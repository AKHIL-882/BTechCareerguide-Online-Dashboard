import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import QueryProvider from "@/app/providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <QueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryProvider>
  </ThemeProvider>,
);

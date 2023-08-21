import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import { AuthProvider } from "./components/Auth"; 

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <AuthProvider>
      <App />
  </AuthProvider>
</React.StrictMode>,
);

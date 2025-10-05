import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css"; // import React Toastify CSS
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer />{" "}
    {/* Add React Toastify container only once in your app */}
  </StrictMode>
);

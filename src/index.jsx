import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import ScrollManager from "./ScrollManager";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

createRoot(rootEl).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollManager />
      <App />
    </HashRouter>
  </React.StrictMode>
);

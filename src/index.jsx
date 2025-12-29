import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import ScrollToSectionParam from "./ScrollToSectionParam.jsx";
import ScrollManager from "./ScrollManager.jsx";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

createRoot(rootEl).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToSectionParam />
      <ScrollManager />
      <App />
    </HashRouter>
  </React.StrictMode>
);

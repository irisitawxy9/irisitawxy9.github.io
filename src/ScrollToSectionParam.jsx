// src/ScrollToSectionParam.jsx
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function ScrollToSectionParam() {
  const location = useLocation();
  const [params] = useSearchParams();

  useEffect(() => {
    const section = params.get("section");
    if (!section) return;

    // Ensure the page is at least rendered before scrolling
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // If content mounts a bit later, retry a few times
      if (attempt < 10) {
        window.setTimeout(() => tryScroll(attempt + 1), 50);
      }
    };

    // rAF first, then retry loop if needed
    requestAnimationFrame(() => tryScroll(0));
  }, [location.pathname, location.search, params]);

  return null;
}

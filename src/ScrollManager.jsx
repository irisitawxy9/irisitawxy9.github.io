// src/ScrollManager.jsx
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();
  const [params] = useSearchParams();

  useEffect(() => {
    const section = params.get("section");

    // If a section is specified, scroll to that element.
    if (section) {
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (attempt < 10) window.setTimeout(() => tryScroll(attempt + 1), 50);
      };

      requestAnimationFrame(() => tryScroll(0));
      return;
    }

    // Otherwise always reset to top on page/route change.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname, location.search, params]);

  return null;
}

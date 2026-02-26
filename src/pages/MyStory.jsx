import React, { useState, useEffect } from "react";
import "./story.css";
import "./project-management.css"; // include shared back-to-top styling
import MagicBento from "../components/MagicBento/MagicBento.jsx";
import CircularGallery from "../components/CircularGallery/CircularGallery.jsx";

/* ---------- Back to Top Component ---------- */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow-icon"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function MyStory() {
  return (
    <main className="story">
      {/* Title + Subtitle */}
      <header className="story-hero">
        <h1>My Story</h1>
        <p className="subtitle">
          Always passionate about diving into new challenges and striving to make an impact.
        </p>
      </header>

      {/* Magic Bento (with same horizontal alignment as intro) */}
      <section className="story-bento-wrapper">
        <MagicBento />
      </section>

      {/* Narrative paragraph block */}
      

      {/* Circular Gallery (also aligned visually with the story content) */}
      <section className="story-gallery-wrapper">
        <CircularGallery />
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}

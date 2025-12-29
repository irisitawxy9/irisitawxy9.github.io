import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./branding.css";
import "./email-marketing.css";
import BrandingHero from "../components/BrandingHero/BrandingHero.jsx";

/* ---------- Reveal animation ---------- */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Back to Top Button ---------- */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`back-to-top ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      type="button"
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

/* ---------- Divider ---------- */
function EmDivider() {
  return (
    <div className="em-divider reveal" aria-hidden="true">
      <span className="em-divider-line" />
      <span className="em-divider-glow" />
    </div>
  );
}

/* ---------- Text block ---------- */
function EmTextBlock({ id, kicker, title, stat, desc, skills }) {
  return (
    <section id={id} className="em-textblock reveal">
      <div className="em-textwrap">
        {kicker && <p className="em-kicker">{kicker}</p>}
        {title && <h2 className="em-h2">{title}</h2>}
        {stat && (
          <div className="em-stat-line">
            <span className="em-stat">{stat}</span>
          </div>
        )}
        {desc && <p className="em-desc">{desc}</p>}
        {skills?.length ? (
          <div className="em-usp-grid">
            {skills.map((s, i) => (
              <div className="em-pill" key={i}>
                {s}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ---------- Center-pinned gallery ---------- */
function EmPinnedGallery({ id, images, alt = "Gallery panel", gap = 16 }) {
  const wrapRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  const recalc = () => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!wrap || !pin || !track) return;
    const vw = Math.max(1, window.innerWidth);
    const pinH = pin.offsetHeight;
    const trackW = track.scrollWidth;
    const horizontalDistance = Math.max(0, trackW - vw);
    wrap.style.height = `${horizontalDistance + pinH}px`;
  };

  useLayoutEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(document.documentElement);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (pinRef.current) ro.observe(pinRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!wrap || !pin || !track) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const docY = document.scrollingElement.scrollTop;
        const vh = Math.max(1, window.innerHeight);
        const vw = Math.max(1, window.innerWidth);
        const wrapRect = wrap.getBoundingClientRect();
        const wrapTopAbs = docY + wrapRect.top;
        const wrapHeight = wrap.offsetHeight;
        const pinH = pin.offsetHeight;

        const pinTopOffset = (vh - pinH) / 2;
        const pinStartAbs = wrapTopAbs + pinTopOffset;
        const pinEndAbs = pinStartAbs + (wrapHeight - pinH);
        let p = 0;
        if (docY <= pinStartAbs) p = 0;
        else if (docY >= pinEndAbs) p = 1;
        else p = (docY - pinStartAbs) / Math.max(1, pinEndAbs - pinStartAbs);

        const maxX = Math.max(0, track.scrollWidth - vw);
        track.style.transform = `translate3d(${-p * maxX}px,0,0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id={`${id}-gallery`} className="em-pin-wrap reveal" ref={wrapRef}>
      <div className="em-pin-viewport" ref={pinRef}>
        <div className="em-pin-track" ref={trackRef} style={{ gap: `${gap}px` }}>
          {images.map((item, i) => (
            <figure key={`${id}-tile-${i}`} className="em-pin-tile">
              {item.type === "video" ? (
                <video className="em-pin-img" src={item.src} autoPlay muted loop playsInline />
              ) : (
                <img className="em-pin-img" src={item.src} alt={`${alt} ${i + 1}`} />
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EmailMarketing() {
  useReveal();

  const [, setSearchParams] = useSearchParams();
  const goToSection = (id) => setSearchParams({ section: id });

  const newsletterTiles = [
    { type: "image", src: "/images/da1.jpg" },
    { type: "image", src: "/images/da2.jpg" },
    { type: "image", src: "/images/da3.jpg" },
    { type: "image", src: "/images/da4.jpg" },
    { type: "image", src: "/images/da2.jpg" },
  ];

  const prearrivalTiles = [
    { type: "video", src: "/videos/matcha latte.mp4" },
    { type: "video", src: "/videos/coke.mp4" },
    { type: "video", src: "/videos/sprite.MOV" },
    { type: "video", src: "/videos/perfume.mp4" },
    { type: "video", src: "/videos/final.MOV" },
    { type: "video", src: "/videos/matcha latte.mp4" },
  ];

  const golfTiles = [
    { type: "image", src: "/images/ai1.png" },
    { type: "image", src: "/images/ai2.png" },
    { type: "image", src: "/images/ai3.png" },
    { type: "image", src: "/images/ai4.png" },
    { type: "image", src: "/images/ai1.png" },
  ];

  return (
    <main className="branding-page email-marketing">
      <div className="theme-bg-sticky" aria-hidden="true" />

      <Link to="/?section=portfolio" className="back-cta" aria-label="Back to portfolio">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="label">Portfolio</span>
      </Link>

      <BrandingHero
        backHref="/?section=portfolio"
        tabTitle="Portfolio"
        addressText="Projects by Iris"
        eyebrow="AI • Data • Automation"
        title="AI, Data, and Other Technologies"
        subtitle="Make better decisions and ship creative faster."
        imageSrc="/media/branding-hero.jpg"
      />

      {/* IN THIS PAGE -> query param scroll */}
      <div className="em-container reveal">
        <section className="em-section em-inpage-row">
          <h1 className="em-inpage-title">IN THIS PAGE</h1>
          <nav className="em-inpage-links" aria-label="Section links">
            <button type="button" className="em-link-btn" onClick={() => goToSection("data")}>
              Data Analytics Project
            </button>
            <button type="button" className="em-link-btn" onClick={() => goToSection("genai")}>
              GenAI - Graphic and Video Creation
            </button>
            <button type="button" className="em-link-btn" onClick={() => goToSection("analyticalai")}>
              Analytical AI - AI Agent
            </button>
          </nav>
        </section>
      </div>

      <EmDivider />
      <EmTextBlock
        id="data"
        kicker="Data-driven decision making"
        title="Data Analytics Project – Titanic Survival Modeling"
        stat="Full Analytics LifeCycle"
        desc="End-to-end analysis and predictive modeling project using the Titanic passenger dataset (891 rows, 12 columns). My group translated exploratory findings into feature engineering and model choices, then validated performance using standard classification metrics."
        skills={[
          "Python (pandas, NumPy)",
          "KNN, Decision Tree, Naive Bayes",
          "Data cleaning & imputation",
          "Feature engineering (FamilySize)",
          "Encoding & scaling (StandardScaler)",
          "Model selection (bias–variance tradeoffs)",
          "Evaluation (precision/recall/F1, confusion matrix)",
          "Data visualization (matplotlib / seaborn)",
          "Insight storytelling & documentation",
        ]}
      />
      <EmPinnedGallery id="newsletter" images={newsletterTiles} alt="Newsletter panel" />

      <EmDivider />
      <EmTextBlock
        id="genai"
        kicker="Production-ready creative workflows"
        title="GenAI – Graphic and Video Creation"
        stat="Multi-tool creative pipeline"
        desc="I used multiple AI and creative tools to generate, iterate, and assemble marketing-ready visuals and videos, while balancing efficiency with brand consistency and quality control."
        skills={[
          "Prompt engineering & creative direction",
          "AI image/video generation (Nanobanana, Kling, Jimeng)",
          "Video editing & captioning (CapCut)",
          "GenAI ideation (ChatGPT, Claude, Copilot)",
          "Presentation creation (Prezi)",
          "Audio generation (Suno)",
          "Asset QA & brand consistency",
        ]}
      />
      <EmPinnedGallery id="prearrival" images={prearrivalTiles} alt="Pre-arrival panel" />

      <EmDivider />
      <EmTextBlock
        id="analyticalai"
        kicker="Automation & analytics"
        title="Analytical AI – AI Agent (Zapier)"
        stat="Automating Research and Posting"
        desc="Built customizable Zapier-based AI Social Media agents to research trends, summarize key takeaways, generate social media post, and post on different social media platforms. The workflow is designed for efficiency, consistency, and quality control."
        skills={[
          "Zapier automation design",
          "AI agent workflows",
          "Trend research & synthesis",
          "Structured outputs (briefs, drafts, prompts)",
          "Process standardization & QA",
          "Human governance",
        ]}
      />
      <EmPinnedGallery id="golf" images={golfTiles} alt="Golf panel" />

      <EmDivider />

      <BackToTop />
    </main>
  );
}

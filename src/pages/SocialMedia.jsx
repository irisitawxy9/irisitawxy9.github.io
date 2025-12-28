import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./branding.css";
import "./email-marketing.css";
import BrandingHero from "../components/BrandingHero/BrandingHero.jsx";

/* ---------- Reveal animation ---------- */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.18 }
    );
    els.forEach(el => io.observe(el));
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
              <div className="em-pill" key={i}>{s}</div>
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
                <video
                  className="em-pin-img"
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  className="em-pin-img"
                  src={item.src}
                  alt={`${alt} ${i + 1}`}
                />
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

  // You can swap these paths to any individual images you like.
const prearrivalTiles = [
  { type: "image", src: "/images/sog1.jpg" },
  { type: "image", src: "/images/sog2.jpg" },
  { type: "image", src: "/images/sog1.jpg" },
];

const golfTiles = [
  { type: "image", src: "/images/o1.jpg" },
  { type: "image", src: "/images/o2.jpg" },
  { type: "image", src: "/images/o1.jpg" },
];
  const newsletterTiles = [
  { type: "image", src: "/images/d1.jpg" },
  { type: "image", src: "/images/d2.jpg" },
  { type: "image", src: "/images/d3.jpg" },
    { type: "image", src: "/images/d1.jpg" },

];




  return (
    <main className="branding-page email-marketing">
      <div className="theme-bg-sticky" aria-hidden="true" />

      <a href="/#portfolio" className="back-cta" aria-label="Back to portfolio">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="label">Portfolio</span>
      </a>

      <BrandingHero
        backHref="/#portfolio"
        tabTitle="Portfolio"
        addressText="Social Media by Iris"
        eyebrow="Paid & Owned"
        title="Social Media"
        subtitle="Strategy-led social media that balances creativity, relevance, and performance."
        imageSrc="/media/branding-hero.jpg"
      />

      {/* IN THIS PAGE buttons */}
      <div className="em-container reveal">
        <section className="em-section em-inpage-row">
          <h1 className="em-inpage-title">IN THIS PAGE</h1>
          <nav className="em-inpage-links" aria-label="Section links">
            <a className="em-link-btn" href="#paid">Paid Campaign for a Local Restaurant</a>
            <a className="em-link-btn" href="#static">Organic Static Posting</a>
            <a className="em-link-btn" href="#dynamic">Organic Dynamic Posting</a>
          </nav>
        </section>
      </div>

      <EmDivider />
      <EmTextBlock
        id="paid"
        kicker="Performance-first advertising built for real-world conversion."
        title="Paid Campaign for a Local Restaurant"
        stat="Objective: Conversion - Increase visits & sales"
desc="Planned and executed a paid social campaign designed to drive measurable dining demand during key periods. The work combined precise audience targeting, clear creative direction, and continuous optimization to ensure the message landed quickly in a fast-scroll environment. 

The campaign contributed to increased engagement and in-venue traffic, reinforcing paid social as a reliable performance channel rather than just an awareness tool. (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Campaign strategy",
          "Audience targeting",
          "Creative direction",
          "Copywriting",
          "Creative testing",
          "Optimization & iteration",
          "Budget pacing",
          "Performance reporting",
          "Conversion-focused CTAs",
          "Stakeholder communication"
        ]}
      />
      <EmPinnedGallery id="prearrival" images={prearrivalTiles} alt="Pre-arrival panel" />

      <EmDivider />
      <EmTextBlock
        id="static"
        kicker="Consistent, on-brand content that builds trust and keeps the feed intentional."
        title="Organic Static Posting"
        stat="Objective: Interest & Desire"
        desc="Developed and scheduled static posts that balance brand identity with timely and audience-relevant topics. This work blends promotional, lifestyle, and informational content to support broader campaigns while still performing independently through strong visual hierarchy and clear & on-brand message. (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Content planning",
          "Brand voice & tone",
          "Caption writing",
          "Hashtag strategy",
          "Creative layout & design",
          "Community-first messaging",
          "Basic performance review",
          "Cross-promotion planning",
          "Stakeholder alignment",
          "Consistency & cadence"
        ]}
      />
      <EmPinnedGallery id="golf" images={golfTiles} alt="Golf panel" />

      <EmDivider />
      <EmTextBlock
        id="dynamic"
        kicker="Short-form storytelling designed for reach, retention, and interaction."
        title="Organic Dynamic Posting"
        stat="Objective: Interest & Advocacy"
        desc="Created platform-native video content to capture attention in the first few seconds and keep viewers watching. Each piece is built around a clear hook, natural storytelling, and intentional editing to encourage saves, shares, and comments while strengthening brand connection. (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Short-form video strategy",
          "Script writing",
          "Storyboarding",
          "On-camera direction",
          "Editing guidance",
          "Trend adaptation",
          "Engagement prompts",
          "Content planning",
        ]}
      />
      <EmPinnedGallery id="newsletter" images={newsletterTiles} alt="Newsletter panel" />

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./branding.css";
import "./email-marketing.css";
import BrandingHero from "../components/BrandingHero/BrandingHero.jsx";
import YorkInternationalFunnel from "../components/york_international_Funnel.jsx";
import LakesidetakeoutFunnel from "../components/lakeside_takeout_Funnel.jsx";

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

  const prearrivalTiles = [
    { type: "image", src: "/images/cr1.png" },
    { type: "image", src: "/images/cr2.png" },
    { type: "image", src: "/images/cr3.png" },
    { type: "image", src: "/images/cr4.png" },
    { type: "image", src: "/images/cr2.png" },
  ];

  const golfTiles = [
    { type: "video", src: "/videos/matcha latte.mp4" },
    { type: "image", src: "/images/prearrival-2.png" },
    { type: "image", src: "/images/prearrival-3.png" },
    { type: "image", src: "/images/prearrival-4.png" },
  ];

  return (
    <main className="branding-page email-marketing">
      <div className="theme-bg-sticky" aria-hidden="true" />

      {/* Back to Portfolio via query params (no anchors) */}
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
        addressText="Marketing Lifecycle Campaigns by Iris"
        eyebrow="LIFECYCLE CAMPAIGNS MARKETING"
        title="Marketing Lifecycle Campaign"
        subtitle="slogan."
        imageSrc="/media/branding-hero.jpg"
      />

      {/* IN THIS PAGE buttons -> query param scroll */}
      <div className="em-container reveal">
        <section className="em-section em-inpage-row">
          <h1 className="em-inpage-title">IN THIS PAGE</h1>
          <nav className="em-inpage-links" aria-label="Section links">
            <button type="button" className="em-link-btn" onClick={() => goToSection("costarica")}>
              Costa Rica Study Abroad Summer Program Campaign
            </button>
            <button type="button" className="em-link-btn" onClick={() => goToSection("restaurant")}>
              Restaurant Takeout Campaign
            </button>
          </nav>
        </section>
      </div>

      <EmDivider />
      <EmTextBlock
        id="costarica"
        kicker="Strategic multi-channel campaign driving 65% application growth"
        title="Costa Rica Study Abroad Summer Program Campaign"
        stat="65% YoY Application Increase"
        desc="Designed and executed an integrated marketing lifecycle campaign for a Costa Rica study abroad program, 
        strategically mapping touchpoints across awareness, consideration, conversion, loyalty, and advocacy phases. 
        Leveraged multi-channel approach combining digital advertising, social media, email marketing, event promotion, 
        and strategic partnerships to guide students through their decision journey. (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Marketing lifecycle strategy",
          "Multi-channel campaign management",
          "Higher education marketing",
          "Student recruitment",
          "Social media marketing",
          "Email marketing automation",
          "Event marketing",
          "Partnership development",
          "Content creation & copywriting",
          "Graphic design",
          "Campaign analytics",
          "Budget management",
          "Stakeholder collaboration",
          "User-generated content strategy",
          "Community building",
          "Performance optimization",
        ]}
      />
      <YorkInternationalFunnel />
      <EmPinnedGallery id="prearrival" images={prearrivalTiles} alt="Images of some of my work" />

      <EmDivider />
      <EmTextBlock
        id="restaurant"
        kicker="Integrated local marketing driving takeout revenue during seasonal transition"
        title="Lakeside Seafood & Grill Takeout Campaign"
        stat="45% Takeout Revenue Increase"
        desc="Developed and executed a comprehensive multi-channel marketing campaign to drive takeout orders for 
        Lakeside Seafood & Grill during the off-season period. Strategically combined digital channels (social media, 
        email, website) with traditional local marketing tactics (highway signage, elevator flyers, posters) and 
        strategic partnerships (hotel pre-arrival emails, local event listings) to maximize reach within the target 
        geographic area. (please email me if you would like to see the work example)"
        skills={[
          "Local marketing strategy",
          "Restaurant marketing",
          "Multi-channel campaign execution",
          "Partnership development",
          "Social media management",
          "Email marketing",
          "Event promotion",
          "Community engagement",
          "Graphic design",
          "Copywriting",
          "Print advertising",
          "Digital advertising",
          "Hospitality marketing",
          "Customer acquisition",
          "Performance tracking",
          "Brand messaging",
        ]}
      />
      <LakesidetakeoutFunnel />

      <EmDivider />

      <BackToTop />
    </main>
  );
}

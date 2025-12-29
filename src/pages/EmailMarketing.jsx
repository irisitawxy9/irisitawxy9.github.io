import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./branding.css";
import "./email-marketing.css";
import BrandingHero from "../components/BrandingHero/BrandingHero.jsx";
import { useSearchParams } from "react-router-dom";

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
          {images.map((src, i) => (
            <figure key={`${id}-tile-${i}`} className="em-pin-tile">
              <img className="em-pin-img" src={src} alt={`${alt} ${i + 1}`} />
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

  // You can swap these paths to any individual images you like.
  const prearrivalTiles = [
    "/images/prearrival-1.png",
    "/images/prearrival-2.png",
    "/images/prearrival-3.png",
    "/images/prearrival-4.png",
  ];

  const golfTiles = [
    "/images/golf-1.png",
    "/images/golf-2.png",
    "/images/golf-3.png",
    "/images/golf-4.png",
    "/images/golf-1.png",
  ];

  const newsletterTiles = [
    "/images/newsletter1.png",
    "/images/newsletter2.png",
    "/images/newsletter3.png",    "/images/newsletter1.png"
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
        addressText="Email Marketing by Iris"
        eyebrow="crafting strategies, content creation, analytics"
        title="Email Marketing"
        subtitle="Turning every interaction into a journey, not just a transaction."
        imageSrc="/media/branding-hero.jpg"
      />

      {/* IN THIS PAGE buttons */}
      <div className="em-container reveal">
        <section className="em-section em-inpage-row">
          <h1 className="em-inpage-title">IN THIS PAGE</h1>
          <nav className="em-inpage-links" aria-label="Section links">
  <button type="button" className="em-link-btn" onClick={() => goToSection("prearrival")}>
    Hotel Booking Email Lifecycle
  </button>
  <button type="button" className="em-link-btn" onClick={() => goToSection("golf")}>
    Golf Course Conversion Campaigns
  </button>
  <button type="button" className="em-link-btn" onClick={() => goToSection("newsletter")}>
    Monthly Resort Newsletter
  </button>
</nav>

        </section>
      </div>

      <EmDivider />
      <EmTextBlock
        id="prearrival"
        kicker="Optimize conversion through revelance and timely value"
        title="Hotel Booking Email Lifecycle"
        stat="20% Revenue Growth"
        desc="Designed and implemented a multi-touch customizable email journey guiding guests from booking confirmation email 
        to pre-arrival informative & upselling email to post-stay review. 
        Each touchpoint elevated the experience through strong relevance and 
        drove additional conversion. See some of them below (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Project management","Customer journey mapping","Stakeholder management","Email automation","Copywriting & personalization",
          "A/B testing","Performance tracking","CRM management","Cross-functional collaboration","Customer feedback analysis",
          "Audience targeting","Storytelling and brand messaging","Content creation","Graphic design"
        ]}
      />
      <EmPinnedGallery id="prearrival" images={prearrivalTiles} alt="Pre-arrival panel" />

      <EmDivider />
      <EmTextBlock
        id="golf"
        kicker="The right content, to the right audience, at the right time."
        title="Golf Course Conversion Campaigns"
        stat="12% Revenue Growth"
        desc="Strategized and executed multi-channel lifecycle campaigns for a championship golf cou
        rse, cross-promoting on-site dining, spa, and hotel stays to drive repeat visits 
        and maximize total guest spend. See some of the examples with heat map below. (images are blurred and clicks on the heat map are covered on purpose, please email me if you have any questions)"
        skills={[
          "Project management","A/B testing","Funnel management","Audience segmentation","Targeted messaging","Content creation",
          "Data-driven optimization","Customer journey mapping","Email management system","Graphic design",
        ]}
      />
      <EmPinnedGallery id="golf" images={golfTiles} alt="Golf panel" />

      <EmDivider />
      <EmTextBlock
        id="newsletter"
        kicker="Keeping guests connected, one story at a time."
        title="Monthly Resort Newsletter"
        stat="22% Increase in Email Opens"
        desc="A branded monthly newsletter featuring resort news, seasonal highlights, and lifestyle content blended with promotions - keeping the brand top-of-mind and encouraging repeat visits."
        skills={[
          "Project management","Analytics & performance reporting","Customer journey mapping","Stakeholder management","Email automation","Copywriting & personalization",
          "A/B testing","Performance tracking","CRM management","Cross-functional collaboration","Customer feedback analysis",
          "Audience targeting","Storytelling and brand messaging","Content creation","Graphic design"
        ]}
      />
      <EmPinnedGallery id="newsletter" images={newsletterTiles} alt="Newsletter panel" />

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}

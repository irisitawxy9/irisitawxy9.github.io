// project-management.jsx

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./branding.css";
import "./email-marketing.css";
import "./project-management.css";
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
  return (
    <button
      className={`back-to-top ${visible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

/* ---------- Center-pinned HORIZONTAL gallery (kept as-is) ---------- */
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

/* ---------- OPS-style Morphing Hero → Grid (kept for first section) ---------- */
function EmMorphingGrid({
  id,
  heroSrc = "/images/pro headshot event flyer.jpg",
  tiles = [],
  cols = 4,
  rows = 3,
  gap = 24,
  maxWidth = 1875,
  tileAspectW = 4,
  tileAspectH = 3,
}) {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const heroImgRef = useRef(null);
  const gridRef = useRef(null);
  const cellRefs = useRef([]);

  const totalCells = cols * rows;

  const centerIndex = Math.floor(totalCells / 2);
  const centerCol = centerIndex % cols;
  const leftIndex = centerCol > 0 ? centerIndex - 1 : null;
  const topOfLeft = leftIndex !== null ? leftIndex - cols : null;
  const topOfCenter = centerIndex - cols >= 0 ? centerIndex - cols : null;
  const botOfLeft = leftIndex !== null && leftIndex + cols < totalCells ? leftIndex + cols : null;
  const botOfCenter = centerIndex + cols < totalCells ? centerIndex + cols : null;

  const emptySet = new Set(
    [centerIndex, leftIndex, topOfLeft, topOfCenter, botOfLeft, botOfCenter].filter(
      (x) => x !== null && x >= 0 && x < totalCells
    )
  );

  const gridImageList = useMemo(() => {
    const needed = totalCells - emptySet.size;
    const fallback = "/images/ce.jpg";
    const source = tiles.length ? tiles : Array.from({ length: needed }, () => fallback);
    return Array.from({ length: needed }, (_, i) => source[i % source.length]);
  }, [tiles, totalCells]);

  useEffect(() => {
    cellRefs.current = cellRefs.current.slice(0, totalCells);
  }, [totalCells, gridImageList.length]);

  const recalc = useCallback(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;
    const viewportH = window.innerHeight || 1;
    const extra = Math.max(viewportH * 1.4, 650);
    wrap.style.minHeight = `${sticky.offsetHeight + extra}px`;
  }, []);

  useLayoutEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(document.documentElement);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (stickyRef.current) ro.observe(stickyRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const heroImg = heroImgRef.current;
    const grid = gridRef.current;
    if (!wrap || !heroImg || !grid) return;

    grid.style.opacity = "1";

    let raf = 0;
    const tick = () => {
      raf = 0;

      const rect = wrap.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);

      const start = rect.top - 0.15 * vh;
      const end = rect.bottom - 0.85 * vh;
      const denom = end - start || 1;
      let p = (0 - start) / denom;
      p = Math.max(0, Math.min(1, p));

      const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
      const map = (x, a, b) => clamp((x - a) / (b - a), 0, 1);

      const phaseMove = map(p, 0.28, 0.68);
      const phaseReveal = map(p, 0.45, 1.0);
      const gridFade = map(p, 0.3, 1.0);

      const gridBox = grid.getBoundingClientRect();
      const dstCx = Math.round(gridBox.left + gridBox.width / 2);
      const dstCy = Math.round(gridBox.top + gridBox.height / 2);

      const heroBox = heroImg.getBoundingClientRect();
      const heroCx = Math.round(heroBox.left + heroBox.width / 2);
      const heroCy = Math.round(heroBox.top + heroBox.height / 2);

      const dx = (dstCx - heroCx) * phaseMove;
      const dy = (dstCy - heroCy) * phaseMove;

      const gapPx = parseFloat(getComputedStyle(grid).gap || "0");
      const idealTileW = (gridBox.width - gapPx * (cols - 1)) / cols;
      const scaleTarget = idealTileW / Math.max(1, heroBox.width);
      const scaleNow = 1 - phaseMove * (1 - scaleTarget);

      heroImg.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scaleNow})`;
      heroImg.style.opacity = "1";
      heroImg.style.zIndex = "2";

      for (let i = 0, j = 0; i < totalCells; i++) {
        if (emptySet.has(i)) continue;
        const el = cellRefs.current[i];
        if (!el) continue;
        const step = j / (totalCells - emptySet.size);
        const local = Math.min(1, Math.max(0, (phaseReveal - step * 0.16) / 0.84));
        el.style.opacity = String(local);
        el.style.transform = `translate3d(0, ${20 * (1 - local)}px, 0)`;
        j++;
      }

      grid.style.opacity = String(gridFade);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    tick();
    if (!heroImg.complete) {
      heroImg.addEventListener("load", tick, { once: true });
      heroImg.addEventListener("error", tick, { once: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cols, rows, totalCells]);

  return (
    <section id={`${id}-morph`} className="em-morph-wrap reveal" ref={wrapRef}>
      <div className="em-morph-sticky" ref={stickyRef}>
        <figure className="em-morph-hero">
          <img ref={heroImgRef} src={heroSrc} alt="Headshot hero" />
        </figure>

        <div
          className="em-morph-grid"
          ref={gridRef}
          style={{
            "--grid-w": `min(${maxWidth}px, 92vw)`,
            "--gap": `${gap}px`,
            "--cols": `${cols}`,
            "--rows": `${rows}`,
            "--arw": `${tileAspectW}`,
            "--arh": `${tileAspectH}`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gap}px`,
          }}
          aria-label="Headshot image grid"
        >
          {Array.from({ length: totalCells }, (_, i) => {
            const isEmpty = [
              centerIndex,
              leftIndex,
              topOfLeft,
              topOfCenter,
              botOfLeft,
              botOfCenter,
            ]
              .filter((x) => x !== null)
              .includes(i);

            let src = null;
            if (!isEmpty) {
              let emptiesBefore = 0;
              [centerIndex, leftIndex, topOfLeft, topOfCenter, botOfLeft, botOfCenter]
                .filter((x) => x !== null)
                .forEach((idx) => {
                  if (idx < i) emptiesBefore++;
                });

              const listIndex = i - emptiesBefore;
              const fallback = "/images/ce.jpg";
              const source = tiles.length ? tiles : [fallback];
              const needed = totalCells - 6;
              const looped = Array.from({ length: needed }, (_, k) => source[k % source.length]);
              src = looped[listIndex % looped.length];
            }

            return (
              <figure
                key={`${id}-cell-${i}`}
                className={`em-morph-cell ${
                  i === centerIndex
                    ? "is-center-slot"
                    : i === leftIndex
                    ? "is-left-empty"
                    : i === topOfLeft || i === topOfCenter || i === botOfLeft || i === botOfCenter
                    ? "is-empty-slot"
                    : ""
                }`}
                ref={(el) => (cellRefs.current[i] = el)}
              >
                {src ? <img src={src} alt={`Tile ${i + 1}`} /> : null}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function EmailMarketing() {
  useReveal();

  const [, setSearchParams] = useSearchParams();
  const goToSection = (id) => setSearchParams({ section: id });

  const headshotTiles = [
    "/images/pm1.jpg",
    "/images/pm3.jpg",
    "/images/pm4.jpg",
    "/images/pm5.jpg",
    "/images/pm2.jpg",
    "/images/pm6.jpg",
    "/images/ce.jpg",
    "/images/ce.jpg",
    "/images/pm3.jpg",
    "/images/pm3.jpg",
  ];

  const approvalTiles = ["/images/cr1.png", "/images/ea1.jpg", "/images/ea2.jpg", "/images/ea3.jpg", "/images/ea4.jpg"];

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
        backHref="/?section=portfolio"
        tabTitle="Portfolio"
        addressText="Project Management by Iris"
        eyebrow="Events & Special Projects"
        title="Project Management"
        subtitle="A goal without a plan is just a wish. - Antoine de Saint-Exupéry"
        imageSrc="/media/branding-hero.jpg"
      />

      {/* IN THIS PAGE -> query param scroll */}
      <div className="em-container reveal">
        <section className="em-section em-inpage-row">
          <h1 className="em-inpage-title">IN THIS PAGE</h1>
          <nav className="em-inpage-links" aria-label="Section links">
            <button type="button" className="em-link-btn" onClick={() => goToSection("headshot")}>
              Cross-ministry Event: Professional Headshot Fundraiser
            </button>
            <button type="button" className="em-link-btn" onClick={() => goToSection("approval")}>
              Enterprise Digital Approval System
            </button>
          </nav>
        </section>
      </div>

      <EmDivider />
      <EmTextBlock
        id="headshot"
        kicker="Bringing people together through planning, creativity, and purpose."
        title="Professional Headshot Event"
        stat="Tech stack: Microsoft Office (Teams, Outlook, PowerPoint, Excel, Word), Figma, Photoshop,"
        desc="Led a large-scale professional headshot initiative in support of Federated Health Charities, managing every aspect from concept to execution. Oversaw logistics, volunteer coordination, email communications, and on-site operations, all aligned with a customer lifecycle approach to engagement. Developed supporting materials including a pitch deck, event flyer, and a master planning toolkit that covered scheduling, 
        registration, and feedback collection. The event successfully engaged staff and students across ministries and raised over $800 
        for a meaningful cause, demonstrating how strategic planning and storytelling can inspire community participation. (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Project management",
          "Event logistics & coordination",
          "Email campaign design",
          "Stakeholder engagement",
          "Volunteer leadership",
          "Marketing collateral creation",
          "Fundraising strategy",
          "Performance evaluation",
        ]}
      />
      <EmMorphingGrid
        id="headshot"
        heroSrc="/images/pro headshot event flyer.jpg"
        tiles={headshotTiles}
        cols={4}
        rows={3}
        gap={24}
        maxWidth={1875}
        tileAspectW={4}
        tileAspectH={3}
      />

      <EmDivider />
      <EmTextBlock
        id="approval"
        kicker="Driving digital transformation through collaboration and clarity."
        title="Enterprise Digital Approval System"
        stat="Tech stack: Microsoft Office (Forms, List, PowerPoint, Excel, Word, Teams, Outlook), Figma, Photoshop, Intranet resources"
        desc="Supported the implementation and adoption of an enterprise-wide digital approval system by leading change management 
        and user engagement initiatives. Built and maintained a Community of Practice that fostered collaboration through 
        bi-monthly meetings and “train-the-trainer” programs. Created accessible training materials including 
        placemats, toolkits, and resource guides to simplify onboarding and 
        boost adoption across departments. This initiative enhanced communication, 
        improved process efficiency, and strengthened organizational alignment 
        around digital transformation. (images are blurred on purpose, please email me if you have any questions)"
        skills={[
          "Change management",
          "Stakeholder communication",
          "Training & facilitation",
          "Community building",
          "Resource development",
          "Root-cause analysis",
          "Digital adoption strategy",
          "Cross-functional collaboration",
        ]}
      />
      <EmPinnedGallery id="approval" images={approvalTiles} alt="Enterprise Electronic Approval System visuals" />

      <BackToTop />
    </main>
  );
}

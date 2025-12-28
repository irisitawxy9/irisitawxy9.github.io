import React, { useState, useEffect, useMemo, useRef } from 'react';

import './branding.css';
import './project-management.css'; // shared styles (e.g., back-to-top, reveals)
import './website.css'; // case-study styles (scoped)
import BrandingHero from '../components/BrandingHero/BrandingHero.jsx';
import ImageTrail from '../components/ImageTrail/ImageTrail.jsx';
import ColorRail from '../components/ColorRail.jsx';

/* ---------- Back to Top (unchanged) ---------- */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);
  return (
    <button
      className={`back-to-top ${visible ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

/* ---------- Lightweight modal (for image previews) ---------- */
function Lightbox({ open, title, src, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cs-lightbox" role="dialog" aria-modal="true" aria-label={title || 'Preview'}>
      <button className="cs-lightbox__backdrop" onClick={onClose} aria-label="Close preview" />
      <div className="cs-lightbox__panel">
        <div className="cs-lightbox__top">
          <div className="cs-lightbox__title">{title}</div>
          <button className="cs-lightbox__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="cs-lightbox__body">
          <img className="cs-lightbox__img" src={src} alt={title || 'Preview'} loading="lazy" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Simple accordion (no side nav) ---------- */
function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="cs-accordion" role="region" aria-label="Objectives accordion">
      {items.map((it, idx) => {
        const isOpen = idx === open;
        return (
          <div className={`cs-acc__item ${isOpen ? 'open' : ''}`} key={it.title}>
            <button
              className="cs-acc__btn"
              onClick={() => setOpen(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span className="cs-acc__title">{it.title}</span>
              <span className="cs-acc__icon" aria-hidden="true">
                {isOpen ? '–' : '+'}
              </span>
            </button>
            <div className="cs-acc__panel" hidden={!isOpen}>
              <p className="cs-acc__body">{it.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Scroll progress (case-study area only) ---------- */
function useCaseStudyProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;

      // When container starts entering viewport -> 0; when bottom passes viewport top -> 1.
      const start = viewportH * 0.15; // a small offset so it begins as content appears
      const total = rect.height + viewportH * 0.3;
      const traveled = Math.min(Math.max(start - rect.top, 0), total);
      const p = total > 0 ? traveled / total : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [containerRef]);

  return progress;
}

/* ---------- Reduced motion helper ---------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

/* ---------- Animated metric (counts up on reveal) ---------- */
function Metric({ value, label, hint }) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSeen(true);
        });
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const parsed = useMemo(() => {
    // supports:
    // "68" -> numeric animate
    // "4"  -> numeric animate
    // "4–10" -> keep static (range)
    const trimmed = String(value).trim();
    const n = Number(trimmed);
    const isPureNumber = trimmed !== '' && !Number.isNaN(n) && /^[0-9]+(\.[0-9]+)?$/.test(trimmed);
    return { trimmed, isPureNumber, number: isPureNumber ? n : null };
  }, [value]);

  const [display, setDisplay] = useState(parsed.trimmed);

  useEffect(() => {
    if (!parsed.isPureNumber) {
      setDisplay(parsed.trimmed);
      return;
    }
    if (!seen) {
      setDisplay('0');
      return;
    }
    if (reducedMotion) {
      setDisplay(String(parsed.number));
      return;
    }

    let raf = 0;
    const duration = 850;
    const start = performance.now();
    const from = 0;
    const to = parsed.number;

    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplay(String(Math.round(current)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parsed.isPureNumber, parsed.number, parsed.trimmed, reducedMotion, seen]);

  return (
    <div className="cs-metric" ref={ref}>
      <div className="cs-metric__top">
        <div className="cs-metric__value" aria-label={`${label}: ${parsed.trimmed}`}>
          {parsed.isPureNumber ? display : parsed.trimmed}
        </div>
        {hint ? (
          <button className="cs-info" type="button" aria-label={`More info: ${label}`} title={hint}>
            i
          </button>
        ) : null}
      </div>
      <div className="cs-metric__label">{label}</div>
      {hint ? <div className="cs-metric__hint">{hint}</div> : null}
    </div>
  );
}

/* ---------- Before/After compare slider ---------- */
function CompareSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After', title }) {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(55); // %
  const [dragging, setDragging] = useState(false);

  const clamp = (v) => Math.min(Math.max(v, 0), 100);

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(clamp(pct));
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e) => {
      if (e.touches?.[0]) setFromClientX(e.touches[0].clientX);
      else setFromClientX(e.clientX);
    };
    const onUp = () => setDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  return (
    <div className="cs-compare" aria-label={title || 'Before and after comparison'}>
      {title ? <div className="cs-compare__title">{title}</div> : null}

      <div className="cs-compare__wrap" ref={wrapRef}>
        <img className="cs-compare__img" src={afterSrc} alt={`${afterLabel} image`} loading="lazy" />
        <div className="cs-compare__mask" style={{ width: `${pos}%` }}>
          <img className="cs-compare__img" src={beforeSrc} alt={`${beforeLabel} image`} loading="lazy" />
        </div>

        <div className="cs-compare__labels" aria-hidden="true">
          <span className="cs-compare__pill">{beforeLabel}</span>
          <span className="cs-compare__pill">{afterLabel}</span>
        </div>

        <div
          className={`cs-compare__handle ${dragging ? 'is-dragging' : ''}`}
          style={{ left: `${pos}%` }}
          role="slider"
          aria-label="Comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 2;
            if (e.key === 'ArrowLeft') setPos((p) => clamp(p - step));
            if (e.key === 'ArrowRight') setPos((p) => clamp(p + step));
            if (e.key === 'Home') setPos(0);
            if (e.key === 'End') setPos(100);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onTouchStart={() => setDragging(true)}
        >
          <div className="cs-compare__line" />
          <button
            type="button"
            className="cs-compare__knob"
            aria-label="Drag to compare"
            onMouseDown={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onTouchStart={() => setDragging(true)}
          >
            ↔
          </button>
        </div>

        <input
          className="cs-compare__range"
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparison range"
          style={reducedMotion ? {} : undefined}
        />
      </div>

      <div className="cs-compare__note">Drag the handle (or use arrow keys) to compare.</div>
    </div>
  );
}

/* ---------- Copy summary CTA ---------- */
function CopySummary({ text }) {
  const [status, setStatus] = useState('idle'); // idle | success | error

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('success');
      window.setTimeout(() => setStatus('idle'), 1600);
    } catch (e) {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 1600);
    }
  };

  return (
    <div className="cs-copy" aria-label="Copy case study summary">
      <button className="cs-copy__btn" type="button" onClick={onCopy}>
        Copy summary
      </button>
      <div className="cs-copy__meta" aria-live="polite">
        {status === 'success' ? 'Copied.' : status === 'error' ? 'Copy failed.' : ' '}
      </div>
    </div>
  );
}

/* ---------- Media slider (simple, scoped) ---------- */
function MediaSlider({ slides, ariaLabel = 'Media slider', auto = false, autoMs = 6000 }) {
  const reducedMotion = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const count = slides?.length || 0;

  const clampIdx = (n) => {
    if (count <= 0) return 0;
    return (n + count) % count;
  };

  const go = (n) => setIdx(clampIdx(n));

  useEffect(() => {
    if (!auto || reducedMotion || count <= 1) return;
    const t = window.setInterval(() => setIdx((i) => clampIdx(i + 1)), autoMs);
    return () => window.clearInterval(t);
  }, [auto, autoMs, reducedMotion, count]);

  if (!count) return null;

  const current = slides[idx];
  const humanIndex = idx + 1;

  return (
    <div className="cs-slider" role="region" aria-label={ariaLabel}>
      <div className="cs-slider__frame">
        <img className="cs-slider__img" src={current.src} alt={current.alt || 'Slide'} loading="lazy" />

        {/* NEW: Slide indicator (top-center) */}
        {count > 1 ? (
          <div className="cs-slider__counter" aria-label={`Slide ${humanIndex} of ${count}`}>
            {humanIndex} / {count}
          </div>
        ) : null}

        {count > 1 ? (
          <>
            <button
              type="button"
              className="cs-slider__nav cs-slider__nav--prev"
              onClick={() => go(idx - 1)}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className="cs-slider__nav cs-slider__nav--next"
              onClick={() => go(idx + 1)}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        ) : null}

        {current.label ? <div className="cs-slider__label">{current.label}</div> : null}
      </div>

      {count > 1 ? (
        <div className="cs-slider__dots" role="tablist" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={`${s.src}-${i}`}
              type="button"
              className={`cs-slider__dot ${i === idx ? 'is-active' : ''}`}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Branding() {
  // Keep existing reveal behavior (your original pattern)
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const [lb, setLb] = useState({ open: false, title: '', src: '' });

  // Progress is scoped to the case-study container (not the hero)
  const caseContainerRef = useRef(null);
  const progress = useCaseStudyProgress(caseContainerRef);

  const summaryText = useMemo(() => {
    return [
      'York University UIT — Web Redesign (Case Study)',
      'Research-driven redesign to reduce friction, improve wayfinding, and align templates to UIT brand standards.',
      'Work translated analytics + stakeholder feedback into clearer information architecture and more intuitive page templates.',
    ].join('\n');
  }, []);

  return (
    <main className="branding-page website-case">
      {/* Page-scoped theme glow (behind content, doesn’t affect footer) */}
      <div className="theme-bg-sticky" aria-hidden="true" />

      {/* Top-left go back arrow (INTACT) */}
      <a href="/#portfolio" className="back-cta" aria-label="Back to portfolio">
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
      </a>

      {/* HERO (INTACT behavior — same component + same prop pattern) */}
      <BrandingHero
        backHref="/#portfolio"
        tabTitle="Portfolio"
        addressText="Website by Iris"
        eyebrow="Design is how it works - Steve Jobs"
        title="Website Design and Development"
        subtitle="Transforming insights into intuitive and data-driven digital experiences."
        imageSrc="/media/branding-hero.jpg"
      />

      {/* Subtle progress indicator for the case study (scoped) */}
      <div className="cs-progress" aria-hidden="true">
        <div className="cs-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* Everything below is updated (no side menu) */}
      <div className="container" ref={caseContainerRef}>
        {/* ===== 1) Project Overview (modernized) ===== */}
        <section className="section cs split" style={{ marginTop: 40 }}>
          <div className="copy">
            <p className="kicker">About This Project</p>
            <h2>York University Information Technology (UIT) — Web Redesign</h2>
            <p className="desc">
              A research-driven redesign focused on reducing friction, improving wayfinding, and aligning the experience to UIT’s
              brand standards. Work translated analytics and stakeholder feedback into a clearer information architecture and more
              intuitive page templates.
            </p>

            <div className="cs-metrics" aria-label="Key highlights">
              <Metric value="68" label="Feedback leads analyzed" />
              <Metric value="4" label="Phases (audit → maintenance)" />
            </div>

            <div className="taglines">
              <span className="pill">UX/UI design</span>
              <span className="pill">Information architecture</span>
              <span className="pill">Analytics interpretation</span>
              <span className="pill">Content consolidation</span>
              <span className="pill">WordPress prototyping</span>
              <span className="pill">Testing & iteration</span>
            </div>
          </div>

          <div
            className="media cover image-panel"
            style={{ backgroundImage: 'url(/images/UITtime.jpg)' }}
            role="img"
            aria-label="York University UIT website redesign overview"
          />
        </section>

        {/* ===== 2) Objectives (interactive accordion) ===== */}
        <section className="section cs split reverse">
          <div className="copy">
            <p className="kicker">Objectives</p>
            <h2>I.M.P.A.C.T framework</h2>
            <p className="desc">A concise rubric used to keep decisions grounded in user outcomes, engagement, and maintainability.</p>

            <Accordion
              items={[
                {
                  title: 'Improve user experience',
                  body: 'Reduce clicks and clarify pathways to high-demand tasks so users can complete actions quickly and confidently.',
                },
                {
                  title: 'Maximize engagement',
                  body: 'Use scannable sections, featured services, and clear CTAs to encourage exploration without overwhelming users.',
                },
                {
                  title: 'Performance optimizing',
                  body: 'Simplify hierarchy and reduce redundancy to improve navigation and search behavior.',
                },
                {
                  title: 'Align branding cohesion',
                  body: 'Standardize templates, layout patterns, and interaction behaviors to reinforce trust and familiarity.',
                },
                {
                  title: 'Tailor enhancements',
                  body: 'Validate improvements using surveys, focus groups, and analytics—then iterate based on evidence.',
                },
              ]}
            />

            <div className="cs-callout">
              <strong>Design principle:</strong> Make the “right next step” obvious through predictable structure, clear labels, and
              fewer dead ends.
            </div>
          </div>

          <div
            className="usp-visual"
            style={{ backgroundImage: 'url(/images/UITob.jpg)' }}
            aria-label="Research findings and objectives visuals"
            role="img"
          />
        </section>

        {/* ===== 3) Research Findings (tight, portfolio-ready) ===== */}
        <section className="section cs split">
          <div className="copy">
            <p className="kicker">Research Findings</p>
            <h2>Key patterns that shaped the redesign</h2>
            <p className="desc">
              Findings consistently pointed to two issues: users couldn’t find the right entry point quickly, and service journeys
              looped across portals before reaching a solution.
            </p>

            <div className="cs-cardgrid" aria-label="Key findings">
              <div className="cs-card">
                <div className="cs-card__title">Most-requested tasks</div>
                <ul className="cs-list">
                  <li>Account access (Passport York) and service wayfinding</li>
                  <li>Software discovery and eligibility clarity</li>
                  <li>High-volume “who do I contact?” support paths (e.g., alumni services)</li>
                </ul>
              </div>

              <div className="cs-card">
                <div className="cs-card__title">What changed</div>
                <ul className="cs-list">
                  <li>Consolidated entry points to reduce dead ends</li>
                  <li>Cleaner page hierarchy + scannable sections for faster decisions</li>
                  <li>More direct CTAs to get users to the correct service path</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="media" aria-label="Research findings media">
            <MediaSlider
              ariaLabel="Research findings media slider"
              slides={[
                { src: '/images/UITs1.jpg', alt: 'UIT visuals supporting research findings', label: 'User Journey' },
                { src: '/images/UITs2.jpg', alt: 'UIT redesign overview visual', label: 'Website Traffic' },
                { src: '/images/UITs3.jpg', alt: 'UIT redesign overview visual', label: 'Website Traffic (cont.)' },
              ]}
            />
          </div>
        </section>

        {/* ===== 4) Delivery (tight, portfolio-ready) ===== */}
        <section className="section cs split reverse logo-section">
          <div className="copy">
            <p className="kicker">Delivery</p>
            <h2>What I delivered</h2>
            <p className="desc">
              A streamlined, evidence-led implementation plan that moved from structure to build to validation.
            </p>

            <div className="cs-next" aria-label="Delivery outputs">
              <div className="cs-next__col">
                <h3>Structure</h3>
                <ul className="cs-list">
                  <li>Information architecture and navigation simplification</li>
                  <li>Standardized template patterns for consistency</li>
                  <li>Content consolidation to reduce redundancy</li>
                </ul>
              </div>
              <div className="cs-next__col">
                <h3>Build</h3>
                <ul className="cs-list">
                  <li>WordPress prototyping aligned to UIT standards</li>
                  <li>Component-level layout decisions for repeatability</li>
                  <li>Clean handoff-ready page structure</li>
                </ul>
              </div>
              <div className="cs-next__col">
                <h3>Validate</h3>
                <ul className="cs-list">
                  <li>Usability checks + pathway QA</li>
                  <li>Accessibility and responsive review</li>
                  <li>Analytics baseline for post-launch iteration</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="media" aria-label="Delivery media">
            <MediaSlider
              ariaLabel="Delivery media slider"
              slides={[
                { src: '/images/UITh1.png', alt: 'Brand applications and implementation visuals' },
                { src: '/images/UITh2.png', alt: 'Supporting visual for implementation approach' },
                { src: '/images/UITf1.png', alt: 'Supporting visual for implementation approach' },
                { src: '/images/UITf2.png', alt: 'Supporting visual for implementation approach' },
                { src: '/images/UITc.png', alt: 'Supporting visual for implementation approach' },
              ]}
            />
          </div>
        </section>
      </div>

      <Lightbox
        open={lb.open}
        title={lb.title}
        src={lb.src}
        onClose={() => setLb({ open: false, title: '', src: '' })}
      />

      {/* Back to Top (INTACT) */}
      <BackToTop />
    </main>
  );
}

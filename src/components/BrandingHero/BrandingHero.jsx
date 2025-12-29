import React from "react";
import styled from "styled-components";

/**
 * Reusable on-brand hero (browser-window look)
 * All copy & image come in via props; safe defaults included so it renders even if you forget one.
 */
export default function BrandingHero({
  backHref = "/#portfolio",
  tabTitle = "Uiverse",
  addressText = "uiverse.io",
  eyebrow = "Branding — Case Study",
  title = "EMW Brand Kit",
  subtitle = "Building cultural resonance through strategy and design.",
  imageSrc = "/media/branding-hero.jpg" // put your file in /public/media/
}) {
  return (
    <HeroWrap>
      {/* fixed return arrow (hover shows “Portfolio”) */}
      <a href={backHref} className="back-cta" aria-label="Back to portfolio">
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

      <div className="container">
        <div className="browser">
          {/* toolbar with tab */}
          <div className="tabs-head">
            <div className="tabs">
              <div className="tab-open">
                <div className="rounded-l">
                  <div className="mask-round" />
                </div>

                <span className="tab-title" title={tabTitle}>
                  {tabTitle}
                </span>

                <div className="close-tab" aria-hidden="true">
                  ✕
                </div>

                <div className="rounded-r">
                  <div className="mask-round" />
                </div>
              </div>
            </div>

            <div className="window-opt">
              <button aria-label="minimize">-</button>
              <button aria-label="maximize">□</button>
              <button className="window-close" aria-label="close">
                ✕
              </button>
            </div>
          </div>

          {/* address row */}
          <div className="head-browser">
            <button aria-label="back">←</button>
            <button disabled aria-label="forward">
              →
            </button>

            <input
              type="text"
              defaultValue={addressText}
              placeholder="Search Google or type URL"
              aria-label="address bar"
            />

            <button aria-label="more">⋮</button>
            <button className="star" aria-label="star">
              ✰
            </button>
          </div>

          {/* canvas */}
          <div
            className="canvas"
            style={{ backgroundImage: `url(${imageSrc})` }}
            role="img"
            aria-label="Project preview background"
          >
            <div className="canvas-overlay" />
            {/* glare layer sits between overlay and content */}
            <div className="glare-overlay" aria-hidden="true" />

            <div className="hero-inner">
              <div className="hero-card">
                <p className="kicker">{eyebrow}</p>
                <h1>{title}</h1>
                <p className="lead">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroWrap>
  );
}

/* ============== styles are fully scoped here ============== */
const HeroWrap = styled.section`
  /* brand tokens */
  --bg-gradient: linear-gradient(
    145deg,
    rgba(186, 220, 255, 0.9) 0%,
    rgba(232, 210, 255, 0.85) 40%,
    rgba(255, 226, 230, 0.9) 100%
  );
  --ink: #0f172a;
  --muted: #334155;
  --line: rgba(15, 23, 42, 0.12);
  --card: #ffffff;
  --shadow: 0 10px 30px rgba(2, 6, 23, 0.08);
  --shadow-xl: 0 40px 90px rgba(2, 6, 23, 0.18);

  position: relative;
  isolation: isolate;
  color: var(--ink);
  min-height: 40vh;

  /* Layout safety: prevent flex/grid overflow */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .container {
    max-width: 1480px;
    margin: 0 auto;
    padding: 36px 32px 0;
  }

  /* back arrow */
  .back-cta {
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 50;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 10px 14px;
    box-shadow: var(--shadow);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    max-width: calc(100vw - 32px);
  }
  .back-cta:hover {
    transform: translateX(-2px);
    box-shadow: 0 18px 40px rgba(2, 6, 23, 0.14);
  }
  .back-cta svg {
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
  }
  .back-cta .label {
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    transition: width 0.35s ease, opacity 0.25s ease;
    font-weight: 700;
    letter-spacing: 0.2px;
  }
  .back-cta:hover .label {
    width: 106px;
    opacity: 1;
  }

  /* browser card */
  .browser {
    width: min(80%, 1400px);
    height: min(78vh, 500px);
    margin: 20px auto 24px;
    background: #0b0c0f;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--line);
    min-width: 0; /* critical: prevents overflow in nested flex */
  }

  .tabs-head {
    background: #353535;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-left: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    min-width: 0;
  }
  .tabs-head .tabs {
    display: flex;
    align-items: end;
    height: 100%;
    min-width: 0;
  }

  .tab-open {
    width: 140px;
    height: 22px;
    border-radius: 12px 12px 0 0;
    background: #515151;
    display: flex;
    gap: 8px;
    align-items: start;
    justify-content: space-between;
    padding: 6px 10px;
    position: relative;
    min-width: 0;
  }

  .tab-title {
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tab-open .close-tab {
    color: #fff;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .tab-open .rounded-l,
  .tab-open .rounded-r {
    position: absolute;
    background: #515151;
    width: 24px;
    height: 30px;
    top: 0;
    overflow: hidden;
  }
  .tab-open .rounded-l {
    right: 0;
    transform: translate(100%);
  }
  .tab-open .rounded-r {
    left: 0;
    transform: translate(-100%);
  }
  .tab-open .mask-round {
    width: 100%;
    height: 100%;
    background: #353535;
    border-radius: 0 0 12px 12px;
  }

  .window-opt {
    display: flex;
    flex: 0 0 auto;
  }
  .window-opt button {
    height: 34px;
    width: 34px;
    border: none;
    background: transparent;
    color: #fff;
    border-radius: 8px;
    margin-bottom: 14px;
    transition: 0.1s;
    font-size: 14px;
  }
  .window-opt button:hover {
    background: #515151c8;
  }
  .window-opt .window-close:hover {
    background: rgb(255, 52, 52);
  }

  .head-browser {
    position: relative;
    width: 100%;
    height: 56px;
    background: #515151;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .head-browser input {
    background: #3b3b3b;
    border: 2px solid transparent;
    height: 100%;
    border-radius: 28px;
    outline: none;
    color: #fff;
    padding: 0 18px;
    flex: 1;
    min-width: 0; /* lets input shrink instead of overflowing */
    transition: 0.2s;
    font-weight: 600;

    /* responsive type (shrinks on small screens) */
    font-size: clamp(12px, 1.4vw, 14px);

    /* overflow safety */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .head-browser input:hover {
    background: #5d5d5d;
  }
  .head-browser input:focus {
    border-color: rgb(173, 214, 255);
  }
  .head-browser input::placeholder {
    color: #fff;
    opacity: 0.9;
  }

  .head-browser button {
    width: 34px;
    height: 34px;
    border: none;
    background: transparent;
    color: #fff;
    border-radius: 50%;
    transition: 0.2s;
    font-size: clamp(14px, 2.4vw, 16px); /* responsive */
    flex: 0 0 auto;
  }
  .head-browser button:disabled {
    opacity: 0.4;
  }
  .head-browser button:hover {
    background: #5d5d5d;
  }
  .head-browser button:disabled:hover {
    background: transparent;
  }

  .head-browser .star {
    color: #fff;
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.7;
    height: 22px;
    width: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    font-size: clamp(14px, 2.4vw, 17px);
  }

  .canvas {
    position: relative;
    flex: 1;
    background: #11131a;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 0;
  }

  .canvas-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.52)),
      radial-gradient(120% 100% at 0% 0%, rgba(186, 220, 255, 0.18), transparent 60%),
      radial-gradient(120% 100% at 100% 100%, rgba(255, 226, 230, 0.2), transparent 62%);
  }

  .hero-inner {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 32px;
    min-width: 0;
  }

  .hero-card {
    width: min(92%, 1040px);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: saturate(135%) blur(8px);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 34px 40px;
    box-shadow: var(--shadow);
    min-width: 0;
  }

  .kicker {
    display: inline-block;
    font-size: clamp(11px, 1.6vw, 13px); /* responsive */
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 8px;
    overflow-wrap: anywhere;
  }

  h1 {
    font-size: clamp(26px, 5.2vw, 64px); /* responsive down to small phones */
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0;
    overflow-wrap: anywhere; /* prevents overflow on long titles */
  }

  .lead {
    font-size: clamp(14px, 2.4vw, 22px); /* responsive */
    color: var(--muted);
    margin-top: 12px;
    overflow-wrap: anywhere;
  }

  /* ===== Responsive tightening: everything scales down, nothing overflows ===== */
  @media (max-width: 960px) {
    .container {
      padding: 28px 20px 0;
    }
    .browser {
      width: 92%;
      border-radius: 22px;
    }
  }

  @media (max-width: 720px) {
    .container {
      padding: 22px 14px 0;
    }

    .back-cta {
      padding: 9px 12px;
    }
    .back-cta svg {
      width: 22px;
      height: 22px;
    }
    /* Prevent any label expansion overflow on small screens */
    .back-cta:hover .label {
      width: 0;
      opacity: 0;
    }

    .browser {
      width: 100%;
      height: auto; /* avoid internal clipping */
      margin: 0 auto;
      border-radius: 20px;
    }

    .tabs-head {
      height: 54px;
      padding-left: 14px;
    }

    .tab-open {
      width: 120px;
      height: 20px;
      padding: 5px 9px;
    }

    .window-opt button {
      height: 30px;
      width: 30px;
      margin-bottom: 12px;
      font-size: 13px;
    }

    .head-browser {
      height: 50px;
      padding: 9px;
    }
    .head-browser button {
      width: 30px;
      height: 30px;
    }
    .head-browser .star {
      right: 36px;
      height: 20px;
      width: 20px;
    }

    /* Ensure canvas stays tall enough when browser height becomes auto */
    .canvas {
      min-height: 52vh;
    }

    .hero-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .hero-card {
      margin: 0 auto;
      width: 94%;
      padding: 22px 18px;
      border-radius: 20px;
    }
  }

  @media (max-width: 480px) {
    .tabs-head {
      height: 50px;
    }
    .tab-open {
      width: 108px;
    }

    .head-browser input {
      padding: 0 14px;
      border-radius: 22px;
    }

    .canvas {
      min-height: 56vh;
    }

    .hero-card {
      padding: 18px 14px;
    }
  }

  /* ===== glare styles ===== */
  .glare-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .glare-overlay::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -40%;
    width: 34%;
    height: 120%;
    transform: rotate(15deg);
    background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.75) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    filter: blur(8px);
    opacity: 0.28;
    animation: glareSlide 2s ease-in-out infinite;
  }
  @keyframes glareSlide {
    0% {
      left: -40%;
    }
    55% {
      left: 112%;
    }
    100% {
      left: 112%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .glare-overlay::before {
      animation: none;
    }
  }
`;

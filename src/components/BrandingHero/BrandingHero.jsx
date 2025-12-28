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
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="label">Portfolio</span>
      </a>

      <div className="container">
        <div className="browser">
          {/* toolbar with tab */}
          <div className="tabs-head">
            <div className="tabs">
              <div className="tab-open">
                <div className="rounded-l"><div className="mask-round" /></div>
                <span>{tabTitle}</span>
                <div className="close-tab">✕</div>
                <div className="rounded-r"><div className="mask-round" /></div>
              </div>
            </div>
            <div className="window-opt">
              <button aria-label="minimize">-</button>
              <button aria-label="maximize">□</button>
              <button className="window-close" aria-label="close">✕</button>
            </div>
          </div>

          {/* address row */}
          <div className="head-browser">
            <button aria-label="back">←</button>
            <button disabled aria-label="forward">→</button>
            <input
              type="text"
              defaultValue={addressText}
              placeholder="Search Google or type URL"
              aria-label="address bar"
            />
            <button aria-label="more">⋮</button>
            <button className="star" aria-label="star">✰</button>
          </div>

          {/* canvas */}
          <div
            className="canvas"
            style={{ backgroundImage: `url(${imageSrc})` }}
            role="img"
            aria-label="Project preview background"
          >
            <div className="canvas-overlay" />
            {/* ONLY ADDITION #1: glare layer sits between overlay and content */}
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
  --bg-gradient: linear-gradient(145deg, rgba(186, 220, 255, 0.9) 0%, rgba(232, 210, 255, 0.85) 40%, rgba(255, 226, 230, 0.9) 100%);
  --ink:#0f172a; --muted:#334155; --line:rgba(15,23,42,.12);
  --card:#ffffff; --shadow:0 10px 30px rgba(2,6,23,.08); --shadow-xl:0 40px 90px rgba(2,6,23,.18);

  position: relative; isolation: isolate; color: var(--ink); min-height: 40vh;

  /* ⛔️ Removed the fixed blurred gradient that caused site-wide fog */

  .container{ max-width:1480px; margin:0 auto; padding:36px 32px 0; }

  /* back arrow */
  .back-cta{
    position:fixed; top:16px; left:16px; z-index:50;
    display:inline-flex; align-items:center; gap:10px;
    background:var(--card); border:1px solid var(--line); border-radius:999px;
    padding:10px 14px; box-shadow:var(--shadow); text-decoration:none; color:inherit;
    transition:transform .2s ease, box-shadow .2s ease;
  }
  .back-cta:hover{ transform:translateX(-2px); box-shadow:0 18px 40px rgba(2,6,23,.14); }
  .back-cta svg{ width:24px; height:24px; }
  .back-cta .label{ width:0; overflow:hidden; white-space:nowrap; opacity:0; transition:width .35s ease,opacity .25s ease; font-weight:700; letter-spacing:.2px; }
  .back-cta:hover .label{ width:106px; opacity:1; }

  /* browser card */
  .browser{
    width:80%; max-width:1400px; height:min(78vh, 500px);
    margin:20px auto 24px; background:#0b0c0f; border-radius:24px;
    display:flex; flex-direction:column; overflow:hidden; position:relative;
    box-shadow:var(--shadow-xl); border:1px solid var(--line);
  }

  .tabs-head{
    background:#353535; height:64px; display:flex; justify-content:space-between; align-items:end; padding-left:20px;
    border-bottom:1px solid rgba(255,255,255,.08);
  }
  .tabs-head .tabs{ display:flex; align-items:end; height:100%; }
  .tab-open{
    width:140px; height:22px; border-radius:12px 12px 0 0; background:#515151;
    display:flex; gap:8px; align-items:start; justify-content:space-between; padding:6px 10px; position:relative;
  }
  .tab-open .close-tab{ color:#fff; font-size:11px; padding:2px 6px; border-radius:50%; }
  .tab-open .rounded-l,.tab-open .rounded-r{
    position:absolute; background:#515151; width:24px; height:30px; top:0; overflow:hidden;
  }
  .tab-open .rounded-l{ right:0; transform:translate(100%); }
  .tab-open .rounded-r{ left:0; transform:translate(-100%); }
  .tab-open .mask-round{ width:100%; height:100%; background:#353535; border-radius:0 0 12px 12px; }
  .tab-open span{ color:#fff; font-size:12px; font-weight:600; }

  .window-opt{ display:flex; }
  .window-opt button{
    height:34px; width:34px; border:none; background:transparent; color:#fff; border-radius:8px; margin-bottom:14px; transition:.1s;
  }
  .window-opt button:hover{ background:#515151c8; }
  .window-opt .window-close:hover{ background:rgb(255,52,52); }

  .head-browser{
    position:relative; width:100%; height:56px; background:#515151; padding:10px; display:flex; align-items:center; gap:8px;
  }
  .head-browser input{
    background:#3b3b3b; border:2px solid transparent; height:100%; border-radius:28px; outline:none; color:#fff; padding:0 18px; flex:1; transition:.2s; font-weight:600;
  }
  .head-browser input:hover{ background:#5d5d5d; }
  .head-browser input:focus{ border-color:rgb(173,214,255); }
  .head-browser input::placeholder{ color:#fff; }
  .head-browser button{
    width:34px; height:34px; border:none; background:transparent; color:#fff; border-radius:50%; transition:.2s; font-size:16px;
  }
  .head-browser button:disabled{ opacity:.4; }
  .head-browser button:hover{ background:#5d5d5d; }
  .head-browser button:disabled:hover{ background:transparent; }
  .head-browser .star{
    color:#fff; position:absolute; right:40px; top:50%; transform:translateY(-50%);
    font-size:17px; opacity:.7; height:22px; width:22px; display:flex; align-items:center; justify-content:center; padding-bottom:2px;
  }

  .canvas{
    position:relative; flex:1; background:#11131a;
    background-size:cover; background-position:center; background-repeat:no-repeat;
  }
  .canvas-overlay{
    position:absolute; inset:0;
    background:
      linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.52)),
      radial-gradient(120% 100% at 0% 0%, rgba(186,220,255,.18), transparent 60%),
      radial-gradient(120% 100% at 100% 100%, rgba(255,226,230,.20), transparent 62%);
  }

  .hero-inner{ position:absolute; inset:0; display:grid; place-items:center; padding:32px; }
  .hero-card{
    width:min(92%, 1040px);
    background:rgba(255,255,255,.9);
    backdrop-filter:saturate(135%) blur(8px);
    border:1px solid var(--line); border-radius:24px; padding:34px 40px; box-shadow:var(--shadow);
  }
  .kicker{ display:inline-block; font-size:13px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:8px; }
  h1{ font-size:clamp(42px, 4.2vw, 64px); line-height:1.05; letter-spacing:-.02em; margin:0; }
  .lead{ font-size:clamp(18px, 1.4vw, 22px); color:var(--muted); margin-top:12px; }

@media (max-width: 720px){
    .browser{
        height:72vh;
        border-radius:20px;

        /* NEW — ensures full width & centers canvas content */
        width: 100%;
        margin: 0 auto;
    }

    .tabs-head{ height:56px; }
    .head-browser{ height:52px; }

    /* NEW — ensures hero content centers properly */
    .hero-inner{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 24px;
    }

    /* NEW — prevents hero-card from shifting left on small screens */
    .hero-card{
        margin: 0 auto;
        width: 92%;
    }
}


  /* ===== ONLY ADDITION #2: self-contained glare styles (no other edits) ===== */
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
    0%   { left: -40%; }
    55%  { left: 112%; }
    100% { left: 112%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .glare-overlay::before { animation: none; }
  }
`;

import React, { useState } from 'react';
import { useEffect } from 'react';

import './branding.css';
import './project-management.css'; // back-to-top styles (added)
import BrandingHero from '../components/BrandingHero/BrandingHero.jsx';
import ImageTrail from '../components/ImageTrail/ImageTrail.jsx';
import ColorRail from '../components/ColorRail.jsx';

/* ---------- Back to Top (added, design/style shared) ---------- */
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

export default function Branding() {
  const [trailKey] = useState(() => Date.now());
  useEffect(() => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <main className="branding-page">
      {/* Page-scoped theme glow (behind content, doesn’t affect footer) */}
      <div className="theme-bg-sticky" aria-hidden="true" />

      {/* Top-left go back arrow */}
      <a href="/#portfolio" className="back-cta" aria-label="Back to portfolio">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="label">Portfolio</span>
      </a>

      {/* HERO (unchanged behavior) */}
      <BrandingHero
        backHref="/#portfolio"
        tabTitle="Portfolio"
        addressText="Branding by Iris"
        eyebrow="Brand Kit - the starter package"
        title="Branding"
        subtitle="Building cultural resonance through strategy and design."
        imageSrc="/media/branding-hero.jpg"
      />
      {/* hero block unchanged from your file :contentReference[oaicite:1]{index=1} */}

      <div className="container">
        {/* ===== Brand Kit ===== */}
        <section className="section split" style={{ marginTop: 40 }}>
          <div className="copy">
            <p className="kicker">What is this project about?</p>
            <h2>Brand Kit for East Meets West</h2>
            <p className="desc">
              A holistic brand guideline for a multi-generational sanctuary celebrating Chinese heritage and culture.
              Through strategic storytelling, visual cohesion, and purposeful design, the kit captures core values of
              belonging, enlightenment, and connection.
            </p>
          </div>
          <div
            className="media cover image-panel"
            style={{ backgroundImage: 'url(/images/EMW%20branding%20guidelines.png)' }}
            role="img"
            aria-label="EMW branding guidelines"
          />
        </section>
        {/* section block unchanged from your file :contentReference[oaicite:2]{index=2} */}

        {/* ===== Moodboard — local image trail ===== */}
        <section className="section">
          <div className="max-w-prose">
            <p className="kicker">Moodboard</p>
            <h2>The creative compass that tells your story at a glance</h2>
            <p className="desc">
              A brand begins with emotion. Mood boards translate that emotion into tangible inspiration—curating imagery,
              textures, and tones that capture the brand’s personality and purpose.
            </p>

            {/* CTA: Move your mouse */}
            <div className="cta-ghost" aria-hidden="false">
              Move your mouse around in the below empty section
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div style={{ height: '520px', position: 'relative', overflow: 'hidden', marginTop: 14 }}>
            <ImageTrail
              key={trailKey}
              items={[
                '/images/dragondance.jpg',
                '/images/cali2.jpg',
                '/images/cali1.jpg',
                '/images/lanterns.jpg',
              ]}
              variant={7}
            />
          </div>
        </section>
        {/* moodboard block unchanged from your file :contentReference[oaicite:3]{index=3} */}

        {/* ===== Colour — row layout: text+ColorRail (left), ImageTrail (right) ===== */}
        <section className="section split">
          {/* LEFT: copy only */}
          <div className="copy">
            <p className="kicker">Colour</p>
            <h2>Colour psychology meets brand strategy</h2>
            <p className="desc">
              Confident primaries, supportive neutrals, and a ceremonial gold accent, calibrated for
              recognition, accessibility, and clarity.
            </p>
          </div>

          {/* RIGHT: ColorRail only (aligned and sized nicely) */}
          <div className="color-rail-col" aria-label="Brand colour rail" >
            <ColorRail
              colors={[
                '#B71B1E', '#0156A3', '#D5A028','#000000', '#EEEEEE', 
              ]}
            />
          </div>
        </section>
        {/* colour block unchanged from your file :contentReference[oaicite:4]{index=4} */}

        {/* ===== Typeface (Futura + IBM Plex Serif) ===== */}
        <section className="section split reverse">
          <div className="copy">
            <p className="kicker">Typeface</p>
            <h2>Fonts carry voice and character</h2>
            <p className="desc">
              Headlines use <strong>Futura</strong> for clean geometry and presence. Body copy uses <strong>IBM Plex Serif </strong>
              for readable, elegant long-form text across web and print.
            </p>
          </div>
          <div className="type-specimen">
            <div className="type-card">
              <div className="type-xl" style={{ fontFamily: '"Futura","Futura PT","Trebuchet MS",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif' }}>
                Headline — Futura
              </div>
              <p className="type-para">
                A geometric sans for titles, pull quotes, and navigation.
              </p>
            </div>
            <div className="type-card">
              <div className="type-xl" style={{ fontFamily: '"IBM Plex Serif", Georgia, "Times New Roman", serif', fontWeight:600 }}>
                Body — IBM Plex Serif
              </div>
              <p className="type-para">
                Humanist proportions for comfortable reading in paragraphs and UI labels.
              </p>
            </div>
          </div>
        </section>
        {/* typeface block unchanged from your file :contentReference[oaicite:5]{index=5} */}

        {/* ===== Logo (two images, responsive fit) ===== */}
        <section className="section split logo-section">
          <div className="copy">
            <p className="kicker">Logo</p>
            <h2>Identity, precision, and meaning</h2>
            <p className="desc">
              Primary and alternate logos are shown on the right: showcasing EMW’s refined balance of cultural heritage and modern sophistication.
            </p>
          </div>

          <div className="logo-grid" role="list">
            <div className="logo-img" role="listitem" aria-label="EMW Primary Logo">
              <img src="/images/EMW1.png" alt="EMW Primary Logo" loading="lazy" />
            </div>
            <div className="logo-img" role="listitem" aria-label="EMW Alternate Logo">
              <img src="/images/EMW2.png" alt="EMW Alternate Logo" loading="lazy" />
            </div>
          </div>
        </section>
        {/* logo block unchanged from your file :contentReference[oaicite:6]{index=6} */}

        {/* ===== USP (revamped) ===== */}
        <section className="section usp split">
          <div className="copy">
            <p className="kicker">UVP & Brand Application</p>
            <h2>Bringing the brand to life</h2>
            <p className="desc">
              A unique selling proposition defines what sets your brand apart and strategic application brings it to life. 

            </p>

            <div className="usp-grid">
              <div className="taglines">
                <span className="pill">Unite, Inspire, Discover</span>
                <span className="pill">Culture Blooms, Bonds Strengthen</span>
                <span className="pill">Thrive Together, Culturally Inspired</span>
                <span className="pill">Together in Culture, Together in Growth</span>
              </div>
              <div className="usp-card">
                <h4>Positioning</h4>
                <p>
                  A transformative, inclusive community where purpose, cultural enlightenment, and personal growth
                  intersect within Chinese cultural immersion and meaningful connections.
                </p>
              </div>

              <div className="usp-card">
                <h4>Target Audience & Objectives</h4>
                <p>
                  Individuals and families of Chinese heritage, those drawn to the culture—seeking enrichment,
                  inspiration, wellbeing, career momentum, and restorative relaxation in one coherent experience.
                </p>
              </div>

              <div className="usp-card">
                <h4>Benefits & Vision</h4>
                <p>
                  Annual retreats weave culture and story into intergenerational connection—bridging peers and families
                  through shared experiences (golf, spa, local heritage)—building confidence, belonging, and momentum.
                </p>
              </div>
            </div>
          </div>

          {/* Right visual panel (use your public image path) */}
          <div
            className="usp-visual"
            style={{
              backgroundImage: 'url(/images/EMW%20brand%20applications.jpg)'
            }}
            aria-label="EMW brand applications"
            role="img"
          />
        </section>
        {/* USP block unchanged from your file :contentReference[oaicite:7]{index=7} */}
      </div>

      {/* Back to Top Button (added) */}
      <BackToTop />
    </main>
  );
}

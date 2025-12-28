import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "./project-management.css"; // for back-to-top styles
import Iridescence from "../components/Iridescence/Iridescence.jsx";
import TextType from "../components/TextType/TextType.jsx";

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

export default function Home() {
  useEffect(() => {
    // --- Slow scroll-reveal everywhere ---
    const reveals = document.querySelectorAll(".scroll-reveal");
    const progress = document.querySelectorAll(".scroll-progress");

    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-visible", e.isIntersecting)
        ),
      { threshold: 0.15 }
    );

    const progressObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const ratio = Math.max(0, Math.min(1, e.intersectionRatio));
          e.target.style.setProperty("--reveal", `${ratio}`);
        }),
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );

    reveals.forEach((el) => revealObserver.observe(el));
    progress.forEach((el) => progressObserver.observe(el));

    // --- Self-intro: highlight line closest to center ---
    const lines = Array.from(
      document.querySelectorAll(".intro-cinematic .line")
    );
    let rafId = 0;
    const setActive = () => {
      rafId = 0;
      if (!lines.length) return;
      const centerY = window.innerHeight / 2;
      let closest = null,
        min = Infinity;
      for (const ln of lines) {
        const r = ln.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - centerY);
        if (d < min) {
          min = d;
          closest = ln;
        }
      }
      lines.forEach((l) => l.classList.remove("active"));
      closest?.classList.add("active");
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(setActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    setActive();

    return () => {
      revealObserver.disconnect();
      progressObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* ===== HERO (reduced height) ===== */}
      <section className="hero scroll-reveal">
        <Iridescence speed={1.0} amplitude={0.08} mouseReact={false} />
        <div className="hero-center">
          <div className="hero-card scroll-reveal" style={{ "--delay": "40ms" }}>
            <div className="hero-eyebrow">WELCOME TO IRIS’ DIGITAL WONDERLAND</div>

            <div className="hero-type">
              <span className="hash">#</span>
              <TextType
                text={[
                  "Market to inspire",
                  "Stories that convert",
                  "Designs that perform",
                ]}
                typingSpeed={70}
                pauseDuration={1400}
                showCursor={true}
                cursorCharacter="|"
              />
            </div>

            <p className="hero-sub">
              Business Technologies, Digital Marketing &amp; Design + Camera &nbsp;|&nbsp; Based in Toronto, Ontario.
            </p>

            <div className="hero-cta">
              <Link
                to="/portfolio"
                className="btn btn-primary scroll-reveal"
                style={{ "--delay": "80ms" }}
              >
                Check Out My Portfolio →
              </Link>
              <a
                href="https://justmomentography.webflow.io"
                className="btn btn-ghost scroll-reveal"
                style={{ "--delay": "120ms" }}
                target="_blank"
                rel="noreferrer"
              >
                JustMomentography →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEY PERFORMANCE ACHIEVEMENTS ===== */}
      <section className="kpa-band scroll-reveal">
        <div className="kpa-frame">
          <h3 className="kpa-title">Key Performance Achievements</h3>
          <div className="kpa-ribbon">
            <div className="kpa-tile">
              <div className="kpa-num">5+</div>
              <div className="kpa-cap">Enterprise Technology Solutions Implemented &amp; Supported</div>
            </div>
            <div className="kpa-tile">
              <div className="kpa-num">6+</div>
              <div className="kpa-cap">Websites Designed &amp; Developed</div>
            </div>
            <div className="kpa-tile">
              <div className="kpa-num">30+</div>
              <div className="kpa-cap">Social Media Platforms Managed</div>
            </div>
            <div className="kpa-tile">
              <div className="kpa-num">20%</div>
              <div className="kpa-cap">Revenue Growth (Email Campaign, 2021)</div>
            </div>
            <div className="kpa-tile">
              <div className="kpa-num">22%</div>
              <div className="kpa-cap">Increase in Email Opens</div>
            </div>
            <div className="kpa-tile">
              <div className="kpa-num">35%</div>
              <div className="kpa-cap">Increase in Instagram and Facebook Followers</div>
            </div>
            <div className="kpa-tile">
              <div className="kpa-num">6%</div>
              <div className="kpa-cap">Increase in Facebook Ad Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREVIOUS PROJECTS ===== */}
      <section
        className="section quick-peek scroll-progress scroll-reveal"
        style={{ "--reveal": 0 }}
      >
        <div className="container wide">
          <div className="decor center scroll-reveal">FEATURED PROJECTS</div>
          <h2 className="center page-title scroll-reveal">Previous Work</h2>

          <div className="projects-grid tight wider scroll-reveal">
            {/* Card 1 */}
            <a
              href="/portfolio/website"
              className="project-card scroll-reveal"
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": "0ms" }}
            >
              <div className="card-img-wrapper">
                <img
                  src="/images/yorkweb-home.png"
                  alt="web redesign project for york university IT"
                  className="card-img"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">York UIT Web Redesign</h3>
                <p className="card-sub">
                  Redefined the York UIT web experience through UX that makes
                  searching, browsing, and accessing information effortless and
                  intuitive.
                </p>
                <div className="card-meta">
                  <div>
                    <span>Year</span>
                    <br />
                    2023
                  </div>
                  <div>
                    <span>Timeline</span>
                    <br />
                    2 months
                  </div>
                  <div>
                    <span>Role</span>
                    <br />
                    MKTG & Comms Assistant
                  </div>
                </div>
              </div>
            </a>

            {/* Card 2 */}
            <a
              href="/portfolio/social-media"
              className="project-card scroll-reveal"
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": "80ms" }}
            >
              <div className="card-img-wrapper">
                <img src="/images/paid social media.png" alt="a overlook image of the marina" className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Paid Social Media Campaign</h3>
                <p className="card-sub">
                  Crafted several paid Facebook and Instagram campaigns that turned curiosity into
                  local visits.
                </p>
                <div className="card-meta">
                  <div>
                    <span>Year</span>
                    <br />
                    2021
                  </div>
                  <div>
                    <span>Timeline</span>
                    <br />
                    2.5 years
                  </div>
                  <div>
                    <span>Role</span>
                    <br />
                    Marketing Coordinator
                  </div>
                </div>
              </div>
            </a>

            {/* Card 3 */}
            <a
              href="/portfolio/project-management"
              className="project-card scroll-reveal"
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": "160ms" }}
            >
              <div className="card-img-wrapper">
                <img src="/images/enterprise solution.png" alt="a photo of the laptop screen of Iris Wang's profile image" className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Enterprise Technology Support &amp; Business Process Optimization </h3>
                <p className="card-sub">
                  Streamlined enterprise technology support by developing a proof‑of‑concept tool | optimized business processes by transforming complex data and raw information into actionable insights that enhanced stakeholder engagement and operational efficiency.
                </p>
                <div className="card-meta">
                  <div>
                    <span>Year</span>
                    <br />
                    2025
                  </div>
                  <div>
                    <span>Timeline</span>
                    <br />
                    8 months
                  </div>
                  <div>
                    <span>Role</span>
                    <br />
                    Business Analyst
                  </div>
                </div>
              </div>
            </a>

            {/* Card 4 */}
            <a
              href="https://github.com/NaspoDev/bidsure-backend"
              className="project-card scroll-reveal"
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": "240ms" }}
            >
              <div className="card-img-wrapper">
                <img src="/images/full stack.png" alt="a screenshot of an auction website, diaplaying four auction items" className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Full Stack Project (Group)</h3>
                <p className="card-sub">
                  Collaborated with a team and built a full-stack auction platform powered by microservice
                  architecture and containerization.
                </p>
                <div className="card-meta">
                  <div>
                    <span>Year</span>
                    <br />
                    2025
                  </div>
                  <div>
                    <span>Timeline</span>
                    <br />
                    4 months
                  </div>
                  <div>
                    <span>Role</span>
                    <br />
                    Front-end Designer
                  </div>
                </div>
              </div>
            </a>

            {/* Card 5 */}
            <a
              href="/portfolio/marketing-lifecycle-campaign"
              className="project-card scroll-reveal"
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": "320ms" }}
            >
              <div className="card-img-wrapper">
                <img src="/images/marketing lifecycle.png" alt="an image of las nubes campus in costa rica" className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Marketing Lifecycle Campaign</h3>
                <p className="card-sub">
                  Led full-funnel marketing campaigns to promote a Study Abroad
                  program across digital and offline touchpoints.
                </p>
                <div className="card-meta">
                  <div>
                    <span>Year</span>
                    <br />
                    2021
                  </div>
                  <div>
                    <span>Timeline</span>
                    <br />
                    8 months
                  </div>
                  <div>
                    <span>Role</span>
                    <br />
                    Special Projects Assistant
                  </div>
                </div>
              </div>
            </a>

            {/* Card 6 */}
            <a
              href="/portfolio/email-marketing"
              className="project-card scroll-reveal"
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": "400ms" }}
            >
              <div className="card-img-wrapper">
                <img src="/images/pre-arrival email.png" alt="a photo of someone's phone, highlighting the mail icon" className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title">Guest Pre-Arrival Email Campaign</h3>
                <p className="card-sub">
                  By combining organic content and upsell opportunities, the campaign
                  elevated guest experience while driving measurable revenue growth.
                </p>
                <div className="card-meta">
                  <div>
                    <span>Year</span>
                    <br />
                    2021
                  </div>
                  <div>
                    <span>Timeline</span>
                    <br />
                    2.5 years
                  </div>
                  <div>
                    <span>Role</span>
                    <br />
                    Marketing Coordinator
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ===== SELF-INTRO ===== */}
      <section className="intro-cinematic scroll-reveal">
        <div className="intro-frame">
          {/* First line with smiley GIF */}
          <p className="line">
            <span className="chunk with-gif">
              Hello! This is Iris:)
              <img
                className="intro-gif"
                src="/images/smiley-happy.gif"
                alt="Smiling animated icon"
                width="40"
                height="40"
              />
            </span>
          </p>

          <p className="line">
            <span className="chunk">With extensive experience in digital marketing, technology solutions, and project management, 
              I excel in data-driven decision-making, creative campaign development, and effective communication.</span>
          </p>

          <p className="line">
            <span className="chunk">In campaign development, I thrive in strategic planning and execution
              across social media, email marketing, web development, and analytics.</span>
          </p>

          <p className="line">
            <span className="chunk">As a Business Analyst, I leverage analytical and technical expertise to optimize processes, enhance stakeholder engagement, 
              and deliver impactful solutions.</span>
          </p>

          <p className="line">
            <span className="chunk">My passions include sustainability, travel, and photography.</span>
          </p>
        </div>
      </section>

      {/* ===== WHERE I WORKED (before testimonials) ===== */}
      <section className="brands scroll-reveal">
        <div className="brands-inner">
          <h2 className="brands-title page-title scroll-reveal">Where I Worked</h2>

          <div className="marquee scroll-reveal" aria-label="previous employers">
            <div className="marquee-track">
              {/* duplicate for seamless loop; replace with your set */}
              <img src="/images/fairmont-logo-svg-vector.png" alt="fairmont logo" loading="lazy" />
              <img src="/images/Georgian_College_logo.svg.png" alt="Georgian College logo" loading="lazy" />
              <img src="/images/aroma-web-logo.png" alt="aroma espresso bar" loading="lazy" />
              <img src="/images/ON_POS_LOGO_RGB.png" alt="Ontario Public Service" loading="lazy" />
              <img src="/images/Logo_York_University.svg.png" alt="York University" loading="lazy" />
              <img src="/images/Cineplex_logo.svg.png" alt="Cineplex logo" loading="lazy" />

              <img src="/images/fairmont-logo-svg-vector.png" alt="fairmont logo" loading="lazy" />
              <img src="/images/Georgian_College_logo.svg.png" alt="Georgian College logo" loading="lazy" />
              <img src="/images/aroma-web-logo.png" alt="aroma espresso bar" loading="lazy" />
              <img src="/images/ON_POS_LOGO_RGB.png" alt="Ontario Public Service" loading="lazy" />
              <img src="/images/Logo_York_University.svg.png" alt="York University" loading="lazy" />
              <img src="/images/Cineplex_logo.svg.png" alt="Cineplex logo" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (2×2 grid, title RIGHT) ===== */}
      <section className="testimonials scroll-reveal">
        <div className="testi-grid right-title">
          <div className="testi-stream two-by-two">
            {/* Card 1 */}
            <article className="testi-card extra-top-space">
              <div className="testi-loc">North York, ON, Canada</div>
              <h3 className="testi-hed">
                Iris’ ability to analyse complex data and anticipate challenges has been a key asset to our team.
              </h3>
              <p className="testi-body">
                Iris’ problem-solving and critical thinking skills are consistently impressive. Whether conducting-depth
                research or finding innovative solutions, Iris provides insightful recommendations that positively
                impact decision-making. A notable project involved creating a comprehensive presentation deck for our
                stakeholders related to stakeholder relationship management. This presentation provided the groundwork
                for a broader strategic initiative in the Ministry to streamlining stakeholder management…
              </p>
              <div className="testi-sig">– Colleague from Ontario Public Service</div>
            </article>

            {/* Card 2 */}
            <article className="testi-card">
              <div className="testi-loc">Collingwood, ON, Canada</div>
              <h3 className="testi-hed">
                Iris’ knowledge in the area of creative design and expertise in managing projects was a huge advantage to our entire team…
              </h3>
              <p className="testi-body">
                Iris is honest, dependable, and hard-working. Iris is a true team player who lives out company culture of
                caring and loving others, and always manages to foster positive discussions and bring the best out of other
                employees. It was her interpersonal skills, positive attitude, and especially the care she put into her
                work, that won the hearts of many of her colleagues…
              </p>
              <div className="testi-sig">– CEO and Founder of Living Water Resorts</div>
            </article>

            {/* Card 3 */}
            <article className="testi-card extra-top-space">
              <div className="testi-loc">Barrie, ON, Canada</div>
              <h3 className="testi-hed">Iris was extremely flexible and she was a great problem solver…</h3>
              <p className="testi-body">She was able to adapt to various situations and support wherever needed.</p>
              <div className="testi-sig">– Supervisor from YMCA</div>
            </article>

            {/* Card 4 */}
            <article className="testi-card">
              <div className="testi-loc">Collingwood, ON, Canada</div>
              <h3 className="testi-hed">
                Iris has provided invaluable support to myself as well as upper management over this time and grown
                tremendously both personally and professionally…
              </h3>
              <p className="testi-body">
                Iris is highly skilled in creative aspects, such as web design, advertising and social media campaigns and
                has an in-depth understanding of marketing campaign planning and analysis.
              </p>
              <div className="testi-sig">– Colleague from the marketing team of Living Water Resorts</div>
            </article>
          </div>

          <div className="testi-sticky">
            <div className="testi-eyebrow">Kind words that keep me smiling (and motivated)!</div>
            <h2 className="testi-title">THE IRIS EXPERIENCE — IN THEIR WORDS</h2>
          </div>
        </div>
      </section>

      {/* Back to Top button */}
      <BackToTop />
    </>
  );
}

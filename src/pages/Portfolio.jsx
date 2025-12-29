import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "./portfolio.css";
import "./project-management.css";

import Iridescence from "../components/Iridescence/Iridescence.jsx";

/* ---------- Back to Top ---------- */
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
        stroke="currentColor"
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

/* ---------- Scroll Spy Hook ---------- */
function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

/* ---------- Split Scroll Stack Component ---------- */
function ScrollStack({ id, num, title, slogan, description, items = [] }) {
  return (
    <section id={id} className="lalle-section split-section">
      {/* Left: Sticky Content */}
      <div className="section-left">
        <div className="sticky-wrapper">
          <span className="section-number">{num} / {title}</span>
          <h2 className="section-slogan">{slogan}</h2>
          <p className="section-desc">{description}</p>
        </div>
      </div>

      {/* Right: Stacked Cards */}
      <div className="section-right stack-container">
        {items.map((it, idx) => (
          <div key={idx} className="stack-card" style={{ top: `${20 + idx * 20}px` }}>
            <div className="card-inner">
              <div className="card-media">
                <img src={it.image} alt={it.title} loading="lazy" />
              </div>
              <div className="card-content">
                <div className="card-top-group">
                  <span className="card-kicker">{it.kicker}</span>
                  <h3 className="card-title">{it.title}</h3>
                  {it.tags && (
                    <div className="card-tags">
                      {it.tags.map(t => <span key={t} className="tag-dot">{t}</span>)}
                    </div>
                  )}
                </div>
                <div className="card-bottom-group">
                  {it.link ? (
                    <Link to={it.link} className="card-btn">
                      {it.ctaText || "View Case Study"}
                    </Link>
                  ) : (
                     <span className="card-btn disabled">View Details</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Marquee Section Component ---------- */
function MarqueeSection({ id, num, title, slogan, topImages, bottomImages }) {
  return (
    <section id={id} className="lalle-section split-section">
      <div className="section-left">
        <div className="sticky-wrapper">
          <span className="section-number">{num} / {title}</span>
          <h2 className="section-slogan">{slogan}</h2>
          <p className="section-desc">
            <b>Print</b> (Signage, Magazine Ad, Poster, Brochure, etc.) and 
            <b> Digital</b> (Display Ad, Email Banner, Social Media, etc.).
          </p>
        </div>
      </div>

      <div className="section-right marquee-block">
        <div className="marquee-wrapper">
          <div className="marquee-outer">
            <div className="marquee-inner">
              {topImages.map((src, i) => (
                <div className="g-card" key={`top-${i}`}><img src={src} alt="" /></div>
              ))}
              {topImages.map((src, i) => (
                <div className="g-card" key={`top-d-${i}`}><img src={src} alt="" /></div>
              ))}
            </div>
          </div>
          <div className="marquee-outer reverse">
            <div className="marquee-inner">
              {bottomImages.map((src, i) => (
                <div className="g-card" key={`btm-${i}`}><img src={src} alt="" /></div>
              ))}
              {bottomImages.map((src, i) => (
                <div className="g-card" key={`btm-d-${i}`}><img src={src} alt="" /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main Page ---------- */
export default function Portfolio() {
  
  const categories = [
    { id: "lifecycle", label: "Marketing Lifecycle", num: "01" },
    { id: "pm", label: "Project Management", num: "02" },
    { id: "tech", label: "AI, Data & Other Technologies", num: "03" },
    { id: "email", label: "Email Marketing", num: "04" },
    { id: "web", label: "Website", num: "05" },
    { id: "social", label: "Social Media", num: "06" },
    { id: "branding", label: "Branding", num: "07" },
    { id: "graphics", label: "Graphic Design", num: "08" },
  ];

  const activeCategory = useScrollSpy(categories.map(c => c.id));

  // --- Images ---
  const lakeside = "/images/p_ls.jpg";
  const lasnubes = "/images/p_ln.png";
  const pm1Img = "/images/pm.jpg";
  const pm2Img = "/images/pm2.jpeg";
  const aa1Img = "/images/aa1.jpg";
  const aa2Img = "/images/aa2.jpg";
  const aa3Img = "/images/aa3.jpg";
  const aa4Img = "/images/git.jpg";
  const ehotelImg = "/images/ehotel.png";
  const egolfImg = "/images/egolf.png";
  const enewsImg = "/images/enews.png";
  const webImg = "/images/web design.jpg";
  const fullstack = "/images/full stack.png";
  const socialImg = "/images/reel.jpg";
  const paidImg = "/images/paid.jpg";
  const brandingImg = "/images/EMW brand applications.jpg";
  const travelImg = "/images/travel.jpg";
  
  const graphicTop = [
    "/images/5th-anniversary-Photo-Contest-Flyer.jpg",
    "/images/Plant-a-Tree---Celebration-Remembrance-Feb-2021.jpg",
    "/images/lakeside takeout tag 2021.jpg",
    "/images/2021-zoom-fitness-class-+aqua-class-flyer.jpg",
  ];
  const graphicBottom = [
    "/images/New-SOG-Logo-CMYK-by-LWR.png",
    "/images/springlicious-mycollingwood-banners.jpg",
    "/images/lasnubesposter.png",
    "/images/2020-summer-Daily-Features-Flyer.jpg",
  ];

  // --- Content Data ---
  const lifecycleItems = [
    {
      title: "Costa Rica Study Abroad Summer Program Campaign",
      kicker: "Awareness → Conversion",
      image: lasnubes,
      tags: ["Social Media", "Website", "Email Marketing"],
      link: "/marketinglifecyclecampaign?section=costarica",
      ctaText: "View Campaign"
    },
    {
      title: "Lakeside Seafood & Grill's Land-to-Sea Menu Campaign",
      kicker: "Paid • Owned • Earned",
      image: lakeside,
      tags: ["Affiliate Marketing", "Print", "Social Media"],
      link: "/marketinglifecyclecampaign?section=restaurant",
      ctaText: "View Campaign"
    }
  ];

  const pmItems = [
    {
      title: "Cross-ministry Event: Professional Headshot Fundraiser",
      kicker: "Agile • Scrum",
      image: pm2Img,
      tags: ["Communications", "Planning", "Requiements Analysis"],
      link: "/project-management?section=headshot",
      ctaText: "View Process"
    },
    {
      title: "Enterprise Electronic Approval System",
      kicker: "Change Management • Stakeholder Management",
      image: pm1Img,
      tags: ["Presentation", "Data Analytics", "Communications"],
      link: "/project-management?section=approval",
      ctaText: "View Process"
    }
  ];

  const techItems = [
    {
      title: "Data Analytics Projects",
      kicker: "From descriptive to prescriptive",
      image: aa1Img,
      tags: ["Google Analytics", "Python", "SQL","Excel","Tableu"],
      link: "/AI-Data-Technologies?section=data",
      ctaText: "View Details"
    },
    {
      title: "GenAI - Graphic and Video Creation",
      kicker: "not all genai is the same",
      image: aa2Img,
      tags: ["VEO", "NanoBanana", "Suno"],
      link: "/AI-Data-Technologies?section=genai",
      ctaText: "View Details"
    },
    {
      title: "Analytical AI - AI Agent",
      kicker: "Automate Workflow",
      image: aa3Img,
      tags: ["Zapier", "Power Automate", "Agent building"],
      link: "/AI-Data-Technologies?section=analyticalai",
      ctaText: "View Details"
    },
       {
      title: "Chrome Extension Development & More",
      kicker: "Vibe Coding",
      image: aa4Img,
      tags: ["Github"],
      link: "https://github.com/irisitawxy9?tab=repositories",
      ctaText: "View Github"
    }
  ];

  const emailItems = [
    {
      title: "Hotel Booking Email Lifecycle",
      kicker: "Optimize conversion through revelance and timely value",
      image: ehotelImg,
      tags: ["Constant Contact", "Data", "A/B Test"],
      link: "/email-marketing?section=prearrival",
      ctaText: "View More"
    },
    {
      title: "Golf Course Conversion Campaigns",
      kicker: "The right content, to the right audience, at the right time.",
      image: egolfImg,
      tags: ["Content creation", "A/B Test", "Analytics"],
      link: "/email-marketing?section=golf",
      ctaText: "View More"
    },
    {
      title: "Monthly Resort Newsletter",
      kicker: "Keeping guests connected, one story at a time.",
      image: enewsImg,
      tags: ["Storytelling", "Content management", "Analytics"],
      link: "/email-marketing?section=newsletter",
      ctaText: "View More"
    }
  ];

  const webItems = [
    {
      title: "Web Redesign & Development",
      kicker: "RECORDKEEPING & IM • UX • UI",
      image: webImg,
      tags: ["Figma", "WordPress","Accessibility", "Research","Interview","Data analysis"],
      link: "/website",
      ctaText: "View Project"
    },
    {
      title: "Full Stack Website (Group)",
      kicker: "DESIGN • BUILD • DEPLOY",
      image: fullstack,
      tags: ["React", "Database", "Microservices","Containers"],
      link: "https://github.com/NaspoDev/bidsure-backend",
      ctaText: "View GitHub"
    }
  ];

  const socialItems = [
    {
      title: "Owned Social Media Posting",
      kicker: "Organic Growth",
      image: socialImg,
      tags: ["Contests & Giveaways", "UGC", "Data"],
      link: "/social-media?section=paid",
      ctaText: "See More"
    },
    {
      title: "Paid Campaign",
      kicker: "Conversion",
      image: paidImg,
      tags: ["Meta Ads", "Retargeting"],
      link: "/social-media?section=static",
      ctaText: "See More"
    }
  ];

  const brandingItems = [
    {
      title: "Brand Kit",
      kicker: "Starter Package",
      image: brandingImg,
      tags: ["Branding", "Market Research", "Design"],
      link: "/branding",
      ctaText: "View Details"
    },
    
  ];

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="lalle-layout">
      
      <aside className="lalle-sidebar">
        {/* This wrapper sticks within the flex column */}
        <div className="sidebar-sticky-inner">
          <div className="sidebar-top">
            <h1 className="brand-name">Portfolio</h1>
            <p className="brand-role">Creative Strategist & Developer</p>
          </div>

          <nav className="sidebar-nav">
            <ul className="nav-list">
              {categories.map((cat) => (
                <li key={cat.id} className="nav-item">
                  <a 
                    href={`#${cat.id}`} 
                    className={`nav-link ${activeCategory === cat.id ? "active" : ""}`}
                    onClick={scrollToId(cat.id)}
                  >
                    <span className="nav-num">{cat.num}</span>
                    <span className="nav-label">{cat.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="lalle-content">
        {/* Background is absolute to this container, stretching full height */}
        <div className="content-bg">
           <Iridescence color={[0.92, 0.92, 0.96]} amplitude={0.05} speed={0.3} mouseReact={false} />
        </div>

        <ScrollStack 
          id="lifecycle" num="01"
          title="Marketing Lifecycle Campaigns"
          slogan="Strategic storytelling that converts across touchpoints."
          description="From awareness to conversion, I design integrated campaigns that move audiences through every stage of the marketing lifecycle. By blending insight-driven strategy with creative execution, I deliver consistent and compelling experiences that resonate across multiple channels."
          items={lifecycleItems}
        />

        <ScrollStack 
          id="pm" num="02"
          title="Project Management"
          slogan="Organizing chaos into deliverables."
          description="Leading cross-functional teams and managing resources with Agile methodologies."
          items={pmItems}
        />

        <ScrollStack 
          id="tech" num="03"
          title="AI, Data & Other Technologies"
          slogan="Applied Data and Technological solutions."
          description="Using data analytics and AI tools to drive decision-making and automate workflows."
          items={techItems}
        />

        <ScrollStack 
          id="email" num="04"
          title="Email Marketing"
          slogan="Turning every interaction into a journey, not just a transaction."
          description="Personalized email journeys that nurture leads and drive retention."
          items={emailItems}
        />

        <ScrollStack 
          id="web" num="05"
          title="Website Design and Development"
          slogan="Where creativity meets data to build digital experiences that perform."
          description="Your website is more than a digital storefront. I combine data-driven UX and visually dynamic UI design to craft websites that don’t just look good, but convert effectively."
          items={webItems}
        />

        <ScrollStack 
          id="social" num="06"
          title="Social Media"
          slogan="Building community."
          description="Organic and paid strategies that grow audiences and foster engagement."
          items={socialItems}
        />

        <ScrollStack 
          id="branding" num="07"
          title="Branding"
          slogan="Identity with impact."
          description="Cohesive visual identities that tell a clear and compelling brand story."
          items={brandingItems}
        />

        <MarqueeSection 
          id="graphics" num="08"
          title="Graphic Design"
          slogan="Designs that perform."
          topImages={graphicTop}
          bottomImages={graphicBottom}
        />

        

      </main>

      <BackToTop />
    </div>
  );
}

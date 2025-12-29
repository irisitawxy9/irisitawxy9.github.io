import React from "react";
import { Routes, Route } from "react-router-dom";

// NEW nav
import CardNav from "./components/CardNav/CardNav.jsx";

// Pages
import Home from "./pages/Home.jsx";
import MyStory from "./pages/MyStory.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Branding from "./pages/Branding.jsx";
import ProjectManagement from "./pages/project-management.jsx";
import Website from "./pages/Website.jsx";
import AI from "./pages/AI-Data-Technologies.jsx";
import EmailMarketing from "./pages/EmailMarketing.jsx";
import SocialMedia from "./pages/SocialMedia.jsx";
import MarketingLifecycleCampaign from "./pages/MarketingLifecycleCampaign.jsx";

// Optional footer
import Footer from "./components/Footer.jsx";

export default function App() {
  // === NAV ITEMS (final) ===
  const navItems = [
    { label: "Home", href: "/" },
    { label: "My Story", href: "/my-story" },
    {
      label: "Justmomentography",
      href: "https://justmomentography.webflow.io/",
      external: true,
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      links: [
        {
          label: "Marketing Lifecycle Campaign",
          href: "/portfolio/marketing-lifecycle-campaign",
        },
        { label: "Project Management", href: "/portfolio/project-management" },
        { label: "AI, Data & Other Technologies", href: "/portfolio/AI-Data-Technologies" },

        { label: "Email Marketing", href: "/portfolio/email-marketing" },

        { label: "Website", href: "/portfolio/website" },
        { label: "Branding", href: "/portfolio/branding" },

        { label: "Social Media", href: "/portfolio/social-media" },
        
        // Change this ↓ from a route to an anchor link
        { label: "Graphic Design", href: "/portfolio?section=gd" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <CardNav
        logo="/images/iris.png"
        logoAlt="Iris Logo"
        items={navItems}
        buttonBgColor="#111"
        buttonTextColor="#fff"
      />

      <main className="flex-1">
        <Routes>
          {/* Top-level */}
          <Route path="/" element={<Home />} />
          <Route path="/my-story" element={<MyStory />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* Portfolio children */}
          <Route path="/portfolio/branding" element={<Branding />} />
          <Route
            path="/portfolio/email-marketing"
            element={<EmailMarketing />}
          />
          <Route
            path="/portfolio/project-management"
            element={<ProjectManagement />}
          />
          <Route path="/portfolio/website" element={<Website />} />
          <Route
            path="/portfolio/AI-Data-Technologies"
            element={<AI />}
          />
          <Route path="/portfolio/social-media" element={<SocialMedia />} />
          <Route
            path="/portfolio/marketing-lifecycle-campaign"
            element={<MarketingLifecycleCampaign />}
          />


          {/* Legacy aliases (keep for old links) */}
          <Route path="/AI-Data-Technologies" element={<AI />} />
          <Route path="/branding" element={<Branding />} />
          <Route path="/email-marketing" element={<EmailMarketing />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="/website" element={<Website />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/marketinglifecyclecampaign" element={<MarketingLifecycleCampaign />} />
          {/* Old mixed-case alias you had before */}
          <Route path="/Project-Management" element={<ProjectManagement />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

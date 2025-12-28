import React, { useState, useEffect } from "react";
import "./story.css";
import "./project-management.css"; // include shared back-to-top styling
import MagicBento from "../components/MagicBento/MagicBento.jsx";
import CircularGallery from "../components/CircularGallery/CircularGallery.jsx";

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

export default function MyStory() {
  return (
    <main className="story">
      {/* Title + Subtitle */}
      <header className="story-hero">
        <h1>My Story</h1>
        <p className="subtitle">
          Always passionate about diving into new challenges and striving to make an impact.
        </p>
      </header>

      {/* Magic Bento (with same horizontal alignment as intro) */}
      <section className="story-bento-wrapper">
        <MagicBento />
      </section>

      {/* Narrative paragraph block */}
      <section className="intro">
        <span className="eyebrow">The longer version of how it all started</span>
        <p>
          I left my homeland, China, when I was 16, landing on the other side of the earth, fully aware that this journey
          would completely change my life. Interestingly, it was my ignorance that kept me from feeling afraid in the first
          place. I didn’t expect this, but the moment I stepped out of the plane, I cried for the first time that year. At
          that moment, I realized that I couldn’t look back; I needed to take a deep breath and step forward. Being new to the country gave me the opportunity to start my life again. It’s bittersweet if I were to describe it. From a dependent,
          shy girl to an independent, confident woman, I’ve experienced numerous ups and downs, and I’m grateful for these
          experiences.
        </p>
        <p>
          After studying high school in Barrie for 1.5 years, I graduated and gained admission to a local college. I chose
          the tourism major(and yes, I have TICO!) because I fell in love with traveling: I grew and learned so much away from my family in a
          completely different living environment. College life doesn’t feel too long ago, yet it passed by swiftly. I juggled
          various jobs simultaneously, engaged in a lot of volunteering, made friends, and graduated with honours. Oh, I must
          mention completing my co-op term at Fairmont Chateau Lake Louise and participating in a two-month study abroad
          program in France! Both were remarkable experiences and memories I never could have imagined before coming to Canada.
        </p>
        <p>
          Thanks to my marketing ambassador role in college, I gained experience in executing social media plans and organizing
          events. This was the main reason I was suitable for my first job after graduation. I vividly recall how I jumped into the air when I
          receiving the call from HR offering me the position of Junior Marketing Coordinator. And just like that, I moved to
          Collingwood. This town has a certain magic, and I believe I’ll always remember living there. Fortunately, within a
          year, I was promoted to Marketing Coordinator, then to Senior Marketing Coordinator, and now I’m a Junior Marketing
          Advisor:)
        </p>
        <p>
          It’s no surprise that I didn’t possess all the practical marketing knowledge when I first started. Through consistent online study and practical experience with my team (and I must say, I was very lucky to work with such wonderful and kind people), I’ve grown professionally in many aspects.
          Shifting from social
          media, graphic design, and social ad campaigns to data analysis, website design, and project management, I’ve found
          immense enjoyment and satisfaction working in digital marketing. Even now, I’m dedicated to expanding my knowledge in
          my career and other interesting endeavors. (Fun fact: I have a boat license but no boat, haha!)
        </p>
        <p>
          At the end of 2021, I decided to leave my full-time job and return to China after three years away to visit my family.
          During my time back home, I enrolled in a one-month professional photography course to enhance my skills. Additionally,
          I made the decision for my next step upon returning to Canada: attending York University for a Bachelor’s program in
          Information Technology with a minor in Marketing.
        </p>
        <p>
          During my time at York University, I explored many unique courses outside of my major, including Modes of Reasoning, Gender Studies, and Astronomy. University was certainly more demanding than college, but I embraced the challenge and valued the opportunity to enrich myself. In particular, I studied Data Analytics, User Interface Design, Applied Artifical Intelligience, and several Marketing courses(beyond my regular IT courses), which expanded my theoretical knowledge and gave me the chance to apply what I learned through coursework.
          <br />
          <br />
          Beyond academics, I volunteered at multiple campus events and participated in both a hackathon and the SDGs Case Competition. And these experiences certainly had a lasting impact on me. Outside of school, I held several work-study positions, ranging from Special Projects Assistant to Marketing and Communications Assistant to Website and Social Media Assistant across different departments. I am truly grateful for the opportunity to learn from so many diverse perspectives.
          <br />
          <br />
          At the end of my second year, I joined the exchange program - partly because I missed home, but also because I couldn’t pass up the chance to study at one of the top three universities in China (Fudan University). That experience allowed me to meet incredible people and take part in cultural events such as dragon dancing. There was never a dull moment.
          <br />
          <br />
          After returning, I completed my co-op at the government as a Business Analyst. Filled with both nerves and excitement, I collaborated with inspiring colleagues and gained hands-on experience in business consultations, learning how to analyze processes, integrate technology solutions, and translate complex challenges into actionable strategies.. Now, as I update this piece, I have only a few months left until graduation. Oh well, let's keep it going!
        </p>
        <p>
          Thank you for your interest and reading my story, and if we happen to run into each other, be sure to say hi :)) To be
          continued.
        </p>
      </section>

      {/* Circular Gallery (also aligned visually with the story content) */}
      <section className="story-gallery-wrapper">
        <CircularGallery />
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}

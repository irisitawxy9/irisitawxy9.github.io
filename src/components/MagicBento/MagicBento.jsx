import React, { useEffect, useRef } from "react";
import "./MagicBento.css";

/** Build a public image path from /public/images */
const img = (name) => `/images/${name}`;

/** Your 6 cards (unchanged copy), each with its own image */
const CARDS = [
  {
    title: "Global Perspective",
    description: "Studied in France and China, embracing diverse cultures and insights.",
    label: "Problem-Solving · Project Leadership",
    image: img("travel.jpg"),
  },
  {
    title: "Sustainability",
    description: "Passionate about eco-conscious choices and integrating sustainability into work and life.",
    label: "Nature-loving · Passionate",
    image: img("nature.jpg"),
  },
  {
    title: "Community Impact",
    description:
      "Hosted a job fair as the marketing executive, built a business case for Alibaba Global Initiatives, and won the Creative Solutions Award at the SDGs in Action Challenge, and many more.",
    label: "Giving-back · Resourceful",
    image: img("side launch.jpeg"),
  },
  {
    title: "Photography & Videography",
    description: "Capture feelings that last, specializing in portraits and events.",
    label: "Creativity",
    image: img("pv.jpg"),
  },
  {
    title: "Collaboration",
    description: "Experienced in cross-functional teamwork to achieve shared goals.",
    label: "Teamwork",
    image: img("collab.jpg"),
  },
  {
    title: "Resilience",
    description: "Proud owner of 2000-day Duolingo streak.",
    label: "Consistent · Resilient",
    image: img("lang.jpg"),
  },
];

/* Layout areas (match your CSS):
   Left column: ls1, ls2, lb
   Right column: rt, rb1, rb2  */
const AREAS = ["ls1", "ls2", "lb", "rt", "rb1", "rb2"];

export default function MagicBento() {
  const sectionRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Spotlight
    const spot = document.createElement("div");
    spot.className = "bento-spotlight";
    document.body.appendChild(spot);
    spotRef.current = spot;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        spot.style.opacity = "0";
        section
          .querySelectorAll(".magic-bento-card")
          .forEach((card) => card.style.setProperty("--glow", "0"));
        return;
      }

      spot.style.opacity = "0.85";
      spot.style.left = `${e.clientX}px`;
      spot.style.top = `${e.clientY}px`;

      section.querySelectorAll(".magic-bento-card").forEach((card) => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist =
          Math.hypot(e.clientX - cx, e.clientY - cy) -
          Math.max(cr.width, cr.height) / 2;

        const glow = dist <= 0 ? 1 : Math.max(0, 1 - dist / 320);

        card.style.setProperty(
          "--mouse-x",
          `${((e.clientX - cr.left) / cr.width) * 100}%`
        );
        card.style.setProperty(
          "--mouse-y",
          `${((e.clientY - cr.top) / cr.height) * 100}%`
        );
        card.style.setProperty("--glow", glow.toFixed(3));
      });
    };

    const onLeave = () => {
      spot.style.opacity = "0";
      section
        .querySelectorAll(".magic-bento-card")
        .forEach((card) => card.style.setProperty("--glow", "0"));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      spotRef.current?.remove();
    };
  }, []);

  return (
    <section className="bento-section" ref={sectionRef}>
      <div className="card-grid bento-layout">
        {CARDS.map((c, i) => (
          <article
            key={i}
            className={`magic-bento-card area-${AREAS[i]}`}
            /* ✅ Use the card’s own image (c.image), not an undefined IMG */
            style={{ ["--bg-image"]: `url('${c.image}')` }}
          >
            {(c.label || c.title) && (
              <header className="magic-bento-card__header">
                {c.label && <div className="magic-bento-card__label">{c.label}</div>}
              </header>
            )}
            <div className="magic-bento-card__content">
              {c.title && <h3 className="magic-bento-card__title">{c.title}</h3>}
              {c.description && (
                <p className="magic-bento-card__description">{c.description}</p>
              )}
            </div>
            <span className="magic-bento-card__glow" />
          </article>
        ))}
      </div>
    </section>
  );
}

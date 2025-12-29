import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-relative">
        <div className="footer-hero">
          {/* Avatar */}
          <div className="footer-avatar-top">
            <img
              className="footer-avatar"
              src="/images/68bf957f0d86370cc8516d98_headshot-4 Medium.jpeg"
              alt="Iris Wong headshot"
            />
          </div>

          {/* Text under avatar */}
          <p className="footer-intro-text">
            Thanks for your interest! I look forward to hearing from you:)
          </p>

          {/* Button only (no box) */}
          <a href="mailto:irisita9999@gmail.com" className="contact-btn">
            Get in Touch
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="footer-wrap">
          <div className="footer-bottom">
            <p className="footer-note">
              © 2025 Iris Wong. My Second React Project! Fueled by Reese Puffs
              Cereal. All rights reserved.
            </p>

            <a
              className="footer-ig"
              href="https://www.instagram.com/justmomentography/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/images/instagram 2.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

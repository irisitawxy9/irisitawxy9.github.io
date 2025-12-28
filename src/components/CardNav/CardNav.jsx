import React, { useState } from "react";
import { useLocation } from "react-router-dom";   // ← NEW
import "./CardNav.css";

export default function CardNav({
  logo,
  logoAlt = "Logo",
  items = [],
  buttonBgColor = "#111",
  buttonTextColor = "#fff",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [openSubItem, setOpenSubItem] = useState(null);

  const location = useLocation();   // ← NEW: get current URL path

  const closeAll = () => {
    setMenuOpen(false);
    setOpenItem(null);
    setOpenSubItem(null);
  };

  const handleToggleItem = (idx) => {
    setOpenItem((prev) => (prev === idx ? null : idx));
    setOpenSubItem(null);
  };

  const handleToggleSubItem = (parentIdx, subIdx) => {
    setOpenSubItem((prev) =>
      prev && prev.parent === parentIdx && prev.child === subIdx
        ? null
        : { parent: parentIdx, child: subIdx }
    );
  };

  const handleNavLinkClick = () => {
    closeAll();
  };

  // ---- Modified Link Component (Adds .is-active automatically) ----
  const LinkEl = ({ label, href, external, className = "cardnav__link", ...rest }) => {
    const isActive =
      href &&
      !external &&
      (location.pathname === href ||
        location.pathname.startsWith(href + "/")); // highlight children too

    const finalClass = `${className} ${isActive ? "is-active" : ""}`;

    if (!href) return <span className={finalClass}>{label}</span>;
    if (external)
      return (
        <a
          className={finalClass}
          href={href}
          target="_blank"
          rel="noreferrer"
          {...rest}
        >
          {label}
        </a>
      );

    return (
      <a className={finalClass} href={href} {...rest}>
        {label}
      </a>
    );
  };

  return (
    <header className="cardnav">
      <div className="cardnav__inner">
        {/* Logo */}
        <a className="cardnav__brand" href="/">
          {logo ? (
            <img src={logo} alt={logoAlt} />
          ) : (
            <span className="cardnav__brandText">IRIS</span>
          )}
        </a>

        {/* Mobile Hamburger */}
        <button
          className="cardnav__burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => (menuOpen ? closeAll() : setMenuOpen(true))}
        >
          <span className={`cardnav__burgerIcon ${menuOpen ? "is-open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          className={`cardnav__nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <ul className="cardnav__list">
            {items.map((it, idx) => {
              const hasDropdown = Array.isArray(it.links) && it.links.length > 0;
              const itemIsOpen = hasDropdown && openItem === idx;

              return (
                <li
                  key={it.label}
                  className={`cardnav__item ${
                    hasDropdown ? "has-dropdown" : ""
                  } ${itemIsOpen ? "is-open" : ""}`}
                >
                  <div className="cardnav__topline">
                    <LinkEl
                      label={it.label}
                      href={it.href}
                      external={it.external}
                      onClick={handleNavLinkClick}
                    />

                    {hasDropdown && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cardnav__chevIcon"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleItem(idx);
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>

                  {hasDropdown && (
                    <div className="cardnav__dropdown">
                      {it.links.map((sub, subIdx) => {
                        const hasSubmenu =
                          Array.isArray(sub.links) && sub.links.length > 0;

                        const subIsOpen =
                          hasSubmenu &&
                          openSubItem &&
                          openSubItem.parent === idx &&
                          openSubItem.child === subIdx;

                        return (
                          <div
                            key={sub.label}
                            className={`cardnav__dropdownItem ${
                              hasSubmenu ? "has-submenu" : ""
                            } ${subIsOpen ? "is-open" : ""}`}
                          >
                            <div className="cardnav__dropdownLine">
                              <LinkEl
                                label={sub.label}
                                href={sub.href}
                                external={sub.external}
                                className="cardnav__dropdownLink"
                                onClick={handleNavLinkClick}
                              />

                              {hasSubmenu && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="cardnav__chevIcon cardnav__chevIcon--left"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleToggleSubItem(idx, subIdx);
                                  }}
                                >
                                  <polyline points="15 6 9 12 15 18" />
                                </svg>
                              )}
                            </div>

                            {hasSubmenu && (
                              <div className="cardnav__submenu">
                                {sub.links.map((leaf) => (
                                  <LinkEl
                                    key={leaf.label}
                                    label={leaf.label}
                                    href={leaf.href}
                                    external={leaf.external}
                                    className="cardnav__submenuLink"
                                    onClick={handleNavLinkClick}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            className="cardnav__cta"
            href="mailto:irisita9999@gmail.com"
            style={{
              background: "#cda59e",
              color: buttonTextColor,
            }}
            onClick={handleNavLinkClick}
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

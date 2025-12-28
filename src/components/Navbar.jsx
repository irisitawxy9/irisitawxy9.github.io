import React from 'react';
import { NavLink } from 'react-router-dom';

const linkCls = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'underline' : ''}`;

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <NavLink to="/" className="text-lg font-semibold">Iris' Digital Wonderland</NavLink>
        <nav className="flex flex-wrap gap-2 ml-auto">
          <NavLink to="/my-story" className={linkCls}>My Story</NavLink>
          <NavLink to="/portfolio" className={linkCls}>Portfolio</NavLink>
          <NavLink to="/branding" className={linkCls}>Branding</NavLink>
          <NavLink to="/website" className={linkCls}>Website</NavLink>
          <NavLink to="/email-marketing" className={linkCls}>Email</NavLink>
          <NavLink to="/social-media" className={linkCls}>Social</NavLink>
          <NavLink to="/graphic-design" className={linkCls}>Graphic</NavLink>
          <NavLink to="/passion" className={linkCls}>Passion</NavLink>
        </nav>
      </div>
    </header>
  );
}

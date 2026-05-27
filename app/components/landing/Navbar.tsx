"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <nav className="navbar landing-nav">
      <span className="nav-logo">Nova</span>

      <div className={`nav-menu${menuOpen ? " active" : ""}`}>
        <ul className="nav-links">
          <li>
            <a href="#">Method</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">Docs</a>
          </li>
        </ul>
      </div>

      <button
        id="menu-toggle"
        className={`menu-toggle${menuOpen ? " active" : ""}`}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}

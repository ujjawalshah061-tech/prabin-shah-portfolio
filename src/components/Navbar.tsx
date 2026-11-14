import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Send, Sun, Moon } from "lucide-react";
import { useContent } from "../content/ContentContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { settings } = useContent();

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("portfolio-theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    try {
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [isDark]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/project" },
  ];

  return (
    <header className="nav-wrap">
      <div className="nav-pill">
        <Link to="/" className="nav-brand" aria-label="Home">
          <span className="nav-mark">{settings.firstName.charAt(0)}</span>
          <span className="nav-brand-text">
            {settings.firstName}<em>{settings.lastName}</em>
          </span>
        </Link>

        <nav className="nav-links">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/#about"
                ? location.hash === "#about" || location.pathname === "/about"
                : link.path === "/project"
                ? location.pathname === "/project" || location.pathname === "/projects"
                : location.pathname === link.path && !location.hash;
            return (
              <Link key={link.name} to={link.path} className={`nav-link ${isActive ? "active" : ""}`}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button
            onClick={() => setIsDark((p) => !p)}
            className="nav-theme"
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link to="/contact" className="nav-cta">
            <span>Contact</span>
            <Send size={13} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

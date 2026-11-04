import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Send, Sun, Moon } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("portfolio-theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-mode");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("portfolio-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Experience", path: "/experience" },
    
    { name: "Project", path: "/project"}
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="brand-logo">
          <span className="logo-symbol">P</span>
        </Link>

        <nav className="nav-menu">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/#about"
                ? location.hash === "#about" || location.pathname === "/about"
                : location.pathname === link.path && !location.hash;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="nav-right-actions">
          <button 
            onClick={toggleTheme} 
            className={`theme-pill-switch ${isDark ? "switch-dark" : "switch-light"}`} 
            type="button" 
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="switch-slider">
              {isDark ? <Moon size={13} /> : <Sun size={13} />}
            </span>
          </button>

          <Link to="/contact" className="btn-contact-nav">
            <span>Contact</span>
            <Send size={13} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
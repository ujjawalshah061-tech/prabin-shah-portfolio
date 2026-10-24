import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageCircle,
  Building2,
  Copy,
  Check,
  ArrowUp,
  ExternalLink,
  Sparkles,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "prabinshah919@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="refined-footer" id="contact">
      <div className="footer-ambient-blur"></div>

      <div className="footer-wrap">
        {/* Top Callout Banner */}
        <div className="footer-hero-cta">
          <div className="footer-badge-status">
            <span className="live-ping-dot">
              <span className="ping-wave"></span>
              <span className="ping-center"></span>
            </span>
            <span>Available for Hydropower & Structural Projects</span>
          </div>

          <h2 className="footer-big-title">
            Have a project in mind? <br />
            <span>Let’s engineer something durable.</span>
          </h2>

          <p className="footer-subtext">
            Specialized in underground rock mechanics, hydraulic design, and civil infrastructure. Based in Lalitpur, Nepal — open for worldwide consultancy.
          </p>

          <div className="footer-quick-connect">
            <a href={`mailto:${email}`} className="btn-footer-primary">
              <Mail size={16} />
              <span>Send Direct Email</span>
            </a>
            <a
              href="https://wa.me/9779812186293"
              target="_blank"
              rel="noreferrer"
              className="btn-footer-whatsapp"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3 Balanced Contact Cards */}
        <div className="footer-cards-trio">
          {/* Email Card with Copy button */}
          <div className="ft-card">
            <div className="ft-card-top">
              <div className="ft-card-icon mail-icon">
                <Mail size={18} />
              </div>
              <span className="ft-card-tag">DIRECT EMAIL</span>
            </div>
            <div className="ft-card-body">
              <span className="ft-card-val">{email}</span>
              <button
                type="button"
                className={`btn-ft-copy ${copied ? "copied" : ""}`}
                onClick={handleCopy}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp / Phone Card */}
          <a
            href="https://wa.me/9779812186293"
            target="_blank"
            rel="noreferrer"
            className="ft-card ft-card-link"
          >
            <div className="ft-card-top">
              <div className="ft-card-icon wa-icon">
                <MessageCircle size={18} />
              </div>
              <span className="ft-card-tag">PHONE / WHATSAPP</span>
            </div>
            <div className="ft-card-body">
              <span className="ft-card-val">+977 981-2186293</span>
              <ExternalLink size={14} className="ft-arrow" />
            </div>
          </a>

          {/* Engagement / Location Card */}
          <a
            href="https://htr.com.np/"
            target="_blank"
            rel="noreferrer"
            className="ft-card ft-card-link"
          >
            <div className="ft-card-top">
              <div className="ft-card-icon work-icon">
                <Building2 size={18} />
              </div>
              <span className="ft-card-tag">OFFICE & FIRM</span>
            </div>
            <div className="ft-card-body">
              <span className="ft-card-val">Hydro Tunneling & Research</span>
              <ExternalLink size={14} className="ft-arrow" />
            </div>
          </a>
        </div>

        <div className="footer-line-break"></div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="footer-base-row">
          <div className="footer-identity">
            <span className="footer-author-name">Prabin Shah</span>
            <span className="footer-author-role">Civil & Hydropower Engineer</span>
            <span className="footer-location-chip">
              <MapPin size={12} /> Lalitpur, Nepal
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-nav-links">
            <Link to="/">Home</Link>
            <Link to="/experience">Experience</Link>
            <a href="/prabin-resume.pdf" download="Prabin_Shah_CV.pdf">
              Resume
            </a>
          </div>

          {/* Clean Social Icons */}
          <div className="footer-social-cluster">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/prabin-shah-59247b2b5/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/prabinshah123"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/pprabinshah/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Back to top */}
            <button
              type="button"
              className="btn-back-to-top"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="footer-copyright-note">
          © {new Date().getFullYear()} Prabin Shah. Engineered with React, TypeScript & Vite.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
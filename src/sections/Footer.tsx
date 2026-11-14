import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, Building2, Copy, Check, ArrowUp, ExternalLink, MapPin, ArrowUpRight } from "lucide-react";
import { useContent } from "../content/ContentContext";

const Footer: React.FC = () => {
  const { settings } = useContent();
  const [copied, setCopied] = useState(false);
  const email = settings.email;
  const wa = `https://wa.me/${settings.whatsapp}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="footer" id="contact">
      {/* Call-to-action band */}
      <div className="skyline">
        <div className="skyline-bg" aria-hidden="true" />
        <div className="wrap skyline-inner reveal-on-scroll">
          <span className="chip chip-live">
            <span className="live-dot" /> {settings.availability}
          </span>
          <h2 className="skyline-title">
            {settings.footerHeadline} <em>{settings.footerHighlight}</em>
          </h2>
          <p>{settings.footerText}</p>
          <div className="cta-row cta-row-left">
            <a href={`mailto:${email}`} className="btn btn-primary">
              <Mail size={16} />
              <span>Send Direct Email</span>
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="ft-cards">
          <div className="ft-card spot">
            <div className="ft-card-top">
              <span className="ft-ico"><Mail size={17} /></span>
              <span className="mono-label">Direct email</span>
            </div>
            <div className="ft-card-body">
              <span className="ft-val">{email}</span>
              <button type="button" className={`ft-copy ${copied ? "copied" : ""}`} onClick={handleCopy}>
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <a href={wa} target="_blank" rel="noreferrer" className="ft-card ft-link spot">
            <div className="ft-card-top">
              <span className="ft-ico"><MessageCircle size={17} /></span>
              <span className="mono-label">Phone / WhatsApp</span>
            </div>
            <div className="ft-card-body">
              <span className="ft-val">{settings.phoneDisplay}</span>
              <ArrowUpRight size={16} className="ft-arrow" />
            </div>
          </a>

          <a href={settings.firmUrl} target="_blank" rel="noreferrer" className="ft-card ft-link spot">
            <div className="ft-card-top">
              <span className="ft-ico"><Building2 size={17} /></span>
              <span className="mono-label">Office &amp; firm</span>
            </div>
            <div className="ft-card-body">
              <span className="ft-val">{settings.firmName}</span>
              <ExternalLink size={14} className="ft-arrow" />
            </div>
          </a>
        </div>

        <div className="ft-base">
          <div className="ft-id">
            <b>
              {settings.firstName} {settings.lastName}
            </b>
            <span>{settings.footerRole}</span>
            <span className="chip">
              <MapPin size={12} /> {settings.footerLocation}
            </span>
          </div>

          <nav className="ft-nav">
            <Link to="/">Home</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/project">Projects</Link>
            <a href={settings.resumeUrl || "/prabin-resume.pdf"} download="Prabin_Shah_CV.pdf">Resume</a>
          </nav>

          <div className="ft-social">
            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noreferrer" title="Facebook" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
            <button type="button" className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top" aria-label="Back to top">
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        <div className="ft-copy-note">
          © {new Date().getFullYear()} {settings.firstName} {settings.lastName}. Engineered with React, TypeScript &amp; Vite.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

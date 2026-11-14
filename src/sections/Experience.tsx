import React from "react";
import {
  Building2,
  FlaskConical,
  HardHat,
  DraftingCompass,
  Download,
  Send,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";
import type { WorkIcon } from "../content/types";

const icons: Record<WorkIcon, React.ElementType> = {
  building: Building2,
  flask: FlaskConical,
  hardhat: HardHat,
  compass: DraftingCompass,
};

const Experience: React.FC = () => {
  const { work, leadership, settings } = useContent();

  return (
    <section className="section page-top" id="experience">
      <div className="page-glow" aria-hidden="true" />
      <div className="wrap">
        <header className="sec-head reveal-on-scroll">
          <span className="mono-label">Career Path</span>
          <h1 className="sec-title sec-title-xl">
            Professional <em>Work Experience</em>
          </h1>
          <p className="sec-sub">
            Direct industry experience across hydropower design, site monitoring, and geotechnical research.
          </p>
        </header>

        <div className="exp-grid">
          {work.map((item, idx) => {
            const Icon = icons[item.icon] ?? Building2;
            const thumb = imgSrc(item.thumbUrl, item.thumbFile, 600);
            return (
              <article
                className={`exp-card spot ${item.isCurrent ? "exp-current" : ""} reveal-on-scroll delay-${(idx % 2 + 1) * 100}`}
                key={`${item.company}-${idx}`}
              >
                <div className="exp-main">
                  <div className="exp-top">
                    <span className="exp-ico">
                      <Icon size={20} />
                    </span>
                    <span className={`pill ${item.isCurrent ? "pill-live" : "pill-mono"}`}>
                      {item.isCurrent && <span className="live-dot" />}
                      {item.badge}
                    </span>
                  </div>
                  <span className="mono-label">{item.category}</span>
                  <h3>
                    {item.company}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" title="Visit website" aria-label="Visit website">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </h3>
                  <h4>{item.role}</h4>
                  <p>{item.description}</p>
                </div>

                {thumb && (
                  <div className={`exp-thumb ${item.thumbIsLogo ? "exp-thumb-logo" : ""}`}>
                    <img src={thumb} alt={item.company} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="cta-row reveal-on-scroll delay-200">
          <a
            href={settings.resumeUrl || "/prabin-resume.pdf"}
            download="Prabin_Shah_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>
          <a href={`mailto:${settings.email}`} className="btn btn-ghost">
            <Send size={16} />
            <span>Contact Me</span>
          </a>
        </div>

        <div className="lead">
          <header className="sec-head reveal-on-scroll">
            <span className="mono-label">Community &amp; Organizational Impact</span>
            <h2 className="sec-title">
              Leadership &amp; <em>Additional Experience</em>
            </h2>
            <p className="sec-sub">
              Elected roles, departmental coordination, and international conference volunteering during
              tenure at Kathmandu University.
            </p>
          </header>

          <div className="lead-table">
            {leadership.map((item, idx) => (
              <div className={`lead-row spot reveal-on-scroll delay-${Math.min(idx % 4 + 1, 4) * 100}`} key={`${item.role}-${idx}`}>
                <span className="lead-idx mono-label">{String(idx + 1).padStart(2, "0")}</span>
                <span className="pill pill-mono lead-period">{item.period}</span>
                <div className="lead-role">
                  <b>{item.role}</b>
                  <span>{item.entity}</span>
                </div>
                <span className="lead-domain">{item.domain}</span>
                <ArrowUpRight size={18} className="lead-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

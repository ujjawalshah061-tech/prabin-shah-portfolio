import React from "react";
import { GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";

/** Renders the big sentence with one word in the coloured italic style. */
function renderLead(lead: string, highlight: string) {
  const i = highlight ? lead.indexOf(highlight) : -1;
  if (i < 0) return lead;
  return (
    <>
      {lead.slice(0, i)}
      <em>{highlight}</em>
      {lead.slice(i + highlight.length)}
    </>
  );
}

const About: React.FC = () => {
  const { about, education, settings } = useContent();
  const photo = imgSrc(about.photoUrl, "side-helmet-hand.jpg", 1200);

  return (
    <section className="section about" id="about">
      <div className="wrap">
        <header className="sec-head reveal-on-scroll">
          <span className="mono-label">01 / Background &amp; Qualifications</span>
          <h2 className="sec-title">
            About{" "}
            <em>
              {settings.firstName} {settings.lastName}
            </em>
          </h2>
        </header>

        <div className="about-grid">
          {/* Narrative */}
          <div className="about-story reveal-on-scroll">
            <h3 className="about-lead">{renderLead(about.lead, about.leadHighlight)}</h3>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Side image */}
          <div className="about-visual reveal-on-scroll delay-200">
            <div className="about-photo spot">
              <img src={photo} alt="Construction skyline, hard hat and blueprints" />
              <div className="about-photo-shade" />
              <span className="about-photo-tag mono-label">{about.photoCaption}</span>
            </div>
          </div>
        </div>

        {/* Competencies */}
        <div className="comp-grid">
          {about.competencies.map((c, i) => (
            <div className={`comp spot reveal-on-scroll delay-${(i % 3) * 100 + 100}`} key={`${c}-${i}`}>
              <span className="comp-num mono-label">{String(i + 1).padStart(2, "0")}</span>
              <CheckCircle2 size={16} className="comp-ico" />
              <span>{c}</span>
            </div>
          ))}
        </div>

        {/* Education timeline */}
        <div className="edu">
          <div className="edu-head reveal-on-scroll">
            <span className="edu-badge">
              <GraduationCap size={22} />
            </span>
            <div>
              <span className="mono-label">Academic Excellence</span>
              <h3 className="edu-title">Education &amp; Qualifications</h3>
            </div>
          </div>

          <ol className="timeline">
            {education.map((item, i) => (
              <li className={`tl-item reveal-on-scroll delay-${Math.min(i + 1, 4) * 100}`} key={`${item.degree}-${i}`}>
                <span className={`tl-node ${item.status ? "tl-node-live" : ""}`} />
                <div className="tl-card spot">
                  <div className="tl-top">
                    <h4>{item.degree}</h4>
                    <span className="pill pill-mono">
                      <Calendar size={12} /> {item.period}
                    </span>
                  </div>
                  <div className="tl-meta">
                    <span className="tl-inst">{item.institution}</span>
                    {item.status && <span className="pill pill-live">{item.status}</span>}
                  </div>
                  <p>{item.focus}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;

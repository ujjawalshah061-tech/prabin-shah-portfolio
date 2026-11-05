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

import htrLogoImg from "../assets/images/htr-logo.png";
import kuBuildingImg from "../assets/images/ku-building.jpg";
import rahughatLogoImg from "../assets/images/rahughat-logo.png";
import greenLogoImg from "../assets/images/green-engineering-logo.png";

interface WorkExperience {
  badge: string;
  category: string;
  company: string;
  role: string;
  description: string;
  isCurrent?: boolean;
  link?: string;
  icon: React.ElementType;
  thumbImg?: string;
  isLogoThumb?: boolean;
}

interface LeadershipRecord {
  period: string;
  role: string;
  entity: string;
  domain: string;
}

const workList: WorkExperience[] = [
  {
    badge: "2024 - Present",
    category: "HYDROPOWER & TUNNELING",
    company: "Hydro Tunneling & Research",
    role: "Hydropower Design Assistant",
    description: "Assisting in hydraulic profile design, technical drafting, tunnel geometry, and engineering coordination.",
    isCurrent: true,
    link: "https://htr.com.np/",
    icon: Building2,
    thumbImg: htrLogoImg,
    isLogoThumb: true,
  },
  {
    badge: "2024",
    category: "RESEARCH LAB",
    company: "Kathmandu University",
    role: "Research Intern",
    description: "Conducted rock mechanics laboratory trials, UTM testing, and research tunnel geotechnical analysis.",
    icon: FlaskConical,
    thumbImg: kuBuildingImg,
  },
  {
    badge: "2023 - 2024",
    category: "SITE EXECUTION",
    company: "Rahughat Hydroelectric (40MW)",
    role: "Hydroelectric Project Intern",
    description: "Field exposure in construction monitoring, civil structural supervision, and site progress reporting.",
    icon: HardHat,
    thumbImg: rahughatLogoImg,
    isLogoThumb: true,
  },
  {
    badge: "Freelance",
    category: "FREELANCE DRAFTING",
    company: "Green Engineering & Solution",
    role: "Civil & Structural Drafting",
    description: "Delivered freelance structural CAD drawings, civil component drafting, and BOQ layout vetting.",
    icon: DraftingCompass,
    thumbImg: greenLogoImg,
    isLogoThumb: true,
  },
];

const leadershipRecords: LeadershipRecord[] = [
  {
    period: "2024 / 2025",
    role: "President",
    entity: "Kathmandu University Civil Engineering Club (KUCEC)",
    domain: "Executive Student Body & Technical Conclaves",
  },
  {
    period: "2023 / 2024",
    role: "Coordinator",
    entity: "Kathmandu University Youth Red Cross Circle (KUYRCC)",
    domain: "Institutional Blood Donation & Humanitarian Drives",
  },
  {
    period: "2024",
    role: "Vice Coordinator",
    entity: "Sankalpa’24 National Engineering Event",
    domain: "National Symposia & Inter-University Technical Logistics",
  },
  {
    period: "2022 / 2023",
    role: "Executive Member",
    entity: "Kathmandu University Civil Engineering Club (KUCEC)",
    domain: "Student Workshops & Technical Field Delegations",
  },
  {
    period: "2023 / 2024",
    role: "Treasurer",
    entity: "Kathmandu University Indoor Games Club (KUIGC)",
    domain: "Budget Allocation, Fiscal Audits & Athletic Operations",
  },
  {
    period: "Technical Volunteer",
    role: "International Delegate Support",
    entity: "International Conference Surung-I",
    domain: "Tunnels & Underground Structures Symposia",
  },
];

const Experience: React.FC = () => {
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
          {workList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                className={`exp-card spot ${item.isCurrent ? "exp-current" : ""} reveal-on-scroll delay-${(idx % 2 + 1) * 100}`}
                key={idx}
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

                {item.thumbImg && (
                  <div className={`exp-thumb ${item.isLogoThumb ? "exp-thumb-logo" : ""}`}>
                    <img src={item.thumbImg} alt={item.company} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="cta-row reveal-on-scroll delay-200">
          <a href="/prabin-resume.pdf" download="Prabin_Shah_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <Download size={16} />
            <span>Download Resume</span>
          </a>
          <a href="mailto:prabinshah919@gmail.com" className="btn btn-ghost">
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
            {leadershipRecords.map((item, idx) => (
              <div className={`lead-row spot reveal-on-scroll delay-${Math.min(idx % 4 + 1, 4) * 100}`} key={idx}>
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

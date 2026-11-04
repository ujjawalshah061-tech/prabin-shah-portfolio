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
    description:
      "Assisting in hydraulic profile design, technical drafting, tunnel geometry, and engineering coordination.",
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
    description:
      "Conducted rock mechanics laboratory trials, UTM testing, and research tunnel geotechnical analysis.",
    icon: FlaskConical,
    thumbImg: kuBuildingImg,
  },
  {
    badge: "2023 - 2024",
    category: "SITE EXECUTION",
    company: "Rahughat Hydroelectric (40MW)",
    role: "Hydroelectric Project Intern",
    description:
      "Field exposure in construction monitoring, civil structural supervision, and site progress reporting.",
    icon: HardHat,
  },
  {
    badge: "Freelance",
    category: "FREELANCE DRAFTING",
    company: "Green Engineering & Solution",
    role: "Civil & Structural Drafting",
    description:
      "Delivered freelance structural CAD drawings, civil component drafting, and BOQ layout vetting.",
    icon: DraftingCompass,
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
  const cardDelays = ["delay-100", "delay-200", "delay-300", "delay-400"];

  return (
    <section className="aashu-exp-section" id="experience">
      <div className="aashu-exp-single-container">
        
        {/* Section Header */}
        <div className="pane-header center-align reveal-on-scroll">
          <span className="pane-eyebrow">CAREER PATH</span>
          <h2 className="pane-title">Professional <span>Work Experience</span></h2>
          <p className="pane-subtitle-desc">
            Direct industry experience across hydropower design, site monitoring, and geotechnical research.
          </p>
        </div>

        {/* 2x2 Work Experience Grid with Side Thumbnail Support */}
        <div className="aashu-cards-grid">
          {workList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                className={`aashu-work-card ${item.isCurrent ? "current-card" : ""} ${item.thumbImg ? "has-thumb" : ""} reveal-on-scroll ${cardDelays[idx] || ""}`}
                key={idx}
              >
                <div className="card-content-left">
                  <div className="card-top-header">
                    <div className="card-logo-box">
                      <Icon size={20} />
                    </div>
                    <span className="card-year-badge">{item.badge}</span>
                  </div>

                  <span className="card-cat-label">{item.category}</span>

                  <h3 className="card-company-title">
                    {item.company}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" title="Visit website">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </h3>

                  <h4 className="card-role-title">{item.role}</h4>
                  <p className="card-desc-body">{item.description}</p>
                </div>

                {/* Right Side Visual Thumbnail */}
                {item.thumbImg && (
                  <div className={`card-thumb-wrap ${item.isLogoThumb ? "logo-style" : "photo-style"}`}>
                    <img src={item.thumbImg} alt={item.company} className="card-thumb-image" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div className="aashu-cta-buttons center-align-cta reveal-on-scroll delay-200">
          <a
            href="/prabin-resume.pdf"
            download="Prabin_Shah_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aashu-resume"
          >
            <Download size={15} />
            <span>Download Resume</span>
          </a>

          <a href="mailto:prabinshah919@gmail.com" className="btn-aashu-contact">
            <Send size={15} />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Sleek Editorial Leadership Registry */}
        <div className="lead-registry-wrap">
          <div className="lead-registry-header reveal-on-scroll">
            <span className="pane-eyebrow">COMMUNITY & ORGANIZATIONAL IMPACT</span>
            <h2 className="pane-title">
              Leadership & <span>Additional Experience</span>
            </h2>
            <p className="lead-registry-sub">
              Elected roles, departmental coordination, and international conference volunteering during tenure at Kathmandu University.
            </p>
          </div>

          <div className="lead-registry-table">
            {leadershipRecords.map((item, idx) => (
              <div 
                className={`lead-row reveal-on-scroll ${idx < 4 ? cardDelays[idx] : "delay-400"}`} 
                key={idx}
              >
                <div className="lead-col-period">
                  <span className="lead-period-pill">{item.period}</span>
                </div>
                <div className="lead-col-role">
                  <span className="lead-main-role">{item.role}</span>
                  <span className="lead-main-entity">{item.entity}</span>
                </div>
                <div className="lead-col-domain">
                  <span>{item.domain}</span>
                </div>
                <div className="lead-col-action">
                  <ArrowUpRight size={16} className="lead-arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
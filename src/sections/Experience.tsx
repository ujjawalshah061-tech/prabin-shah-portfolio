import React from "react";
import {
  Building2,
  FlaskConical,
  HardHat,
  DraftingCompass,
  Download,
  Send,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Globe2,
  Award,
  Users,
  Compass,
  Coins,
  Megaphone,
  HeartHandshake,
} from "lucide-react";

interface WorkExperience {
  badge: string;
  category: string;
  company: string;
  role: string;
  description: string;
  isCurrent?: boolean;
  link?: string;
  icon: React.ElementType;
}

interface LeadershipRole {
  year: string;
  role: string;
  organization: string;
  scope: string;
  icon: React.ElementType;
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
  },
  {
    badge: "2024",
    category: "RESEARCH LAB",
    company: "Kathmandu University",
    role: "Research Intern",
    description:
      "Conducted rock mechanics laboratory trials, UTM testing, and research tunnel geotechnical analysis.",
    icon: FlaskConical,
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

const leadershipList: LeadershipRole[] = [
  {
    year: "2024 / 2025",
    role: "President",
    organization: "Kathmandu University Civil Engineering Club (KUCEC)",
    scope: "Departmental Student Leadership & Conclaves",
    icon: Award,
  },
  {
    year: "2023 / 2024",
    role: "Coordinator",
    organization: "Kathmandu University Youth Red Cross Circle (KUYRCC)",
    scope: "Humanitarian & Blood Donation Drives",
    icon: HeartHandshake,
  },
  {
    year: "2024",
    role: "Vice Coordinator",
    organization: "Sankalpa’24 National Engineering Event",
    scope: "Technical Symposia & Inter-University Coordination",
    icon: Megaphone,
  },
  {
    year: "2022 / 2023",
    role: "Executive Member",
    organization: "Kathmandu University Civil Engineering Club (KUCEC)",
    scope: "Student Workshops & Technical Field Visits",
    icon: Users,
  },
  {
    year: "2023 / 2024",
    role: "Treasurer",
    organization: "Kathmandu University Indoor Games Club (KUIGC)",
    scope: "Financial Budgeting, Auditing & Sports Logistics",
    icon: Coins,
  },
  {
    year: "Conference",
    role: "Technical Volunteer",
    organization: "International Conference Surung-I",
    scope: "Tunnels & Underground Structures Symposia",
    icon: Compass,
  },
];

const skillCategories = [
  {
    title: "Engineering & Design Software",
    subtitle: "Hydraulic, Highway & Structural",
    icon: Layers,
    accent: "orange",
    skills: ["Civil 3D", "AutoCAD", "SW_DTM", "SW_Road", "SAP 2000", "HEC-RAS"],
  },
  {
    title: "Computation & Office",
    subtitle: "BOQ, Quantity & Reports",
    icon: FileSpreadsheet,
    accent: "purple",
    skills: ["Microsoft Excel (Advanced)", "Microsoft Word", "Microsoft PowerPoint"],
  },
  {
    title: "Languages Spoken",
    subtitle: "Professional & Regional Communication",
    icon: Globe2,
    accent: "green",
    skills: ["English (Fluent)", "Nepali (Native)", "Maithili (Native)", "Hindi (Fluent)"],
  },
];

const Experience: React.FC = () => {
  return (
    <section className="aashu-exp-section" id="experience">
      <div className="aashu-exp-container">
        {/* Left Column: Where I Worked */}
        <div className="aashu-left-pane">
          <div className="pane-header">
            <span className="pane-eyebrow">CAREER PATH</span>
            <h2 className="pane-title">Where I Worked</h2>
          </div>

          <div className="aashu-cards-grid">
            {workList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  className={`aashu-work-card ${item.isCurrent ? "current-card" : ""}`}
                  key={idx}
                >
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
              );
            })}
          </div>
        </div>

        {/* Right Column: Skills Arsenal */}
        <div className="aashu-right-pane">
          <div className="pane-header">
            <span className="pane-eyebrow">TECHNICAL ARSENAL</span>
            <h2 className="pane-title">Tools & Engineering Skills</h2>
          </div>

          <div className="skills-arsenal-stack">
            {skillCategories.map((cat, index) => {
              const CatIcon = cat.icon;
              return (
                <div className={`arsenal-card accent-${cat.accent}`} key={index}>
                  <div className="arsenal-head">
                    <div className="arsenal-icon-wrap">
                      <CatIcon size={18} />
                    </div>
                    <div>
                      <h4 className="arsenal-title">{cat.title}</h4>
                      <p className="arsenal-subtitle">{cat.subtitle}</p>
                    </div>
                  </div>

                  <div className="arsenal-pills-wrap">
                    {cat.skills.map((sName, sIdx) => (
                      <span className="arsenal-pill" key={sIdx}>
                        {sName}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="aashu-cta-buttons">
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
        </div>
      </div>

      {/* Full-Width Bottom Section: Institutional Leadership & Responsibilities */}
      <div className="exp-leadership-wrapper">
        <div className="exp-leadership-header">
          <span className="pane-eyebrow">COMMUNITY & ORGANIZATIONAL IMPACT</span>
          <h2 className="pane-title">
            Leadership & <span>Additional Experience</span>
          </h2>
          <p className="exp-leadership-sub">
            Elected roles, departmental coordination, and international conference volunteering during tenure at Kathmandu University.
          </p>
        </div>

        <div className="exp-leadership-grid">
          {leadershipList.map((item, lIdx) => {
            const LeadIcon = item.icon;
            return (
              <div className="exp-leadership-card" key={lIdx}>
                <div className="lead-card-head">
                  <div className="lead-icon-circle">
                    <LeadIcon size={18} />
                  </div>
                  <span className="lead-year-pill">{item.year}</span>
                </div>

                <h3 className="lead-role-head">{item.role}</h3>
                <h4 className="lead-org-name">{item.organization}</h4>
                <p className="lead-scope-text">{item.scope}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
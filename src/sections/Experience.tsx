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
    </section>
  );
};

export default Experience;
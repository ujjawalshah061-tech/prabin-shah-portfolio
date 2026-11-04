import React from "react";
import { Layers, FileSpreadsheet, Globe2 } from "lucide-react";

const skillCategories = [
  {
    title: "Engineering & Design Software",
    subtitle: "Hydraulic, Highway & Structural CAD",
    icon: Layers,
    accent: "orange",
    skills: ["Civil 3D", "AutoCAD", "SW_DTM", "SW_Road", "SAP 2000", "HEC-RAS"],
  },
  {
    title: "Computation & Project Management",
    subtitle: "BOQ, Quantity Estimation & Technical Reports",
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

const Skills: React.FC = () => {
  return (
    <section className="home-skills-section" id="skills">
      <div className="home-skills-container">
        <div className="pane-header center-align reveal-on-scroll">
          <span className="pane-eyebrow">TECHNICAL ARSENAL</span>
          <h2 className="pane-title">Tools & <span>Engineering Skills</span></h2>
          <p className="pane-subtitle-desc">
            Core civil engineering software, computation packages, and languages deployed across design and field works.
          </p>
        </div>

        <div className="home-skills-grid">
          {skillCategories.map((cat, index) => {
            const CatIcon = cat.icon;
            const delays = ["delay-100", "delay-200", "delay-300"];
            return (
              <div 
                className={`arsenal-card accent-${cat.accent} reveal-on-scroll ${delays[index] || ""}`} 
                key={index}
              >
                <div className="arsenal-head">
                  <div className="arsenal-icon-wrap">
                    <CatIcon size={20} />
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
      </div>
    </section>
  );
};

export default Skills;
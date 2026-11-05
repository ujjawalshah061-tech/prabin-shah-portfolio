import React from "react";
import { Layers, FileSpreadsheet, Globe2 } from "lucide-react";
import helmetDesk from "../assets/images/side-helmet-desk.jpg";

const skillCategories = [
  {
    title: "Engineering & Design Software",
    subtitle: "Hydraulic, Highway & Structural CAD",
    icon: Layers,
    accent: "amber",
    skills: ["Civil 3D", "AutoCAD", "SW_DTM", "SW_Road", "SAP 2000", "HEC-RAS"],
  },
  {
    title: "Computation & Project Management",
    subtitle: "BOQ, Quantity Estimation & Technical Reports",
    icon: FileSpreadsheet,
    accent: "cyan",
    skills: ["Primavera", "Microsoft Excel (Advanced)", "Microsoft Word", "Microsoft PowerPoint"],
  },
  {
    title: "Languages Spoken",
    subtitle: "Professional & Regional Communication",
    icon: Globe2,
    accent: "violet",
    skills: ["English (Fluent)", "Nepali (Native)", "Maithili (Native)", "Hindi (Fluent)"],
  },
];

const Skills: React.FC = () => {
  return (
    <section className="section skills" id="skills">
      <div className="wrap">
        <header className="sec-head reveal-on-scroll">
          <span className="mono-label">02 / Technical Arsenal</span>
          <h2 className="sec-title">
            Tools &amp; <em>Engineering Skills</em>
          </h2>
          <p className="sec-sub">
            Core civil engineering software, computation packages, and languages deployed across design
            and field works.
          </p>
        </header>

        <div className="skills-layout">
          <div className="skills-photo spot reveal-on-scroll">
            <img src={helmetDesk} alt="Hard hat, drafting compass and blueprints on a site desk" />
            <div className="skills-photo-shade" />
            <div className="skills-photo-cap">
              <span className="mono-label">The toolkit</span>
              <b>Drafting precision, field discipline.</b>
            </div>
          </div>

          <div className="skills-stack">
            {skillCategories.map((cat, index) => {
              const CatIcon = cat.icon;
              return (
                <div
                  className={`skill-card spot accent-${cat.accent} reveal-on-scroll delay-${(index + 1) * 100}`}
                  key={cat.title}
                >
                  <div className="skill-head">
                    <span className="skill-ico">
                      <CatIcon size={20} />
                    </span>
                    <div>
                      <h4>{cat.title}</h4>
                      <p>{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="skill-pills">
                    {cat.skills.map((s) => (
                      <span className="skill-pill" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

import React from "react";
import { Layers, FileSpreadsheet, Globe2 } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";

const accentIcons = { amber: Layers, cyan: FileSpreadsheet, violet: Globe2 };

const Skills: React.FC = () => {
  const { skills, settings } = useContent();
  const photo = imgSrc(settings.toolkitImageUrl, "side-helmet-desk.jpg", 1000);

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
            <img src={photo} alt="Hard hat, drafting compass and blueprints on a site desk" />
            <div className="skills-photo-shade" />
            <div className="skills-photo-cap">
              <span className="mono-label">The toolkit</span>
              <b>{settings.toolkitCaption}</b>
            </div>
          </div>

          <div className="skills-stack">
            {skills.map((cat, index) => {
              const CatIcon = accentIcons[cat.accent] ?? Layers;
              return (
                <div
                  className={`skill-card spot accent-${cat.accent} reveal-on-scroll delay-${Math.min(index + 1, 4) * 100}`}
                  key={`${cat.title}-${index}`}
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
                    {cat.skills.map((s, i) => (
                      <span className="skill-pill" key={`${s}-${i}`}>
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

import React, { useMemo, useState } from "react";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";

const Project: React.FC = () => {
  const { projects, featured } = useContent();
  const [activeTab, setActiveTab] = useState<string>("All");

  // Tabs are built from the groups that actually exist, so a new group in the CMS gets its own tab.
  const tabs = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const filtered = activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);
  const showFeatured = activeTab === "All" || activeTab === "Professional";

  return (
    <section className="section page-top pj" id="projects">
      <div className="wrap">
        <header className="pj-head">
          <span className="mono-label">Projects</span>
          <h1 className="sec-title sec-title-xl">
            Key Engineering <em>Projects</em>
          </h1>
          <p className="sec-sub">
            National-scale underground hydropower design, plus feasibility research and physical modeling
            from Kathmandu University.
          </p>

          <div className="tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {showFeatured && (
          <article className="pj-feat">
            <div className="pj-feat-photo">
              <img src={imgSrc(featured.imageUrl, featured.imageFile, 1400)} alt={featured.title} />
            </div>

            <div className="pj-feat-text">
              <span className="mono-label">Featured · {featured.role}</span>
              <h2>{featured.title}</h2>
              <p className="pj-feat-cap">{featured.capacity}</p>
              <p className="pj-feat-desc">{featured.desc}</p>

              <dl className="pj-specs">
                {featured.specs.map((s, i) => (
                  <div key={`${s.label}-${i}`}>
                    <dt>{s.value}</dt>
                    <dd>{s.label}</dd>
                  </div>
                ))}
              </dl>

              <p className="pj-tools">{featured.tools.join("  ·  ")}</p>
            </div>
          </article>
        )}

        <div className="pj-list">
          {filtered.map((item, i) => (
            <article key={`${item.title}-${i}`} className="pj-row">
              <div className="pj-row-meta">
                <span className="pj-cat">{item.category}</span>
                {item.capacity && <span className="pj-cap">{item.capacity}</span>}
              </div>
              <div className="pj-row-main">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <p className="pj-row-tools">{item.tools.join(" · ")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;

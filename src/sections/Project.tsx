import React, { useState } from "react";
import budhigandakiImg from "../assets/images/sahas-feat.jpg";

type Category = "Professional" | "Hydropower" | "Physical Modeling";

interface ProjectItem {
  category: Category;
  title: string;
  desc: string;
  tools: string[];
  capacity?: string;
}

const featured = {
  title: "Budhigandaki Hydropower Project",
  capacity: "341 MW",
  role: "Detailed design & drafting",
  desc: "Nepal's flagship national hydropower scheme and one of the most technically complex underground infrastructure programmes in the country. Performed 3D FEM numerical modelling of the underground powerhouse complex, headrace tunnel and surge shaft, with geophysical and geotechnical investigation planning, coordination and interpretation, and rock support optimisation under high in-situ stress in complex Himalayan geology.",
  specs: [
    { value: "101 × 17 × 35 m", label: "Underground powerhouse (approx.)" },
    { value: "5.95 km", label: "Horseshoe headrace tunnel" },
    { value: "6.8 m", label: "Tunnel diameter" },
    { value: "3D FEM", label: "Numerical modelling" },
  ],
  tools: ["3D FEM Modelling", "Rock Support Design", "Geotechnical Interpretation", "AutoCAD", "Civil 3D"],
};

const projects: ProjectItem[] = [
  {
    category: "Professional",
    title: "Upper Dudhkhola Hydropower Project",
    desc: "Detailed design and drafting support for the waterway system — hydraulic profile layouts, tunnel geometry and construction drawings coordinated with the design team.",
    tools: ["Civil 3D", "AutoCAD", "Hydraulic Profiling"],
  },
  {
    category: "Professional",
    title: "Dudhkoshi-6 Hydropower Project",
    desc: "Design-stage engineering support: hydraulic layout, tunnel alignment studies and geotechnical drawing preparation for underground components.",
    tools: ["Civil 3D", "AutoCAD", "Tunnel Geometry"],
    capacity: "270 MW",
  },
  {
    category: "Professional",
    title: "Upper Maiwa Khola Hydropower Project",
    desc: "Drafting and hydraulic design coordination covering headworks and waterway layouts and the associated drawing sets.",
    tools: ["AutoCAD", "Civil 3D", "HEC-RAS"],
    capacity: "17.85 MW",
  },
  {
    category: "Professional",
    title: "Paramolung Hydropower Project",
    desc: "Technical drafting and design support, preparing layout drawings and waterway details through the design stage.",
    tools: ["AutoCAD", "Civil 3D", "Technical Drafting"],
    capacity: "9 MW",
  },
  {
    category: "Hydropower",
    title: "Potential Study of Hewa-A Small Hydropower Project",
    desc: "Final-year capstone: feasibility study covering river discharge estimation, hydraulic headrace alignment, intake design and energy yield calculation at Kathmandu University.",
    tools: ["Civil 3D", "HEC-RAS", "SW_DTM", "AutoCAD"],
  },
  {
    category: "Hydropower",
    title: "RUM Project of Pharping Hydropower to Convert into Pump Storage Hydropower",
    desc: "Rehabilitation, Upgradation and Modernization investigation modeling reservoir circulation loops and peak-energy storage for Nepal's historic first plant.",
    tools: ["Hydraulic Modeling", "AutoCAD", "Fluid Mechanics"],
  },
  {
    category: "Physical Modeling",
    title: "Physical Model Study of Kalanki Underpass",
    desc: "Scaled structural and geotechnical prototype evaluating retaining wall earth pressure, approach slopes and urban drainage underpass behavior.",
    tools: ["Physical Prototyping", "Soil Mechanics", "Structural Modeling"],
  },
  {
    category: "Physical Modeling",
    title: "Physical Model Study of Isolated and Combined Footings",
    desc: "Laboratory modeling analyzing stress distribution bulbs, differential settlement and load-bearing performance against Terzaghi theory.",
    tools: ["Geotechnical Lab", "Static Load Rig", "Dial Gauges"],
  },
];

const tabs = ["All", "Professional", "Hydropower", "Physical Modeling"] as const;

const Project: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
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
              <img src={budhigandakiImg} alt="Hydropower dam spillway" />
            </div>

            <div className="pj-feat-text">
              <span className="mono-label">Featured · {featured.role}</span>
              <h2>{featured.title}</h2>
              <p className="pj-feat-cap">{featured.capacity}</p>
              <p className="pj-feat-desc">{featured.desc}</p>

              <dl className="pj-specs">
                {featured.specs.map((s) => (
                  <div key={s.label}>
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
          {filtered.map((item) => (
            <article key={item.title} className="pj-row">
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

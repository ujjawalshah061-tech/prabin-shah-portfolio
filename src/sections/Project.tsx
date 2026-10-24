import React, { useState } from "react";
import { FolderGit2, ArrowUpRight, Sparkles } from "lucide-react";

interface ProjectItem {
  id: number;
  category: "Hydropower" | "Physical Modeling";
  tag: string;
  title: string;
  desc: string;
  tools: string[];
}

const projects: ProjectItem[] = [
  {
    id: 1,
    category: "Hydropower",
    tag: "Final Year Capstone Project",
    title: 'Potential Study of Hewa-A Small Hydropower Project',
    desc: "Comprehensive feasibility study covering river discharge estimation, hydraulic headrace alignment, intake design, and energy yield calculation at Kathmandu University.",
    tools: ["Civil 3D", "HEC-RAS", "SW_DTM", "AutoCAD"],
  },
  {
    id: 2,
    category: "Hydropower",
    tag: "Modernization & Upgrade (RUM)",
    title: "RUM Project of Pharping Hydropower to Convert into Pump Storage Hydropower",
    desc: "Rehabilitation, Upgradation, and Modernization (RUM) investigation modeling reservoir circulation loops and peak-energy storage for Nepal's historic first plant.",
    tools: ["Hydraulic Modeling", "AutoCAD", "Fluid Mechanics"],
  },
  {
    id: 3,
    category: "Physical Modeling",
    tag: "Scaled Experimental Study",
    title: "Physical Model Study of Kalanki Underpass",
    desc: "Constructed a scaled structural and geotechnical physical prototype evaluating retaining wall earth pressure, approach slopes, and urban drainage underpass behavior.",
    tools: ["Physical Prototyping", "Soil Mechanics", "Structural Modeling"],
  },
  {
    id: 4,
    category: "Physical Modeling",
    tag: "Foundation & Soil Mechanics",
    title: "Physical Model Study of Isolated and Combined Footings",
    desc: "Experimental laboratory modeling analyzing stress distribution bulbs, differential settlement, and load-bearing performance comparison against Terzaghi theory.",
    tools: ["Geotechnical Lab", "Static Load Rig", "Dial Gauges"],
  },
];

const Project: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section className="projects-page-section" id="projects">
      <div className="projects-page-container">
        {/* Simple Minimal Header */}
        <div className="projects-page-header">
          <span className="clean-eyebrow">ACADEMIC & FIELD WORK</span>
          <h1 className="clean-page-title">
            Key Engineering <span>Projects</span>
          </h1>
          <p className="clean-page-desc">
            Direct physical modeling, hydraulic feasibility studies, and research initiatives conducted at Kathmandu University.
          </p>

          {/* Simple Clean Tabs */}
          <div className="clean-tab-group">
            {["All", "Hydropower", "Physical Modeling"].map((tab) => (
              <button
                key={tab}
                className={`clean-tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Minimal Cards */}
        <div className="clean-projects-grid">
          {filtered.map((item) => (
            <div key={item.id} className="clean-project-card">
              <div className="card-top-row">
                <span className="clean-badge">{item.tag}</span>
                <span className="card-serial">0{item.id}</span>
              </div>

              <h3 className="card-main-title">{item.title}</h3>

              <p className="card-main-desc">{item.desc}</p>

              <div className="card-bottom-tags">
                {item.tools.map((t, idx) => (
                  <span key={idx} className="minimal-tool-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
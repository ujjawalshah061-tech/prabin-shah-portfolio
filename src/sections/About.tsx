import React from "react";
import { GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import helmetHand from "../assets/images/side-helmet-hand.jpg";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status?: string;
  focus: string;
}

const educationList: EducationItem[] = [
  {
    degree: "M.Sc. in Construction Management",
    institution: "Nepal Engineering College",
    period: "March 2026 - Present",
    status: "Currently Pursuing",
    focus: "Construction monitoring, project management, contract estimation & resource optimization.",
  },
  {
    degree: "B.E. in Civil Engineering",
    institution: "Kathmandu University (KU)",
    period: "December 2020 - July 2025",
    focus: "Underground rock mechanics, hydropower engineering, hydraulic structures & surveying.",
  },
  {
    degree: "+2 Science",
    institution: "Uniglobe Secondary School",
    period: "2017 - 2019",
    focus: "Physics, Chemistry, and Advanced Mathematics.",
  },
  {
    degree: "Secondary Education Examination (SEE)",
    institution: "Nightingale International Secondary School",
    period: "Completed 2017",
    focus: "Foundational science, mathematics, and technical coursework.",
  },
];

const competencies = [
  "Hydropower Hydraulic Design",
  "Rock Mechanics & UTM Testing",
  "AutoCAD & Civil 3D Drafting",
  "Underground Tunnel Modeling",
  "BOQ & Cost Estimation",
  "Construction Site Monitoring",
];

const About: React.FC = () => {
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <header className="sec-head reveal-on-scroll">
          <span className="mono-label">01 / Background &amp; Qualifications</span>
          <h2 className="sec-title">
            About <em>Prabin Shah</em>
          </h2>
        </header>

        <div className="about-grid">
          {/* Narrative */}
          <div className="about-story reveal-on-scroll">
            <h3 className="about-lead">
              Civil &amp; Hydropower Engineer, <em>Researcher</em> &amp; Founder.
            </h3>
            <p>
              I am a results-driven Civil Engineer with hands-on expertise in hydropower design,
              underground rock mechanics, structural drafting, and construction monitoring. Currently
              pursuing an M.Sc. in Construction Management at Nepal Engineering College, I hold a B.E. in
              Civil Engineering from Kathmandu University.
            </p>
            <p>
              My professional experience bridges academic rock mechanics research with field execution.
              At Kathmandu University’s Rock Mechanics Lab, I contributed to experimental trials on the KU
              Research Tunnel. Concurrently, with roles at Hydro Tunneling and Research Pvt. Ltd. and
              Green Engineering and Solution, I handle hydraulic profile modeling, structural
              AutoCAD/Civil 3D drawings, and geotechnical vetting.
            </p>
            <p>
              As the CEO &amp; Founder of Code &amp; Concrete Construction Pvt. Ltd., I am committed to
              delivering durable, resilient civil infrastructure across Nepal through precise digital
              drafting and modern project management protocols.
            </p>
          </div>

          {/* Side image */}
          <div className="about-visual reveal-on-scroll delay-200">
            <div className="about-photo spot">
              <img src={helmetHand} alt="Construction skyline, hard hat and blueprints" />
              <div className="about-photo-shade" />
              <span className="about-photo-tag mono-label">Design · Build · Endure</span>
            </div>
          </div>
        </div>

        {/* Competencies */}
        <div className="comp-grid">
          {competencies.map((c, i) => (
            <div className={`comp spot reveal-on-scroll delay-${(i % 3) * 100 + 100}`} key={c}>
              <span className="comp-num mono-label">{String(i + 1).padStart(2, "0")}</span>
              <CheckCircle2 size={16} className="comp-ico" />
              <span>{c}</span>
            </div>
          ))}
        </div>

        {/* Education timeline */}
        <div className="edu">
          <div className="edu-head reveal-on-scroll">
            <span className="edu-badge">
              <GraduationCap size={22} />
            </span>
            <div>
              <span className="mono-label">Academic Excellence</span>
              <h3 className="edu-title">Education &amp; Qualifications</h3>
            </div>
          </div>

          <ol className="timeline">
            {educationList.map((item, i) => (
              <li className={`tl-item reveal-on-scroll delay-${Math.min(i + 1, 4) * 100}`} key={i}>
                <span className={`tl-node ${item.status ? "tl-node-live" : ""}`} />
                <div className="tl-card spot">
                  <div className="tl-top">
                    <h4>{item.degree}</h4>
                    <span className="pill pill-mono">
                      <Calendar size={12} /> {item.period}
                    </span>
                  </div>
                  <div className="tl-meta">
                    <span className="tl-inst">{item.institution}</span>
                    {item.status && <span className="pill pill-live">{item.status}</span>}
                  </div>
                  <p>{item.focus}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;

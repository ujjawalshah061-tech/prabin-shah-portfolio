import React from "react";
import { 
  Award, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
} from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
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
    gpa: "3.44 / 4.00",
    focus: "Underground rock mechanics, hydropower engineering, hydraulic structures & surveying.",
  },
  {
    degree: "+2 Science",
    institution: "Uniglobe Secondary School",
    period: "2017 - 2019",
    gpa: "3.46 / 4.00",
    focus: "Physics, Chemistry, and Advanced Mathematics.",
  },
  {
    degree: "Secondary Education Examination (SEE)",
    institution: "Nightingale International Secondary School",
    period: "Completed 2017",
    gpa: "3.75 / 4.00",
    focus: "Foundational science, mathematics, and technical coursework.",
  },
];

const About: React.FC = () => {
  const cardDelays = ["delay-100", "delay-200", "delay-300", "delay-400"];

  return (
    <section className="about-modern-section" id="about">
      <div className="about-ambient-glow"></div>

      <div className="about-modern-container">
        {/* Section Header */}
        <div className="about-title-block reveal-on-scroll">
          <span className="about-eyebrow-chip">BACKGROUND & QUALIFICATIONS</span>
          <h2 className="about-hero-title">
            About <span>Prabin Shah</span>
          </h2>
          <div className="about-title-bar"></div>
        </div>

        {/* 1. TOP CENTER: Story & Narrative */}
        <div className="about-center-narrative reveal-on-scroll delay-100">
          <h3 className="about-subheading center-text">
            Civil & Hydropower Engineer, Researcher & Founder
          </h3>

          <div className="about-paragraphs center-paragraphs">
            <p>
              I am a results-driven Civil Engineer with hands-on expertise in hydropower design, underground rock mechanics, structural drafting, and construction monitoring. Currently pursuing an M.Sc. in Construction Management at Nepal Engineering College, I hold a B.E. in Civil Engineering from Kathmandu University (GPA: 3.44/4.00).
            </p>
            <p>
              My professional experience bridges academic rock mechanics research with field execution. At Kathmandu University’s Rock Mechanics Lab, I contributed to experimental trials on the KU Research Tunnel. Concurrently, with roles at Hydro Tunneling and Research Pvt. Ltd. and Green Engineering and Solution, I handle hydraulic profile modeling, structural AutoCAD/Civil 3D drawings, and geotechnical vetting.
            </p>
            <p>
              As the CEO & Founder of Code & Concrete Construction Pvt. Ltd., I am committed to delivering durable, resilient civil infrastructure across Nepal through precise digital drafting and modern project management protocols.
            </p>
          </div>

          {/* Centered Core Strengths */}
          <div className="about-strengths-box reveal-on-scroll delay-200">
            <h4 className="strengths-title center-text">Core Competencies</h4>
            <div className="strengths-grid-center">
              <div className="strength-item">
                <CheckCircle2 size={16} className="strength-bullet" />
                <span>Hydropower Hydraulic Design</span>
              </div>
              <div className="strength-item">
                <CheckCircle2 size={16} className="strength-bullet" />
                <span>Rock Mechanics & UTM Testing</span>
              </div>
              <div className="strength-item">
                <CheckCircle2 size={16} className="strength-bullet" />
                <span>AutoCAD & Civil 3D Drafting</span>
              </div>
              <div className="strength-item">
                <CheckCircle2 size={16} className="strength-bullet" />
                <span>Underground Tunnel Modeling</span>
              </div>
              <div className="strength-item">
                <CheckCircle2 size={16} className="strength-bullet" />
                <span>BOQ & Cost Estimation</span>
              </div>
              <div className="strength-item">
                <CheckCircle2 size={16} className="strength-bullet" />
                <span>Construction Site Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM: Academic Excellence (Education Timeline Stack) */}
        <div className="about-academic-bottom reveal-on-scroll delay-200">
          <div className="edu-col-header center-edu-header">
            <div className="edu-icon-badge">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="edu-eyebrow-text">ACADEMIC EXCELLENCE</span>
              <h3 className="edu-section-title">Education & Qualifications</h3>
            </div>
          </div>

          <div className="education-timeline-grid">
            {educationList.map((item, index) => (
              <div 
                key={index} 
                className={`edu-timeline-card reveal-on-scroll ${cardDelays[index] || ""}`}
              >
                <div className="edu-card-top-row">
                  <h4 className="edu-degree-text">{item.degree}</h4>
                  <span className="edu-period-tag">
                    <Calendar size={13} /> {item.period}
                  </span>
                </div>

                <div className="edu-institution-row">
                  <span className="edu-inst-name">{item.institution}</span>
                  {item.gpa && (
                    <span className="edu-gpa-pill">
                      <Award size={13} /> GPA: {item.gpa}
                    </span>
                  )}
                  {item.status && (
                    <span className="edu-status-pill">{item.status}</span>
                  )}
                </div>

                <p className="edu-focus-detail">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
import React from "react";
import { 
  Building2, 
  HardHat, 
  Award, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Download,
  School,
  BookOpen
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
  return (
    <section className="about-modern-section" id="about">
      <div className="about-ambient-glow"></div>

      <div className="about-modern-container">
        {/* Section Header */}
        <div className="about-title-block">
          <span className="about-eyebrow-chip">BACKGROUND & QUALIFICATIONS</span>
          <h2 className="about-hero-title">
            About <span>Prabin Shah</span>
          </h2>
          <div className="about-title-bar"></div>
        </div>

        {/* 2-Column Split: Story on Left, Complete Education Timeline on Right */}
        <div className="about-split-layout">
          {/* Left Column: Story & Core Strengths */}
          <div className="about-narrative-col">
            <h3 className="about-subheading">
              Civil & Hydropower Engineer, Researcher & Founder
            </h3>

            <div className="about-paragraphs">
              <p>
                I am a results-driven <strong>Civil Engineer</strong> with hands-on expertise in hydropower design, underground rock mechanics, structural drafting, and construction monitoring. Currently pursuing an <strong>M.Sc. in Construction Management at Nepal Engineering College</strong>[cite: 12], I hold a B.E. in Civil Engineering from <strong>Kathmandu University (GPA: 3.44/4.00)</strong>[cite: 12].
              </p>
              <p>
                My professional experience bridges academic rock mechanics research with field execution. At Kathmandu University’s Rock Mechanics Lab, I contributed to experimental trials on the KU Research Tunnel[cite: 12]. Concurrently, with roles at <strong>Hydro Tunneling and Research Pvt. Ltd.</strong> and <strong>Green Engineering and Solution</strong>[cite: 12], I handle hydraulic profile modeling, structural AutoCAD/Civil 3D drawings, and geotechnical vetting[cite: 12].
              </p>
              <p>
                As the <strong>CEO & Founder of Code & Concrete Construction Pvt. Ltd.</strong>, I am committed to delivering durable, resilient civil infrastructure across Nepal through precise digital drafting and modern project management protocols.
              </p>
            </div>

            {/* Core Strengths */}
            <div className="about-strengths-section">
              <h4 className="strengths-title">Core Competencies</h4>
              <div className="strengths-grid">
                <div className="strength-item">
                  <CheckCircle2 size={15} className="strength-bullet" />
                  <span>Hydropower Hydraulic Design</span>
                </div>
                <div className="strength-item">
                  <CheckCircle2 size={15} className="strength-bullet" />
                  <span>Rock Mechanics & UTM Testing</span>
                </div>
                <div className="strength-item">
                  <CheckCircle2 size={15} className="strength-bullet" />
                  <span>AutoCAD & Civil 3D Drafting</span>
                </div>
                <div className="strength-item">
                  <CheckCircle2 size={15} className="strength-bullet" />
                  <span>Underground Tunnel Modeling</span>
                </div>
                <div className="strength-item">
                  <CheckCircle2 size={15} className="strength-bullet" />
                  <span>BOQ & Cost Estimation</span>
                </div>
                <div className="strength-item">
                  <CheckCircle2 size={15} className="strength-bullet" />
                  <span>Construction Site Monitoring</span>
                </div>
              </div>
            </div>

            <div className="about-cta-row">
              <a 
                href="/prabin-resume.pdf" 
                download="Prabin_Shah_CV.pdf" 
                className="btn-about-cv"
              >
                <Download size={15} />
                <span>Download Curriculum Vitae (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Education Timeline with Uniglobe & Nightingale */}
          <div className="about-education-col">
            <div className="edu-col-header">
              <div className="edu-icon-badge">
                <GraduationCap size={22} />
              </div>
              <div>
                <span className="edu-eyebrow-text">ACADEMIC EXCELLENCE</span>
                <h3 className="edu-section-title">Education & Qualifications</h3>
              </div>
            </div>

            <div className="education-timeline-stack">
              {educationList.map((item, index) => (
                <div key={index} className="edu-timeline-card">
                  <div className="edu-card-top-row">
                    <h4 className="edu-degree-text">{item.degree}</h4>
                    <span className="edu-period-tag">
                      <Calendar size={12} /> {item.period}
                    </span>
                  </div>

                  <div className="edu-institution-row">
                    <span className="edu-inst-name">{item.institution}</span>
                    {item.gpa && (
                      <span className="edu-gpa-pill">
                        <Award size={12} /> GPA: {item.gpa}
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
      </div>
    </section>
  );
};

export default About;
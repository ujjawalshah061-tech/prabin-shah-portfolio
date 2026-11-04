import React from "react";
import { Award, Mic2, GraduationCap, Building2 } from "lucide-react";

import convocationImg from "../assets/images/convocation.jpg";
import kuSpeechImg from "../assets/images/ku-speech.jpg";
import kuPodiumImg from "../assets/images/ku-podium.jpg";
import campusPortraitImg from "../assets/images/campus-portrait.jpg";

interface MilestoneItem {
  id: number;
  tag: string;
  title: string;
  caption: string;
  image: string;
  icon: React.ReactNode;
}

const milestoneData: MilestoneItem[] = [
  {
    id: 1,
    tag: "ACADEMIC CONVOCATION",
    title: "B.E. Civil Engineering Conferred",
    caption: "Receiving Bachelor's degree from Kathmandu University School of Engineering, graduating with a 3.44 GPA.",
    image: convocationImg,
    icon: <GraduationCap size={16} />,
  },
  {
    id: 2,
    tag: "CIVIL ENGINEERING LEADERSHIP",
    title: "KU Civil Club Keynote & Address",
    caption: "Addressing students and faculty at Kathmandu University Civil Engineering Club (KUCEC) official assembly.",
    image: kuSpeechImg,
    icon: <Mic2 size={16} />,
  },
  {
    id: 3,
    tag: "RESEARCH & INSTITUTIONAL ADDRESS",
    title: "Academic Colloquium Presentation",
    caption: "Delivering engineering insights and project presentations at the Kathmandu University main auditorium.",
    image: kuPodiumImg,
    icon: <Award size={16} />,
  },
  {
    id: 4,
    tag: "PROFESSIONAL PROFILE",
    title: "KU School of Engineering Premise",
    caption: "Academic journey representation at Kathmandu University, transitioning from student researcher to industry founder.",
    image: campusPortraitImg,
    icon: <Building2 size={16} />,
  },
];

const Milestones: React.FC = () => {
  const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];

  return (
    <section className="milestones-section" id="milestones">
      <div className="milestones-container">
        <div className="milestones-header reveal-on-scroll">
          <span className="milestones-eyebrow">HONORS & LEADERSHIP</span>
          <h2 className="milestones-title">
            Academic & Public <span>Milestones</span>
          </h2>
          <p className="milestones-subtitle">
            Moments reflecting academic dedication, leadership roles at Kathmandu University, and formal technical addresses.
          </p>
        </div>

        <div className="milestones-grid">
          {milestoneData.map((item, idx) => (
            <div 
              key={item.id} 
              className={`milestone-card reveal-on-scroll ${delays[idx] || ""}`}
            >
              <div className="milestone-img-box">
                <img src={item.image} alt={item.title} className="milestone-img" />
                <div className="milestone-overlay-shade"></div>
                <div className="milestone-tag-pill">
                  {item.icon}
                  <span>{item.tag}</span>
                </div>
              </div>
              <div className="milestone-text-block">
                <h3 className="milestone-card-title">{item.title}</h3>
                <p className="milestone-card-desc">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
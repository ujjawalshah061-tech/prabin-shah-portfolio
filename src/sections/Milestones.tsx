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
    caption: "Receiving Bachelor's degree from Kathmandu University School of Engineering.",
    image: convocationImg,
    icon: <GraduationCap size={14} />,
  },
  {
    id: 2,
    tag: "CIVIL ENGINEERING LEADERSHIP",
    title: "KU Civil Club Keynote & Address",
    caption: "Addressing students and faculty at Kathmandu University Civil Engineering Club (KUCEC) official assembly.",
    image: kuSpeechImg,
    icon: <Mic2 size={14} />,
  },
  {
    id: 3,
    tag: "RESEARCH & INSTITUTIONAL ADDRESS",
    title: "Academic Colloquium Presentation",
    caption: "Delivering engineering insights and project presentations at the Kathmandu University main auditorium.",
    image: kuPodiumImg,
    icon: <Award size={14} />,
  },
  {
    id: 4,
    tag: "PROFESSIONAL PROFILE",
    title: "KU School of Engineering Premise",
    caption: "Academic journey representation at Kathmandu University, transitioning from student researcher to industry founder.",
    image: campusPortraitImg,
    icon: <Building2 size={14} />,
  },
];

const Milestones: React.FC = () => {
  return (
    <section className="section milestones" id="milestones">
      <div className="wrap">
        <header className="sec-head reveal-on-scroll">
          <span className="mono-label">03 / Honors &amp; Leadership</span>
          <h2 className="sec-title">
            Academic &amp; Public <em>Milestones</em>
          </h2>
          <p className="sec-sub">
            Moments reflecting academic dedication, leadership roles at Kathmandu University, and formal
            technical addresses.
          </p>
        </header>

        <div className="ms-grid">
          {milestoneData.map((item, idx) => (
            <article
              key={item.id}
              className={`ms-card ms-${item.id} spot reveal-on-scroll delay-${(idx % 2) * 100 + 100}`}
            >
              <img src={item.image} alt={item.title} className="ms-img" loading="lazy" />
              <div className="ms-shade" />
              <span className="ms-index">{String(item.id).padStart(2, "0")}</span>
              <div className="ms-body">
                <span className="chip chip-glass">
                  {item.icon}
                  {item.tag}
                </span>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;

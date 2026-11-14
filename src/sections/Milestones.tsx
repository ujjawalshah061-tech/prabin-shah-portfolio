import React from "react";
import { Award, Mic2, GraduationCap, Building2 } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";

const icons = [GraduationCap, Mic2, Award, Building2];

const Milestones: React.FC = () => {
  const { milestones } = useContent();

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
          {milestones.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <article
                key={`${item.title}-${idx}`}
                className={`ms-card ms-${(idx % 4) + 1} spot reveal-on-scroll delay-${(idx % 2) * 100 + 100}`}
              >
                <img
                  src={imgSrc(item.imageUrl, item.imageFile)}
                  alt={item.title}
                  className="ms-img"
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                  loading="lazy"
                />
                <div className="ms-shade" />
                <span className="ms-index">{String(idx + 1).padStart(2, "0")}</span>
                <div className="ms-body">
                  <span className="chip chip-glass">
                    <Icon size={14} />
                    {item.tag}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Milestones;

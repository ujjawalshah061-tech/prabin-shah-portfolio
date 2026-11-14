import React from "react";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";

const EngineeringGallery: React.FC = () => {
  const { gallery } = useContent();

  return (
    <section className="section gallery" id="gallery">
      <div className="wrap">
        <header className="sec-head reveal-on-scroll">
          <span className="mono-label">04 / Field &amp; Laboratory Archive</span>
          <h2 className="sec-title">
            Engineering in <em>Action</em>
          </h2>
          <p className="sec-sub">
            A visual record of geodetic field surveying, rock mechanics testing, laboratory trials, and
            structural modeling.
          </p>
        </header>

        <div className="gal-grid">
          {gallery.map((item, idx) => (
            <figure
              key={`${item.title}-${idx}`}
              className={`gal-card ${idx < 4 ? `gal-${idx + 1}` : ""} spot reveal-on-scroll delay-${((idx % 3) + 1) * 100}`}
            >
              <img
                src={imgSrc(item.imageUrl, item.imageFile)}
                alt={item.title}
                style={item.focus ? { objectPosition: item.focus } : undefined}
                loading="lazy"
              />
              <div className="gal-shade" />
              <figcaption>
                <span className="mono-label">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringGallery;

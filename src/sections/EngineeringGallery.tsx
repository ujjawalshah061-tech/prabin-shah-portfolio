import React from "react";
import surveyImg from "../assets/images/survey.jpg";
import rockDrillImg from "../assets/images/rock-drilling.jpg";
import soilLabImg from "../assets/images/soil-lab.jpg";
import structuralImg from "../assets/images/structural-rebar.jpg";

interface GalleryItem {
  id: number;
  tag: string;
  title: string;
  caption: string;
  image: string;
  pos: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    tag: "UNDERGROUND STRUCTURES",
    title: "Tunnel Modeling",
    caption: "Tunnel geometry and numerical modeling for underground hydropower waterways.",
    image: surveyImg,
    pos: "center center",
  },
  {
    id: 2,
    tag: "ROCK MECHANICS LAB",
    title: "Core Specimen Extraction for UTM",
    caption: "Operating core drilling apparatus for cylindrical rock specimen sampling to conduct uniaxial compressive strength (UCS) trials.",
    image: rockDrillImg,
    pos: "center 30%",
  },
  {
    id: 3,
    tag: "GEOTECHNICAL TESTING",
    title: "Soil Consistency & Material Trials",
    caption: "Analyzing soil index properties, compaction parameters, and aggregate mix consistency in the laboratory.",
    image: soilLabImg,
    pos: "center 20%",
  },
  {
    id: 4,
    tag: "STRUCTURAL MODELING",
    title: "Rebar Cage Detailing & Fabrication",
    caption: "Hands-on assembly of column-beam reinforcement cage models and structural geometry during semester project work.",
    image: structuralImg,
    pos: "center 75%",
  },
];

const EngineeringGallery: React.FC = () => {
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
          {galleryData.map((item, idx) => (
            <figure
              key={item.id}
              className={`gal-card gal-${item.id} spot reveal-on-scroll delay-${(idx % 3 + 1) * 100}`}
            >
              <img src={item.image} alt={item.title} style={{ objectPosition: item.pos }} loading="lazy" />
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

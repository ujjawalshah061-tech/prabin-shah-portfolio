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
  span: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    tag: "FIELD SURVEYING & GEODETICS",
    title: "Electronic Total Station Profiling",
    caption: "Conducting geodetic alignment and topographic leveling for roadway profiling and structural grid setting at Kathmandu University.",
    image: surveyImg,
    span: "col-span-1 row-span-2",
  },
  {
    id: 2,
    tag: "ROCK MECHANICS LAB",
    title: "Core Specimen Extraction for UTM",
    caption: "Operating core drilling apparatus for cylindrical rock specimen sampling to conduct uniaxial compressive strength (UCS) trials.",
    image: rockDrillImg,
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    tag: "GEOTECHNICAL TESTING",
    title: "Soil Consistency & Material Trials",
    caption: "Analyzing soil index properties, compaction parameters, and aggregate mix consistency in the laboratory.",
    image: soilLabImg,
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    tag: "STRUCTURAL MODELING",
    title: "Rebar Cage Detailing & Fabrication",
    caption: "Hands-on assembly of column-beam reinforcement cage models and structural geometry during semester project work.",
    image: structuralImg,
    span: "col-span-2 row-span-1",
  },
];

const EngineeringGallery: React.FC = () => {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        {/* Section Header */}
        <div className="gallery-header">
          <span className="gallery-eyebrow">FIELD & LABORATORY ARCHIVE</span>
          <h2 className="gallery-title">
            Engineering in <span>Action</span>
          </h2>
          <p className="gallery-subtitle">
            A visual record of geodetic field surveying, rock mechanics testing, laboratory trials, and structural modeling.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="gallery-bento-grid">
          {galleryData.map((item) => (
            <div key={item.id} className={`gallery-card ${item.span}`}>
              <div className="gallery-image-wrapper">
                <img src={item.image} alt={item.title} className="gallery-img" />
                <div className="gallery-overlay-gradient"></div>
              </div>

              <div className="gallery-card-content">
                <span className="gallery-card-tag">{item.tag}</span>
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-desc">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringGallery;
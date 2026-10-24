import React from "react";
import { Link } from "react-router-dom";
import { Send, FileText, Building } from "lucide-react";
import prabinImg from "../assets/images/prabin-shah.png";

const Hero: React.FC = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Background Atmosphere Radial Glow */}
      <div className="hero-backdrop-glow"></div>

      <div className="hero-container">
        {/* Left Column: Clean Bio & Buttons */}
        <div className="hero-content">
          <span className="hero-eyebrow">Hello! I Am</span>

          <h1 className="hero-name">
            Prabin <br />
            Shah
          </h1>

          <div className="hero-decor-line"></div>

          <p className="hero-desc">
            A Civil Engineering professional and researcher from Kathmandu University, specializing in hydropower design, underground rock mechanics, structural drafting, and sustainable infrastructure — based in Lalitpur, Nepal.
          </p>

          <div className="hero-cta-group">
            <Link to="/contact" className="btn-hire-me">
              <Send size={15} />
              <span>Hire Me</span>
            </Link>
            <Link to="/experience" className="btn-see-work">
              <FileText size={15} />
              <span>See My Work →</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Studio Photo with Purple Glow & CEO Badge */}
        <div className="hero-visual">
          <div className="hero-purple-aura"></div>

          <div className="hero-image-wrap">
            <img
              src={prabinImg}
              alt="Prabin Shah - Civil & Hydropower Engineer"
              className="hero-profile-pic"
            />
          </div>

          {/* CEO & Founder Card Under Photo */}
          <div className="hero-founder-card photo-bottom-badge">
            <div className="founder-icon-box">
              <Building size={16} />
            </div>
            <div className="founder-text-details">
              <span className="founder-role-tag">CEO & FOUNDER</span>
              <span className="founder-company-name">Code & Concrete Construction Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
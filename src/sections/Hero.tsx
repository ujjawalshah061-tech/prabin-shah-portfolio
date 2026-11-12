import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Building, MapPin, GraduationCap } from "lucide-react";
import prabinImg from "../assets/images/prabin-shah.png";
import blueprintImg from "../assets/images/hero-blueprint.jpg";

const roles = [
  "Hydropower Designer",
  "Structural Drafter",
  "Founder & CEO",
];

const stats = [
  { value: 5, decimals: 0, label: "Hydropower projects", suffix: "+" },
  { value: 4, decimals: 0, label: "Industry roles", suffix: "" },
  { value: 40, decimals: 0, label: "MW site exposure", suffix: "" },
  { value: 6, decimals: 0, label: "Leadership posts", suffix: "+" },
];

const marquee = [
  "Civil 3D", "AutoCAD", "HEC-RAS", "SAP 2000", "SW_DTM", "SW_Road", "Primavera",
  "Hydropower Design", "BOQ Estimation",
];

function CountUp({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          setVal(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const Hero: React.FC = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  };
  const resetTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="hero" id="hero">
      {/* Background: blueprint photo + grid + aurora */}
      <div className="hero-bg" aria-hidden="true">
        <img src={blueprintImg} alt="" className="hero-bg-img" />
        <div className="hero-bg-grid" />
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="hero-bg-fade" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="chip chip-live reveal-on-scroll animate-in">
            <span className="live-dot" /> Available for hydropower &amp; structural projects
          </span>

          <p className="mono-label hero-hello">Hello, I&apos;m</p>
          <h1 className="hero-title">
            <span className="hero-title-line">Prabin</span>
            <span className="hero-title-line hero-title-grad">
              Shah<i>.</i>
            </span>
          </h1>

          <div className="hero-role" aria-live="polite">
                        <span key={roleIdx} className="hero-role-word">
              {roles[roleIdx]}
            </span>
          </div>

          <p className="hero-desc">
            Civil Engineering professional &amp; researcher from Kathmandu University, specializing in
            hydropower design, structural drafting and sustainable
            infrastructure — based in Lalitpur, Nepal.
          </p>

          <div className="hero-cta">
            <Link to="/contact" className="btn btn-primary">
              <span>Hire Me</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link to="/experience" className="btn btn-ghost">
              <span>See My Work</span>
            </Link>
            <a href="/prabin-resume.pdf" download="Prabin_Shah_CV.pdf" className="btn btn-icon" title="Download resume">
              <Download size={16} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="hero-stage"
            onPointerMove={onTilt}
            onPointerLeave={resetTilt}
          >
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
            <div className="hero-halo" />
            <div className="hero-portrait-clip">
              <img src={prabinImg} alt="Prabin Shah - Civil & Hydropower Engineer" className="hero-portrait" />
            </div>

            <div className="float-card fc-1">
              <span className="fc-ico"><Building size={15} /></span>
              <span>
                <b>CEO &amp; Founder</b>
                <small>Code &amp; Concrete Construction</small>
              </span>
            </div>
            <div className="float-card fc-3">
              <span className="fc-ico"><GraduationCap size={15} /></span>
              <span>
                <b>M.Sc. Construction Mgmt</b>
                <small>Nepal Engineering College</small>
              </span>
            </div>
            <div className="float-pin">
              <MapPin size={13} /> Lalitpur, NP
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        {stats.map((s) => (
          <div className="hero-stat" key={s.label}>
            <b>
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i}>
              {m}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

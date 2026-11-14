import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Building, MapPin, GraduationCap } from "lucide-react";
import blueprintImg from "../assets/images/hero-blueprint.jpg";
import { useContent } from "../content/ContentContext";
import { imgSrc } from "../content/images";

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

const cardIcons = [Building, GraduationCap];
const cardClasses = ["fc-1", "fc-3"];

const Hero: React.FC = () => {
  const { settings } = useContent();
  const roles = settings.heroRoles.length > 0 ? settings.heroRoles : [""];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

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

  const portrait = imgSrc(settings.portraitUrl, "prabin-shah.png", 1100);
  const marquee = settings.marquee;

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
            <span className="live-dot" /> {settings.availability}
          </span>

          <p className="mono-label hero-hello">{settings.heroGreeting}</p>
          <h1 className="hero-title">
            <span className="hero-title-line">{settings.firstName}</span>
            <span className="hero-title-line hero-title-grad">
              {settings.lastName}
              <i>.</i>
            </span>
          </h1>

          <div className="hero-role" aria-live="polite">
            <span key={roleIdx} className="hero-role-word">
              {roles[roleIdx % roles.length]}
            </span>
          </div>

          <p className="hero-desc">{settings.heroDescription}</p>

          <div className="hero-cta">
            <Link to="/contact" className="btn btn-primary">
              <span>Hire Me</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link to="/experience" className="btn btn-ghost">
              <span>See My Work</span>
            </Link>
            <a
              href={settings.resumeUrl || "/prabin-resume.pdf"}
              download="Prabin_Shah_CV.pdf"
              className="btn btn-icon"
              title="Download resume"
            >
              <Download size={16} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-stage" onPointerMove={onTilt} onPointerLeave={resetTilt}>
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
            <div className="hero-halo" />
            <div className="hero-portrait-clip">
              <img
                src={portrait}
                alt={`${settings.firstName} ${settings.lastName}`}
                className="hero-portrait"
              />
            </div>

            {settings.heroCards.slice(0, 2).map((card, i) => {
              const Icon = cardIcons[i % cardIcons.length];
              return (
                <div className={`float-card ${cardClasses[i % cardClasses.length]}`} key={`${card.title}-${i}`}>
                  <span className="fc-ico">
                    <Icon size={15} />
                  </span>
                  <span>
                    <b>{card.title}</b>
                    <small>{card.subtitle}</small>
                  </span>
                </div>
              );
            })}
            {settings.locationPin && (
              <div className="float-pin">
                <MapPin size={13} /> {settings.locationPin}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hero-stats">
        {settings.heroStats.map((s, i) => (
          <div className="hero-stat" key={`${s.label}-${i}`}>
            <b>
              <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
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

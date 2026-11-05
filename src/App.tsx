import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Milestones from "./sections/Milestones";
import EngineeringGallery from "./sections/EngineeringGallery";
import Experience from "./sections/Experience";
import Project from "./sections/Project";
import Contact from "./sections/Contact";

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

/** Reveals `.reveal-on-scroll` elements once as they enter the viewport. */
function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
}

/** Global pointer effects: cursor glow, card spotlight, scroll progress bar. */
function useGlobalFx() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--cx", `${e.clientX}px`);
      root.style.setProperty("--cy", `${e.clientY}px`);
      const spot = (e.target as HTMLElement | null)?.closest?.(".spot") as HTMLElement | null;
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onScroll = () => {
      const h = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--progress", h > 0 ? String(window.scrollY / h) : "0");
      root.style.setProperty("--sy", String(window.scrollY));
      root.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Milestones />
    <EngineeringGallery />
  </>
);

function AppContent() {
  const location = useLocation();
  useScrollReveal();
  useGlobalFx();

  const hideFooterRoutes = ["/contact", "/experience", "/service", "/services", "/project", "/projects"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="portfolio-app-root">
      <div className="fx-progress" aria-hidden="true" />
      <div className="fx-cursor" aria-hidden="true" />
      <div className="fx-grain" aria-hidden="true" />
      <ScrollHandler />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/project" element={<Project />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

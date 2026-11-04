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

function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      {
        threshold: 0.05,
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);
}

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Milestones />
      <EngineeringGallery />
    </>
  );
};

function AppContent() {
  const location = useLocation();
  useScrollReveal();

  const hideFooterRoutes = [
    "/contact",
    "/experience",
    "/service",
    "/services",
    "/project",
    "/projects",
  ];

  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="portfolio-app-root">
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
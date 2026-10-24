import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Milestones from "./sections/Milestones";
import EngineeringGallery from "./sections/EngineeringGallery";
import Experience from "./sections/Experience";
import Project from "./sections/Project";
import Contact from "./sections/Contact";

// Smooth scroll to top on normal route switch, ya hash links par scroll
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

// Home Page Component: Hero -> About -> Milestones -> Engineering Gallery
const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Milestones />
      <EngineeringGallery />
    </>
  );
};

function AppContent() {
  const location = useLocation();
  
  // Jin pages par Footer nahi chahiye unke routes ki list
  const hideFooterRoutes = [
    "/contact",
    "/experience",
    "/service",
    "/services",
    "/project",
    "/projects",
  ];

  // Agar current path list me hai toh Footer hide rahega
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="portfolio-app-root">
      <ScrollHandler />
      <Navbar />

      <Routes>
        {/* Home page containing Hero, About, Milestones, and Activity Gallery */}
        <Route path="/" element={<HomePage />} />
        
        {/* Direct routes */}
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
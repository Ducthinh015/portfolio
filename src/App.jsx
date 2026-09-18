import React from 'react';
import Canvas3D from './components/Canvas3D';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import VirtualTourSection from './components/VirtualTourSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#07090e', color: '#f8fafc' }}>
      {/* 3D Interactive Three.js Background */}
      <Canvas3D />

      {/* Header Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection />
        <VirtualTourSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

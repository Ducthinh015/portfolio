import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SystemArchitectureSection from './components/SystemArchitectureSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import AdminDashboardModal from './components/AdminDashboardModal';
import { INITIAL_PROJECTS } from './data/mockData';

export default function App() {
  const [isXray, setIsXray] = useState(false);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdminRoute = window.location.pathname === '/kechuabietso/thinh';

  // Load persisted projects from LocalStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('ducthinh_portfolio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
  }, []);

  if (isAdminRoute) {
    return (
      <AdminDashboardModal
        projects={projects}
        setProjects={setProjects}
        onClose={() => window.history.back()}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans text-slate-100 selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-500 ${isXray
      ? 'bg-[#02050e] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-[#02050e] to-[#010309]'
      : 'bg-[#030712] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#030712] to-[#02040a]'
      }`}>

      {/* Main Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navigation */}
        <Navbar
          isXray={isXray}
          setIsXray={setIsXray}
          isHidden={isModalOpen}
        />

        {/* Main Sections */}
        <main className="flex-1">
          <HeroSection isXray={isXray} setIsXray={setIsXray} />
          <SystemArchitectureSection />
          <SkillsSection onModalToggle={setIsModalOpen} />
          <ProjectsSection projects={projects} onModalToggle={setIsModalOpen} />
          <JourneySection />
          <ContactSection />
        </main>



      </div>
    </div>
  );
}

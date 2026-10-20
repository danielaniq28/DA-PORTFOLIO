import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProtonReLinkShowcase } from './components/ProtonReLinkShowcase';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col relative selection:bg-red-500/30 selection:text-red-200">
      {/* Top Apple-style Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-amber-500 origin-left z-50 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <ProtonReLinkShowcase />
        <CaseStudiesSection onSelectProject={(project) => setSelectedProject(project)} />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

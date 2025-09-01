import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import DesignPartnerSection from './components/DesignPartnerSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './contexts/AuthContext';

function PortfolioApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[90vh] relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <Navigation />
          
          <main className="px-8 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <HeroSection />
              <section id="about">
                <DesignPartnerSection />
              </section>
              <section id="skills">
                <SkillsSection />
              </section>
              <section id="projects">
                <ProjectsSection />
              </section>
              <section id="experience">
                <ExperienceSection />
              </section>
              <section id="education">
                <EducationSection />
              </section>
              <section id="pricing">
                <PricingSection />
              </section>
              <section id="faq">
                <FAQSection />
              </section>
              <section id="testimonials">
                <TestimonialsSection />
              </section>
              <section id="contact">
                <ContactSection />
              </section>
            </div>
          </main>
          
          <Footer />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 right-8 w-40 h-40 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-xl"></div>
      </motion.div>

      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioApp />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
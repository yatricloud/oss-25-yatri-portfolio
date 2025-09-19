import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navigation from './components/Navigation';
import DesignPartnerSection from './components/DesignPartnerSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';
import PortfolioViewer from './pages/PortfolioViewer';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { useSEO } from './hooks/useSEO';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';

function PortfolioApp() {
  useSEO(); // Initialize SEO updates
  useDynamicFavicon(); // Initialize dynamic favicon
  const location = useLocation();
  const isPreviewPage = location.pathname === '/preview';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="px-4 py-2 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden min-h-[90vh] relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <main className="px-4 py-8 md:px-8 md:py-16 lg:py-24">
              <div className="max-w-6xl mx-auto">
              <section id="about" aria-label="About Yatharth Chauhan">
                <DesignPartnerSection />
              </section>
              <section id="skills" aria-label="Technical Skills and Expertise">
                <SkillsSection />
              </section>
              <section id="projects" aria-label="Portfolio Projects">
                <ProjectsSection />
              </section>
              <section id="experience" aria-label="Work Experience">
                <ExperienceSection />
              </section>
              <section id="education" aria-label="Education and Certifications">
                <EducationSection />
              </section>
              <section id="faq" aria-label="Frequently Asked Questions">
                <FAQSection />
              </section>
              <section id="contact" aria-label="Contact Information">
                <ContactSection />
              </section>
              </div>
            </main>
            
            <Footer />
          </div>

          {/* Back to Dashboard Button - Only show on preview page */}
          {isPreviewPage && (
            <motion.a
              href="/login"
              className="fixed bottom-6 left-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2 z-50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </motion.a>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-1/4 right-8 w-40 h-40 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-xl"></div>
        </motion.div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
            <Router>
              <Routes>
                <Route path="/" element={<AdminPage />} />
                <Route path="/login" element={<AdminPage />} />
                <Route path="/preview" element={<PortfolioApp />} />
                <Route path="/portfolio/:deploymentId" element={<PortfolioViewer />} />
              </Routes>
            </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
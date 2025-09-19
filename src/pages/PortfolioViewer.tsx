import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, SUPABASE_AVAILABLE } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Loader, AlertCircle, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import DesignPartnerSection from '../components/DesignPartnerSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ProfileProvider } from '../contexts/ProfileContext';

const PortfolioViewer = () => {
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deploymentId) {
      setError('Deployment ID not provided');
      setLoading(false);
      return;
    }

    fetchPortfolioData();
  }, [deploymentId]);

  const fetchPortfolioData = async () => {
    if (!SUPABASE_AVAILABLE || !supabase) {
      setError('Database not configured');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching deployment with ID:', deploymentId);
      
      const { data, error } = await supabase
        .from('deployments')
        .select('profile_data, status, live_url')
        .eq('id', deploymentId)
        .single();

      console.log('Deployment query result:', { data, error });

      if (error) {
        console.error('Database error:', error);
        if (error.code === '42P01') {
          setError('Database table not found. Please run the SQL schema first.');
        } else {
          setError(`Database error: ${error.message}`);
        }
        setLoading(false);
        return;
      }

      if (!data) {
        setError('Portfolio not found');
        setLoading(false);
        return;
      }

      if (data.status !== 'ready') {
        setError('Portfolio is not ready yet. Please try again later.');
        setLoading(false);
        return;
      }

      if (data.profile_data) {
        setProfileData(data.profile_data);
      } else {
        setError('Portfolio data not available');
      }

    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Portfolio</h2>
          <p className="text-gray-600">Please wait while we load your portfolio...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Go Home</span>
          </a>
        </motion.div>
      </div>
    );
  }

  // Create a custom ProfileProvider with the deployment's profile data
  const CustomProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const profileContextValue = {
      profile: profileData ? {
        fullName: profileData.fullName || profileData.full_name,
        headline: profileData.headline,
        summary: profileData.summary,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        website: profileData.website,
        github: profileData.github,
        linkedin: profileData.linkedin,
        avatarUrl: profileData.avatar_url,
        resumePdfUrl: profileData.resume_pdf_url
      } : null,
      experiences: profileData?.experiences || [],
      educations: profileData?.educations || [],
      skills: profileData?.skills || [],
      projects: profileData?.projects || [],
      certifications: profileData?.certifications || [],
      refresh: async () => {},
      loading: false
    };

    return (
      <ProfileProvider value={profileContextValue}>
        {children}
      </ProfileProvider>
    );
  };

  return (
    <CustomProfileProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        
        <div className="p-4 md:p-8">
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
              <main className="px-8 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                  <section id="about" aria-label="About">
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

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-1/4 right-8 w-40 h-40 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </CustomProfileProvider>
  );
};

export default PortfolioViewer;

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ExperienceSection = () => {
  const { theme } = useTheme();

  const experiences = [
    {
      id: 1,
      company: 'TechCorp AI Solutions',
      position: 'Senior AI Engineer',
      duration: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading AI model development and deployment for enterprise clients.',
      achievements: ['35% model accuracy improvement', '60% faster inference time', 'Led team of 5 engineers'],
      current: true
    },
    {
      id: 2,
      company: 'DataFlow Analytics',
      position: 'Machine Learning Engineer',
      duration: '2020 - 2022',
      location: 'New York, NY',
      description: 'Built predictive models for financial markets and real-time data systems.',
      achievements: ['92% prediction accuracy', '1M+ transactions/sec pipeline', 'Automated model retraining'],
      current: false
    },
    {
      id: 3,
      company: 'StartupX',
      position: 'Full Stack Developer',
      duration: '2019 - 2020',
      location: 'Austin, TX',
      description: 'Built end-to-end web and mobile apps for early-stage startup.',
      achievements: ['10K+ users in 3 months', '99.9% uptime achieved', '80% faster deployments'],
      current: false
    },
    {
      id: 4,
      company: 'University Research Lab',
      position: 'Research Assistant',
      duration: '2018 - 2019',
      location: 'Boston, MA',
      description: 'Conducted NLP research and published papers on transformer architectures.',
      achievements: ['3 papers published', '15% BLEU score improvement', 'Mentored 5 students'],
      current: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div className="py-20 space-y-16">
      {/* Header */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 ${theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'} rounded-full`}></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            PROFESSIONAL JOURNEY
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Experience & Career Highlights
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From research labs to enterprise solutions, my journey spans across different domains of AI and software engineering.
        </p>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="group relative"
            variants={cardVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    {exp.current && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Current</span>
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                </div>
                
                <motion.div
                  className="w-10 h-10 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300"
                  whileHover={{ rotate: 45 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </motion.div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{exp.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{exp.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">{exp.description}</p>

              {/* Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exp.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-4 text-center group-hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="text-sm font-semibold text-gray-900">{achievement}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Line */}
            {index < experiences.length - 1 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-200 mt-4"></div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceSection;
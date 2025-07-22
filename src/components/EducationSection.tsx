import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ChevronDown, MapPin, Calendar, ExternalLink, Shield, Cloud, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const EducationSection = () => {
  const { theme } = useTheme();
  const [showCertifications, setShowCertifications] = useState(false);

  const education = [
    {
      id: 1,
      degree: 'Master of Science',
      field: 'Computer Science',
      specialization: 'AI & Machine Learning',
      school: 'Stanford University',
      duration: '2017 - 2019',
      location: 'Stanford, CA',
      gpa: '3.9/4.0',
      description: 'Specialized in deep learning, computer vision, and natural language processing.',
      achievements: [
        'Summa Cum Laude graduate',
        'Research published in NIPS and ICML',
        'Teaching Assistant for CS229',
        'Winner of Stanford AI Challenge 2019'
      ],
      courses: ['Deep Learning', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'Statistical Learning'],
      featured: true
    },
    {
      id: 2,
      degree: 'Bachelor of Science',
      field: 'Computer Engineering',
      specialization: 'Software Engineering & Data Structures',
      school: 'MIT',
      duration: '2013 - 2017',
      location: 'Cambridge, MA',
      gpa: '3.8/4.0',
      description: 'Strong foundation in computer science fundamentals and software engineering.',
      achievements: [
        'Dean\'s List for 6 semesters',
        'President of Computer Science Society',
        'Hackathon winner - MIT TechCrunch Disrupt',
        'Undergraduate Research Award'
      ],
      courses: ['Algorithms', 'Data Structures', 'Software Engineering', 'Database Systems', 'Computer Networks'],
      featured: false
    }
  ];

  const certifications = [
    {
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      year: '2024',
      level: 'Professional',
      credlyUrl: 'https://www.credly.com/badges/aws-certified-solutions-architect-professional',
      badgeImage: 'https://images.credly.com/size/340x340/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png',
      color: 'from-orange-500 to-orange-600',
      icon: Cloud,
      category: 'Cloud Architecture'
    },
    {
      name: 'Azure AI Engineer Associate',
      issuer: 'Microsoft',
      year: '2024',
      level: 'Associate',
      credlyUrl: 'https://www.credly.com/badges/microsoft-certified-azure-ai-engineer-associate',
      badgeImage: 'https://images.credly.com/size/340x340/images/61542181-0e8d-496c-a17c-3d4bf590eda1/azure-ai-engineer-associate-600x600.png',
      color: 'from-blue-500 to-blue-600',
      icon: Shield,
      category: 'Artificial Intelligence'
    },
    {
      name: 'Google Cloud Professional ML Engineer',
      issuer: 'Google Cloud',
      year: '2024',
      level: 'Professional',
      credlyUrl: 'https://www.credly.com/badges/google-cloud-certified-professional-machine-learning-engineer',
      badgeImage: 'https://images.credly.com/size/340x340/images/5c8fca38-b0d2-49e5-9ad2-f3f8e79b327f/image.png',
      color: 'from-green-500 to-green-600',
      icon: Database,
      category: 'Machine Learning'
    },
    {
      name: 'AWS Machine Learning Specialty',
      issuer: 'Amazon Web Services',
      year: '2023',
      level: 'Specialty',
      credlyUrl: 'https://www.credly.com/badges/aws-certified-machine-learning-specialty',
      badgeImage: 'https://images.credly.com/size/340x340/images/778bde6c-ad1c-4312-ac33-2fa40d50a147/image.png',
      color: 'from-purple-500 to-purple-600',
      icon: Shield,
      category: 'Machine Learning'
    },
    {
      name: 'Azure Data Scientist Associate',
      issuer: 'Microsoft',
      year: '2023',
      level: 'Associate',
      credlyUrl: 'https://www.credly.com/badges/microsoft-certified-azure-data-scientist-associate',
      badgeImage: 'https://images.credly.com/size/340x340/images/5c8fca38-b0d2-49e5-9ad2-f3f8e79b327f/azure-data-scientist-associate-600x600.png',
      color: 'from-cyan-500 to-cyan-600',
      icon: Database,
      category: 'Data Science'
    },
    {
      name: 'AWS Security Specialty',
      issuer: 'Amazon Web Services',
      year: '2023',
      level: 'Specialty',
      credlyUrl: 'https://www.credly.com/badges/aws-certified-security-specialty',
      badgeImage: 'https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png',
      color: 'from-red-500 to-red-600',
      icon: Shield,
      category: 'Security'
    }
  ];

  return (
    <div className="py-20 space-y-16">
      {/* Header */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Education &<br />Certifications
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Strong academic foundation from top universities combined with industry-recognized
          <br />certifications in cutting-edge technologies.
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="max-w-4xl mx-auto space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Main Card */}
            <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden">
              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${
                      theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                    } rounded-xl flex items-center justify-center`}>
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                        {edu.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{edu.field}</p>
                      <p className="text-sm text-gray-500">{edu.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">{edu.school}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{edu.description}</p>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Achievements */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-gray-900">Achievements</span>
                    </div>
                    <div className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Courses */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="font-semibold text-gray-900">Key Courses</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications Toggle */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button
          className="group flex items-center space-x-3 mx-auto bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => setShowCertifications(!showCertifications)}
        >
          <Award className="w-5 h-5" />
          <span>{showCertifications ? 'Hide' : 'View'} Professional Certifications ({certifications.length})</span>
          <motion.div
            animate={{ rotate: showCertifications ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.div>

      {/* Certifications Grid */}
      <AnimatePresence>
        {showCertifications && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Certifications Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Industry Certifications</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Verified credentials from leading cloud providers and technology companies
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={`${cert.name}-${index}`}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Certification Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group-hover:border-gray-300 relative">
                    
                    {/* Content */}
                    <div className="space-y-4">
                      {/* Header with Icon and Level */}
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <cert.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`bg-gradient-to-r ${cert.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                          {cert.level}
                        </span>
                      </div>

                      {/* Certification Info */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 text-base leading-tight">
                          {cert.name}
                        </h4>
                        <p className="text-gray-600 text-sm font-medium">{cert.issuer}</p>
                        <div className="flex items-center justify-between">
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {cert.category}
                          </span>
                          <span className="text-gray-500 text-sm font-medium">{cert.year}</span>
                        </div>
                      </div>

                      {/* View Badge Button */}
                      <motion.a
                        href={cert.credlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Badge</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Verification Note */}
            <motion.div
              className="text-center mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <Shield className="w-4 h-4" />
                <span className="text-sm">All certifications are verified and can be validated on their respective platforms</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationSection;
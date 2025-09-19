import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ChevronDown, ExternalLink, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';

const EducationSection = () => {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const [showCertifications, setShowCertifications] = useState(false);

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
        {(profile?.educations || []).map((edu, index) => (
          <motion.div
            key={`${edu.institution}-${index}`}
            className="group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">{edu.studyType || 'Education'}</h3>
              <div className="text-gray-700 font-medium">{edu.institution}</div>
              <div className="text-xs text-gray-500">
                {(edu.startDate || '')}{edu.endDate ? ` - ${edu.endDate}` : ''}
                {edu.score ? ` • ${edu.score}` : ''}
              </div>
              {edu.area && <div className="text-gray-600 text-sm">{edu.area}</div>}
              {Array.isArray(edu.courses) && edu.courses.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {edu.courses.slice(0,4).map((course, i) => (
                    <span key={`${course}-${i}`} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{course}</span>
                  ))}
                </div>
              )}
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
          <span>{showCertifications ? 'Hide' : 'View'} Professional Certifications ({(profile?.certifications || []).reduce((sum, c) => sum + c.items.length, 0)})</span>
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
                Pulled dynamically from your resume
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(profile?.certifications || []).flatMap((group) => group.items.map((item) => ({ name: item, issuer: group.provider }))).map((cert, index) => (
                <motion.div
                  key={`${cert.name}-${index}`}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Certification Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group-hover:border-gray-300 relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Shield className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 text-base leading-tight">
                        {cert.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationSection;
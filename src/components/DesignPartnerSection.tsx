import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useGitHubProfile } from '../hooks/useGitHubProfile';

const DesignPartnerSection = () => {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const { user, loading } = useGitHubProfile();
  const [showFullSummary, setShowFullSummary] = useState(false);

  return (
    <div className="text-center space-y-6 py-4">
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="relative">
          {/* Profile Image */}
          <motion.div
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={profile?.fullName || user.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-lg">{profile?.fullName || 'Profile'}</div>
              </div>
            )}
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${colors.primaryBg.replace('bg-', 'from-')}/20 via-transparent ${colors.primaryBg400.replace('bg-', 'to-')}/10`}></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {profile?.fullName ? `Hi, I'm ${profile.fullName}` : "About Me"}
        </h2>
        {profile?.summary && (
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
              {profile.summary.length > 200 && !showFullSummary
                ? `${profile.summary.substring(0, 200)}...` 
                : profile.summary
              }
            </p>
            {profile.summary.length > 200 && (
              <button 
                onClick={() => setShowFullSummary(!showFullSummary)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                {showFullSummary ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Local Time Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="pt-4"
      >
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Local Time — {new Date().toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
        </div>
      </motion.div>

      {/* Projects CTA and Availability below Local Time */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="pt-2"
      >
        <div className="flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <span>💼</span>
            <span>View My Projects</span>
          </a>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Available for new opportunities</span>
        </div>
      </motion.div>
    </div>
  );
};

export default DesignPartnerSection;
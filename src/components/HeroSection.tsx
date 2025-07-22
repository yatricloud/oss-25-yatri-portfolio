import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <div className="text-center space-y-8">
      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI Engineer &
          </motion.span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Software Developer
          </motion.span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-4xl mx-auto space-y-2"
      >
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          <span className="font-bold text-gray-900">Yatharth Chauhan</span> — Building Intelligent Solutions with AI & Machine Learning
        </p>
        <p className="text-xl md:text-2xl text-gray-700">
          Specializing in Full-Stack Development, Data Science & Computer Vision
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="pt-8"
      >
        <motion.button
          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 mx-auto"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`${
            theme === 'blue' ? 'bg-blue-500' : 'bg-green-500'
          } p-2 rounded-xl`}>
            <span className="text-white font-bold">💼</span>
          </div>
          <span>View My Projects</span>
        </motion.button>
      </motion.div>

      {/* Urgency Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="pt-4"
      >
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Available for new opportunities</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
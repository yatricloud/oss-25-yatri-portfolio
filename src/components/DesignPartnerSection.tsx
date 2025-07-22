import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const DesignPartnerSection = () => {
  const { theme } = useTheme();

  return (
    <div className="text-center space-y-8 py-16">
      {/* Orange dot indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-center space-x-2"
      >
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <span className="text-gray-600 font-medium">About Me</span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-2"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Hi, I'm Yatharth Chauhan
          <br />
          AI Engineer & Full-Stack Developer
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed pt-6">
          Passionate about creating intelligent solutions that solve real-world problems.
          <br />
          With expertise in AI/ML, full-stack development, and data science, I build
          <br />
          scalable applications that make a meaningful impact.
        </p>
      </motion.div>

      {/* Profile Image with Orange Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex justify-center pt-8"
      >
        <div className="relative">
          {/* Orange accent shape */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-full"
          ></motion.div>
          
          {/* Profile Image */}
          <motion.div
            className="relative w-64 h-80 rounded-3xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
              alt="Yatharth Chauhan - Design Partner"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'blue' ? 'from-blue-500/20 via-transparent to-blue-400/10' : 'from-orange-500/20 via-transparent to-orange-400/10'}`}></div>
          </motion.div>
        </div>
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
    </div>
  );
};

export default DesignPartnerSection;
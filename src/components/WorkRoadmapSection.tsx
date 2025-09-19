import React from 'react';
import { motion } from 'framer-motion';
import { Video, Users, FileText, CheckCircle, Brain, BarChart3, Target, Settings, Lightbulb, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const WorkRoadmapSection = () => {
  const { colors } = useTheme();

  const steps = [
    {
      id: 1,
      title: 'Meeting with You',
      description: "We'll have a quick online call to understand your goals and what you need.",
      bgGradient: '',
      icons: [
        { icon: Video, label: 'Google Meet', subtitle: 'Start in 30 minutes', bgColor: 'bg-white', textColor: 'text-gray-900' },
        { icon: Video, label: 'Zoom Meeting', subtitle: 'Start in 30 minutes', bgColor: 'bg-red-600', textColor: 'text-white' }
      ],
      flowElements: [
        { icon: Users, position: 'center' }
      ]
    },
    {
      id: 2,
      title: 'Notion Setup',
      description: "I'll create a Notion space for you to track everything—tasks, updates, contracts.",
      bgGradient: '',
      icons: [
        { icon: FileText, label: 'Received Project Brief', bgColor: 'bg-white', textColor: 'text-gray-900', hasCheck: true },
        { icon: CheckCircle, label: 'Setup Done It on Notion', bgColor: 'bg-white', textColor: 'text-gray-900', hasCheck: true }
      ],
      flowElements: [
        { icon: 'N', position: 'center', isLetter: true }
      ]
    },
    {
      id: 3,
      title: 'Deep Research',
      description: "I'll explore ideas and trends to make sure your design looks great and stands out.",
      bgGradient: '',
      tags: [
        'User Research', 'High Converting', 'Surveys', 'Analytics', 
        'Usability Tests', 'Work Process', 'Setup Moodboard', 'More Works'
      ],
      flowElements: [
        { icon: Brain, position: 'center' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="py-16 space-y-16">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Work Roadmap Indicator */}
        <motion.div
          className="flex items-center justify-center space-x-2"
          variants={headerVariants}
        >
          <div className={`w-2 h-2 ${colors.indicatorDot} rounded-full`}></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            WORK ROADMAP
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="space-y-4"
          variants={headerVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            A Simple Step-by-Step
            <br />
            Process That Gets Results
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Great design comes from a clear process. Here's the simple step-by-step
            <br />
            method I follow to create user-friendly, high-impact designs.
          </p>
        </motion.div>
      </motion.div>

      {/* Process Steps */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="space-y-6"
            variants={cardVariants}
          >
            {/* Step Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Remove background gradient */}
              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Step 1 - Meeting Icons */}
                {step.id === 1 && (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    {/* Google Meet */}
                    <motion.div
                      className="bg-white rounded-2xl p-4 flex items-center space-x-3 shadow-lg"
                      variants={iconVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Google Meet</div>
                        <div className="text-sm text-gray-600">Start in 30 minutes</div>
                      </div>
                    </motion.div>

                    {/* Flow Arrow */}
                    <motion.div
                      className="flex items-center space-x-2"
                      variants={iconVariants}
                    >
                      <div className="w-8 h-0.5 bg-white/60"></div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-8 h-0.5 bg-white/60"></div>
                    </motion.div>

                    {/* Zoom Meeting */}
                    <motion.div
                      className="bg-red-600 rounded-2xl p-4 flex items-center space-x-3 shadow-lg"
                      variants={iconVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="font-bold text-white">Zoom Meeting</div>
                        <div className="text-sm text-red-200">Start in 30 minutes</div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Step 2 - Notion Setup */}
                {step.id === 2 && (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    {/* Received Project Brief */}
                    <motion.div
                      className="bg-white rounded-2xl px-4 py-2 flex items-center space-x-2 shadow-lg"
                      variants={iconVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">Received Project Brief</span>
                    </motion.div>

                    {/* Flow with Notion Logo */}
                    <motion.div
                      className="flex items-center space-x-4"
                      variants={iconVariants}
                    >
                      <div className="w-8 h-0.5 bg-white/60"></div>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-gray-900">N</span>
                      </div>
                      <div className="w-8 h-0.5 bg-white/60"></div>
                    </motion.div>

                    {/* Setup Done */}
                    <motion.div
                      className="bg-white rounded-2xl px-4 py-2 flex items-center space-x-2 shadow-lg"
                      variants={iconVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">Setup Done It on Notion</span>
                    </motion.div>
                  </div>
                )}

                {/* Step 3 - Deep Research */}
                {step.id === 3 && (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    {/* Research Tags Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {step.tags?.slice(0, 6).map((tag, i) => (
                        <motion.div
                          key={tag}
                          className="bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-gray-900 text-center"
                          variants={iconVariants}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </motion.div>
                      ))}
                    </div>

                    {/* Central Brain Icon */}
                    <motion.div
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                      variants={iconVariants}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <Brain className={`w-8 h-8 ${colors.primaryText}`} />
                    </motion.div>

                    {/* Bottom Tags */}
                    <div className="grid grid-cols-2 gap-2">
                      {step.tags?.slice(6).map((tag, i) => (
                        <motion.div
                          key={tag}
                          className="bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-gray-900 text-center"
                          variants={iconVariants}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step Info */}
            <motion.div
              className="text-center space-y-3"
              variants={headerVariants}
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {step.id}. {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WorkRoadmapSection;
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PortfolioSection = () => {
  const { theme } = useTheme();

  const projects = [
    {
      id: 1,
      title: 'Logofolio 2025©',
      category: 'Bentofolio',
      year: '2025©',
      description: 'Bentofolio Collection',
      bgGradient: theme === 'blue' ? 'from-blue-500 via-blue-600 to-blue-400' : 'from-orange-500 via-orange-600 to-orange-400',
      textColor: 'text-white',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Fivestar',
      category: 'Branding',
      year: '2025©',
      description: 'Fivestar Brand Identity',
      bgGradient: theme === 'blue' ? 'from-blue-400 via-blue-500 to-blue-600' : 'from-orange-400 via-orange-500 to-orange-600',
      textColor: 'text-white',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="py-16 space-y-16">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Feature Project Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 ${theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'} rounded-full`}></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            FEATURE PROJECT
          </span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Explore Deeply Top
            <br />
            Selected Design Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore some of my top projects and see how my design can improve your
            <br />
            business and help you stand out in a competitive market.
          </p>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group cursor-pointer"
            variants={cardVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Card */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Remove background gradient */}
              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="text-gray-600 text-sm font-medium">
                      {project.year}
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-bold ${project.textColor} leading-tight`}>
                      {project.title}
                    </h3>
                  </div>
                  {index === 1 && (
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Brand Identity
                    </div>
                  )}
                </div>

                {/* Middle Section - Logo/Brand Element */}
                <div className="flex-1 flex items-center justify-center">
                  {index === 0 ? (
                    <div className="text-center">
                      <div className="border border-gray-300 rounded-full px-6 py-2 text-gray-600 text-sm font-medium mb-8">
                        {project.description}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
                        ⭐ Fivestar
                      </div>
                      <div className="border border-gray-300 rounded-full px-6 py-2 text-gray-600 text-sm font-medium">
                        {project.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="text-gray-600 text-sm">
                  {project.year}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Project Info */}
            <motion.div
              className="flex items-center justify-between mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 ${theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'} rounded-full`}></div>
                <span className="font-bold text-gray-900">{project.title}</span>
                <span className="text-gray-600">{project.category}</span>
              </div>
              
              <motion.div
                className={`w-10 h-10 ${theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'} rounded-full flex items-center justify-center text-white cursor-pointer`}
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PortfolioSection;
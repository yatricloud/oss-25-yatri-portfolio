import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Globe, Smartphone, Database, Star, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ProjectsSection = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI/ML', 'Web Apps', 'Mobile', 'Data Science'];

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Content Generator',
      category: 'AI/ML',
      description: 'Advanced NLP model that generates high-quality content using transformer architecture. Integrated with modern web interface.',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Real-time Analytics Dashboard',
      category: 'Web Apps',
      description: 'Interactive dashboard with real-time data visualization, WebSocket connections, and advanced filtering capabilities.',
      technologies: ['React', 'Node.js', 'D3.js', 'WebSocket', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      icon: Globe,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Smart Fitness Tracker App',
      category: 'Mobile',
      description: 'Cross-platform mobile app with AI-powered workout recommendations and progress tracking using machine learning.',
      technologies: ['React Native', 'Python', 'TensorFlow Lite', 'Firebase'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      icon: Smartphone,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Predictive Market Analysis',
      category: 'Data Science',
      description: 'Machine learning pipeline for stock market prediction using multiple data sources and ensemble methods.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Apache Airflow', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      icon: Database,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Computer Vision Object Detection',
      category: 'AI/ML',
      description: 'Real-time object detection system using YOLO architecture with custom training pipeline and web interface.',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'Flask', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      icon: Brain,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: 'E-commerce Platform',
      category: 'Web Apps',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      technologies: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      icon: Globe,
      gradient: 'from-teal-500 to-blue-500'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
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
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            FEATURED PROJECTS
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Projects That Showcase
          <br />
          My Technical Expertise
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          From AI-powered applications to full-stack web solutions, explore my portfolio
          <br />
          of innovative projects that solve real-world problems.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-gray-100 rounded-full p-1 flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              layout
            >
              {/* Main Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Header with Gradient */}
                <div className={`relative h-32 bg-gradient-to-br ${project.gradient} p-6 flex items-center justify-between`}>
                  {/* Category Badge */}
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div 
                      className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>FEATURED</span>
                    </motion.div>
                  )}

                  {/* Project Icon */}
                  <div className="absolute bottom-4 right-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-3">
                      <motion.a
                        href={project.liveUrl}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    </div>

                    <motion.div
                      className="w-8 h-8 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button
          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
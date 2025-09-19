import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, Calendar, ArrowUpRight, RefreshCw, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { ProjectsSkeleton } from './ProjectSkeleton';
import { ProcessedProject } from '../services/githubService';

const ProjectsSection = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const {
    projects,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProjects,
    refreshProjects,
    showMore,
    setShowMore,
    displayedProjects,
    hasMoreProjects
  } = useGitHubProjects(user?.id);

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
        ease: "easeOut" as const,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  const ProjectCard = ({ project }: { project: ProcessedProject }) => (
    <motion.div
      className="group relative"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      layout
    >
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

          {/* Language Icon */}
          <div className="absolute bottom-4 right-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {project.language ? project.language.substring(0, 2).toUpperCase() : 'NA'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(project.lastUpdated)}</span>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
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
  );

  if (error) {
    return (
      <div className="py-20 space-y-16">
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
        </motion.div>

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-red-500">
            <AlertCircle className="w-6 h-6" />
            <span className="text-lg font-medium">Failed to load projects</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {error}. Please check your internet connection and try again.
          </p>
          <motion.button
            onClick={refreshProjects}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </motion.button>
        </div>
      </div>
    );
  }

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
        
        {/* GitHub Stats */}
        {!loading && projects.length > 0 && (
          <motion.div
            className="flex items-center justify-center space-x-6 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>{projects.length} repositories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-current text-yellow-500" />
              <span>{projects.reduce((sum, p) => sum + p.stars, 0)} total stars</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitFork className="w-5 h-5" />
              <span>{projects.reduce((sum, p) => sum + p.forks, 0)} total forks</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Category Filter */}
      {!loading && categories.length > 1 && (
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
      )}

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <ProjectsSkeleton count={6} />
        ) : (
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show More/Less Button */}
      {!loading && hasMoreProjects && (
        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>
              {showMore 
                ? `Show Less (${filteredProjects.length - 6} hidden)` 
                : `Show More (${filteredProjects.length - 6} more projects)`
              }
            </span>
            {showMore ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </motion.button>
        </motion.div>
      )}

      {/* No Projects Message */}
      {!loading && filteredProjects.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-600 text-lg">
            No projects found in the {selectedCategory} category.
          </p>
        </motion.div>
      )}

      {/* Bottom CTA */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.a
          href="https://github.com/YatharthChauhan2362"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1 mx-auto inline-block"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github className="w-5 h-5" />
          <span>View All Projects on GitHub</span>
          <ArrowUpRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
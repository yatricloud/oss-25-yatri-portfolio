import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="text-center space-y-10">
      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pt-2 flex items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>💼</span>
          <span>View My Projects</span>
        </a>
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Available for new opportunities</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TrustedFounders = () => {
  const { theme } = useTheme();

  const founders = [
    { id: 1, image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 2, image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 3, image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 4, image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 5, image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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
    <motion.div 
      className="flex flex-col items-center space-y-4 mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center -space-x-2">
        {founders.map((founder, index) => (
          <motion.div
            key={founder.id}
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.1, zIndex: 10 }}
          >
            <img
              src={founder.image}
              alt={`Founder ${founder.id}`}
              className="w-12 h-12 rounded-full border-3 border-white shadow-lg object-cover"
            />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="flex items-center space-x-2 text-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Star className={`w-5 h-5 ${
          theme === 'blue' ? 'text-blue-500' : 'text-yellow-500'
        } fill-current`} />
        <span className="font-medium">Trusted By 49+ Founders</span>
      </motion.div>
    </motion.div>
  );
};

export default TrustedFounders;
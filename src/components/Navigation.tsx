import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const { theme } = useTheme();
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between w-full px-8 py-6"
    >
      {/* Logo */}
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src="https://raw.githubusercontent.com/yatricloud/yatri-images/refs/heads/main/Logo/yatricloud-round-transparent.png"
          alt="Yatri Cloud Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-bold text-gray-900">Yatri Portfolio</span>
      </motion.div>

      {/* Navigation Items */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            {item.name}
          </motion.a>
        ))}
        
        <motion.button
          className={`${
            theme === 'blue' 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-orange-500 hover:bg-orange-600'
          } text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Projects
        </motion.button>
      </div>
      {/* Mobile Menu Button */}
      <motion.button 
        className="md:hidden p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </div>
      </motion.button>
    </motion.nav>
  );
};

export default Navigation;
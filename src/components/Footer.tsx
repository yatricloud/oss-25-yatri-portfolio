import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  const footerLinks = {
    services: [
      { name: 'Website Design', href: '#' },
      { name: 'Framer Development', href: '#' },
      { name: 'Brand Design', href: '#' },
      { name: 'Logo Design', href: '#' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Portfolio', href: '#' },
      { name: 'Process', href: '#' },
      { name: 'Reviews', href: '#' }
    ],
    resources: [
      { name: 'FAQ', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Book Meeting', href: '#' }
    ]
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        className="max-w-7xl mx-auto px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              variants={logoVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${
                theme === 'blue' 
                  ? 'from-blue-500 to-blue-600' 
                  : 'from-orange-500 to-red-500'
              } rounded-full flex items-center justify-center`}>
                <User className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">Yatharth Chauhan</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Official Website Design Expert helping founders create high-converting websites with exceptional design and user experience.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Available for new projects</span>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              className="flex items-center space-x-2 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <span>© 2025 Tanvir. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>with passion</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6 text-sm text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.a
                href="#"
                className="hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Cookie Policy
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
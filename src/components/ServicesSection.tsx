import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Linkedin, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ServicesSection = () => {
  const { colors } = useTheme();

  const services = [
    {
      id: '01',
      title: 'Website Design',
      description: 'Web Design, Web App Design',
      icon: '🎨',
      bgColor: 'bg-white',
    },
    {
      id: '02',
      title: 'Framer Website',
      description: 'Landing Page, SaaS, AI, Startups',
      icon: '🌐',
      bgColor: 'bg-white',
    },
    {
      id: '03',
      title: 'Brand Design',
      description: 'Logo Design, Brand Guideline',
      icon: '✨',
      bgColor: 'bg-white',
    },
  ];

  const socialIcons = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { name: 'X', icon: 'X', color: 'bg-black', hoverColor: 'hover:bg-gray-800' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
    { name: 'Gmail', icon: 'M', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { name: 'Telegram', icon: Send, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const socialVariants = {
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
      {/* Services Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`${service.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Service Number */}
            <div className="text-6xl font-bold text-gray-200 mb-4">
              {service.id}
            </div>

            {/* Service Icon */}
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white text-xl">
                {service.icon}
              </div>
            </div>

            {/* Service Content */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-600 font-medium">
                {service.description}
              </p>
            </div>

            {/* Hover Effect Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientSoft} opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Messaging Section */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {/* Quick Messaging Header */}
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <span className="font-medium">Quick Messaging</span>
        </div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center space-x-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialIcons.map((social, index) => (
            <motion.a
              key={social.name}
              href="#"
              className={`w-14 h-14 ${social.color} ${social.hoverColor} rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              variants={socialVariants}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon === 'X' ? (
                <span className="font-bold text-lg">𝕏</span>
              ) : social.icon === 'M' ? (
                <span className="font-bold text-lg">M</span>
              ) : (
                <social.icon className="w-6 h-6" />
              )}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesSection;
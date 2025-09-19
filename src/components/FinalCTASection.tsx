import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Linkedin, Send, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const FinalCTASection = () => {
  const { colors } = useTheme();

  const tools = [
    {
      name: 'Figma',
      icon: '🎨',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-900'
    },
    {
      name: 'Illustrator',
      icon: 'Ai',
      bgColor: 'bg-orange-600',
      textColor: 'text-white'
    },
    {
      name: 'Framer',
      icon: 'F',
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      name: 'Figma',
      icon: '🎨',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-900'
    }
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      name: 'X',
      icon: 'X',
      bgColor: 'bg-black',
      hoverColor: 'hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'Gmail',
      icon: Mail,
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      name: 'Telegram',
      icon: Send,
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    }
  ];

  const founders = [
    { id: 1, image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 2, image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 3, image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
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

  const toolVariants = {
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

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const founderVariants = {
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
    <div className="py-16 space-y-16 text-center">
      {/* Tool Icons */}
      <motion.div
        className="flex items-center justify-center space-x-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={`${tool.name}-${index}`}
            className={`w-16 h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}
            variants={toolVariants}
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {tool.icon === 'Ai' ? (
              <span className={`text-xl font-bold ${tool.textColor}`}>Ai</span>
            ) : tool.icon === 'F' ? (
              <span className={`text-xl font-bold ${tool.textColor}`}>F</span>
            ) : (
              <span className="text-2xl">{tool.icon}</span>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Headline */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
          variants={headerVariants}
        >
          Let's Build Your
          <br />
          Website and Publish
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          variants={headerVariants}
        >
          Get Framer Expert's support to build and publish your website
        </motion.p>
      </motion.div>

      {/* CTA Button with Profile */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.button
          className={`bg-gradient-to-r ${
            `${colors.gradientStrong} ${colors.gradientStrongHover}`
          } text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3`}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
            alt="Yatharth Chauhan"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>Book Free Consultation</span>
        </motion.button>
      </motion.div>

      {/* Founders Section */}
      <motion.div
        className="flex flex-col items-center space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center -space-x-2">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              className="relative"
              variants={founderVariants}
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
          className="text-gray-600 font-medium"
          variants={headerVariants}
        >
          49+ Project Done, Next You?
        </motion.div>
      </motion.div>

      {/* Quick Messaging Section */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Quick Messaging Header */}
        <motion.div
          className="flex items-center justify-center space-x-2 text-gray-600"
          variants={headerVariants}
        >
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <span className="font-medium">Quick Messaging</span>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center space-x-4"
          variants={containerVariants}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href="#"
              className={`w-16 h-16 ${social.bgColor} ${social.hoverColor} rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              variants={socialVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon === 'X' ? (
                <span className="font-bold text-xl">𝕏</span>
              ) : typeof social.icon === 'string' ? (
                <span className="font-bold text-xl">{social.icon}</span>
              ) : (
                <social.icon className="w-7 h-7" />
              )}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalCTASection;
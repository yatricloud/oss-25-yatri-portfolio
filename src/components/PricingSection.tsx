import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PricingSection = () => {
  const { colors } = useTheme();

  const plans = [
    {
      id: 'landing',
      icon: '🧩',
      title: 'Landing Page',
      subtitle: 'Best Value for High-Converting Website',
      price: '$740',
      originalPrice: null,
      description: '/ Figma Design',
      addOn: {
        name: 'Add Framer Dev',
        price: '$840',
        enabled: false
      },
      testimonial: {
        name: 'Paul Wachu',
        position: 'Founder at Pagapol',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 5,
        content: 'Working with Yatharth Chauhan was an absolute joy. His ability to capture and bring to life my ideas into visually was amazing for exceptional job.',
        verified: true
      },
      features: [
        '2 Week Delivery + Revision Included',
        'Motion Design Included',
        '100% Money-Back Guarantee',
        'Desktop, Tablet, Mobile Responsive',
        'Video Support & Framer Using Guide',
        'Unlimited Revisions'
      ],
      buttonText: 'Book Free Consultation',
      buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white',
      cardStyle: 'bg-white border border-gray-200'
    },
    {
      id: 'multipage',
      icon: '🔲',
      title: 'Multi Page',
      subtitle: 'Best Value for Growing Business Website',
      price: '$960',
      originalPrice: null,
      description: '/ Figma Design',
      addOn: {
        name: 'Add Framer Dev',
        price: '$980',
        enabled: true
      },
      testimonial: {
        name: 'Matalon',
        position: 'Founder at Clymb',
        avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 5,
        content: 'He worked really hard to make sure I was satisfied. Even provided additional work & made everything easy for me.',
        verified: true
      },
      features: [
        '3 Week Delivery + Revision Included',
        'Home Page + 3 Pages = 4 Pages',
        '100% Money-Back Guarantee',
        'Desktop, Tablet, Mobile Responsive',
        'Video Support & Framer Using Guide',
        'Unlimited Revisions'
      ],
      buttonText: 'Book Free Consultation',
      buttonStyle: 'bg-orange-500 hover:bg-orange-600 text-white',
      cardStyle: 'bg-gray-900 text-white',
      featured: true
    }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div className="py-16 space-y-16 bg-gray-50">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Urgency Badge */}
        <motion.div
          className="flex items-center justify-center"
          variants={headerVariants}
        >
          <div className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Only 1 Spot Left for this Month</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="space-y-4"
          variants={headerVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Simple Pricing Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your perfect website is just a click away. Simple plans to get you started.
          </p>
        </motion.div>

        {/* Plan Toggle */}
        <motion.div
          className="flex items-center justify-center"
          variants={headerVariants}
        >
          <div className="bg-gray-900 rounded-full p-1 flex">
            <button className="px-6 py-2 rounded-full font-medium bg-orange-500 text-white">
              Website
            </button>
            <button className="px-6 py-2 rounded-full font-medium text-gray-400 hover:text-white">
              Branding
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`${plan.cardStyle} rounded-3xl p-8 shadow-lg relative overflow-hidden`}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card Header */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{plan.icon}</div>
                <div>
                  <h3 className={`text-2xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.title}
                  </h3>
                  <p className={`text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.subtitle}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.description}
                  </span>
                </div>
              </div>

              {/* Add-on Toggle */}
              <motion.div
                className={`flex items-center justify-between p-3 rounded-xl ${
                  plan.featured ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">F</span>
                  </div>
                  <div>
                    <span className={`font-medium ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                      {plan.addOn.name}
                    </span>
                    <span className={`ml-2 ${plan.featured ? 'text-white' : 'text-orange-500'}`}>
                      {plan.addOn.price}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                  plan.addOn.enabled ? 'bg-orange-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
                    plan.addOn.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial */}
            <div className={`p-4 rounded-2xl mb-6 ${
              plan.featured ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-start space-x-3 mb-3">
                <img
                  src={plan.testimonial.avatar}
                  alt={plan.testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-sm ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                      {plan.testimonial.name}
                    </span>
                    {plan.testimonial.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <p className={`text-xs ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.testimonial.position}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(plan.testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-orange-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${plan.featured ? 'text-gray-300' : 'text-gray-700'}`}>
                {plan.testimonial.content}
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              className={`w-full ${plan.buttonStyle} py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 mb-6`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{plan.buttonText}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Features List */}
            <div className="space-y-3">
              {plan.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                >
                  <div className={`w-5 h-5 ${
                    plan.featured ? 'bg-white' : 'bg-orange-500'
                  } rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Check className={`w-3 h-3 ${plan.featured ? 'text-gray-900' : 'text-white'}`} />
                  </div>
                  <span className={`text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-700'}`}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="font-medium">Get Free Strategy Session</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingSection;
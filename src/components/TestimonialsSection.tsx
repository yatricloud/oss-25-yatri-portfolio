import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      number: '02',
      title: 'Highly Recommend His Services',
      content: "Deciding to work with Tanvir was the best decision ever. He is meticulous, talented, patient and really knows how to bring one's vision to life. Thank you so much. Highly recommend his services.",
      author: 'Katlego Sekete',
      position: 'CEO at Baadaye Agency',
      rating: 5,
      projectImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      number: '01',
      title: 'Outstanding Design Quality',
      content: "Working with Yatharth has been an incredible experience. His attention to detail and creative vision transformed our brand completely. The results exceeded our expectations.",
      author: 'Sarah Johnson',
      position: 'Founder at TechStart',
      rating: 5,
      projectImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      number: '03',
      title: 'Professional & Creative',
      content: "Yatharth delivered exactly what we needed for our startup. His design skills and professional approach made the entire process smooth and enjoyable.",
      author: 'Michael Chen',
      position: 'Co-founder at InnovateLab',
      rating: 5,
      projectImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="py-16 space-y-16 bg-gray-50">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Trusted by Founders Indicator */}
        <motion.div
          className="flex items-center justify-center"
          variants={headerVariants}
        >
          <div className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600 font-medium text-sm">TRUSTED BY FOUNDERS</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="space-y-4"
          variants={headerVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Real Feedback From Real
            <br />
            Awesome Founders
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Read what real founders say about working with me — authentic feedback, real
            <br />
            results and experiences that speak for themselves.
          </p>
        </motion.div>
      </motion.div>

      {/* Testimonial Card */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Project Image Side */}
              <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8 flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-500/20 to-blue-600/20"></div>
                
                {/* Project Mockup */}
                <div className="relative z-10 flex items-center justify-center space-x-6">
                  {/* Mobile Mockup */}
                  <div className="bg-black rounded-3xl p-2 shadow-2xl transform -rotate-12 hover:rotate-6 transition-transform duration-500">
                    <div className="bg-white rounded-2xl overflow-hidden w-56 h-96">
                      <div className="bg-gray-100 h-6 flex items-center justify-center space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="text-xs font-bold text-gray-900">DIGITAL MARKETING AGENCY</div>
                        <div className="text-lg font-bold text-gray-900 leading-tight">
                          Doing Little Changes Make Big Difference
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          We are a boutique digital marketing, media and technology agency that works with forward-thinking brands in Africa and throughout the world to help them connect honestly in order to expand their reach and influence.
                        </div>
                        <div className="flex space-x-2">
                          <div className="bg-gray-900 text-white px-3 py-1 rounded text-xs">CONTACT US</div>
                          <div className="border border-gray-300 px-3 py-1 rounded text-xs">CONTACT US</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Mockup */}
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-96 h-72 transform rotate-6 hover:-rotate-3 transition-transform duration-500">
                    <div className="bg-gray-100 h-6 flex items-center px-3 space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="bg-green-600 h-12 rounded flex items-center px-4">
                        <div className="text-white text-sm font-medium">Digital Marketing Agency</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        Doing Little Changes Make Big Difference
                      </div>
                      <div className="text-xs text-gray-600">
                        We are a boutique digital marketing, media and technology agency...
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <div className="bg-gray-900 text-white px-3 py-1 rounded text-xs">CONTACT US</div>
                        <div className="border border-gray-300 px-3 py-1 rounded text-xs">CONTACT US</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                {/* Large Quote Mark */}
                <div className="absolute top-8 right-8 text-8xl text-orange-200 font-serif leading-none">"</div>
                
                {/* Testimonial Number */}
                <div className="absolute top-8 right-16 text-8xl font-bold text-gray-100 leading-none">
                  {current.number}
                </div>

                <div className="space-y-8">
                  {/* Testimonial Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {current.title}
                  </h3>

                  {/* Testimonial Content */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {current.content}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="relative">
                      <img
                        src={current.avatar}
                        alt={current.author}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg">{current.author}</div>
                      <div className="text-gray-600">{current.position}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-800 transition-colors duration-200 z-10"
          onClick={prevTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-800 transition-colors duration-200 z-10"
          onClick={nextTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
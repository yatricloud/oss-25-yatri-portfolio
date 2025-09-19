import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, Globe, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const BookingSection = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedTime, setSelectedTime] = useState('');

  // Calendar data for July 2025
  const calendarDays = [
    { date: 1, day: 'TUE', available: true },
    { date: 2, day: 'WED', available: true },
    { date: 3, day: 'THU', available: true },
    { date: 4, day: 'FRI', available: true },
    { date: 5, day: 'SAT', available: false },
    { date: 6, day: 'SUN', available: false },
    { date: 7, day: 'MON', available: true },
    { date: 8, day: 'TUE', available: true },
    { date: 9, day: 'WED', available: true },
    { date: 10, day: 'THU', available: true },
    { date: 11, day: 'FRI', available: true },
    { date: 12, day: 'SAT', available: false },
    { date: 13, day: 'SUN', available: false },
    { date: 14, day: 'MON', available: true },
    { date: 15, day: 'TUE', available: true },
    { date: 16, day: 'WED', available: true },
    { date: 17, day: 'THU', available: true },
    { date: 18, day: 'FRI', available: true },
    { date: 19, day: 'SAT', available: false },
    { date: 20, day: 'SUN', available: false },
    { date: 21, day: 'MON', available: true },
    { date: 22, day: 'TUE', available: true },
    { date: 23, day: 'WED', available: true },
    { date: 24, day: 'THU', available: true },
    { date: 25, day: 'FRI', available: true },
    { date: 26, day: 'SAT', available: false },
    { date: 27, day: 'SUN', available: false },
    { date: 28, day: 'MON', available: true },
    { date: 29, day: 'TUE', available: true },
    { date: 30, day: 'WED', available: true },
    { date: 31, day: 'THU', available: true },
  ];

  const timeSlots = [
    '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', 
    '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm'
  ];

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

  const calendarVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const timeSlotVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div className="py-16 space-y-16">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Get Free Strategy Session Badge */}
        <motion.div
          className="flex items-center justify-center"
          variants={headerVariants}
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="font-medium">Get Free Strategy Session</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="space-y-4"
          variants={headerVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Book Free{' '}
            <span className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
              <span>Google</span>
            </span>
            <br />
            <span className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📹</span>
              </div>
              <span>Zoom Meeting</span>
            </span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Booking Interface */}
      <motion.div
        className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left Panel - Meeting Info */}
          <motion.div
            className="p-8 bg-gray-50 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Profile */}
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Yatharth Chauhan"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900">Yatharth Chauhan</h3>
              </div>
            </div>

            {/* Meeting Title */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Meeting with Yatharth Chauhan
              </h4>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-500 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white p-4 rounded-xl">
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                "Yatharth delivered excellent work & was super patient with me till I was happy with the results. Will come again"
              </p>
              <p className="text-gray-900 font-bold text-sm">— Matalon</p>
            </div>

            {/* Meeting Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">30m</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">2 location options</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Asia/Kolkata</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Calendar */}
          <motion.div
            className="p-8"
            variants={calendarVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">July 2025</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Calendar Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <motion.button
                  key={day.date}
                  className={`
                    aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
                    ${day.date === selectedDate 
                      ? `${colors.primaryBg} text-white shadow-lg`
                      : day.available 
                        ? 'hover:bg-gray-100 text-gray-900' 
                        : 'text-gray-300 cursor-not-allowed'
                    }
                  `}
                  onClick={() => day.available && setSelectedDate(day.date)}
                  disabled={!day.available}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.02,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={day.available ? { scale: 1.1 } : {}}
                  whileTap={day.available ? { scale: 0.95 } : {}}
                >
                  {day.date}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Panel - Time Slots */}
          <motion.div
            className="p-8 bg-gray-50 border-l border-gray-200"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Time Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Wed 23</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  12h
                </button>
                <button className="px-3 py-1 bg-gray-900 text-white rounded-lg text-sm font-medium">
                  24h
                </button>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {timeSlots.map((time, index) => (
                <motion.button
                  key={time}
                  className={`
                    w-full p-3 text-left rounded-xl font-medium transition-all duration-200
                    ${selectedTime === time 
                      ? `${colors.primaryBg} text-white shadow-lg`
                      : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
                    }
                  `}
                  onClick={() => setSelectedTime(time)}
                  variants={timeSlotVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Branding */}
        <motion.div
          className="bg-gray-900 text-white text-center py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <span className="font-bold text-lg">Cal.com</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSection;
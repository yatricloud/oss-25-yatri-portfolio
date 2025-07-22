import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorPalettes = [
    {
      id: 'blue',
      name: 'Ocean Blue',
      colors: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'],
      gradient: 'from-blue-400 via-blue-500 to-blue-600'
    },
    {
      id: 'orange',
      name: 'Sunset Orange',
      colors: ['#F97316', '#EA580C', '#DC2626', '#B91C1C'],
      gradient: 'from-orange-400 via-orange-500 to-red-500'
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      colors: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'],
      gradient: 'from-purple-400 via-purple-500 to-purple-600'
    },
    {
      id: 'green',
      name: 'Forest Green',
      colors: ['#10B981', '#059669', '#047857', '#065F46'],
      gradient: 'from-emerald-400 via-emerald-500 to-emerald-600'
    }
  ];

  const togglePalette = () => {
    setIsOpen(!isOpen);
  };

  const selectPalette = (paletteId: string) => {
    if (paletteId !== theme) {
      toggleTheme();
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Main Toggle Button */}
      <motion.button
        onClick={togglePalette}
        className="relative w-16 h-16 bg-white shadow-2xl rounded-2xl flex items-center justify-center border border-gray-200 hover:shadow-3xl transition-all duration-300 overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {/* Animated Border */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${
            theme === 'blue' ? 'from-blue-500 via-purple-500 to-orange-500' : 'from-orange-500 via-red-500 to-purple-500'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          animate={{
            background: [
              'linear-gradient(0deg, #3B82F6, #8B5CF6, #F97316)',
              'linear-gradient(90deg, #8B5CF6, #F97316, #10B981)',
              'linear-gradient(180deg, #F97316, #10B981, #3B82F6)',
              'linear-gradient(270deg, #10B981, #3B82F6, #8B5CF6)',
              'linear-gradient(360deg, #3B82F6, #8B5CF6, #F97316)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Content */}
        <div className="relative z-10 bg-white rounded-xl w-14 h-14 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Palette className="w-7 h-7 text-gray-700" />
          </motion.div>
          
          {/* Active Theme Indicator */}
          <motion.div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${
              theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
            } border-2 border-white shadow-lg`}
            animate={{ 
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.4)',
                '0 0 0 8px rgba(59, 130, 246, 0)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* Color Palette Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-20 right-0 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 min-w-[280px]"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Color Palette</h3>
              <p className="text-sm text-gray-600">Choose your preferred theme</p>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-2 gap-4">
              {colorPalettes.map((palette, index) => (
                <motion.button
                  key={palette.id}
                  onClick={() => selectPalette(palette.id)}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Palette Container */}
                  <div className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    theme === palette.id 
                      ? 'border-gray-900 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    {/* Animated Border for Active */}
                    {theme === palette.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(45deg, ${palette.colors.join(', ')})`,
                          padding: '2px'
                        }}
                        animate={{
                          background: [
                            `linear-gradient(0deg, ${palette.colors.join(', ')})`,
                            `linear-gradient(90deg, ${palette.colors.join(', ')})`,
                            `linear-gradient(180deg, ${palette.colors.join(', ')})`,
                            `linear-gradient(270deg, ${palette.colors.join(', ')})`,
                            `linear-gradient(360deg, ${palette.colors.join(', ')})`
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <div className="w-full h-full bg-white rounded-xl" />
                      </motion.div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 space-y-3">
                      {/* Color Squares */}
                      <div className="grid grid-cols-4 gap-1">
                        {palette.colors.map((color, colorIndex) => (
                          <motion.div
                            key={colorIndex}
                            className="aspect-square rounded-lg shadow-sm"
                            style={{ backgroundColor: color }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.1 + colorIndex * 0.05,
                              type: "spring",
                              stiffness: 260,
                              damping: 20
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          />
                        ))}
                      </div>

                      {/* Palette Name */}
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">{palette.name}</p>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {theme === palette.id && (
                      <motion.div
                        className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}

                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${palette.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              className="mt-6 pt-4 border-t border-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-xs text-gray-500">
                More themes coming soon
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
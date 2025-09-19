import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useGitHubProfile } from '../hooks/useGitHubProfile';

const Navigation = () => {
  const { colors, theme, setTheme, availableThemes } = useTheme();
  const { profile } = useProfile();
  const { user } = useGitHubProfile();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const selectTheme = (themeId: string) => {
    if (themeId !== theme) {
      setTheme(themeId as any);
    }
    setIsThemeOpen(false);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between w-full px-8 py-4"
    >
      {/* Logo */}
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={profile?.fullName || user.name || 'Profile'}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
        )}
        <span className="text-xl font-bold text-gray-900">
          {profile?.fullName || user?.name || 'Portfolio'}
        </span>
      </motion.div>

      {/* Navigation Items */}
      <div className="hidden md:flex items-center space-x-6">
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
        
        {/* Theme Toggle */}
        <div className="relative">
          <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center border border-gray-200 hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              animate={{ rotate: isThemeOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Palette className="w-5 h-5 text-gray-700" />
            </motion.div>
            
            {/* Active Theme Indicator */}
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: availableThemes.find(t => t.id === theme)?.colors[0] || '#3B82F6' }}
            />
          </motion.button>

          {/* Theme Dropdown */}
          <AnimatePresence>
            {isThemeOpen && (
              <motion.div
                className="absolute top-12 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[240px] z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-4">
                  <h3 className="text-sm font-bold text-gray-900">Theme</h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {availableThemes.map((themeOption) => (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => selectTheme(themeOption.id)}
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
                        theme === themeOption.id 
                          ? 'border-gray-900 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        {/* Color Preview */}
                        <div className="grid grid-cols-2 gap-1 mb-2">
                          {themeOption.colors.slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="aspect-square rounded-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        {/* Theme Name */}
                        <p className="text-xs font-medium text-gray-900 text-center">
                          {themeOption.name}
                        </p>

                        {/* Selected Indicator */}
                        {theme === themeOption.id && (
                          <motion.div
                            className="absolute top-1 right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.button
          className={`${colors.primaryBg} ${colors.primaryBgHover} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`}
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

      {/* Background Overlay for Theme Dropdown */}
      <AnimatePresence>
        {isThemeOpen && (
          <motion.div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsThemeOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
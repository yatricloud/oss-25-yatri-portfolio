import { motion, Variants } from 'framer-motion';
import { User, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { useGitHubProfile } from '../hooks/useGitHubProfile';

const Footer = () => {
  const { theme } = useTheme();
  const { profile } = useProfile();
  const { user: authUser } = useAuth();
  const { user } = useGitHubProfile(authUser?.id);

  // Dynamic footer links based on profile data
  const footerLinks = {
    services: [
      { name: 'AI/ML Development', href: '#projects' },
      { name: 'Web Development', href: '#projects' },
      { name: 'Cloud Solutions', href: '#projects' },
      { name: 'Technical Consulting', href: '#contact' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Experience', href: '#experience' },
      { name: 'Education', href: '#education' },
      { name: 'Skills', href: '#skills' }
    ],
    resources: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
      { name: 'GitHub', href: `https://github.com/${user?.login}` || '#' },
      { name: 'LinkedIn', href: profile?.linkedin || '#' }
    ]
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              variants={logoVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={profile?.fullName || user.name || 'Profile'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className={`w-12 h-12 bg-gradient-to-br rounded-full flex items-center justify-center ${
                  theme === 'blue' ? 'from-blue-500 to-blue-600' : theme === 'orange' ? 'from-orange-500 to-red-500' : theme === 'green' ? 'from-green-500 to-green-600' : theme === 'purple' ? 'from-purple-500 to-purple-600' : 'from-rose-500 to-rose-600'
                }`}>
                  <User className="w-7 h-7 text-white" />
                </div>
              )}
              <span className="text-xl sm:text-2xl font-bold">
                {profile?.fullName || user?.name || 'Yatharth Chauhan'}
              </span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {profile?.summary || user?.bio || 'Microsoft Azure Solution Architect & DevOps Expert helping businesses build intelligent, scalable solutions with cutting-edge technologies.'}
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Available for new projects</span>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Services</h3>
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
            <h3 className="text-lg font-bold mb-6">Profile</h3>
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
            <h3 className="text-lg font-bold mb-6">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.href}
                    target={link.name === 'GitHub' || link.name === 'LinkedIn' ? '_blank' : undefined}
                    rel={link.name === 'GitHub' || link.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
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
              <span>© 2025 Copyright </span>
              <motion.a
                href="https://yatricloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                Yatri Cloud
              </motion.a>
              <span> and Designed by </span>
              <motion.a
                href="https://uimitra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                Uimitra
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6 text-sm text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.a
                href={profile?.email ? `mailto:${profile.email}` : '#'}
                className="hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Email
              </motion.a>
              <motion.a
                href={profile?.phone ? `tel:${profile.phone}` : '#'}
                className="hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Phone
              </motion.a>
                <motion.a
                  href={profile?.location || user?.location ? '#' : '#'}
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ y: -2 }}
                >
                  {profile?.location || user?.location || 'Remote'}
                </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
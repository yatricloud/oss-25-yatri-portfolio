import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import { supabase, SUPABASE_AVAILABLE } from '../lib/supabase';

const ContactSection = () => {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const { user: githubUser } = useGitHubProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'job-opportunity'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!SUPABASE_AVAILABLE || !supabase) {
        throw new Error('Supabase not configured');
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            inquiry_type: formData.inquiryType,
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'job-opportunity' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || '—',
      href: profile?.email ? `mailto:${profile.email}` : '#',
      color: colors.primaryBg
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile?.phone || '—',
      href: profile?.phone ? `tel:${profile.phone}` : '#',
      color: colors.primaryBg400
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile?.location || githubUser?.location || '—',
      href: '#',
      color: colors.primaryBg300
    }
  ];

  const inquiryTypes = [
    { value: 'job-opportunity', label: 'Job Opportunity' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'networking', label: 'Networking' },
    { value: 'mentorship', label: 'Mentorship' },
    { value: 'other', label: 'Other' }
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
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="py-16 space-y-16">
      {/* Header */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 ${colors.indicatorDot} rounded-full`}></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            GET IN TOUCH
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Let's Connect
          <br />
          and Collaborate
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          I'm always excited to connect with new people and explore opportunities.
          <br />
          Whether it's a job opportunity, collaboration, or just to say hello - let's chat!
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Contact Info */}
        <motion.div className="space-y-8" variants={cardVariants}>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
            <p className="text-gray-600 leading-relaxed">
              Feel free to reach out through any of these channels. I typically respond within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{info.label}</p>
                  <p className="text-gray-600">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Availability Status */}
          <motion.div
            className="bg-green-50 border border-green-200 rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800">Available for New Projects</span>
            </div>
            <p className="text-green-700 text-sm">
              Currently accepting new client projects. Expected response time: 24 hours.
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg"
          variants={cardVariants}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Job opportunity, collaboration, or general inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-900 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about the opportunity, your company, or what you'd like to discuss..."
                />
              </div>

              {submitError && (
                <div className="text-red-600 text-sm">{submitError}</div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  `${colors.primaryBg} ${colors.primaryBgHover}`
                } text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Expected response time: 24 hours</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
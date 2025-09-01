import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Brain, Code, Database, Cloud } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SkillsSection = () => {
  const { theme } = useTheme();

  const skillCategories = [
    {
      id: 1,
      title: 'AI & Machine Learning',
      icon: Brain,
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI GPT', 'Computer Vision', 'NLP'],
      color: theme === 'blue' ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600',
      iconBg: theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500',
      borderColor: theme === 'blue' ? 'border-blue-500' : 'border-orange-500'
    },
    {
      id: 2,
      title: 'Programming Languages',
      icon: Code,
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go'],
      color: theme === 'blue' ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-orange-600',
      iconBg: theme === 'blue' ? 'bg-blue-400' : 'bg-orange-400',
      borderColor: theme === 'blue' ? 'border-blue-400' : 'border-orange-400'
    },
    {
      id: 3,
      title: 'Databases & Analytics',
      icon: Database,
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Apache Spark', 'BigQuery'],
      color: theme === 'blue' ? 'from-blue-300 to-blue-500' : 'from-orange-300 to-orange-500',
      iconBg: theme === 'blue' ? 'bg-blue-300' : 'bg-orange-300',
      borderColor: theme === 'blue' ? 'border-blue-300' : 'border-orange-300'
    },
    {
      id: 4,
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      color: theme === 'blue' ? 'from-blue-200 to-blue-400' : 'from-orange-200 to-orange-400',
      iconBg: theme === 'blue' ? 'bg-blue-200' : 'bg-orange-200',
      borderColor: theme === 'blue' ? 'border-blue-200' : 'border-orange-200'
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
      },
    },
  };

  const skillVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20,
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
          <div className={`w-2 h-2 ${theme === 'blue' ? 'bg-blue-500' : 'bg-orange-500'} rounded-full`}></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            TECHNICAL EXPERTISE
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Skills & Technologies
          <br />
          I Work With
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          From AI model development to full-stack applications, I leverage cutting-edge
          <br />
          technologies to build intelligent, scalable solutions.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            className="relative group"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            {/* Professional Animated Border Container */}
            <div className="relative p-1 rounded-3xl overflow-hidden group">
              {/* Footer-Style Moving Border */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-3xl opacity-0 group-hover:opacity-100`}
                animate={{
                  background: [
                    `linear-gradient(0deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                    `linear-gradient(90deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                    `linear-gradient(180deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                    `linear-gradient(270deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                    `linear-gradient(360deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Pulsing Glow Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-3xl opacity-0 group-hover:opacity-30`}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Inner Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className={`w-16 h-16 ${category.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.8 }}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">{category.title}</h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="relative group/skill"
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {/* Skill Square with Animated Border */}
                        <div className="relative p-0.5 rounded-xl overflow-hidden group/skill-border">
                          {/* Footer-Style Moving Border for Skills */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl opacity-0 group-hover/skill:opacity-100 group-hover/skill-border:opacity-100`}
                            animate={{
                              background: [
                                `linear-gradient(45deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                                `linear-gradient(135deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                                `linear-gradient(225deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                                `linear-gradient(315deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`,
                                `linear-gradient(405deg, ${category.color.includes('blue') ? '#3B82F6, #1D4ED8' : category.color.includes('orange') ? '#F59E0B, #D97706' : '#06B6D4, #0891B2'})`
                              ]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          
                          {/* Skill Content */}
                          <div className="relative bg-gray-50 group-hover/skill:bg-white rounded-xl p-4 text-center transition-all duration-500 group-hover/skill:shadow-lg">
                            <motion.span
                              className="text-gray-800 font-medium text-sm group-hover/skill:text-gray-900 group-hover/skill:font-semibold transition-all duration-300"
                              whileHover={{ fontWeight: 600 }}
                            >
                              {skill}
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 ${category.iconBg} rounded-full opacity-0 group-hover:opacity-30`}
                      animate={{
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * -80 - 20, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${10 + i * 20}%`,
                        top: `${20 + i * 15}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsSection;
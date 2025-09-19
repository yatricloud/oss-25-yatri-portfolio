import { motion, Variants } from 'framer-motion';
import { Brain, Code, Cloud } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';

const SkillsSection = () => {
  const { colors } = useTheme();
  const { profile } = useProfile();

  // Map raw categories to HR-friendly groups with order and subtitle
  const normalizeKey = (k: string) => k.toLowerCase().replace(/[^a-z]+/g, '');
  const categoryMeta: Record<string, { title: string; subtitle?: string; order: number }> = {
    languages: { title: 'Programming Languages', subtitle: 'Core languages', order: 10 },
    softwaredevelopment: { title: 'Web & Backend Development', subtitle: 'Frameworks & platforms', order: 20 },
    microsofttools: { title: 'Microsoft & Power Platform', subtitle: 'Copilot, Power Apps & D365', order: 30 },
    admincollaboration: { title: 'Collaboration & Admin', subtitle: 'Productivity suites', order: 40 },
    aitools: { title: 'AI & LLM Tools', subtitle: 'Modeling & assistants', order: 50 },
    cloudplatforms: { title: 'Cloud Platforms', subtitle: 'Public cloud providers', order: 60 },
    versioncontrol: { title: 'Version Control', subtitle: 'Source code management', order: 70 },
    cicdtools: { title: 'CI/CD', subtitle: 'Build & release pipelines', order: 80 },
    devopstools: { title: 'DevOps & Observability', subtitle: 'Containers & monitoring', order: 90 },
    contentcreation: { title: 'Design & Content', subtitle: 'Design & editing tools', order: 100 },
  };

  const skillCategories = (profile?.skills || []).map((s, idx) => ({
    id: idx + 1,
    rawName: s.name || 'Skills',
    icon: idx % 3 === 0 ? Brain : idx % 3 === 1 ? Code : Cloud,
    skills: s.keywords || [],
    color: colors.gradientStrong,
    iconBg: colors.primaryBg,
    borderColor: colors.border500
  }))
  .map(cat => {
    const key = normalizeKey(cat.rawName);
    const meta = categoryMeta[key];
    // Deduplicate and tidy skills
    const uniqueSkills = Array.from(new Set(cat.skills.map((x) => String(x).trim())));
    return {
      ...cat,
      title: meta?.title || cat.rawName,
      subtitle: meta?.subtitle,
      order: meta?.order ?? 999,
      skills: uniqueSkills,
    };
  })
  .sort((a, b) => a.order - b.order);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const skillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 240,
        damping: 18,
      },
    },
  };

  return (
    <div className="py-20 space-y-16">
      {/* Header */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 ${colors.indicatorDot} rounded-full`}></div>
          <span className="text-gray-600 font-medium uppercase tracking-wide text-sm">
            TECHNICAL EXPERTISE
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Skills & Technologies
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From AI model development to full-stack applications, I leverage cutting-edge
          <br />
          technologies to build intelligent, scalable solutions.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto w-full">
        {skillCategories.length <= 1 ? (
          // Single-category centered chip cloud
          <motion.div
            className="max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillCategories.map((category) => (
              <div key={category.id} className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                {category.subtitle && (
                  <div className="text-sm text-gray-500">{category.subtitle}</div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-items-center">
                  {category.skills.map((skill, index) => (
                    <motion.span
                      key={`${category.title}-${skill}-${index}`}
                      className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 shadow-sm hover:shadow transition text-center w-full"
                      variants={skillVariants}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
      <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
                className="relative group h-full w-full"
            variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                {/* Card Container with hover border */}
                <div className="relative p-0.5 rounded-3xl overflow-hidden h-full w-full">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative z-10 space-y-6 flex-1">
                      {/* Icon & Titles */}
                      <div className="flex items-start space-x-4">
              <motion.div
                          className={`w-14 h-14 ${category.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        >
                          <category.icon className="w-7 h-7 text-white" />
                    </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                          {category.subtitle && (
                            <div className="text-sm text-gray-500 truncate">{category.subtitle}</div>
                          )}
                        </div>
                  </div>

                      {/* Skills Chips */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {category.skills.map((skill, index) => (
                          <motion.span
                            key={`${category.title}-${skill}-${index}`}
                            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 shadow-sm hover:shadow text-center"
                        variants={skillVariants}
                            >
                              {skill}
                            </motion.span>
                        ))}
                      </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
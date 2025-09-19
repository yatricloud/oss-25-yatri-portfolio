import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What type of roles are you looking for?",
    answer: "I'm open to full-time, part-time, and contract opportunities in software development, AI/ML engineering, DevOps, and technical leadership roles. I'm particularly interested in companies working with cutting-edge technologies and innovative solutions."
  },
  {
    question: "Are you available for remote work?",
    answer: "Yes, I'm fully comfortable with remote work and have extensive experience working with distributed teams. I'm also open to hybrid arrangements and can travel for important meetings or team events when needed."
  },
  {
    question: "What's your preferred tech stack?",
    answer: "I work with a wide range of technologies including React, Node.js, Python, TypeScript, Azure, AWS, Docker, and various AI/ML frameworks. I'm always learning new technologies and adapt quickly to different tech stacks based on project requirements."
  },
  {
    question: "Do you have experience with team leadership?",
    answer: "Yes, I have experience leading development teams and mentoring junior developers. I've successfully managed projects from conception to deployment and enjoy collaborating with cross-functional teams to deliver high-quality solutions."
  },
  {
    question: "What's your availability for new opportunities?",
    answer: "I'm currently available for new opportunities and can start immediately. I'm looking for roles where I can make a meaningful impact and continue growing as a developer and technical leader."
  }
];

export default function FAQSection() {
  const { colors } = useTheme();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="flex items-center justify-center"
            variants={headerVariants}
          >
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center space-x-2">
              <div className={`w-2 h-2 ${colors.indicatorDot} rounded-full`}></div>
              <span className="text-gray-600 font-medium text-sm">QUESTION & ANSWER</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={headerVariants}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Here are some common questions about my background, availability, and work preferences.
              <br />
              Feel free to reach out if you have any other questions!
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -2, shadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 ${colors.primaryBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    {openItems.includes(index) ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </span>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className={`w-4 h-0.5 bg-gray-400 transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-0' : 'rotate-0'
                  }`}></div>
                  <div className={`w-0.5 h-4 bg-gray-400 absolute transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}></div>
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openItems.includes(index) ? 'auto' : 0,
                  opacity: openItems.includes(index) ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 pl-20">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
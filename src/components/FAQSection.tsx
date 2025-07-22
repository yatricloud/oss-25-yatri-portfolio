import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does it take to complete?",
    answer: "Project timelines vary depending on scope and complexity. Most projects range from 2-12 weeks, with smaller projects completing faster and larger enterprise solutions taking longer."
  },
  {
    question: "What if I need updates after the site goes live?",
    answer: "We offer ongoing maintenance and support packages to ensure your project continues to perform optimally after launch. Updates and modifications can be handled through our support system."
  },
  {
    question: "Can I edit the landing page after it's delivered?",
    answer: "Yes, absolutely! We provide you with full access and documentation so you can make updates. We also offer training sessions to help you manage your site effectively."
  },
  {
    question: "Can Framer handle complex animations?",
    answer: "Yes, Framer is excellent for complex animations and interactions. We can create sophisticated micro-interactions, page transitions, and custom animations that enhance user experience."
  },
  {
    question: "Will you provide Domain and Hosting?",
    answer: "We can help you set up domain and hosting, or work with your existing setup. We'll guide you through the best options based on your specific needs and budget."
  }
];

export default function FAQSection() {
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
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600 font-medium text-sm">QUESTION & ANSWER</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={headerVariants}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find Quick Answers to
              <br />
              Common Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Before we start, it's important to answer these questions to avoid any confusion
              <br />
              later. If you have any other questions, just let me know!
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
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
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
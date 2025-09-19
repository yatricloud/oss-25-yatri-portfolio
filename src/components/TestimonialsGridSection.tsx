import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TestimonialsGridSection = () => {
  const { colors } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Jahid Hasan',
      position: 'Founder at BongDevs',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "Yatharth is not just the best communicator, his attitude towards his clients makes you feel that you are in the right place and talking to the right person.\n\nHe is formative, understanding, and experienced in what he does. I will recommend Yatharth to anyone seeking a designer and or many more. Great guy to work with. I am a happy client."
    },
    {
      id: 2,
      name: 'Paul Wachu',
      position: 'Founder at Pagapol',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "Working with this digital designer was an absolute joy. Their ability to capture and bring to life my ideas into visually stunning designs was nothing short of amazing. Not only were the designs aesthetically pleasing, but they were also user-friendly and intuitive.\n\nTheir professionalism and punctuality were top-notch. They consistently met deadlines, often delivering high-quality work ahead of schedule.\n\nWhat sets this designer apart is their unique creative vision coupled with a practical, user-focused approach. I would highly recommend them to anyone seeking a highly skilled, dedicated professional who can transform ideas into visual masterpieces. I look forward to our future projects together!\n\nThank you for an exceptional job!"
    },
    {
      id: 3,
      name: 'Abu Sayid',
      position: 'Founder at 7bStudio',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "Worked with Yatharth is awesome and reliable. He is responsible and passionate. Work with freehand. Best wishes for his future and I will come to you next time."
    },
    {
      id: 4,
      name: 'Mz Rahman',
      position: 'Director at MovingBirds',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "Well done. Excellent job and great service, very satisfying and superb. Keep it up."
    },
    {
      id: 5,
      name: 'Imran Atif',
      position: 'CEO at ItevsDigital',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "Yatharth is perhaps the most professional and nicest experience I've heard had in the design market. He completes the design perfectly and with modification of our new company logo. Like many of his other reviews state, he treated me like an old friend that he had known for years.\n\nI would highly recommend him for any of your company's or individual needs, and I personally plan on using him for any other projects that professionally!"
    },
    {
      id: 6,
      name: 'Matalon',
      position: 'Founder at Clymb',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "He worked really hard to make sure I was satisfied. Even after completing projects he provided additional work, and he made everything easy for me."
    },
    {
      id: 7,
      name: 'Mr Matalon',
      position: 'Fiverr Client',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "Yatharth delivered excellent work. Was super patient with me till I was happy from results. Will come again."
    },
    {
      id: 8,
      name: 'Fahmida Shaheen',
      position: 'CEO at BlackStone',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "In one word the \"Yatharth\" designer is exceptional by his designs thought. I really appreciate their design sense and artistic thoughts. If here is an option of 100 stars then I will give them all. Thanks a lot \"Yatharth\" for giving such a good service."
    },
    {
      id: 9,
      name: 'Inely Cesna',
      position: 'Inely Cesna Coaching',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: "I want to express my sincere appreciation for the fantastic job you did my branding. Your expertise and attention to detail were exceptional, and I am extremely pleased with the outcome. From understanding my vision to tackling challenges with ease, you delivered beyond my expectations."
    }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="py-16 space-y-16">
      {/* Testimonials Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-500 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed text-sm">
                {testimonial.content.split('\n\n').map((paragraph, i) => (
                  <span key={i}>
                    {paragraph}
                    {i < testimonial.content.split('\n\n').length - 1 && <><br /><br /></>}
                  </span>
                ))}
              </p>
            </div>

            {/* Hover Effect Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientSoft} opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialsGridSection;
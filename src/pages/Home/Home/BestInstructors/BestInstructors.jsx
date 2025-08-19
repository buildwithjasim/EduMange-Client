import React from 'react';
import { motion } from 'framer-motion';

const instructors = [
  {
    name: 'Sarah Jahan',
    subject: 'Mathematics Expert',
    image: 'https://i.ibb.co/84jTGBY8/pic5.jpg',
    slogan: 'Making numbers simple',
    description:
      'Sarah has over 10 years of experience teaching mathematics, helping students excel with clarity and confidence.',
  },
  {
    name: 'Rahim Uddin',
    subject: 'Science & Physics',
    image: 'https://i.ibb.co/0RFnXVx6/pic1.jpg',
    slogan: 'Exploring the universe',
    description:
      'Rahim specializes in physics and general science, making complex concepts understandable for learners of all levels.',
  },
  {
    name: 'Mitu Akter',
    subject: 'Web Development',
    image: 'https://i.ibb.co/B2bsJVrc/pic4.jpg',
    slogan: 'Building the web, one line at a time',
    description:
      'Mitu is a full-stack developer with real-world experience, teaching practical web development skills with hands-on projects.',
  },
];

export default function BestInstructors() {
  return (
    <section className="py-24 bg-background dark:bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-gray-600 dark:text-text text-lg md:text-xl max-w-2xl mx-auto">
            Learn from top educators with years of experience. Each instructor
            is verified, passionate, and dedicated to helping you succeed.
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {instructors.map((inst, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-3xl p-8 bg-background dark:bg-background shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-visible border border-primary/20 dark:border-accent/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Gradient Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-3xl"></div>

              {/* Instructor Avatar */}
              <div className="flex justify-center -mt-20 mb-6 relative z-10">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-32 h-32 object-contain rounded-full border-4 border-primary dark:border-accent shadow-md"
                />
              </div>

              {/* Instructor Info */}
              <h3 className="text-xl md:text-2xl font-bold text-text dark:text-text text-center">
                {inst.name}
              </h3>
              <p className="text-sm md:text-base text-secondary dark:text-secondary text-center mt-1">
                {inst.subject}
              </p>

              {/* Slogan */}
              <p className="text-sm md:text-base text-primary dark:text-accent text-center font-semibold mt-2 italic">
                "{inst.slogan}"
              </p>

              {/* Description */}
              <p className="text-gray-600 dark:text-white text-sm md:text-base text-center mt-2 px-4">
                {inst.description}
              </p>

              {/* Subtle Shadow Glow */}
              <div className="absolute inset-0 rounded-3xl shadow-[0_8px_20px_rgba(161,56,219,0.15)] group-hover:shadow-[0_12px_30px_rgba(224,87,198,0.2)] transition-shadow duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

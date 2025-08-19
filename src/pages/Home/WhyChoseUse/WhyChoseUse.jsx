import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiUserCheck, FiCreditCard } from 'react-icons/fi';

const features = [
  {
    title: 'Track Progress',
    description:
      'Students and teachers both get access to assignment progress, submissions, and feedback in one place.',
    icon: <FiBarChart2 size={40} />,
    color: 'from-primary to-secondary',
  },
  {
    title: 'Verified Instructors',
    description:
      'Our approval system ensures only qualified teachers can publish and manage classes.',
    icon: <FiUserCheck size={40} />,
    color: 'from-secondary to-accent',
  },
  {
    title: 'Secure Payments',
    description:
      'Seamless and secure Stripe-based payment system for enrolling in any course you like.',
    icon: <FiCreditCard size={40} />,
    color: 'from-accent to-primary',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-background dark:bg-background transition-colors duration-300">
      <div className="px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
          Why Choose EduManage?
        </h2>
        <p className="text-text dark:text-text text-lg mb-12 max-w-3xl mx-auto">
          Empower your learning journey with smart tools, verified teachers, and
          insightful dashboards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-background/80 dark:bg-background/50 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-400 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className={`mb-4 text-primary dark:text-primary`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-text dark:text-text mb-2">
                {feature.title}
              </h3>
              <p className="text-text dark:text-text/80 text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

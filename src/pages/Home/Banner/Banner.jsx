import React from 'react';
import { motion } from 'framer-motion';
import HeroImage from '../../../assets/Banner/study.jpg';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative bg-background dark:bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empower Your Learning <br />
            With <span className="text-accent">EduManage</span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Join thousands of students and expert instructors worldwide. Learn,
            grow, and teach with verified courses, smart dashboards, and secure
            payments.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link to="/allClasses">
              <button className="btn btn-primary px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to="/TeachOnEduManage">
              <button className="btn btn-outline px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Teach With Us
              </button>
            </Link>
          </motion.div>

          {/* Optional small stats/trust indicators */}
          <motion.div
            className="flex flex-wrap gap-6 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                5000+
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Students
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-accent">
                200+
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Courses
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-secondary">
                50+
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Expert Instructors
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Hero Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src={HeroImage}
            alt="Hero Illustration"
            className="max-w-full w-96 lg:w-auto rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Optional background accent shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full -z-10 blur-3xl"></div>
    </section>
  );
}

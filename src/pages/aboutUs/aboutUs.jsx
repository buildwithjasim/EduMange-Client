import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 bg-background dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-8">
        About EduManage
      </h1>

      <p className="text-text dark:text-text/80 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
        EduManage is a modern educational platform designed to connect students
        with expert instructors across a wide range of topics. Our mission is to
        empower learners and educators with verified courses, smart dashboards,
        and secure payment systems, making education accessible, engaging, and
        trustworthy for everyone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-primary/10 dark:bg-primary/20 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-primary mb-2">Our Mission</h2>
          <p className="text-text dark:text-text/70">
            To provide an inclusive learning environment where knowledge is
            accessible and learning is enjoyable for students and instructors.
          </p>
        </div>

        <div className="p-6 bg-accent/10 dark:bg-accent/20 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-accent mb-2">Our Vision</h2>
          <p className="text-text dark:text-text/70">
            To become a global hub for skill development and lifelong learning
            that connects motivated learners with expert teachers worldwide.
          </p>
        </div>

        <div className="p-6 bg-secondary/10 dark:bg-secondary/20 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-secondary mb-2">Our Values</h2>
          <p className="text-text dark:text-text/70">
            Integrity, accessibility, innovation, and community. We prioritize
            quality education, transparency, and user empowerment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

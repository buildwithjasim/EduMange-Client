import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BecomeInstructor = () => {
  return (
    <section className="bg-background dark:bg-background transition-colors duration-300 py-20">
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Instructor Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://i.ibb.co/0RFnXVx6/pic1.jpg"
              alt="Become an Instructor"
              className="w-72 md:w-80 h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
            Become an Instructor
          </h2>
          <p className="text-lg md:text-xl text-text dark:text-text leading-relaxed">
            Share your knowledge and skills with thousands of eager learners on
            EduManage. We provide the platform and tools you need to teach what
            you love.
          </p>

          <Link to="/TeachOnEduManage">
            <button className="btn btn-primary px-8 py-3 text-white text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Teaching Today
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeInstructor;

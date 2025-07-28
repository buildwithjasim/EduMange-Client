import { Link } from 'react-router-dom';

const BecomeInstructor = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left: Instructor Image */}
      <div className="flex justify-center">
        <img
          src="https://i.ibb.co/0RFnXVx6/pic1.jpg"
          alt="Become an Instructor"
          className="w-72 h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="space-y-4">
        <button className="text-3xl font-bold text-gray-800 dark:text-white">
          Become an instructor
        </button>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Share your knowledge and skills with thousands of eager learners on
          EduManage. We provide the platform and tools you need to teach what
          you love.
        </p>

        <Link to="/TeachOnEduManage">
          <button className="btn btn-primary px-6 text-white">
            Start teaching today
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BecomeInstructor;

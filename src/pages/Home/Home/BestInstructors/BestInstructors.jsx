import React from 'react';

export default function BestInstructors() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Top Instructors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4 border rounded-lg shadow-sm">
              <img
                src="https://i.ibb.co/84jTGBY8/pic5.jpg"
                alt="Instructor 1"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                Sarah Jahan
              </h3>
              <p className="text-sm text-gray-500">Mathematics Expert</p>
            </div>
            <div className="text-center p-4 border rounded-lg shadow-sm">
              <img
                src="https://i.ibb.co/0RFnXVx6/pic1.jpg"
                alt="Instructor 2"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                Rahim Uddin
              </h3>
              <p className="text-sm text-gray-500">Science & Physics</p>
            </div>
            <div className="text-center p-4 border rounded-lg shadow-sm">
              <img
                src="https://i.ibb.co/B2bsJVrc/pic4.jpg"
                alt="Instructor 3"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                Mitu Akter
              </h3>
              <p className="text-sm text-gray-500">Web Development</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

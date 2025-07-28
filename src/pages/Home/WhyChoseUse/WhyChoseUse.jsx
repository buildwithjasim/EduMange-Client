import React from 'react';

export default function WhyChoseUse() {
  return (
    <>
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Why Choose EduManage?
          </h2>
          <p className="text-gray-600 mb-10">
            Empower your learning journey with smart tools, verified teachers,
            and insightful dashboards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Students and teachers both get access to assignment progress,
                submissions, and feedback in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Verified Instructors
              </h3>
              <p className="text-gray-600">
                Our approval system ensures only qualified teachers can publish
                and manage classes.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Seamless and secure Stripe-based payment system for enrolling in
                any course you like.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

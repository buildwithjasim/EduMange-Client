import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    console.log(data);
    Swal.fire('Success!', 'Your message has been sent.', 'success');
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 bg-background dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-6">
        Contact Us
      </h1>

      <p className="text-text/80 text-center mb-12">
        Have questions or feedback? We’d love to hear from you! Fill out the
        form below and we’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-base-200 p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <div>
          <label className="font-medium text-text/80">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            placeholder="Your Name"
            className="input input-bordered w-full mt-2 bg-gray-100 dark:bg-gray-800 text-text dark:text-text/80"
          />
        </div>

        <div>
          <label className="font-medium text-text/80">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Your Email"
            className="input input-bordered w-full mt-2 bg-gray-100 dark:bg-gray-800 text-text dark:text-text/80"
          />
        </div>

        <div>
          <label className="font-medium text-text/80">Message</label>
          <textarea
            {...register('message', { required: true })}
            placeholder="Your Message"
            className="textarea textarea-bordered w-full mt-2 bg-gray-100 dark:bg-gray-800 text-text dark:text-text/80"
            rows={6}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full px-6 py-3 font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Optional: Accent shapes like in HeroSection */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-primary/20 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full -z-10 blur-3xl"></div>
    </div>
  );
};

export default ContactUs;

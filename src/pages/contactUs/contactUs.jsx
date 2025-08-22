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
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 min-h-screen">
      <h1 className="text-4xl md:text-5xl text-primary font-extrabold text-center mb-6">
        Contact Us
      </h1>

      <p className="text-center mb-12">
        Have questions or feedback? We’d love to hear from you! Fill out the
        form below and we’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            placeholder="Your Name"
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Your Email"
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Message</label>
          <textarea
            {...register('message', { required: true })}
            placeholder="Your Message"
            className="textarea textarea-bordered w-full mt-2"
            rows={6}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn w-full px-6 py-3 font-semibold bg-primary shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;

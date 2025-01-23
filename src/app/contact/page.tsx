'use client';
import React, { useState } from 'react';


// Interface to define the shape of formData
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  // TypeScript ko formData ka structure pata chal jayega
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Success message ka type define kiya
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Handle change function ka type define kiya
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit function ka type define kiya
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccessMessage('Submit Successfully');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } else {
      setSuccessMessage('Error sending message.');
    }
  };

  return (
    <div data-aos="flip-left" className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg mt-5">
      {/* Top Section */}
      <div data-aos="flip-left" className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800"><i>Contact Us</i></h2>
      </div>

      {/* Center Section */}
      <form data-aos="flip-left" onSubmit={handleSubmit} className="space-y-6">
        <div data-aos="flip-left" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />

        {/* Bottom Section */}
        <button className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300" type="submit">
          <b>Submit</b>
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-center text-green-500 font-semibold">{successMessage}</p>
      )}
    </div>
  );
}

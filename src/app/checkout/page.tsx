'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    homeAddress: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
  });
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Fetch total from localStorage
    const storedTotal = JSON.parse(localStorage.getItem('total') || '0');
    setTotal(storedTotal);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('orderData', JSON.stringify(formData));
    alert('Order placed successfully!');
    router.push('/feedback');
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-black mb-5">Shipping Information</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Home Address */}
        <div className="mb-4">
          <input
            type="text"
            name="homeAddress"
            placeholder="Home Address"
            value={formData.homeAddress}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* City, State, Zip Code */}
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Order Summary */}
        <div className="mt-8 p-5 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <p className="font-semibold">Total Price:</p>
            <p className="font-semibold">${total.toFixed(2)}</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

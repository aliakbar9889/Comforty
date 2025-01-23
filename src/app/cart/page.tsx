'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importing next/image for optimized images

// Define the type for cart items
interface CartItem {
  title: string;
  price: number;
  imageUrl: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Using CartItem[] type instead of any[]
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty!');
    } else {
      setErrorMessage('');
      router.push('/checkout');
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    // Save total in localStorage
    localStorage.setItem('total', JSON.stringify(total));
  }, [total]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-black mb-5">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Replacing <img> with <Image> */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-md mr-4"
                />
                <p>
                  {item.title} - <b>Price</b> ${item.price}
                </p>
              </div>

              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 text-red-500 font-medium">{errorMessage}</div>
      )}

      <div className="mt-8 p-5 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-black mb-4">Order Summary</h2>
        <div className="flex justify-between mb-3">
          <p className="font-medium">Subtotal:</p>
          <p className="font-medium">${subtotal}</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="font-medium">Shipping:</p>
          <p className="font-medium">Free</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Total:</p>
          <p className="font-semibold">${total}</p>
        </div>
        <button
          onClick={handleProceedToCheckout}
          className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

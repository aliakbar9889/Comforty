'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdOutlineDelete } from "react-icons/md";
import { useUser } from '@clerk/nextjs'; // Clerk authentication


// Cart Item Type Definition
interface CartItem {
  title: string;
  price: number;
  imageUrl: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { isSignedIn } = useUser(); // Clerk user authentication

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  // Save total to localStorage
  useEffect(() => {
    localStorage.setItem('total', JSON.stringify(total));
  }, [total]);

  const handleProceedToCheckout = () => {
    if (!isSignedIn) {
      setErrorMessage("You must log in to access checkout page.");
      return;
    }
    
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty!');
      return;
    }

    setErrorMessage('');
    
    // Navigate to the delivery page if all conditions are met
    router.push('/delivery');
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-black mb-5">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p><i className='text-red-900'>Your cart is empty!</i></p>
      ) : (
        <div className="grid grid-row-3 gap-8">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <Image src={item.imageUrl} alt={item.title} width={100} height={100} className="object-cover rounded-md mr-4" />
                <p>{item.title} - <b>Price</b> ${item.price}</p>
              </div>
              <button onClick={() => handleRemoveItem(index)} className="text-black">
                <MdOutlineDelete size={25}/>
              </button>
            </div>
          ))}
        </div>
      )}

      {errorMessage && <div className="mt-4 text-red-500 font-medium">{errorMessage}</div>}

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
          className={`w-full text-white bg-gray-700 hover:bg-gray-600 py-2 rounded-md`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

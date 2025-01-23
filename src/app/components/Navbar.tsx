'use client'
import React, { useState } from "react";
import { useClerk, useUser } from '@clerk/nextjs';
import { AiOutlineCheck, AiOutlineExclamationCircle, AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { openSignIn, signOut } = useClerk(); // Clerk's signIn and signOut functions
  const { user, isLoaded } = useUser(); // Get user and loading status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0); // Track the number of items in the cart

  // Handle Login click (open the Clerk sign-in modal)
  const handleLoginClick = () => {
    openSignIn(); // Open the Clerk sign-in modal when the login button is clicked
  };

  // Handle Logout click (sign out the user)
  const handleLogoutClick = () => {
    signOut(); // Logout the user
  };

  return (
    <nav className="w-full mx-auto text-white">
      {/* First Div (Top Section) */}
      <div className="bg-[#2C2544] flex justify-between items-center p-2">
        <div className="flex items-center gap-2 ml-20 text-gray-400 text-sm">
          <AiOutlineCheck className="text-gray-400" />
          <p>Free Shipping On All Orders Over $50</p>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex items-center gap-6 text-gray-400 text-sm mr-10">
          <p>Eng <span className="inline-block rotate-180">^</span></p>
          <p><Link className="hover:cursor-pointer" href="/faq">Faqs</Link></p>
          <div className="flex items-center gap-1">
            <AiOutlineExclamationCircle className="text-gray-400" />
            <p><Link className="hover:cursor-pointer" href="/contact">Need Help</Link></p>
          </div>
        </div>

        {/* Mobile View - Menu Icon */}
        <div className="sm:hidden flex items-center mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <AiOutlineMenu className="text-white text-2xl" />
        </div>
      </div>

      {/* Second Div (Logo and Cart) */}
      <div className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full ml-20" />
          <Link href="/">
            <h3 className="font-semibold text-[#3b3357] text-2xl">Comforty</h3>
          </Link>
        </div>

        {/* Cart Button (Desktop View) */}
        <div className="hidden sm:flex items-center gap-4 text-sm mr-10">
          <Link href="/cart">
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100">
              <AiOutlineShoppingCart />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartCount}</span>
              )}
            </button>
          </Link>
          {!isLoaded ? (
            <p>Loading...</p>
          ) : user ? (
            <button
              onClick={handleLogoutClick} // Trigger logout
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={handleLoginClick} // Trigger the sign-in modal
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
            >
              Log In
            </button>
          )}
        </div>

        {/* Cart Button (Mobile View) */}
        <div className="sm:hidden flex items-center gap-4 text-sm mr-10">
          <Link href="/cart">
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100">
              <AiOutlineShoppingCart />
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartCount}</span>
              )}
            </button>
          </Link>
          {!isLoaded ? (
            <p>Loading...</p>
          ) : user ? (
            <button
              onClick={handleLogoutClick} // Trigger logout
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={handleLoginClick} // Trigger the sign-in modal
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* Third Div (Nav Links) */}
      <div className="hidden sm:flex justify-between items-center text-gray-600 mt-4 ml-20">
        <div className="flex gap-6">
          <span className="hover:text-blue-700 hover:cursor-pointer"><Link href="/">Home</Link></span>
          <span className="hover:text-blue-700 hover:cursor-pointer"><Link href="/shop">Shop</Link></span>
          <span className="hover:text-blue-700 hover:cursor-pointer"><Link href="/products">Products</Link></span>
          <span className="hover:text-blue-700 hover:cursor-pointer"><Link href="/about">About</Link></span>
        </div>
      </div>

      {/* Mobile View Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-100 p-4">
          <div className="flex flex-col gap-4 text-black">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/shop" className="hover:text-blue-700">Shop</Link>
            <Link href="/products" className="hover:text-blue-700">Products</Link>
            <Link href="/about" className="hover:text-blue-700">About</Link>
            <Link href="/faq" className="hover:text-blue-700">FAQ</Link>
            <Link href="/contact" className="hover:text-blue-700">Contact</Link>
            {/* Login/Logout Link */}
            {!isLoaded ? (
              <p>Loading...</p>
            ) : user ? (
              <button
                onClick={handleLogoutClick} // Trigger logout
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={handleLoginClick} // Trigger the sign-in modal
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}

      <hr className="border-t border-gray-300 mt-4" />
    </nav>
  );
};

export default Navbar;

'use client';
import React, { useState } from "react";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0); // Track the number of items in the cart

  return (
    <ClerkProvider>
      <nav className="w-full mx-auto text-white">
        {/* First Div (Top Section) */}
        <div className="bg-[#2C2544] flex justify-between items-center p-2">
          <div className="flex items-center gap-2 ml-20 text-gray-400 text-sm">
            <p>Free Shipping On All Orders Over $50</p>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:flex items-center gap-6 text-gray-400 text-sm mr-10">
            <p>Eng <span className="inline-block rotate-180">^</span></p>
            <p>
              <Link className="hover:cursor-pointer" href="/faq">Faqs</Link>
            </p>
            <p>
              <Link className="hover:cursor-pointer" href="/contact">Need Help</Link>
            </p>
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

          {/* User Authentication, Cart, Search, and Heart */}
          <div className="hidden sm:flex items-center gap-4 text-sm mr-10">
            {/* Cart */}
            <Link href="/cart">
              <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                <AiOutlineShoppingCart />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartCount}</span>
                )}
              </button>
            </Link>

            {/* Search */}
            <Link href="/search">
            <button className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-100">
              <AiOutlineSearch className="text-xl" />
            </button>
            </Link>

            {/* Heart */}
            <Link href="/wishlist">
            <button className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-100">
              <AiOutlineHeart className="text-xl" />
            </button>
            </Link>

            {/* SignedIn and SignedOut */}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
                >
                  Log In
                </button>
              </SignInButton>
            </SignedOut>
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
              {/* SignedIn and SignedOut for Mobile */}
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button
                    className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition mr-5"
                  >
                    Log In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        )}

        <hr className="border-t border-gray-300 mt-4" />
      </nav>
    </ClerkProvider>
  );
};

export default Navbar;

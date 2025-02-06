"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-6">My Wishlist</h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-lg shadow-md flex flex-col items-start">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <p className="text-xl font-bold">{item.title}</p>
              <p className="text-gray-700">Price: ${item.price}</p>
              <p className="text-gray-500">{item.description}</p>
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your wishlist is empty!</p>
      )}
    </div>
  );
};

export default WishlistPage;

'use client';
import React, { useEffect, useState } from 'react';
import { client } from 'src/sanity/lib/client' // Sanity client ko sahi path se import karna

import { useRouter } from 'next/navigation'; // For navigation
import Image from 'next/image'; // Next.js Image component for optimized images

// Define the Product type
interface Product {
  _id: string;
  title: string;
  price: number;
  tags: string[];
  description: string;
  inventory: number;
  imageUrl: string;
}

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use specific Product type
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    // Fetch products from Sanity
    const fetchProducts = async () => {
      const query =
        '*[_type == "products"]{title, price, tags, description, inventory, "imageUrl": image.asset->url, _id}';
      const data = await client.fetch(query); // Fetch data from Sanity
      setProducts(data); // Set fetched data into state
    };

    fetchProducts(); // Run the function to fetch products
  }, []);

  // Handle product click to navigate to product detail page
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`); // Navigate to the dynamic product page
  };

  // Handle Add to Cart
  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Fetch current cart from localStorage
    cart.push(product); // Add the selected product to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart back to localStorage
    alert(`${product.title} added to cart! Click on the cart button at the top to view your cart items list.`);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col items-start mb-10 ml-5 mr-5">
        <h1 className="text-3xl font-semibold text-black">All Products</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col items-center">
            {/* Wrapping image with onClick to navigate on click */}
            <Image
              src={product.imageUrl} // Fetch image URL from the query
              alt={product.title} // Change alt to title for better accessibility
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() => handleProductClick(product._id)} // Handle image click
            />
            <div className="flex flex-col items-start w-full mb-2">
              {/* Display Product Title */}
              <p className="text-gray-700 font-bold text-xl">{product.title}</p>
              {/* Display Price */}
              <p className="text-gray-600">
                <b>${product.price}</b>
              </p>
              {/* Display Description */}
              <p className="text-gray-500">{product.description}</p>
              {/* Display Inventory */}
              <p className="text-gray-500">In Stock: {product.inventory}</p>
              {/* Display Tags */}
              <p className="text-gray-500">Tags: {product.tags.join(', ')}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)} // Add to Cart handler
              className="mt-4 bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

'use client';
import React, { useEffect, useState } from 'react';
import { client } from '../../sanity/lib/client';
import { useRouter } from 'next/navigation'; // For navigation
import Image from 'next/image'; // Optimized image handling
import { toast, ToastContainer } from 'react-toastify'; // Import toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

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
  const [products, setProducts] = useState<Product[]>([]); // State to store products data
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    // Fetch products from Sanity
    const fetchProducts = async () => {
      const query = `
        *[_type == "products"]{
          _id, title, price, tags, description, inventory, 
          "imageUrl": image.asset->url
        }`;
      const data: Product[] = await client.fetch(query); // Fetch data with specific type
      setProducts(data); // Set fetched data into state
    };

    fetchProducts(); // Run the function to fetch products
  }, []);


  // Handle product click to navigate to product detail page
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`); // Navigate to the dynamic product page
  };

    const handleAddToCart = (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]'); // Fetch current cart from localStorage
    cart.push(product); // Add the selected product to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart back to localStorage
    toast.success(`${product.title} added to cart!`, { position: "top-right" }); // Toastify success message
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = (product: Product) => {
    const wishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]'); // Fetch current wishlist from localStorage
    wishlist.push(product); // Add the selected product to the wishlist
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save updated wishlist back to localStorage
    toast.info(`${product.title} added to wishlist!`, { position: "top-right" }); // Toastify info message
  };

  return (
    <div className="p-2">
    {/* Toastify Container */}
    <ToastContainer />
    <div className="p-10">
      <div className="flex flex-col items-start mb-10 ml-5 mr-5">
        <h1 className="text-3xl font-semibold text-black">All Products</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col items-center">
            {/* Product Image */}
            <Image
              src={product.imageUrl} // Optimized image URL
              alt={product.title} // Alt text for accessibility
              width={300} // Responsive width
              height={300} // Responsive height
              className="w-full h-auto object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() => handleProductClick(product._id)} // Navigate on click
            />

            {/* Product Details */}
            <div className="flex flex-col items-start w-full mb-2">
              <p className="text-gray-700 font-bold text-xl">{product.title}</p>
              <p className="text-gray-600">
                <b>${product.price}</b>
              </p>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-gray-500">In Stock: {product.inventory}</p>
              <p className="text-gray-500">Tags: {product.tags.join(', ')}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleAddToCart(product)} // Add to Cart handler
                className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleAddToWishlist(product)} // Add to Wishlist handler
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShopPage;

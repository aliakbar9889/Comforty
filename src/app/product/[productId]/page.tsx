'use client';
import { client } from '../../../sanity/lib/client'; // Sanity client import
import { notFound } from 'next/navigation'; // Importing `notFound` for handling 404
import Image from 'next/image';
import { FaStar } from 'react-icons/fa'; // React Icons import
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

// Define the structure of the product data
interface Product {
  title: string;
  price: number;
  description: string;
  inventory: number;
  tags: string[];
  imageUrl: string;
}

interface ProductProps {
  params: {
    productId: string; // Product ID from dynamic URL
  };
}

const ProductPage = ({ params }: ProductProps) => {
  const { productId } = params; // Extract productId from URL

  // State variables
  const [product, setProduct] = useState<Product | null>(null); // Product data state

     const handleAddToCart = (product: Product) => {
     const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]'); // Fetch current cart from localStorage
     cart.push(product); // Add the selected product to the cart
     localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart back to localStorage
     toast.success(`${product.title} added to cart!`, { position: "top-right" }); // Toastify success message
   };

  // Fetch product data using useEffect
  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "products" && _id == $id][0]{
        title, price, description, inventory, tags, "imageUrl": image.asset->url
      }`;

      const fetchedProduct: Product | null = await client.fetch(query, { id: productId });
      if (!fetchedProduct) {
        notFound(); // Show 404 page if product is not found
      }
      setProduct(fetchedProduct); // Set the fetched product data
    };

    fetchProduct(); // Call the function
  }, [productId]);

  // Show loading while product data is being fetched
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-2'>
     <ToastContainer/>
    <div className="p-10 flex flex-col lg:flex-row">
      {/* Left side with image */}
      <div className="lg:w-1/2 mb-10 lg:mb-0 relative">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Right side with product details */}
      <div className="lg:w-1/2 pl-5">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        {/* Rating with 5 stars */}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className="text-yellow-500" />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Price */}
        <p className="text-lg font-semibold text-gray-800 mb-4">Price: ${product.price}</p>

        {/* Tags */}
        <p className="text-gray-600 mb-2">Tags: {product.tags.join(', ')}</p>

        {/* In Stock */}
        <p className="text-gray-600">In Stock: {product.inventory}</p>

        <button
          onClick={() => handleAddToCart(product)}
          className="mt-4 bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;

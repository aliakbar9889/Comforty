"use client";
import { useState } from "react";
import Image from "next/image"; // Import the Image component from next/image

const products = [
  { id: 1, name: "Modern Cozy", img: "/img14.png", description: "A stylish and comfortable chair for modern interiors.", price: "$120", inventory: 15 },
  { id: 2, name: "Ruse Luxe Armchair", img: "/pic.png", description: "A luxurious armchair with premium cushioning.", price: "$250", inventory: 8 },
  { id: 3, name: "SleekSpin", img: "/pic3.png", description: "A sleek and rotating chair for a contemporary look.", price: "$180", inventory: 12 },
  { id: 4, name: "Gray Elegance", img: "/img12.png", description: "Elegant gray chair that blends with any decor.", price: "$200", inventory: 10 },
  { id: 5, name: "Library Stool Chair", img: "/img11.png", description: "A compact and sturdy stool chair, perfect for libraries.", price: "$90", inventory: 20 },
  { id: 6, name: "Nordic Spin", img: "/pic1.png", description: "A minimalistic Scandinavian-style spinning chair.", price: "$160", inventory: 7 },
  { id: 7, name: "Citrus Edge", img: "/img4.png", description: "A vibrant chair with a citrus-inspired design.", price: "$140", inventory: 14 },
  { id: 10, name: "Ivory Charm", img: "/img10.png", description: "A charming ivory-colored chair for elegant spaces.", price: "$220", inventory: 5 },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Search Logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Product Search</h1>
      
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 w-full max-w-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      {/* Only show products when search is active */}
      {searchTerm && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 hover:cursor-pointer">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg transition-transform transform hover:scale-105"
            >
              {/* Replace <img> with <Image> */}
              <Image
                src={product.img}
                alt={product.name}
                width={400} // Specify width and height for optimization
                height={400}
                className="w-full h-90 object-cover rounded-lg"
              />
              <p className="mt-2 text-lg font-bold">{product.name}</p>
              <p className="mt-2 text-lg">{product.description}</p>
              <p className="mt-2 text-lg">Price: {product.price}</p>
              <p className="mt-2 text-lg">In stock: {product.inventory}</p>
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <p className="text-gray-500">No products found</p>
      ) : null}
    </div>
  );
}

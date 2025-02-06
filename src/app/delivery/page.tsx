'use client'
import { useState } from "react";

export default function DeliveryPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    province: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if any field is empty
  const isDisabled = Object.values(formData).some((value) => value.trim() === "");

  const handleProceedToPay = async () => {
    if (isDisabled) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty!");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage("Error processing checkout");
      }
    } catch (err) {
      // Handle error here if needed, for example:
      console.error(err); // Log error if you want to debug
      setErrorMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      {/* Top Section */}
      <div className="w-full max-w-lg text-center py-6">
        <h1 className="text-2xl font-bold">Delivery Information</h1>
      </div>

      {/* Center Section (Form) */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            value={formData.province}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
        />

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <button
          onClick={handleProceedToPay}
          disabled={isDisabled || loading}
          className={`mt-6 py-2 px-4 rounded w-full text-white ${
            isDisabled || loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
}

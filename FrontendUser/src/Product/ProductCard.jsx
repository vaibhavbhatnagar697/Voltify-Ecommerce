import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ProductCard({ products }) {
  const navigate = useNavigate();
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    const product_data = { product_id: products._id };
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await fetch("http://localhost:3200/user/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(product_data),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        setsuccess((prev) => [...prev, data.msg]);
        toast.success("Added to cart successfully");
      }
      if (data.success === false) {
        seterror((prev) => [...prev, data.msg]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function view_product_details() {
    navigate(`/product-details?product_id=${products._id}`);
  }
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden max-w-sm">
      {/* Image Section */}
      <div className="relative">
        <img
          src={products.images[0]?.image_url}
          alt={products.name}
          className="w-full h-60 object-contain"
        />

        {/* Discount Badge */}
        {products.discountPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {Math.round(
              ((products.price - products.discountPrice) / products.price) *
                100,
            )}
            % OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3" onClick={view_product_details}>
        {/* Company */}
        <p className="text-sm text-gray-500">{products.company}</p>

        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-800">{products.name}</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {products.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-indigo-600">
            ₹{products.discountPrice}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{products.price}
          </span>
        </div>

        {/* Specs Preview */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>RAM: {products.specifications?.ram}GB</p>
          <p>Storage: {products.specifications?.rom}GB</p>
          <p>Processor: {products.specifications?.processor}</p>
        </div>

        {/* Reviews + Stock */}
        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <span>⭐ {products.numReviews} Reviews</span>
          <span className="text-green-600 font-medium">
            {products.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Button */}
        <form onSubmit={handleSubmit}>
          <button
            disabled={products.stock === 0}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              products.stock > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
export default ProductCard;

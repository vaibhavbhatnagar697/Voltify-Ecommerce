import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Misc/Loader";
import Images from "../Misc/Images";
function ProductDetails() {
  const navigate = useNavigate();
  const [productDetails, setproductDetails] = useState([]);
  const [searchquery] = useSearchParams();
  const query = searchquery.get("product_id");
  const accessToken = localStorage.getItem("accessToken");
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  useEffect(() => {
    async function view_products_details() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/api/product-details?product_id=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();
        console.log(data.productData);
        setproductDetails(data.productData);
        console.log(data.productData);
        if (data.success === true) {
          setsuccess((prev) => [...prev, data.msg]);
        }
        if (data.success === false) {
          seterror((prev) => [...prev, data.msg]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    view_products_details();
  }, []);

  async function add_to_cart() {
    const product_data = { product_id: query };
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `{import.meta.env.VITE_API_URL}/user/api/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(product_data),
        },
      );
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
  async function orderList() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/api/add-to-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ products: [{ productData: productDetails }] }),
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        setsuccess((prev) => [...prev, data.msg]);
        toast.success("Please fill neccessary informations");
        navigate(`/order-details?order_id=${data.order_id}`);
      }
      if (data.success === false) {
        seterror((prev) => [...prev, data.msg]);
      }
    } catch (error) {
      throw error;
    }
  }
  if (success.length > 0 || error.length > 0) {
    if (error.length === 0) {
      return (
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">
          <Images images={productDetails.images} />

          {/* Product Info */}
          <div>
            {/* Name */}
            <h1 className="text-3xl font-bold">{productDetails.name}</h1>

            {/* Company */}
            <p className="text-gray-500 mt-1">
              Brand: {productDetails.company}
            </p>

            {/* Reviews */}
            <p className="text-yellow-500 mt-2">
              ⭐ {productDetails.numReviews} Reviews
            </p>

            {/* Price */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-bold text-green-600">
                ₹{productDetails.discountPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹{productDetails.price}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-gray-700">{productDetails.description}</p>

            {/* Specifications */}
            <div className="mt-6 border rounded-xl p-4">
              <h2 className="font-semibold text-lg mb-3">Specifications</h2>

              <div className="grid grid-cols-2 gap-3 text-gray-700">
                <p>
                  <span className="font-medium">RAM:</span>{" "}
                  {productDetails?.specifications?.ram} GB
                </p>
                <p>
                  <span className="font-medium">ROM:</span>{" "}
                  {productDetails?.specifications?.rom} GB
                </p>
                <p>
                  <span className="font-medium">Processor:</span>{" "}
                  {productDetails?.specifications?.processor}
                </p>
                <p>
                  <span className="font-medium">Display:</span>{" "}
                  {productDetails?.specifications?.display}
                </p>
              </div>
            </div>

            {/* Stock */}
            <p className="mt-4 text-green-600 font-semibold">
              In Stock: {productDetails.stock}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                onClick={add_to_cart}
              >
                Add to Cart
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                onClick={orderList}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (success.length === 0) {
      return <Error />;
    }
  } else {
    return <Loader />;
  }
}

export default ProductDetails;

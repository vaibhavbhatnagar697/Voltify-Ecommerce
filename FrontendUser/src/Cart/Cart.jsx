import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../Misc/Loader";
import { useNavigate } from "react-router-dom";
import Error from "../Misc/Error";

function Cart() {
  const navigate = useNavigate();
  const [price, setprice] = useState(0);
  const [cartdata, setcartdata] = useState([]);
  const [product_id, setproduct_id] = useState("");
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  useEffect(() => {
    const view_cart = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const res = await fetch("http://localhost:3200/user/api/view-cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.CartData === null) {
          setcartdata([]);
        } else {
          setcartdata(data.CartData.products);
        }
        if (data.success === true) {
          setsuccess((prev) => [...prev, data.msg]);
        }
        if (data.success === false) {
          seterror((prev) => [...prev, data.msg]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    view_cart();
  }, [product_id]);

  useEffect(() => {
    const total = cartdata.reduce(
      (acc, item) => acc + item.productData.discountPrice,
      0,
    );

    setprice(total);
  }, [cartdata]);
  async function orderList() {
    const accessToken = localStorage.getItem("accessToken");
    if (cartdata.length > 0) {
      try {
        const res = await fetch("http://localhost:3200/user/api/add-to-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ products: cartdata }),
        });
        const data = await res.json();
        console.log(data);
        setcartdata([]);
        if (data.success === true) {
          setsuccess((prev) => [...prev, data.msg]);
          toast.info("Please fill neccessary informations");
          navigate(`/order-details?order_id=${data.order_id}`);
        }
        if (data.success === false) {
          seterror((prev) => [...prev, data.msg]);
        }
      } catch (error) {
        throw error;
      }
    } else {
      toast.info("your cart is empty");
    }
  }
  useEffect(() => {
    async function remove_cart() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const productData = { product_id };
        console.log(product_id);
        if (product_id != "") {
          const res = await fetch(
            "http://localhost:3200/user/api/remove-cart",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(productData),
            },
          );
          const data = await res.json();
          console.log(data);
          if (data.success === true) {
            setcartdata(data.CartData.products);
            setsuccess((prev) => [...prev, data.msg]);
            toast.success("item removed");
          }
          if (data.success === false) {
            seterror((prev) => [...prev, data.msg]);
          }
          console.log(success, error);

          console.log(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setproduct_id("");
      }
    }
    remove_cart();
    const total = cartdata.reduce(
      (acc, item) => acc - item.productData.discountPrice,
      0,
    );

    setprice(total);
  }, [product_id]);
  if (success.length > 0 || error.length > 0) {
    if (error.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              My Cart
            </h1>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* 🛒 Cart Items Section */}
            <div className="md:col-span-2 space-y-6">
              {cartdata.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                  <p className="text-gray-500 text-lg">Your cart is empty 🛍</p>
                </div>
              ) : (
                cartdata?.map((v) => (
                  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-6">
                      <div
                        key={v.productData.id}
                        className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row gap-5"
                      >
                        {/* Details */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">
                              {v.productData.company}
                            </p>
                            <h2 className="text-lg font-semibold text-gray-800">
                              {v.productData.name}
                            </h2>
                          </div>
                          {/* Price */}
                          <p className="text-indigo-600 font-bold text-lg">
                            ₹{v.productData.discountPrice}
                          </p>{" "}
                          {/* Remove */}
                          <button
                            className="text-red-500 text-sm hover:underline"
                            onClick={() => setproduct_id(v.productData._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 💳 Order Summary Section */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs.{price}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-gray-800 text-lg">
                  <span>Total</span>
                  <span>Rs.{price}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                onClick={orderList}
              >
                Proceed to Checkout
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
export default Cart;

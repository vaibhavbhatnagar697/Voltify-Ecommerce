import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Misc/Loader.jsx";

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

function Order() {
  const accessToken = localStorage.getItem("accessToken");
  let [orderData, setorderData] = useState([]);
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  useEffect(() => {
    setorderData([]);
    async function view_orders() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/api/order-list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();
        const new_data = data.Orderdata;
        console.log();
        if (new_data[0].address == undefined) {
          setorderData([]);
        } else {
          setorderData(new_data);
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
    }
    view_orders();
  }, []);
  console.log(orderData);
  if (success.length > 0 || error.length > 0) {
    if (error.length === 0) {
      return (
        <div className="max-w-5xl mx-auto p-6">
          <div className="mt-4 mb-12 text-center">
            <h1 className="text-4xl md:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              My Orders
            </h1>
          </div>

          <div className="space-y-5">
            {orderData.map((v) =>
              v.products.map((p) => (
                <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-5">
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={p.productData.images[0].image_url}
                      alt={p.productData.images[0].image_id}
                      className="w-20 h-20 object-contain rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-lg">
                        {p?.productData?.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Order ID: {v?._id}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Ordered on: {new Date(v.orderedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* Price */}
                  <div className="mt-4 md:mt-0 font-semibold text-lg">
                    {p?.productData?.price}
                  </div>
                  {/* Status */}
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      v.status,
                    )}`}
                  >
                    {v?.status}
                  </span>
                </div>
              )),
            )}
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

export default Order;

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../Misc/Loader";
import PaymentLoader from "../Misc/PaymentLoader";

export default function OrderDetails() {
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("order_id");
  const [order, setorder] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  const [paymentSuccess, setpaymentSuccess] = useState("");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");

  let total = 0;
  if (order.length > 0) {
    total = order.reduce(
      (acc, item) => acc + item.productData?.discountPrice,
      0,
    );
  }
  console.log(order);

  useEffect(() => {
    async function particular_order() {
      try {
        const res = await fetch(
          `http://localhost:3200/user/api/particular-order?order_id=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();
        console.log(data);
        setorder(data.orderData.products);
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
    particular_order();
  }, []);
  console.log(order);

  async function order_details() {
    const order_details = {
      name,
      city,
      state,
      pincode,
      address,
      mobile,
      order_id: query,
    };
    try {
      const res = await fetch("http://localhost:3200/user/api/order-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(order_details),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        try {
          const response = await fetch(
            "http://localhost:3200/user/api/payment-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ order, order_id: query }),
            },
          );
          const new_data = await response.json();
          console.log(new_data);
          if (new_data.success === true) {
            setpaymentSuccess(new_data.msg);
            console.log(new_data);
            window.location.replace(new_data.url);
          }
          if (new_data.success === false) {
            seterror([...error, new_data.msg]);
            console.log(new_data.msg);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (data.success === false) {
        seterror([...error, data.msg]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (success.length > 0 || error.length > 0) {
    if (paymentSuccess == "") {
      return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
          <div className="max-w-6xl w-full grid md:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="md:col-span-2 space-y-6">
              {/* Address Card */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="border p-3 rounded-lg"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />

                  <input
                    className="border p-3 rounded-lg"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />

                  <input
                    className="border p-3 rounded-lg md:col-span-2"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />

                  <input
                    className="border p-3 rounded-lg"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />

                  <input
                    className="border p-3 rounded-lg"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                  />

                  <input
                    className="border p-3 rounded-lg"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Products */}
              <div className="space-y-4">
                {order.map((item) => (
                  <div key={item.productData.id} className="flex gap-4">
                    <img
                      src={item.productData.images[0].image_url}
                      className="w-16 h-16 rounded object-contain"
                      alt={item.productData.images[0].image_url}
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.productData.name}</p>
                      <p className="text-sm text-gray-500">
                        Company: {item.productData.company}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.productData.discountPrice}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Button */}
              <button
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                onClick={order_details}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <PaymentLoader />;
    }
  } else {
    return <Loader />;
  }
}

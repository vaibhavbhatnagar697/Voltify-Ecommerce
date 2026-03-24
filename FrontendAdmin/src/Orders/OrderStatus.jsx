import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Misc/Loader";

function OrderStatus() {
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);

  const handleStatusChange = async (order_id, status) => {
    setStatus(status);
    try {
      const new_data = { order_id, status };
      const res = await fetch("http://localhost:3200/admin/api/order-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_data),
      });
      const data = await res.json();
      if (data.success === true) {
        setsuccess((prev) => [...prev, data.msg]);
        toast.success("status changed successfully");
        window.location.reload();
      }
      if (data.success === false) {
        seterror((prev) => [...prev, data.msg]);
      }
      setStatus("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function view_orders() {
      try {
        const res = await fetch("http://localhost:3200/admin/api/view-orders", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.success === true) {
          setsuccess([...success, data.msg]);
          setOrders(data.Orders);
        }
        if (data.success === false) {
          seterror([...error, data.msg]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    view_orders();
  }, []);
  if (success.length > 0 || error.length > 0) {
    const getStatusColor = (status) => {
      switch (status) {
        case "Pending":
          return "bg-yellow-200 text-yellow-800";
        case "Processing":
          return "bg-blue-200 text-blue-800";
        case "Shipped":
          return "bg-purple-200 text-purple-800";
        case "Out For Delivery":
          return "bg-orange-200 text-orange-800";
        case "Delivered":
          return "bg-green-200 text-green-800";
        case "Cancelled":
          return "bg-red-200 text-red-800";
        default:
          return "bg-gray-200 text-gray-800";
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">Order Management</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-3">Order ID</th>
                <th className="text-left px-6 py-3">Product</th>
                <th className="text-left px-6 py-3">Amount</th>
                <th className="text-left px-6 py-3">Ordered At</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((v) =>
                v.products.map((t) => (
                  <tr
                    key={t._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3 font-medium">{v?._id}</td>
                    <td className="px-6 py-3">{t?.productData?.name}</td>
                    <td className="px-6 py-3 font-semibold">
                      ₹{t?.productData?.price}
                    </td>

                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(v?.orderedAt).toLocaleString()}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          v?.status,
                        )}`}
                      >
                        {v?.status}
                      </span>
                    </td>

                    <td className="px-6 py-3">
                      <select
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={v?.status}
                        onChange={(e) =>
                          handleStatusChange(v?._id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Out For Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default OrderStatus;

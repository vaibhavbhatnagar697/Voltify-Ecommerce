import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminRegister() {
  const navigate = useNavigate();
  const [admin_id, setadmin_id] = useState("");
  const [password, setpassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const adminData = { admin_id, password, mobile };

    try {
      const res = await fetch("http://localhost:3200/admin/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        navigate("/Admin-login");
        toast.success("Admin registered successfully");
        setsuccess(data.msgs);
      }
      if (data.success === false) {
        seterror(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Registration
        </h2>
        {typeof error === "string" && error !== "" && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded">
            {error}
          </div>
        )}

        {Array.isArray(error) &&
          error.map((v, i) => (
            <div
              key={i}
              className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-2"
            >
              {v.msg}
            </div>
          ))}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Admin ID */}
          <div>
            <label className="block mb-1 font-medium">Admin ID</label>
            <input
              type="text"
              name="adminId"
              placeholder="Enter Admin ID"
              value={admin_id}
              onChange={(e) => setadmin_id(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register Admin
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            <Link to="/Admin-login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
export default AdminRegister;

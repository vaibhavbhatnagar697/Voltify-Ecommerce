import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();
  const [admin_id, setadmin_id] = useState("");
  const [password, setpassword] = useState("");
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const adminData = { admin_id, password };
    console.log(adminData);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        setsuccess(data.msg);
        navigate("/user-list");
        toast.success("Admin Logged In Successfullly");
        localStorage.setItem("role", "Admin");
        localStorage.setItem("admin_id", admin_id);
        window.location.reload();
      }
      if (data.success === false) {
        seterror(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[380px]">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
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
            <label className="block text-sm font-medium mb-1">Admin ID</label>
            <input
              type="text"
              name="admin_id"
              placeholder="Enter Admin ID"
              value={admin_id}
              onChange={(e) => setadmin_id(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>{" "}
          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link
              to="/Admin-register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;

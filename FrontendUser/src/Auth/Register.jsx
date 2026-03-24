import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [mobile, setmobile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setsuccess("");
    const userData = { name, email, password, mobile };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        seterror(data.msg);
        toast.error("error occurred");
      }
      if (data.success === true) {
        setsuccess(data.msg);
        toast.info("Verification link sent on your email");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  console.log(error);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          E-Commerce
        </h1>
        <p className="text-center text-gray-500 mb-6">Create your account</p>
        {/* Error Message */}
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

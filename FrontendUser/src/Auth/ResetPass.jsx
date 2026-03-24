import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPass() {
  const navigate = useNavigate();
  const [searchquery] = useSearchParams();
  const token = searchquery.get("token");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { password: pass, confirmPassword: cpass, token: token };
    try {
      const res = await fetch("http://localhost:3200/user/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      console.log(userData);
      if (userData.success === true) {
        navigate("/login");
        toast.success("Password reset successfully");
        setsuccess(userData.msg);
      }
      if (userData.success === false) {
        seterror(userData.msg);
        toast.error("error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your new password below.
        </p>
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
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
            />
            <p className="text-sm text-red-500 mt-1 min-h-[20px]">
              {/* New password error */}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={cpass}
              onChange={(e) => setcpass(e.target.value)}
            />
            <p className="text-sm text-red-500 mt-1 min-h-[20px]">
              {/* Confirm password error */}
            </p>
          </div>

          {/* General / Success Message */}
          <div className="min-h-[24px]">
            <p className="text-center text-sm text-green-600">
              {/* Success message here */}
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Back to{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default ResetPass;

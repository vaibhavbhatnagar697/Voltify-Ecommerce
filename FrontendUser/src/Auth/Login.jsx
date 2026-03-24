import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  const handleSubmit = async (e) => {
    setsuccess([]);
    seterror([]);
    e.preventDefault();

    const userData = { email, password };
    console.log(email, password, userData);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        },
      );
      const data = await res.json();
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);

      if (data.success === true) {
        toast.success("Login successfully");
        setsuccess((prev) => [...prev, data.msg]);
        navigate("/products");
        window.location.reload();
      }
      if (data.success === false) {
        seterror((prev) => [...prev, data.msg]);
        toast.error("error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(error);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue shopping
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
              {v}
            </div>
          ))}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <p className="text-left text-sm text-gray-500 mt-2 mb-6">
              <Link
                to="/forgot-password"
                className="text-indigo-600 font-medium hover:underline"
              >
                Forgot Password
              </Link>
            </p>
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;

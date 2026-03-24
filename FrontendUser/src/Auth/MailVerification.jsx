import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function MailVerification() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const [searchquery] = useSearchParams();
  const query = searchquery.get("user_id");
  useEffect(() => {
    async function mail_verification() {
      seterror("");
      setsuccess("");
      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/user/api/mail-verification?user_id=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const new_data = await data.json();
      console.log(new_data);
      if (new_data.success === false) {
        seterror(new_data.msg);
        toast.error("error occurred");
      }
      if (new_data.success === true) {
        setsuccess(new_data.msg);
        toast.success("mail verified");
      }
    }
    mail_verification();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">
        {/* Dynamic Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              error !== "" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {error !== "" ? (
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </div>
        {/* Dynamic Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {error !== ""
            ? "Email Verified Successfully 🎉"
            : "Verification Failed ❌"}
        </h2>
        {/* Dynamic Message */}
        <p className="text-gray-500 mb-6">
          {error !== "" ? `${error}` : `${success}`}
        </p>
        {/* Dynamic Button */}
        <Link
          to="/login"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}
export default MailVerification;

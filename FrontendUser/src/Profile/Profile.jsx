import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Misc/Loader";
import Error from "../Misc/Error";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState([]);
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    async function view_profile() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/api/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(),
          },
        );
        const data = await res.json();
        console.log(data);
        setuserData(data.userData);
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
    view_profile();
  }, []);

  const userlogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/api/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      console.log(data);

      if (data.success === true) {
        setsuccess([...success, data.msg]);
        localStorage.clear();
        navigate("/login");
        window.location.reload();
      }
      if (data.success === false) {
        seterror([...error, data.msg]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (success.length > 0 || error.length > 0) {
    if (error.length === 0) {
      return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
          <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">
            {/* Heading */}
            <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <img
                  src="https://i.pravatar.cc/150"
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-gray-200"
                />
                <button className="mt-3 text-sm text-blue-600 hover:underline">
                  Change Photo
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-semibold">{userData[0]?.name}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold">{userData[0]?.email}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Mobile Number</p>
                  <p className="font-semibold">{userData[0]?.mobile}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={userlogout}
              >
                Logout
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
};

export default Profile;

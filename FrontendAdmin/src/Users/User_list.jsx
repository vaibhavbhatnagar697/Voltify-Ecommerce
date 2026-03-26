import React, { useEffect, useState } from "react";
import Loader from "../Misc/Loader";
import { toast } from "react-toastify";

function User_list() {
  const [users, setusers] = useState([]);
  const [User_id, setuser_id] = useState("");
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  useEffect(() => {
    const view_list_user = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/api/view-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        setsuccess((prev) => [...prev, data.msg]);
        setusers(data.users);
      }
      if (data.success === false) {
        seterror((prev) => [...prev, data.msg]);
      }
    };
    view_list_user();
  }, [User_id]);
  async function deleteUsers(user_id) {
    const userData = { user_id };
    setuser_id(user_id);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/api/delete-user`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        setsuccess([...success, data.msg]);
        toast.success("User deleted successfully");
      }
      if (data.success === false) {
        seterror([...error, data.msg]);
      }
      setuser_id("");
    } catch (error) {
      console.log(error);
    }
  }
  if (success.length > 0 || error.length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          <div className="bg-white px-4 py-2 rounded-lg shadow text-sm font-semibold text-gray-600">
            Total Users: 25
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">is_verified</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            {users.map((v) => (
              <tbody className="text-gray-700" key={v._id}>
                {/* Dummy User Row */}
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{v.name}</td>
                  <td className="px-6 py-4">{v.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      User
                    </span>
                  </td>
                  <td className="px-6 py-4">{v.is_verified}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 font-medium"
                      onClick={() => deleteUsers(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
export default User_list;

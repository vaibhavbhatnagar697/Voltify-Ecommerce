import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdAddBox, MdLocalShipping } from "react-icons/md";
import { FaList, FaUsers, FaBolt } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [navbar, setnavbar] = useState(false);
  const role = localStorage.getItem("role");
  const adminlogout = async () => {
    try {
      const res = await fetch("http://localhost:3200/admin/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (data.success === true) {
        localStorage.clear();
        navigate("/Admin-login");
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (role != undefined) {
      setnavbar(true);
    }
  }, []);
  if (navbar) {
    return (
      <nav className="bg-white shadow-md px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-indigo-600">
            <div className="flex items-center gap-2">
              Voltify <FaBolt className="text-yellow-400" />
            </div>
          </h1>

          {/* Desktop Menu */}
          {role != undefined && (
            <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <a
                href="/add-products"
                className="hover:text-indigo-600 flex items-center gap-2"
              >
                <MdAddBox size={20} /> AddProducts
              </a>
              <a
                href="/products-list"
                className="hover:text-indigo-600 flex items-center gap-2"
              >
                <FaList size={18} /> ProductList
              </a>
              <a
                href="/user-list"
                className="hover:text-indigo-600 flex items-center gap-2"
              >
                <FaUsers size={21} /> UserList
              </a>
              <a
                href="/order-status"
                className="hover:text-indigo-600 flex items-center gap-2"
              >
                <MdLocalShipping size={20} />
                Order Status
              </a>
            </div>
          )}

          {/* Profile + Mobile Menu */}
          <div className="flex items-center gap-6">
            <FaUserCircle size={26} className="cursor-pointer text-gray-700" />
            {role != undefined && (
              <button
                className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={adminlogout}
              >
                Logout
              </button>
            )}

            {/* Mobile Menu Button */}
            <HiMenu
              size={28}
              className="md:hidden cursor-pointer"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {role != undefined && (
          <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700 font-medium">
            <a href="/products">AddProducts</a>
            <a href="/cart">ProductList</a>
            <a href="/orders">UserList</a>{" "}
            <a href="/order-status">Order Status</a>
            <button className="text-red-500 text-left">Logout</button>
          </div>
        )}
      </nav>
    );
  }
}

export default Header;

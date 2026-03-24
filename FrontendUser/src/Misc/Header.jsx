import { useEffect, useState } from "react";
import { FaBolt, FaBox, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [navbar, setnavbar] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
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
        navigate("/login");
        window.location.reload();
      } else {
      }

      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken != "undefined" || accessToken.length > 0) {
      setnavbar(true);
    }
  }, []);

  async function view_profile() {
    navigate("/profile");
  }
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

          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <a
              href="/products"
              className="hover:text-indigo-600 flex items-center gap-2"
            >
              <MdInventory size={20} /> Products
            </a>
            <a
              href="/view-cart"
              className="hover:text-indigo-600 flex items-center gap-2"
            >
              <FaShoppingCart size={20} /> Cart
            </a>
            <a
              href="/orders"
              className="hover:text-indigo-600 flex items-center gap-2"
            >
              <FaBox size={19} />
              Orders
            </a>
          </div>

          {/* Profile + Mobile Menu */}
          <div className="flex items-center gap-6">
            <FaUserCircle
              size={40}
              className="cursor-pointer text-gray-700"
              onClick={view_profile}
            />

            <button
              className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={userlogout}
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <HiMenu
              size={28}
              className="md:hidden cursor-pointer"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menu && (
          <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700 font-medium">
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="/orders">Orders</a>
            <button className="text-red-500 text-left">Logout</button>
          </div>
        )}
      </nav>
    );
  }
}

export default Header;
